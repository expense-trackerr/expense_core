-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_category_id_fkey`;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
