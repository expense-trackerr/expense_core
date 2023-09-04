/*
  Warnings:

  - The values [INCOME,EXPENSE] on the enum `CategoryType_name` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `CategoryType` MODIFY `name` ENUM('Income', 'Expense') NOT NULL;
