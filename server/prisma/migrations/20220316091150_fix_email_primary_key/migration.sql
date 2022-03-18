/*
  Warnings:

  - The primary key for the `EmailNotification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EmailNotification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailNotification" DROP CONSTRAINT "EmailNotification_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "EmailNotification_pkey" PRIMARY KEY ("dataClientId", "userId");
