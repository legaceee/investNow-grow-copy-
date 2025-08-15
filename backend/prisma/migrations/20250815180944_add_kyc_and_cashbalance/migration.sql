-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "kycDocument" TEXT,
ADD COLUMN     "kycStatus" TEXT NOT NULL DEFAULT 'PENDING';
