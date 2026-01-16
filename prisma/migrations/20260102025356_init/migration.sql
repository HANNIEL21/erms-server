-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    INDEX `Role_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `refresh_token` VARCHAR(191) NULL,
    `refresh_token_expiry` DATETIME(3) NULL,
    `last_login` DATETIME(3) NULL,
    `roleId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_email_idx`(`email`),
    INDEX `User_roleId_idx`(`roleId`),
    INDEX `User_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alumni` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `middlename` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `matric_number` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NULL,
    `date_of_birth` DATETIME(3) NULL,
    `phone_number` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `roleId` INTEGER NULL,
    `refresh_token` VARCHAR(191) NULL,
    `refresh_token_expiry` DATETIME(3) NULL,
    `last_login` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `data` JSON NULL,

    UNIQUE INDEX `Alumni_email_key`(`email`),
    UNIQUE INDEX `Alumni_matric_number_key`(`matric_number`),
    INDEX `Alumni_email_idx`(`email`),
    INDEX `Alumni_matric_number_idx`(`matric_number`),
    INDEX `Alumni_roleId_idx`(`roleId`),
    INDEX `Alumni_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Document` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `price` INTEGER NOT NULL DEFAULT 0,
    `processingFee` INTEGER NOT NULL DEFAULT 0,
    `totalAmount` INTEGER NOT NULL DEFAULT 0,
    `createdById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Document_title_key`(`title`),
    INDEX `Document_createdById_idx`(`createdById`),
    INDEX `Document_status_idx`(`status`),
    INDEX `Document_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `destination` VARCHAR(191) NULL,
    `reference_number` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Request_reference_number_key`(`reference_number`),
    INDEX `Request_userId_idx`(`userId`),
    INDEX `Request_status_idx`(`status`),
    INDEX `Request_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gateway_name` VARCHAR(191) NOT NULL DEFAULT 'PAYSTACK',
    `gateway_response` JSON NULL,
    `transaction_id` VARCHAR(191) NULL,
    `totalAmount` INTEGER NOT NULL,
    `email` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `reference` VARCHAR(191) NULL,
    `access_code` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Payment_transaction_id_key`(`transaction_id`),
    UNIQUE INDEX `Payment_reference_key`(`reference`),
    INDEX `Payment_userId_idx`(`userId`),
    INDEX `Payment_status_idx`(`status`),
    INDEX `Payment_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alumni` ADD CONSTRAINT `Alumni_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Alumni`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Alumni`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
