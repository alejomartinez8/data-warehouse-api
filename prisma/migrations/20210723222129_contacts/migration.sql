/*
  Warnings:

  - You are about to drop the column `address` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "cityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "address",
ALTER COLUMN "companyId" DROP NOT NULL,
ALTER COLUMN "cityId" DROP NOT NULL;
