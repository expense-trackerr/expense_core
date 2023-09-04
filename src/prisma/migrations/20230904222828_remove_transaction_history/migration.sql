/*
  Warnings:

  - You are about to drop the `TransactionHistory` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `user_id` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryTypeId` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `access_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_categoryTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `TransactionHistory` DROP FOREIGN KEY `TransactionHistory_transaction_id_fkey`;

-- AlterTable
ALTER TABLE `Category` MODIFY `user_id` VARCHAR(191) NOT NULL,
    MODIFY `categoryTypeId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `access_token` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `TransactionHistory`;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_categoryTypeId_fkey` FOREIGN KEY (`categoryTypeId`) REFERENCES `CategoryType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
