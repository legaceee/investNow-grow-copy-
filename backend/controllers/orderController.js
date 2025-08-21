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
