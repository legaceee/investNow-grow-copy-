import fs from "fs";
import prisma from "./config/prismaClient.js";
import Redis from "ioredis";

const redis = new Redis();
function getVolatility(price) {
  if (price < 200) return 0.05; // 5% for low-priced stocks
  if (price < 1000) return 0.02; // 2% for mid-cap
  return 0.01; // 1% for high-priced
}

function getNewPrice(currentPrice) {
  const volatility = getVolatility(currentPrice);
  const percentChange = (Math.random() - 0.5) * (2 * volatility);
  const change = currentPrice * percentChange;
  return +(currentPrice + change).toFixed(2);
}

let stocks = JSON.parse(fs.readFileSync("stocks.json"));

let stockMap = {}; // symbol -> id

async function loadStocks() {
  const dbStocks = await prisma.stock.findMany({
    select: { id: true, symbol: true },
  });
  stockMap = Object.fromEntries(dbStocks.map((s) => [s.symbol, s.id]));
}

async function updateMockPricesDB() {
  const priceUpdates = [];

  for (let stock of stocks) {
    stock.currentPrice = getNewPrice(stock.currentPrice);

    const stockId = stockMap[stock.symbol];
    if (!stockId) {
      console.error(`Stock ${stock.symbol} not found in DB`);
      continue;
    }

    priceUpdates.push({
      stockId,
      price: stock.currentPrice,
    });
    redis.publish("stock-prices", JSON.stringify(update));
  }
  if (priceUpdates.length > 0) {
    await prisma.stockPrice.createMany({
      data: priceUpdates,
    });
  }

  console.log("New prices inserted at", new Date().toLocaleTimeString());
}

await loadStocks(); // run once at startup
setInterval(updateMockPricesDB, 3000);
