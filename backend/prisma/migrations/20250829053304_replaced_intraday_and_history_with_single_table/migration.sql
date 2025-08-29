/*
  Warnings:

  - You are about to drop the `StockPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."StockPrice" DROP CONSTRAINT "StockPrice_stockId_fkey";

-- DropTable
DROP TABLE "public"."StockPrice";

-- CreateTable
CREATE TABLE "public"."Candle" (
    "id" TEXT NOT NULL,
    "stockId" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candle_stockId_interval_time_key" ON "public"."Candle"("stockId", "interval", "time");

-- AddForeignKey
ALTER TABLE "public"."Candle" ADD CONSTRAINT "Candle_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "public"."Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
