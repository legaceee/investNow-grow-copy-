// Simple OrderBook implementation
// keeps track of buy and sell orders, and matches them

class OrderBook {
  constructor() {
    this.bids = []; // array of buy orders (sorted highest price first)
    this.asks = []; // array of sell orders (sorted lowest price first)
    this.trades = []; // executed trades (for history)
  }

  // add an order (either limit or market)
  addOrder(order) {
    if (order.type === "market") {
      // market order should be executed immediately
      this._executeMarketOrder(order);
    } else {
      // limit order is added to the book (if not fully matched)
      this._addLimitOrder(order);
    }
    return order;
  }

  // cancel order by id
  cancel(id) {
    this.bids = this.bids.filter((o) => o.id !== id);
    this.asks = this.asks.filter((o) => o.id !== id);
  }

  // get best buy and sell prices (top of the book)
  topOfBook() {
    return {
      bid: this.bids.length ? this.bids[0].price : null,
      ask: this.asks.length ? this.asks[0].price : null,
    };
  }

  // ---------------- Private helper methods ---------------- //

  // market orders don't sit in the book, they try to match immediately
  _executeMarketOrder(order) {
    if (order.side === "buy") {
      this._matchOrder(order, this.asks, "sell");
    } else {
      this._matchOrder(order, this.bids, "buy");
    }
  }

  // limit orders can be matched or added to the book
  _addLimitOrder(order) {
    if (order.side === "buy") {
      // try matching against sells
      this._matchOrder(order, this.asks, "sell");
      if (order.qty > 0) {
        // leftover qty goes into buy side
        this.bids.push(order);
        this.bids.sort((a, b) => b.price - a.price); // highest bid first
      }
    } else {
      // try matching against buys
      this._matchOrder(order, this.bids, "buy");
      if (order.qty > 0) {
        // leftover qty goes into sell side
        this.asks.push(order);
        this.asks.sort((a, b) => a.price - b.price); // lowest ask first
      }
    }
  }

  // match order with opposite side
  _matchOrder(order, oppositeBook, oppositeSide) {
    let i = 0;

    while (order.qty > 0 && i < oppositeBook.length) {
      const match = oppositeBook[i];

      // check if price condition is satisfied
      const priceOk =
        (order.side === "buy" && order.type === "market") ||
        (order.side === "buy" && order.price >= match.price) ||
        (order.side === "sell" && order.type === "market") ||
        (order.side === "sell" && order.price <= match.price);

      if (!priceOk) break; // no more matches possible

      // trade happens
      const tradedQty = Math.min(order.qty, match.qty);
      this.trades.push({
        buyOrderId: order.side === "buy" ? order.id : match.id,
        sellOrderId: order.side === "sell" ? order.id : match.id,
        price: match.price, // executed at matched order price
        qty: tradedQty,
        time: Date.now(),
      });

      // update remaining qty
      order.qty -= tradedQty;
      match.qty -= tradedQty;

      // if opposite order is fully filled, remove it from book
      if (match.qty === 0) {
        oppositeBook.splice(i, 1);
      } else {
        i++;
      }
    }
  }
}

// export the class so it can be used elsewhere
export { OrderBook };
