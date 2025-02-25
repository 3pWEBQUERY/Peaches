import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST: Einen View für einen Benutzer hinzufügen
export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    // Erhöhe den View-Counter
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        views: {
          increment: 1
        }
      }
    });

    return NextResponse.json({ views: user.views });
  } catch (error) {
    console.error('Fehler beim Hinzufügen des Views:', error);
    return NextResponse.json(
      { error: 'View-Hinzufügung fehlgeschlagen' },
      { status: 500 }
    );
  }
}

// GET: Anzahl der Views für einen Benutzer abrufen
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Benutzer-ID ist erforderlich' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { views: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Benutzer nicht gefunden' },
        { status: 404 }
      );
    }

    return NextResponse.json({ views: user.views });
  } catch (error) {
    console.error('Fehler beim Abrufen der Views:', error);
    return NextResponse.json(
      { error: 'Views-Abruf fehlgeschlagen' },
      { status: 500 }
    );
  }
}
