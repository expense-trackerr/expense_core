/*
  Warnings:

  - You are about to drop the column `access_token` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[access_token]` on the table `LinkedAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `access_token` to the `LinkedAccount` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_access_token_key` ON `User`;

-- AlterTable
ALTER TABLE `LinkedAccount` ADD COLUMN `access_token` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `access_token`;

-- CreateIndex
CREATE UNIQUE INDEX `LinkedAccount_access_token_key` ON `LinkedAccount`(`access_token`);
