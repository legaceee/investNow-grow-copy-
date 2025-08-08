import { PrismaClient } from "../generated/prisma/index.js";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding stocks...");

  // Read JSON file
  const stocksData = JSON.parse(fs.readFileSync("./stocks.json", "utf-8"));

  // Bulk insert
  await prisma.stock.createMany({
    data: stocksData.map((stock) => ({
      id: stock.id,
      symbol: stock.symbol,
      companyName: stock.companyName,
      currentPrice: stock.currentPrice,
      exchange: stock.exchange,
      sector: stock.sector,
      createdAt: new Date(stock.createdAt),
      updatedAt: new Date(stock.updatedAt),
    })),
    skipDuplicates: true, // Avoid duplicate errors
  });

  console.log("✅ Stock seeding completed!");
}

// Run seed
main()
  .catch((e) => {
    console.error("❌ Error seeding stocks:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
