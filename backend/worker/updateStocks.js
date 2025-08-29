import fs from "fs";
import prisma from "../config/prismaClient.js";
import { publisher } from "../utils/redisClient.js";
import { updateCandles } from "./ohlc.js";
import "./flusher.js";

// Helpers
function getVolatility(price) {
  if (price < 200) return 0.05;
  if (price < 1000) return 0.02;
  return 0.01;
}

function getNewPrice(currentPrice) {
  const volatility = getVolatility(currentPrice);
  const percentChange = (Math.random() - 0.5) * (2 * volatility);
  const change = currentPrice * percentChange;
  return +(currentPrice + change).toFixed(2);
}

let stocks = JSON.parse(fs.readFileSync("stocks.json"));
let stockMap = {};

async function loadStocks() {
  const dbStocks = await prisma.stock.findMany({
    select: { id: true, symbol: true },
  });
  stockMap = Object.fromEntries(dbStocks.map((s) => [s.symbol, s.id]));
}

async function publishInBatches(channel, updates, batchSize = 100) {
  const pipeline = publisher.pipeline();

  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize);
    pipeline.publish(channel, JSON.stringify(batch));
  }

  await pipeline.exec();
}

async function updateMockPricesDB() {
  const redisUpdates = [];

  for (let stock of stocks) {
    stock.currentPrice = getNewPrice(stock.currentPrice);

    const stockId = stockMap[stock.symbol];
    if (!stockId) {
      console.error(`Stock ${stock.symbol} not found in DB`);
      continue;
    }

    const update = {
      stockId,
      symbol: stock.symbol,
      price: stock.currentPrice,
      timeStamp: new Date().toISOString(),
    };

    redisUpdates.push(update);

    updateCandles(update);
  }

  //  Publish in smaller JSON batches (100 per message)
  if (redisUpdates.length > 0) {
    await publishInBatches("stock-prices", redisUpdates, 100);
  }

  console.log("New prices inserted at", new Date().toLocaleTimeString());
}

export default async function updateStock() {
  await loadStocks();
  setInterval(updateMockPricesDB, 3000);
}
