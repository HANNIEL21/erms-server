/*
  Warnings:

  - You are about to drop the column `blockType` on the `templateblock` table. All the data in the column will be lost.
  - Added the required column `title` to the `TemplateBlock` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `TemplateBlock_blockType_idx` ON `templateblock`;

-- AlterTable
ALTER TABLE `templateblock` DROP COLUMN `blockType`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `TemplateBlock_title_idx` ON `TemplateBlock`(`title`);
