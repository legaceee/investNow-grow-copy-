// multiple orderbooks (for different stock symbols)

import { OrderBook } from "./orderBook.js";

// keep a map of symbol -> OrderBook instance
const orderBooks = new Map();

// helper function to get/create an orderbook
export function getOrderBook(symbol) {
  if (!orderBooks.has(symbol)) {
    orderBooks.set(symbol, new OrderBook());
  }
  return orderBooks.get(symbol);
}
