/*
  Warnings:

  - The primary key for the `prompt` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `prompt` DROP PRIMARY KEY,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `content` TEXT NOT NULL,
    MODIFY `resIa` TEXT NOT NULL,
    ADD PRIMARY KEY (`id`);
