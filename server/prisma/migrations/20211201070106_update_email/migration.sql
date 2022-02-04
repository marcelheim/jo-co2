/*
  Warnings:

  - Added the required column `enabled` to the `EmailNotification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailNotification" ADD COLUMN     "enabled" BOOLEAN NOT NULL;
