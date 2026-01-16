/*
  Warnings:

  - Added the required column `requestId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment` ADD COLUMN `requestId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `Request`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
