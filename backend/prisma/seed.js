import fs from "fs";
import path from "path";
import prisma from "../config/prismaClient.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load .env from backend root
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

async function main() {
  console.log("🌱 Seeding stocks...");

  // Read JSON file safely
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const stocksData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../stocks.json"), "utf-8")
  );

  // Bulk insert
  await prisma.Stock.createMany({
    data: stocksData.map((stock) => ({
      id: stock.id,
      symbol: stock.symbol,
      companyName: stock.companyName,
      currentPrice: stock.currentPrice,
      exchange: stock.exchange,
      sector: stock.sector,
      // Let Prisma handle createdAt/updatedAt automatically
    })),
    skipDuplicates: true,
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
