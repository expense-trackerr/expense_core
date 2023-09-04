-- AlterTable
ALTER TABLE `Category` ADD COLUMN `categoryTypeId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `CategoryType` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('INCOME', 'EXPENSE') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_categoryTypeId_fkey` FOREIGN KEY (`categoryTypeId`) REFERENCES `CategoryType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
