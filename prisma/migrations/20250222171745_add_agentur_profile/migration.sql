-- CreateTable
CREATE TABLE "AgenturProfil" (
    "id" TEXT NOT NULL,
    "agenturUserId" TEXT NOT NULL,
    "firmenname" TEXT NOT NULL,
    "beschreibung" TEXT,
    "adresse" TEXT,
    "telefon" TEXT,
    "webseite" TEXT,
    "öffnungszeiten" JSONB,
    "services" TEXT[],
    "bilder" TEXT[],
    "videos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgenturProfil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AgenturProfil_agenturUserId_key" ON "AgenturProfil"("agenturUserId");

-- CreateIndex
CREATE INDEX "AgenturProfil_agenturUserId_idx" ON "AgenturProfil"("agenturUserId");

-- AddForeignKey
ALTER TABLE "AgenturProfil" ADD CONSTRAINT "AgenturProfil_agenturUserId_fkey" FOREIGN KEY ("agenturUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
