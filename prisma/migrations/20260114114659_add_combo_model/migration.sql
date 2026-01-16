-- CreateTable
CREATE TABLE `Combo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `middlename` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `matric_number` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `isPrinted` BOOLEAN NOT NULL DEFAULT false,
    `createdById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Combo_email_key`(`email`),
    UNIQUE INDEX `Combo_matric_number_key`(`matric_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Combo` ADD CONSTRAINT `Combo_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
