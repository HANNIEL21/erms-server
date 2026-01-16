/*
  Warnings:

  - Added the required column `documentId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `request` ADD COLUMN `documentId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
