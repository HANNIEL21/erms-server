/*
  Warnings:

  - You are about to drop the column `documentType` on the `template` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Template_documentType_idx` ON `template`;

-- AlterTable
ALTER TABLE `template` DROP COLUMN `documentType`;
