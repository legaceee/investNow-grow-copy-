import bcrypt from "bcryptjs";

import prisma from "../config/prismaClient.js"; // Prisma DB client
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js"; // custom error handler
import { signToken } from "../utils/signToken.js";

const SECRET_KEY = process.env.JWT_SECRET || "super_secret_key";

export const signup = catchAsync(async (req, res, next) => {
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
    data: { username, email, password: hashedPassword },
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
