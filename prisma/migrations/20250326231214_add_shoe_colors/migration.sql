/*
  Warnings:

  - Added the required column `mainColor` to the `Shoe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondaryColor` to the `Shoe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shoe` ADD COLUMN `mainColor` VARCHAR(191) NOT NULL,
    ADD COLUMN `secondaryColor` VARCHAR(191) NOT NULL;
