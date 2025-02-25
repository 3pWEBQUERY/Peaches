/*
  Warnings:

  - You are about to drop the column `EscortProfilId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_EscortProfilId_fkey";

-- DropIndex
DROP INDEX "Post_EscortProfilId_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "EscortProfilId",
ADD COLUMN     "escortProfilId" TEXT;

-- CreateIndex
CREATE INDEX "Post_escortProfilId_idx" ON "Post"("escortProfilId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_escortProfilId_fkey" FOREIGN KEY ("escortProfilId") REFERENCES "EscortProfil"("id") ON DELETE SET NULL ON UPDATE CASCADE;
