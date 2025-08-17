import prisma from "../config/prismaClient.js";

export const addCash = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: userId },
        data: { cashBalance: { increment: amount } },
        select: { id: true, cashBalance: true },
      });
      console.log("User after cash update:", user);

      await tx.transaction.create({
        data: { userId, type: "DEPOSIT", amount },
      });

      return user;
    });

    res.json({ message: "Cash added", wallet: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const withdrawCash = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;
    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (user.cashBalance < amount) throw new Error("Insufficient balance");

      const updated = await tx.user.update({
        where: { id: userId },
        data: { cashBalance: { decrement: amount } },
        select: { id: true, cashBalance: true },
      });

      await tx.transaction.create({
        data: { userId, type: "WITHDRAW", amount },
      });

      return updated;
    });

    res.json({ message: "Cash withdrawn", wallet: result });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
