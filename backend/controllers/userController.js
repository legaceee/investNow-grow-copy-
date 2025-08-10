// controllers/userController.js
import prisma from "../config/prismaClient.js";
import { CatchAsync } from "../utils/catchAsync.js";

export const getAllUsers = CatchAsync(async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, createdAt: true },
  });

  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
});
