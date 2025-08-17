import prisma from "../config/prismaClient.js";

// Buy stock
export const buyStock = async (req, res) => {
  try {
    const { stockId, buyQuantity, currentPrice } = req.body;
    const userId = req.user.id; // comes from auth middleware

    await prisma.$transaction(async (tx) => {
      // 1. Deduct balance (if you track user balance)
      const user = await tx.user.findUnique({ where: { id: userId } });
      const totalCost = buyQuantity * currentPrice;
      if (user.balance < totalCost) {
        throw new Error("Insufficient balance");
      }
      await tx.user.update({
        where: { id: userId },
        data: { balance: user.balance - totalCost },
      });

      // 2. Check if portfolio item exists
      const portfolioItem = await tx.portfolioItem.findFirst({
        where: { userId, stockId },
      });

      if (!portfolioItem) {
        // First time buying this stock
        await tx.portfolioItem.create({
          data: {
            userId,
            stockId,
            quantity: buyQuantity,
            averagePrice: currentPrice,
          },
        });
      } else {
        // Update existing
        const newTotalQuantity = portfolioItem.quantity + buyQuantity;
        const newAveragePrice =
          (portfolioItem.quantity * portfolioItem.averagePrice +
            buyQuantity * currentPrice) /
          newTotalQuantity;

        await tx.portfolioItem.update({
          where: { id: portfolioItem.id },
          data: {
            quantity: newTotalQuantity,
            averagePrice: newAveragePrice,
          },
        });
      }

      // 3. Log order history
      await tx.order.create({
        data: {
          userId,
          stockId,
          quantity: buyQuantity,
          price: currentPrice,
          type: "BUY",
        },
      });
    });

    res.status(200).json({ message: "Stock purchased successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const sellStock = async (req, res) => {
  try {
    console.log("Sell stock endpoint hit");
  } catch (error) {
    console.error("Error in sellStock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
