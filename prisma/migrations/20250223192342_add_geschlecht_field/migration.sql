/*
  Warnings:

  - Added the required column `geschlecht` to the `EscortProfil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `EscortProfil` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sprachen` on the `EscortProfil` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "EscortProfil" ADD COLUMN     "alkohol" TEXT,
ADD COLUMN     "anfahrt" TEXT,
ADD COLUMN     "anzeigebild" TEXT,
ADD COLUMN     "blocked_countries" TEXT[],
ADD COLUMN     "brustgroesse" TEXT,
ADD COLUMN     "brusttyp" TEXT,
ADD COLUMN     "bundesland" TEXT,
ADD COLUMN     "drei_stunden" DOUBLE PRECISION,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "erreichbar_24h" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "erreichbarkeit" TEXT,
ADD COLUMN     "extras" TEXT,
ADD COLUMN     "geschlecht" TEXT NOT NULL,
ADD COLUMN     "haarfarbe" TEXT,
ADD COLUMN     "haarlaenge" TEXT,
ADD COLUMN     "hausnummer" TEXT,
ADD COLUMN     "intimbereich" TEXT,
ADD COLUMN     "koerperbau" TEXT,
ADD COLUMN     "land" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "ort" TEXT,
ADD COLUMN     "piercings" TEXT[],
ADD COLUMN     "plz" TEXT,
ADD COLUMN     "prices" JSONB,
ADD COLUMN     "rauchen" TEXT,
ADD COLUMN     "signal" TEXT,
ADD COLUMN     "slogan" TEXT,
ADD COLUMN     "socialMedia" JSONB,
ADD COLUMN     "standardCurrency" TEXT NOT NULL DEFAULT 'EUR',
ADD COLUMN     "strasse" TEXT,
ADD COLUMN     "tags" JSONB NOT NULL,
ADD COLUMN     "tattoos" TEXT[],
ADD COLUMN     "telefon" TEXT,
ADD COLUMN     "telegram" TEXT,
ADD COLUMN     "termine_spontan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "uebernachtung" DOUBLE PRECISION,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "whatsapp" TEXT,
ADD COLUMN     "zwei_stunden" DOUBLE PRECISION,
DROP COLUMN "sprachen",
ADD COLUMN     "sprachen" JSONB NOT NULL;
