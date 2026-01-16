-- CreateTable
CREATE TABLE `Template` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `documentType` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `documentId` INTEGER NOT NULL,
    `createdById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Template_name_key`(`name`),
    INDEX `Template_documentType_idx`(`documentType`),
    INDEX `Template_isActive_idx`(`isActive`),
    INDEX `Template_createdById_idx`(`createdById`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TemplateBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blockType` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,
    `isDynamic` BOOLEAN NOT NULL DEFAULT false,
    `templateId` INTEGER NOT NULL,
    `reusableBlockId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TemplateBlock_templateId_idx`(`templateId`),
    INDEX `TemplateBlock_blockType_idx`(`blockType`),
    UNIQUE INDEX `TemplateBlock_templateId_position_key`(`templateId`, `position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReusableBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `blockType` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ReusableBlock_blockType_idx`(`blockType`),
    INDEX `ReusableBlock_createdById_idx`(`createdById`),
    UNIQUE INDEX `ReusableBlock_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TemplateVersion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `version` VARCHAR(191) NOT NULL,
    `snapshot` JSON NOT NULL,
    `templateId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TemplateVersion_templateId_idx`(`templateId`),
    UNIQUE INDEX `TemplateVersion_templateId_version_key`(`templateId`, `version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `Document`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplateBlock` ADD CONSTRAINT `TemplateBlock_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplateBlock` ADD CONSTRAINT `TemplateBlock_reusableBlockId_fkey` FOREIGN KEY (`reusableBlockId`) REFERENCES `ReusableBlock`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReusableBlock` ADD CONSTRAINT `ReusableBlock_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TemplateVersion` ADD CONSTRAINT `TemplateVersion_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
