/*
  Warnings:

  - You are about to drop the column `escortProfilId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_escortProfilId_fkey";

-- DropIndex
DROP INDEX "Post_escortProfilId_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "escortProfilId",
ADD COLUMN     "EscortProfilId" TEXT;

-- CreateIndex
CREATE INDEX "Post_EscortProfilId_idx" ON "Post"("EscortProfilId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_EscortProfilId_fkey" FOREIGN KEY ("EscortProfilId") REFERENCES "EscortProfil"("id") ON DELETE SET NULL ON UPDATE CASCADE;
