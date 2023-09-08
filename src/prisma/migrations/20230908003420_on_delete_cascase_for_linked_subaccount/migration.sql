-- DropForeignKey
ALTER TABLE `linked_sub_account` DROP FOREIGN KEY `linked_sub_account_linked_account_item_id_fkey`;

-- AddForeignKey
ALTER TABLE `linked_sub_account` ADD CONSTRAINT `linked_sub_account_linked_account_item_id_fkey` FOREIGN KEY (`linked_account_item_id`) REFERENCES `linked_account`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;
