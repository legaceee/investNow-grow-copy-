import fs from "fs";

import prisma from "./config/prismaClient.js";

let stocks = JSON.parse(fs.readFileSync("stocks.json"));

async function updateMockPricesDB() {
  for (let stock of stocks) {
    const change = (Math.random() - 0.5) * 2;
    stock.currentPrice = +(stock.currentPrice + change).toFixed(2);

    try {
      await prisma.stock.update({
        where: { symbol: stock.symbol },
        data: { currentPrice: stock.currentPrice },
      });
    } catch (err) {
      console.error(`Error updating ${stock.symbol}:`, err.message);
    }
  }
  console.log("Prices updated in DB at", new Date().toLocaleTimeString());
}

setInterval(updateMockPricesDB, 3000); // every 3 sec
