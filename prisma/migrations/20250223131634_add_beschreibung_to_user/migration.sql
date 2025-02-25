/*
  Warnings:

  - You are about to drop the column `adresse` on the `AgenturProfil` table. All the data in the column will be lost.
  - You are about to drop the column `beschreibung` on the `AgenturProfil` table. All the data in the column will be lost.
  - You are about to drop the column `bilder` on the `AgenturProfil` table. All the data in the column will be lost.
  - You are about to drop the column `firmenname` on the `AgenturProfil` table. All the data in the column will be lost.
  - You are about to drop the column `services` on the `AgenturProfil` table. All the data in the column will be lost.
  - You are about to drop the column `telefon` on the `AgenturProfil` table. All the data in the column will be lost.
  - You are about to drop the column `webseite` on the `AgenturProfil` table. All the data in the column will be lost.
  - You are about to drop the column `öffnungszeiten` on the `AgenturProfil` table. All the data in the column will be lost.
  - Added the required column `contacts` to the `AgenturProfil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `AgenturProfil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `AgenturProfil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingHours` to the `AgenturProfil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AgenturProfil" DROP COLUMN "adresse",
DROP COLUMN "beschreibung",
DROP COLUMN "bilder",
DROP COLUMN "firmenname",
DROP COLUMN "services",
DROP COLUMN "telefon",
DROP COLUMN "webseite",
DROP COLUMN "öffnungszeiten",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "contacts" JSONB NOT NULL,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "infrastructure" TEXT[],
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "openingHours" JSONB NOT NULL,
ADD COLUMN     "plz" TEXT,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "beschreibung" TEXT;
