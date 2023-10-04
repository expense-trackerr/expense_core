/*
  Warnings:

  - You are about to drop the column `linked_account_item_id` on the `transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_linked_account_item_id_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `linked_account_item_id`,
    ADD COLUMN `linked_sub_account_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_linked_sub_account_id_fkey` FOREIGN KEY (`linked_sub_account_id`) REFERENCES `linked_sub_account`(`account_id`) ON DELETE SET NULL ON UPDATE CASCADE;
