-- CreateTable
CREATE TABLE `LinkedSubAccount` (
    `account_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `alias_name` VARCHAR(191) NULL,
    `balance` DECIMAL(10, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `linked_account_item_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LinkedSubAccount` ADD CONSTRAINT `LinkedSubAccount_linked_account_item_id_fkey` FOREIGN KEY (`linked_account_item_id`) REFERENCES `linked_account`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
