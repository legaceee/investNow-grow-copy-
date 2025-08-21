import { getOrderBook } from "../utils/orderBooks";
export const placeOrder = (req, res) => {
  try {
    const { id, symbol, side, type, price, qty } = req.body;

    if (!symbol || !side || !type || !qty) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // get/create the order book for this stock
    const ob = getOrderBook(symbol);

    // add the order
    const order = ob.addOrder({ id, side, type, price, qty });

    res.json({
      message: "Order placed successfully",
      order,
      topOfBook: ob.topOfBook(),
      trades: ob.trades, // trade history
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const placeLimitBuy = async (req, res) => {
  const { stockId, qty, limitPrice } = req.body;
  const userId = req.user.id;

  const quantity = Number(qty);
  const price = Number(limitPrice);
  if (!stockId || !quantity || !price || quantity <= 0 || price <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId } });
    const reserve = quantity * price;

    if (!user || user.cashBalance < reserve) {
      throw new Error("Insufficient funds to reserve");
    }

    // 1) Reserve cash
    await tx.user.update({
      where: { id: userId },
      data: {
        cashBalance: { decrement: reserve },
        reservedCash: { increment: reserve },
      },
    });

    // 2) Create order OPEN
    await tx.order.create({
      data: {
        userId,
        stockId,
        side: "BUY",
        type: "LIMIT",
        limitPrice: price,
        qty: quantity,
        status: "OPEN",
      },
    });
  });

  res.json({ status: "ok", message: "Limit buy placed and cash reserved" });
};
