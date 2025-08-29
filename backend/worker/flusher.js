import { candleBuckets, resetCandleBucket } from "./ohlc.js";
import prisma from "../config/prismaClient.js";

function shouldFlush(interval, bucketTime, now) {
  if (interval === "1m") {
    return now.getTime() - bucketTime.getTime() >= 60 * 1000;
  }
  if (interval === "5m") {
    return now.getTime() - bucketTime.getTime() >= 5 * 60 * 1000;
  }
  if (interval === "1d") {
    // flush once day has passed
    return now.getDate() !== bucketTime.getDate();
  }
  return false;
}

export async function flushCandles() {
  const now = new Date();
  const flushList = [];

  for (const [key, data] of Object.entries(candleBuckets)) {
    const [symbol, interval, ...rest] = key.split(":");
    const isoTime = rest.join(":");
    const bucketTime = new Date(isoTime);

    if (shouldFlush(interval, bucketTime, now)) {
      flushList.push({
        stockId: data.stockId,
        interval,
        time: bucketTime,
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close,
        volume: data.volume,
      });

      resetCandleBucket(key);
    }
  }

  if (flushList.length > 0) {
    await prisma.candle.createMany({ data: flushList });
    console.log(` Flushed ${flushList.length} candles at ${now.toISOString()}`);
  }
}

// run flush every 1min

setInterval(flushCandles, 10 * 1000);
