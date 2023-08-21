/*
  Warnings:

  - Made the column `active` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "active" SET NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;
