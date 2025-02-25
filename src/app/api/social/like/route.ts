import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST: Einen Benutzer liken
export async function POST(request: Request) {
  try {
    const { fromUserId, toUserId } = await request.json();

    // Überprüfe, ob der Benutzer sich nicht selbst liken will
    if (fromUserId === toUserId) {
      return NextResponse.json(
        { error: 'Sie können sich nicht selbst liken' },
        { status: 400 }
      );
    }

    // Erstelle den Like
    const like = await prisma.like.create({
      data: {
        fromUserId,
        toUserId,
      },
    });

    return NextResponse.json(like);
  } catch (error) {
    console.error('Fehler beim Liken:', error);
    return NextResponse.json(
      { error: 'Like fehlgeschlagen' },
      { status: 500 }
    );
  }
}

// DELETE: Einen Like entfernen
export async function DELETE(request: Request) {
  try {
    const { fromUserId, toUserId } = await request.json();

    // Lösche den Like
    await prisma.like.delete({
      where: {
        fromUserId_toUserId: {
          fromUserId,
          toUserId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fehler beim Entfernen des Likes:', error);
    return NextResponse.json(
      { error: 'Like-Entfernung fehlgeschlagen' },
      { status: 500 }
    );
  }
}
