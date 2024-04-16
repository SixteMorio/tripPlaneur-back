/*
  Warnings:

  - You are about to alter the column `resIa` on the `prompt` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `prompt` MODIFY `resIa` JSON NULL;
