/*
  Warnings:

  - Added the required column `category_color_id` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `category_color_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `category_color` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `hex_code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_category_color_id_fkey` FOREIGN KEY (`category_color_id`) REFERENCES `category_color`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
