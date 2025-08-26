import bcrypt from "bcryptjs";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import prisma from "../config/prismaClient.js"; // Prisma DB client
import { CatchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js"; // custom error handler
import { signToken } from "../utils/signToken.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
//require authentication for protected routes
export const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id, user.username);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  };
  const safeUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: safeUser,
    },
  });
};
export const requireAuth = CatchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded || !decoded.id) {
    console.log("Invalid token:", decoded);
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  console.log("User from DB:", user);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  if (user.passwordChangedAt) {
    const changedTimestamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    if (decoded.iat < changedTimestamp) {
      return next(
        new AppError(
          "User recently changed password. Please log in again.",
          401
        )
      );
    }
  }
  req.user = user; //  attach user object to request
  next();
});

// export const protect = (req, res, next) => {
//   let token;

//   // Check for token in Authorization header
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded user info to request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

export const signup = CatchAsync(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return next(new AppError("All fields are required", 400));
  }

  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return next(
      new AppError(
        "Password must be at least 8 characters, contain an uppercase letter & a number",
        400
      )
    );
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });
  if (existingUser) {
    return next(new AppError("Username or email already taken", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword, role: "USER" },
  });

  createSendToken(user, 201, res);
});

export const login = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  createSendToken(user, 201, res);
});

export const updatePassword = CatchAsync(async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) {
    return next(new AppError("You must be logged in", 400));
  }

  const { currentPassword, newPassword } = req.body;
  console.log(currentPassword);
  if (!currentPassword || !newPassword) {
    return next(new AppError("Please provide current and new password", 400));
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    user.password
  );
  if (!isPasswordCorrect) {
    return next(new AppError("Your current password is wrong", 401));
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      passwordChangedAt: new Date(),
    },
  });

  createSendToken(updatedUser, 201, res);
});

export const sendOtp = CatchAsync(async (req, res) => {
  const { email } = req.body;

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: { email, username: email.split("@")[0] }, // temp username
    });
  }

  // Generate OTP
  const { otp, hashedOtp } = generateOTP();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

  // Upsert OTP record
  await prisma.emailVerification.upsert({
    where: { userId: user.id },
    update: { otpCode: hashedOtp, expiresAt: expiry },
    create: { userId: user.id, otpCode: hashedOtp, expiresAt: expiry },
  });

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    from: `"Groww Clone" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  });

  res.status(200).json({ message: "OTP sent to email" });
});

export const verifyOtp = CatchAsync(async (req, res) => {
  const { email, otp } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const record = await prisma.emailVerification.findUnique({
    where: { userId: user.id },
  });

  if (!record) return res.status(400).json({ error: "No OTP found" });
  if (record.expiresAt < new Date())
    return res.status(400).json({ error: "OTP expired" });

  // Compare hashed OTP
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  if (hashedOtp !== record.otpCode) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  // Success → mark verified
  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true },
  });

  // Delete OTP record
  await prisma.emailVerification.delete({ where: { userId: user.id } });

  res.status(200).json({ message: "Email verified successfully" });
});
