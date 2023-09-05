/*
  Warnings:

  - You are about to drop the column `categoryTypeId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `category_type_id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_categoryTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_category_id_fkey`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `categoryTypeId`,
    ADD COLUMN `category_type_id` VARCHAR(191) NOT NULL,
    MODIFY `budget` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `linkedAccountItem_id` VARCHAR(191) NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    MODIFY `category_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `access_token` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `LinkedAccount` (
    `item_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `alias_name` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LinkedAccount` ADD CONSTRAINT `LinkedAccount_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_category_type_id_fkey` FOREIGN KEY (`category_type_id`) REFERENCES `CategoryType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_linkedAccountItem_id_fkey` FOREIGN KEY (`linkedAccountItem_id`) REFERENCES `LinkedAccount`(`item_id`) ON DELETE SET NULL ON UPDATE CASCADE;
