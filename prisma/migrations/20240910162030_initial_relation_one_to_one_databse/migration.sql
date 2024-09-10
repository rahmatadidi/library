/*
  Warnings:

  - You are about to drop the column `memberCode` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `tittle` on the `books` table. All the data in the column will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[borrowedById]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_memberCode_fkey";

-- DropIndex
DROP INDEX "books_memberCode_key";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "memberCode",
DROP COLUMN "tittle",
ADD COLUMN     "borrowedById" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Member";

-- CreateTable
CREATE TABLE "members" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "penalized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "members_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_borrowedById_key" ON "books"("borrowedById");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_borrowedById_fkey" FOREIGN KEY ("borrowedById") REFERENCES "members"("code") ON DELETE SET NULL ON UPDATE CASCADE;
