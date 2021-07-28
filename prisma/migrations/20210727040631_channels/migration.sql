/*
  Warnings:

  - You are about to drop the column `phone` on the `ChannelsOnContacts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChannelsOnContacts" DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "City" ALTER COLUMN "countryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "regionId" DROP NOT NULL;
