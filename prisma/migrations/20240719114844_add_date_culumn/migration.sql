/*
  Warnings:

  - Added the required column `date` to the `diaries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "diaries" ADD COLUMN     "date" TEXT NOT NULL;
