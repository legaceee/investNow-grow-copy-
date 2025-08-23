// controllers/userController.js
import prisma from "../config/prismaClient.js";
import AppError from "../utils/appError.js";
import { CatchAsync } from "../utils/catchAsync.js";

export const getAllUsers = CatchAsync(async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, email: true, createdAt: true },
  });

  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
});

export const updateProfile = CatchAsync(async (req, res) => {
  if (req.body.newPassword) {
    return next(
      new AppError("to change password use /passwordChange route", 400)
    );
  }
  const userId = req.user.id;
  if (!userId) {
    return next(new AppError("you must be login ", 400));
  }
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      username: req.body.username,
      avatarUrl: req.body.avatarUrl,
    },
  });

  res.json({ message: "Profile updated", user: updatedUser });
});
