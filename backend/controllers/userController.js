// controllers/userController.js
import prisma from "../config/prismaClient.js";
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
  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      username: req.body.username,
      avatarUrl: req.body.avatarUrl,
    },
  });

  res.json({ message: "Profile updated", user: updatedUser });
});
