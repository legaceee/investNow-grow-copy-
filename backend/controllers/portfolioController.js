import prisma from "../config/prismaClient.js";
//fix this code in transaction id property error
// Buy stock
export const buyStock = async (req, res) => {
  try {
    const { stockId, buyQuantity, currentPrice } = req.body;
    const userId = req.user.id;
    console.log(userId);

    const quantity = Number(buyQuantity);
    const price = Number(currentPrice);
    if (isNaN(quantity) || isNaN(price) || quantity <= 0 || price <= 0) {
      return res.status(400).json({ error: "Invalid quantity or price" });
    }

    const totalCost = quantity * price;

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      console.log("User from DB:", user);
      if (!user || user.cashBalance < totalCost) {
        throw new Error("Insufficient funds");
      }

      // Deduct money
      await tx.user.update({
        where: { id: userId },
        data: { cashBalance: { decrement: totalCost } },
      });

      // Update portfolio (upsert)
      let portfolio = await tx.portfolio.findFirst({
        where: { userId },
      });

      // If no portfolio exists, create one
      if (!portfolio) {
        portfolio = await tx.portfolio.create({
          data: {
            userId,
            name: "Default Portfolio", // or allow custom naming
          },
        });
      }
      let portfolioItem = await tx.portfolioItem.findFirst({
        where: { portfolioId: portfolio.id, stockId },
      });
      console.log("Portfolio Item:", portfolioItem);
      if (portfolioItem) {
        const newQuantity = portfolioItem.quantity + quantity;
        const newAvgPrice =
          (portfolioItem.avgBuyPrice * portfolioItem.quantity + totalCost) /
          newQuantity;

        portfolioItem = await tx.portfolioItem.update({
          where: { id: portfolioItem.id },
          data: { quantity: newQuantity, avgBuyPrice: newAvgPrice },
        });
      } else {
        portfolioItem = await tx.portfolioItem.create({
          data: {
            portfolioId: portfolio.id,
            stockId,
            quantity,
            avgBuyPrice: price,
          },
        });
      }

      // Record transaction
      await tx.transaction.create({
        data: {
          userId,
          stockId,
          type: "BUY",
          quantity,
          price,
          totalValue: totalCost,
        },
      });
      const transaction = await tx.transaction.findFirst({
        where: { userId, stockId, type: "BUY" },
      });
      console.log("transaction created", transaction);
      return { portfolioItem };
    });

    res.json({ message: "Stock purchased", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sellStock = async (req, res) => {
  try {
    const { stockId, sellQuantity, currentPrice } = req.body;
    const userId = req.user.id;

    const quantity = Number(sellQuantity);
    const price = Number(currentPrice);
    if (isNaN(quantity) || isNaN(price) || quantity <= 0 || price <= 0) {
      return res.status(400).json({ error: "Invalid quantity or price" });
    }

    const totalGain = quantity * price;

    const result = await prisma.$transaction(async (tx) => {
      const portfolio = await tx.portfolio.findFirst({ where: { userId } });
      const portfolioItem = await tx.portfolioItem.findFirst({
        where: { portfolioId: portfolio.id, stockId },
      });

      if (!portfolioItem || portfolioItem.quantity < quantity) {
        throw new Error("Not enough shares to sell");
      }

      // Update holdings
      const newQuantity = portfolioItem.quantity - quantity;
      if (newQuantity === 0) {
        await tx.portfolioItem.delete({ where: { id: portfolioItem.id } });
      } else {
        await tx.portfolioItem.update({
          where: { id: portfolioItem.id },
          data: { quantity: newQuantity },
        });
      }

      // Credit balance
      await tx.user.update({
        where: { id: userId },
        data: { cashBalance: { increment: totalGain } },
      });

      // Record transaction
      await tx.transaction.create({
        data: {
          userId,
          stockId,
          type: "SELL",
          quantity,
          price,
          totalValue: totalGain,
        },
      });

      return { portfolioItem };
    });

    res.json({ message: "Stock sold", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
