import { startOfMinute, startOfDay } from "date-fns";

let candleBuckets = {};

export function updateCandles(stockUpdate) {
  const { stockId, symbol, price, timeStamp } = stockUpdate;
  const ts = new Date(timeStamp);

  const oneMinKey = `${symbol}:1m:${startOfMinute(ts).toISOString()}`;
  upsertCandle(oneMinKey, stockId, price, "1m", startOfMinute(ts));

  const fiveMinStart = new Date(
    Math.floor(ts.getTime() / (5 * 60 * 1000)) * 5 * 60 * 1000
  );
  const fiveMinKey = `${symbol}:5m:${fiveMinStart.toISOString()}`;
  upsertCandle(fiveMinKey, stockId, price, "5m", fiveMinStart);

  const dayKey = `${symbol}:1d:${startOfDay(ts).toISOString()}`;
  upsertCandle(dayKey, stockId, price, "1d", startOfDay(ts));
}

function upsertCandle(key, stockId, price, interval, bucketStart) {
  if (!candleBuckets[key]) {
    candleBuckets[key] = {
      stockId,
      interval,
      open: price,
      high: price,
      low: price,
      close: price,
      volume: 1,
      timestamp: bucketStart,
    };
  } else {
    let c = candleBuckets[key];
    c.high = Math.max(c.high, price);
    c.low = Math.min(c.low, price);
    c.close = price;
    c.volume += 1;
  }
}
export function resetCandleBucket(key) {
  delete candleBuckets[key];
}
