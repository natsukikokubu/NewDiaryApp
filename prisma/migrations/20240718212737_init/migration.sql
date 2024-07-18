/*
  Warnings:

  - You are about to drop the `diary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "diary";

-- CreateTable
CREATE TABLE "diaries" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diaries_pkey" PRIMARY KEY ("id")
);
