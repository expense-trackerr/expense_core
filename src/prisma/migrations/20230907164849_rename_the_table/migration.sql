/*
  Warnings:

  - You are about to drop the `LinkedSubAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `LinkedSubAccount` DROP FOREIGN KEY `LinkedSubAccount_linked_account_item_id_fkey`;

-- DropTable
DROP TABLE `LinkedSubAccount`;

-- CreateTable
CREATE TABLE `linked_sub_account` (
    `account_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `alias_name` VARCHAR(191) NULL,
    `balance` DECIMAL(10, 2) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `linked_account_item_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `linked_sub_account` ADD CONSTRAINT `linked_sub_account_linked_account_item_id_fkey` FOREIGN KEY (`linked_account_item_id`) REFERENCES `linked_account`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
