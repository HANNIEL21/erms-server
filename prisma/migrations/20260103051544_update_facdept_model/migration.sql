/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Department` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `department` ADD COLUMN `createdById` INTEGER NULL;

-- AlterTable
ALTER TABLE `faculty` ADD COLUMN `createdById` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Department_name_key` ON `Department`(`name`);

-- CreateIndex
CREATE INDEX `Department_createdById_idx` ON `Department`(`createdById`);

-- CreateIndex
CREATE INDEX `Department_name_idx` ON `Department`(`name`);

-- CreateIndex
CREATE INDEX `Faculty_createdById_idx` ON `Faculty`(`createdById`);

-- AddForeignKey
ALTER TABLE `Faculty` ADD CONSTRAINT `Faculty_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
