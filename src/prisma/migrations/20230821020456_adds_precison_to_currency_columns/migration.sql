/*
  Warnings:

  - You are about to alter the column `budget` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `TransactionHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `Category` MODIFY `budget` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `amount` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `TransactionHistory` MODIFY `amount` DECIMAL(10, 2) NOT NULL;
