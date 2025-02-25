-- CreateEnum
CREATE TYPE "KontoTyp" AS ENUM ('BENUTZER', 'ADMIN', 'MODERATOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "kontotyp" "KontoTyp" NOT NULL DEFAULT 'BENUTZER',
ADD COLUMN     "profilbild" TEXT,
ADD COLUMN     "verifiziert" BOOLEAN NOT NULL DEFAULT false;
