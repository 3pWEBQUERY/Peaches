import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Überprüfe, ob der Benutzer eingeloggt ist
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    // Hole die Daten aus dem Request-Body
    let data;
    try {
      data = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: 'Ungültige JSON-Daten' },
        { status: 400 }
      );
    }
    
    // Validiere die Daten
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Ungültige Daten empfangen' },
        { status: 400 }
      );
    }

    try {
      // Erstelle ein typsicheres Update-Objekt
      const updateData: Prisma.UserUpdateInput = {};
      
      if ('anzeigename' in data) {
        updateData.anzeigename = data.anzeigename === null ? null : String(data.anzeigename);
      }
      
      if ('beschreibung' in data) {
        updateData.beschreibung = data.beschreibung === null ? null : String(data.beschreibung);
      }
      
      if ('profilbild' in data) {
        updateData.profilbild = data.profilbild === null ? null : String(data.profilbild);
      }

      // Aktualisiere den Benutzer in der Datenbank
      const updatedUser = await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: updateData,
      });

      return NextResponse.json({
        message: 'Profil erfolgreich aktualisiert',
        user: updatedUser
      });
    } catch (error) {
      // Behandle spezifische Prisma-Fehler
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
          { error: 'Datenbankfehler: ' + error.message },
          { status: 400 }
        );
      }

      throw error; // Werfe andere Fehler weiter
    }
  } catch (error) {
    // Allgemeine Fehlerbehandlung
    return NextResponse.json(
      { error: 'Interner Server-Fehler beim Aktualisieren des Profils' },
      { status: 500 }
    );
  }
} 