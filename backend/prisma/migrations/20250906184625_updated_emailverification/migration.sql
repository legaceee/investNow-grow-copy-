/*
  Warnings:

  - You are about to drop the column `userId` on the `EmailVerification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `EmailVerification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `EmailVerification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."EmailVerification" DROP CONSTRAINT "EmailVerification_userId_fkey";

-- DropIndex
DROP INDEX "public"."EmailVerification_userId_key";

-- AlterTable
ALTER TABLE "public"."EmailVerification" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerification_email_key" ON "public"."EmailVerification"("email");
