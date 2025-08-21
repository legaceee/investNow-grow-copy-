import bcrypt from "bcryptjs";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import prisma from "../config/prismaClient.js"; // Prisma DB client
import { CatchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js"; // custom error handler
import { signToken } from "../utils/signToken.js";

//require authentication for protected routes
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

  if (!username || !email || !password || !confirmPassword) {
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

  const token = signToken(user.id, user.username);

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
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

  const token = signToken(user.id, user.username);

  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  res.status(200).json({
    status: "success",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
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

  const token = signToken(updatedUser.id);

  res.status(200).json({
    status: "success",
    message: "Password updated successfully. Logged in again.",
    token,
  });
});
