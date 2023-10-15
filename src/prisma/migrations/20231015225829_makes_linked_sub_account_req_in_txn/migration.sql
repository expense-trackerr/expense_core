/*
  Warnings:

  - Made the column `linked_sub_account_id` on table `transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_linked_sub_account_id_fkey`;

-- AlterTable
ALTER TABLE `transaction` MODIFY `linked_sub_account_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_linked_sub_account_id_fkey` FOREIGN KEY (`linked_sub_account_id`) REFERENCES `linked_sub_account`(`account_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
