import fs from "fs";
import pool from "./config/db.js"; // adjust path accordingly

let stocks = JSON.parse(fs.readFileSync("stocks.json"));

async function updateMockPricesDB() {
  for (let stock of stocks) {
    const change = (Math.random() - 0.5) * 2; // random change -1 to +1
    stock.currentPrice = +(stock.currentPrice + change).toFixed(2);

    try {
      await pool.query(
        'UPDATE "Stock" SET "currentPrice" = $1 WHERE symbol = $2',
        [stock.currentPrice, stock.symbol]
      );
    } catch (err) {
      console.error(`Error updating ${stock.symbol}:`, err.message);
    }
  }
  console.log("Prices updated in DB at", new Date().toLocaleTimeString());
}

setInterval(updateMockPricesDB, 3000); // every 3 sec
