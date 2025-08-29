import prisma from "../config/prismaClient.js";
import { candleBuckets, resetCandleBucket } from "./ohlc.js";

// Flush closed candles from in-memory bucket to Postgres

export async function flushCandles() {
  const now = new Date();
  const flushList = [];

  for (const [symbol, intervals] of Object.entries(candleBuckets)) {
    for (const [bucketKey, data] of Object.entries(intervals)) {
      const [interval, isoTime] = bucketKey.split(":");
      const bucketTime = new Date(isoTime);

      // Check if bucket has closed
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

        resetCandleBucket(symbol, bucketKey);
      }
    }
  }

  // Batch insert if we have flushed candles
  if (flushList.length > 0) {
    await prisma.candle.createMany({ data: flushList });
    console.log(
      `✅ Flushed ${flushList.length} candles at ${now.toLocaleTimeString()}`
    );
  }
}

// Decide if a bucket is ready to be flushed

function shouldFlush(interval, bucketTime, now) {
  const roundedNow = new Date(now);

  if (interval === "1m") {
    roundedNow.setSeconds(0, 0);
    return bucketTime < roundedNow;
  }

  if (interval === "5m") {
    const minutes = Math.floor(now.getMinutes() / 5) * 5;
    roundedNow.setMinutes(minutes, 0, 0);
    return bucketTime < roundedNow;
  }

  if (interval === "1d") {
    roundedNow.setUTCHours(0, 0, 0, 0);
    return bucketTime < roundedNow;
  }

  return false;
}

setInterval(flushCandles, 10 * 1000);
