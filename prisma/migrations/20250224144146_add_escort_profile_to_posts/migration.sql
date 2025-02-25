-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "escortProfilId" TEXT;

-- CreateIndex
CREATE INDEX "Post_escortProfilId_idx" ON "Post"("escortProfilId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_escortProfilId_fkey" FOREIGN KEY ("escortProfilId") REFERENCES "EscortProfil"("id") ON DELETE SET NULL ON UPDATE CASCADE;
