-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "reservedCash" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stockId" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "limitPrice" DECIMAL(65,30),
    "qty" INTEGER NOT NULL,
    "filledQty" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Order_stockId_status_side_limitPrice_idx" ON "public"."Order"("stockId", "status", "side", "limitPrice");
