/*
  Warnings:

  - You are about to drop the column `needPasswordHash` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "needPasswordHash",
ADD COLUMN     "needPasswordChange" BOOLEAN NOT NULL DEFAULT true;
