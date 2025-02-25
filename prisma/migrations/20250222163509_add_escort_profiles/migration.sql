/*
  Warnings:

  - The values [BENUTZER] on the enum `KontoTyp` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "KontoTyp_new" AS ENUM ('MITGLIED', 'ESCORT', 'AGENTUR', 'ADMIN', 'MODERATOR');
ALTER TABLE "User" ALTER COLUMN "kontotyp" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "kontotyp" TYPE "KontoTyp_new" USING ("kontotyp"::text::"KontoTyp_new");
ALTER TYPE "KontoTyp" RENAME TO "KontoTyp_old";
ALTER TYPE "KontoTyp_new" RENAME TO "KontoTyp";
DROP TYPE "KontoTyp_old";
ALTER TABLE "User" ALTER COLUMN "kontotyp" SET DEFAULT 'MITGLIED';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "kontotyp" SET DEFAULT 'MITGLIED';

-- CreateTable
CREATE TABLE "EscortProfil" (
    "id" TEXT NOT NULL,
    "escortUserId" TEXT,
    "agenturUserId" TEXT,
    "künstlername" TEXT NOT NULL,
    "beschreibung" TEXT,
    "alter" INTEGER NOT NULL,
    "größe" INTEGER NOT NULL,
    "gewicht" INTEGER,
    "nationalität" TEXT,
    "sprachen" TEXT[],
    "services" TEXT[],
    "stundensatz" DOUBLE PRECISION NOT NULL,
    "bilder" TEXT[],
    "videos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EscortProfil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EscortProfil_escortUserId_key" ON "EscortProfil"("escortUserId");

-- CreateIndex
CREATE INDEX "EscortProfil_escortUserId_idx" ON "EscortProfil"("escortUserId");

-- CreateIndex
CREATE INDEX "EscortProfil_agenturUserId_idx" ON "EscortProfil"("agenturUserId");

-- AddForeignKey
ALTER TABLE "EscortProfil" ADD CONSTRAINT "EscortProfil_escortUserId_fkey" FOREIGN KEY ("escortUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscortProfil" ADD CONSTRAINT "EscortProfil_agenturUserId_fkey" FOREIGN KEY ("agenturUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
