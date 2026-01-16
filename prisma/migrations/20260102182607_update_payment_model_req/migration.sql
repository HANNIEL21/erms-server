-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_requestId_fkey`;

-- DropIndex
DROP INDEX `Payment_requestId_fkey` ON `payment`;

-- AlterTable
ALTER TABLE `payment` MODIFY `requestId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `Request`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
