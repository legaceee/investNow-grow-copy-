class Order {
  constructor({ id, side, type, price = null, qty }) {
    this.id = id;
    this.side = side; // "BUY" | "SELL"
    this.type = type; // "LIMIT" | "MARKET"
    this.price = price; // number | null
    this.qty = qty; // remaining
    this.origQty = qty;
    this.status = "ACTIVE";
    this.ts = Date.now(); // FIFO tiebreaker if needed
  }
}

class OrderBook {
  constructor() {
    this.bids = new Map(); // price -> [Order,...] FIFO
    this.asks = new Map();
    this.bidPrices = []; // sorted desc
    this.askPrices = []; // sorted asc
    this.index = new Map(); // id -> { side, price, idx }
    this.trades = [];
  }

  // --- helpers ---
  _insertPrice(prices, price, asc = true) {
    // binary insert maintaining sort
    let lo = 0,
      hi = prices.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (asc ? prices[mid] < price : prices[mid] > price) lo = mid + 1;
      else hi = mid;
    }
    if (prices[lo] !== price) prices.splice(lo, 0, price);
  }

  _removePrice(prices, price) {
    const i = prices.indexOf(price);
    if (i >= 0) prices.splice(i, 1);
  }

  bestBid() {
    if (this.bidPrices.length === 0) return null;
    const px = this.bidPrices[0];
    const q = this.bids.get(px);
    return q && q.length ? { price: px, order: q[0] } : null;
  }

  bestAsk() {
    if (this.askPrices.length === 0) return null;
    const px = this.askPrices[0];
    const q = this.asks.get(px);
    return q && q.length ? { price: px, order: q[0] } : null;
  }

  // --- API ---
  addOrder(raw) {
    const inOrd = new Order(raw);
    if (inOrd.type === "MARKET") {
      this._matchMarket(inOrd);
      return inOrd;
    } else {
      this._matchLimit(inOrd);
      if (inOrd.qty > 0) this._rest(inOrd);
      return inOrd;
    }
  }

  cancel(id) {
    const ref = this.index.get(id);
    if (!ref) return false;
    const book = ref.side === "BUY" ? this.bids : this.asks;
    const prices = ref.side === "BUY" ? this.bidPrices : this.askPrices;
    const dq = book.get(ref.price);
    if (!dq) return false;
    dq.splice(ref.idx, 1);
    // rebuild index positions for this price level
    for (let i = ref.idx; i < dq.length; i++) {
      this.index.set(dq[i].id, { side: ref.side, price: ref.price, idx: i });
    }
    if (dq.length === 0) {
      book.delete(ref.price);
      this._removePrice(prices, ref.price);
    }
    this.index.delete(id);
    return true;
  }

  topOfBook() {
    return {
      bid: this.bidPrices.length ? this.bidPrices[0] : null,
      ask: this.askPrices.length ? this.askPrices[0] : null,
    };
  }

  // --- internals ---
  _recordTrade(buyId, sellId, price, qty) {
    this.trades.push({ buyId, sellId, price, qty, ts: Date.now() });
  }

  _rest(ord) {
    const book = ord.side === "BUY" ? this.bids : this.asks;
    const prices = ord.side === "BUY" ? this.bidPrices : this.askPrices;
    const asc = ord.side === "SELL";
    if (!book.has(ord.price)) {
      book.set(ord.price, []);
      this._insertPrice(prices, ord.price, asc);
    }
    const dq = book.get(ord.price);
    dq.push(ord);
    this.index.set(ord.id, {
      side: ord.side,
      price: ord.price,
      idx: dq.length - 1,
    });
  }

  _matchMarket(inOrd) {
    if (inOrd.side === "BUY") {
      while (inOrd.qty > 0 && this.askPrices.length > 0) {
        const px = this.askPrices[0];
        const dq = this.asks.get(px);
        while (inOrd.qty > 0 && dq.length) {
          const maker = dq[0];
          const execQty = Math.min(inOrd.qty, maker.qty);
          maker.qty -= execQty;
          inOrd.qty -= execQty;
          this._recordTrade(inOrd.id, maker.id, px, execQty);

          if (maker.qty === 0) {
            this.index.delete(maker.id);
            dq.shift();
            // reindex remaining at this level
            for (let i = 0; i < dq.length; i++) {
              this.index.set(dq[i].id, { side: "SELL", price: px, idx: i });
            }
          } else {
            maker.status = "PARTIALLY_FILLED";
          }
        }
        if (dq.length === 0) {
          this.asks.delete(px);
          this._removePrice(this.askPrices, px);
        }
      }
    } else {
      while (inOrd.qty > 0 && this.bidPrices.length > 0) {
        const px = this.bidPrices[0];
        const dq = this.bids.get(px);
        while (inOrd.qty > 0 && dq.length) {
          const maker = dq[0];
          const execQty = Math.min(inOrd.qty, maker.qty);
          maker.qty -= execQty;
          inOrd.qty -= execQty;
          this._recordTrade(maker.id, inOrd.id, px, execQty);

          if (maker.qty === 0) {
            this.index.delete(maker.id);
            dq.shift();
            for (let i = 0; i < dq.length; i++) {
              this.index.set(dq[i].id, { side: "BUY", price: px, idx: i });
            }
          } else {
            maker.status = "PARTIALLY_FILLED";
          }
        }
        if (dq.length === 0) {
          this.bids.delete(px);
          this._removePrice(this.bidPrices, px);
        }
      }
    }
    inOrd.status = inOrd.qty === 0 ? "FILLED" : "PARTIALLY_FILLED";
  }

  _matchLimit(inOrd) {
    if (inOrd.side === "BUY") {
      while (inOrd.qty > 0 && this.askPrices.length > 0) {
        const bestAsk = this.askPrices[0];
        if (bestAsk > inOrd.price) break;
        const dq = this.asks.get(bestAsk);
        while (inOrd.qty > 0 && dq.length && bestAsk <= inOrd.price) {
          const maker = dq[0];
          const execQty = Math.min(inOrd.qty, maker.qty);
          maker.qty -= execQty;
          inOrd.qty -= execQty;
          this._recordTrade(inOrd.id, maker.id, bestAsk, execQty);

          if (maker.qty === 0) {
            this.index.delete(maker.id);
            dq.shift();
            for (let i = 0; i < dq.length; i++) {
              this.index.set(dq[i].id, {
                side: "SELL",
                price: bestAsk,
                idx: i,
              });
            }
          } else {
            maker.status = "PARTIALLY_FILLED";
          }
        }
        if (dq.length === 0) {
          this.asks.delete(bestAsk);
          this._removePrice(this.askPrices, bestAsk);
        } else break;
      }
    } else {
      // SELL
      while (inOrd.qty > 0 && this.bidPrices.length > 0) {
        const bestBid = this.bidPrices[0];
        if (bestBid < inOrd.price) break;
        const dq = this.bids.get(bestBid);
        while (inOrd.qty > 0 && dq.length && bestBid >= inOrd.price) {
          const maker = dq[0];
          const execQty = Math.min(inOrd.qty, maker.qty);
          maker.qty -= execQty;
          inOrd.qty -= execQty;
          this._recordTrade(maker.id, inOrd.id, bestBid, execQty);

          if (maker.qty === 0) {
            this.index.delete(maker.id);
            dq.shift();
            for (let i = 0; i < dq.length; i++) {
              this.index.set(dq[i].id, { side: "BUY", price: bestBid, idx: i });
            }
          } else {
            maker.status = "PARTIALLY_FILLED";
          }
        }
        if (dq.length === 0) {
          this.bids.delete(bestBid);
          this._removePrice(this.bidPrices, bestBid);
        } else break;
      }
    }
    inOrd.status = inOrd.qty === 0 ? "FILLED" : "ACTIVE";
  }
}

// --- Example usage ---
const ob = new OrderBook();
// Resting
ob.addOrder({ id: 1, side: "SELL", type: "LIMIT", price: 101, qty: 100 });
ob.addOrder({ id: 2, side: "SELL", type: "LIMIT", price: 102, qty: 200 });
ob.addOrder({ id: 3, side: "BUY", type: "LIMIT", price: 100, qty: 100 });

// Aggressive taker
ob.addOrder({ id: 4, side: "BUY", type: "LIMIT", price: 102, qty: 150 });

console.log("TOB:", ob.topOfBook()); // { bid: 100, ask: 102 } after trades
console.log("Trades:", ob.trades); // executions emitted
ob.cancel(2); // cancel a resting order
