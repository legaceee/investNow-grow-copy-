import bcrypt from "bcryptjs";
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
  console.log(token);
  console.log("JWT_SECRET in requireAuth:", process.env.JWT_SECRET);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded || !decoded.id) {
    console.log("Invalid token:", decoded);
  }
  console.log("Decoded token:", decoded);
  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  console.log("User from DB:", user);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
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

  // 1️ Validate required fields
  if (!username || !email || !password || !confirmPassword) {
    return next(new AppError("All fields are required", 400));
  }

  // 2️ Confirm password match
  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  // 3️ Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  // 4️ Strong password rule
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

  // 5️ Check if user exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });
  if (existingUser) {
    return next(new AppError("Username or email already taken", 400));
  }

  // 6️ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 7️ Create user
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword, role: "USER" },
  });

  // 8️ Generate JWT
  const token = signToken(user.id, user.username);

  // 9 Send response
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

  // 1️ Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // 2️ Find user in DB
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // 3️ Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // 4️ Sign JWT token
  const token = signToken(user.id, user.username);
  console.log("User from DB:", user);
  console.log("User.id used in token:", user.id);

  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  // 5️ Send response
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
