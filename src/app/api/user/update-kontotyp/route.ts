import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { KontoTyp } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const data = await request.json();
    const { neuerKontotyp } = data;

    // Validiere den neuen Kontotyp
    if (!Object.values(KontoTyp).includes(neuerKontotyp)) {
      return NextResponse.json({ error: 'Ungültiger Kontotyp' }, { status: 400 });
    }

    // Hole den aktuellen User
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { escortProfil: true }
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'Benutzer nicht gefunden' }, { status: 404 });
    }

    // Prüfe ob der Wechsel erlaubt ist
    if (currentUser.kontotyp === 'MITGLIED') {
      if (neuerKontotyp !== 'ESCORT' && neuerKontotyp !== 'AGENTUR') {
        return NextResponse.json({ 
          error: 'Mitglieder können nur zu Escort oder Agentur wechseln' 
        }, { status: 400 });
      }
    } else if (currentUser.kontotyp === 'ESCORT' || currentUser.kontotyp === 'AGENTUR') {
      return NextResponse.json({ 
        error: 'Escort und Agentur Kontotypen können nicht geändert werden' 
      }, { status: 400 });
    }

    // Update den Kontotyp
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { kontotyp: neuerKontotyp }
    });

    return NextResponse.json({ 
      message: 'Kontotyp erfolgreich aktualisiert',
      user: updatedUser 
    });

  } catch (error) {
    console.error('Fehler beim Aktualisieren des Kontotyps:', error);
    return NextResponse.json({ 
      error: 'Interner Serverfehler' 
    }, { status: 500 });
  }
}
