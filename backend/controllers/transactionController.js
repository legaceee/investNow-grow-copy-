import prisma from "../config/prismaClient.js";
import { CatchAsync } from "../utils/catchAsync.js";
export const getTransactions = CatchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      stock: {
        select: {
          symbol: true,
        },
      },
    },
  });
  res.json({ success: true, data: transactions });
});

export const withdrawTransaction = CatchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const transaction = await prisma.transaction.findMany({
    where: { userId, type: "WITHDRAW" },
  });
  if (!transaction || transaction.length === 0) {
    return res.status(404).json({ message: "No withdraw transactions found" });
  }
  res.json({ success: true, data: transaction });
});

export const depositTransaction = CatchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const transaction = await prisma.transaction.findMany({
    where: { userId, type: "DEPOSIT" },
  });

  if (!transaction || transaction.length === 0) {
    return res.status(404).json({ message: "No deposit transactions found" });
  }
  res.json({ success: true, data: transaction });
});
export const buyTransaction = CatchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const transaction = await prisma.transaction.findMany({
    where: { userId, type: "BUY" },
  });
  if (!transaction || transaction.length === 0) {
    return res.status(404).json({ message: "No buy transactions found" });
  }
  res.json({ success: true, data: transaction });
});

export const sellTransaction = CatchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const transaction = await prisma.transaction.findMany({
    where: { userId, type: "SELL" },
  });
  if (!transaction || transaction.length === 0) {
    return res.status(404).json({ message: "No sell transactions found" });
  }
  res.json({ success: true, data: transaction });
});
