/*
  Warnings:

  - You are about to drop the `reusableblock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `templateblock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `reusableblock` DROP FOREIGN KEY `ReusableBlock_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `templateblock` DROP FOREIGN KEY `TemplateBlock_reusableBlockId_fkey`;

-- DropForeignKey
ALTER TABLE `templateblock` DROP FOREIGN KEY `TemplateBlock_templateId_fkey`;

-- DropTable
DROP TABLE `reusableblock`;

-- DropTable
DROP TABLE `templateblock`;

-- CreateTable
CREATE TABLE `Component` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `layoutType` VARCHAR(191) NOT NULL,
    `createdById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Component_createdById_idx`(`createdById`),
    UNIQUE INDEX `Component_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Block` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `blockType` VARCHAR(191) NOT NULL,
    `defaultValue` VARCHAR(191) NULL,
    `isDynamic` BOOLEAN NOT NULL DEFAULT false,
    `createdById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Block_blockType_idx`(`blockType`),
    UNIQUE INDEX `Block_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComponentBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` INTEGER NOT NULL,
    `componentId` INTEGER NOT NULL,
    `blockId` INTEGER NOT NULL,

    INDEX `ComponentBlock_componentId_idx`(`componentId`),
    UNIQUE INDEX `ComponentBlock_componentId_position_key`(`componentId`, `position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TemplateComponent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` INTEGER NOT NULL,
    `templateId` INTEGER NOT NULL,
    `componentId` INTEGER NOT NULL,

    INDEX `TemplateComponent_templateId_idx`(`templateId`),
    UNIQUE INDEX `TemplateComponent_templateId_position_key`(`templateId`, `position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Component` ADD CONSTRAINT `Component_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Block` ADD CONSTRAINT `Block_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComponentBlock` ADD CONSTRAINT `ComponentBlock_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComponentBlock` ADD CONSTRAINT `ComponentBlock_blockId_fkey` FOREIGN KEY (`blockId`) REFERENCES `Block`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplateComponent` ADD CONSTRAINT `TemplateComponent_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplateComponent` ADD CONSTRAINT `TemplateComponent_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
