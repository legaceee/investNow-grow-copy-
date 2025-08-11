import fs from "fs";
import path from "path";
import prisma from "../config/prismaClient.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

async function main() {
  console.log("🌱 Seeding stocks (upsert)...");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const stocksData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../stocks.json"), "utf-8")
  );

  for (const stock of stocksData) {
    await prisma.stock.upsert({
      where: { symbol: stock.symbol }, // ✅ match by unique symbol
      update: {
        companyName: stock.companyName,
        currentPrice: stock.currentPrice,
        exchange: stock.exchange,
        sector: stock.sector,
        totalQuantity: BigInt(stock.totalQuantity),
        marketCap: stock.marketCap,
      },
      create: {
        id: stock.id, // still insert the ID when creating
        symbol: stock.symbol,
        companyName: stock.companyName,
        currentPrice: stock.currentPrice,
        exchange: stock.exchange,
        sector: stock.sector,
        totalQuantity: BigInt(stock.totalQuantity),
        marketCap: stock.marketCap,
      },
    });
  }

  console.log("✅ Stock upsert completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding stocks:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
