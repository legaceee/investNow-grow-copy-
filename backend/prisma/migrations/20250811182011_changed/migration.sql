/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."TransactionType" ADD VALUE 'DEPOSIT';
ALTER TYPE "public"."TransactionType" ADD VALUE 'WITHDRAW';

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_stockId_fkey";

-- AlterTable
ALTER TABLE "public"."Portfolio" DROP COLUMN "updatedAt",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Default Portfolio';

-- AlterTable
ALTER TABLE "public"."Stock" ALTER COLUMN "marketCap" DROP DEFAULT,
ALTER COLUMN "totalQuantity" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalValue" DOUBLE PRECISION,
ALTER COLUMN "stockId" DROP NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "cashBalance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "public"."Stock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
