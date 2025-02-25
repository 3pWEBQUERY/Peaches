import { NextResponse } from 'next/server';
import { PrismaClient, KontoTyp } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, anzeigename, profilbild } = await request.json();

    // Überprüfe, ob der Benutzer bereits existiert
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Ein Benutzer mit dieser E-Mail existiert bereits' },
        { status: 400 }
      );
    }

    // Verschlüssele das Passwort
    const hashedPassword = await bcrypt.hash(password, 10);

    // Erstelle den neuen Benutzer
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        anzeigename,
        profilbild,
        verifiziert: false,
        kontotyp: KontoTyp.MITGLIED,
      },
    });

    // Entferne das Passwort aus der Antwort
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Registrierungsfehler:', error);
    return NextResponse.json(
      { error: 'Registrierung fehlgeschlagen' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
