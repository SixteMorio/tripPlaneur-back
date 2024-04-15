/*
  Warnings:

  - Added the required column `resIa` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prompt` ADD COLUMN `resIa` VARCHAR(255) NOT NULL;
