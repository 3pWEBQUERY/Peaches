import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST: Einem Benutzer folgen
export async function POST(request: Request) {
  try {
    const { followerId, followingId } = await request.json();

    // Überprüfe, ob der Benutzer sich nicht selbst folgen will
    if (followerId === followingId) {
      return NextResponse.json(
        { error: 'Sie können sich nicht selbst folgen' },
        { status: 400 }
      );
    }

    // Erstelle die Follower-Beziehung
    const follow = await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    return NextResponse.json(follow);
  } catch (error) {
    console.error('Fehler beim Folgen:', error);
    return NextResponse.json(
      { error: 'Folgen fehlgeschlagen' },
      { status: 500 }
    );
  }
}

// DELETE: Einem Benutzer entfolgen
export async function DELETE(request: Request) {
  try {
    const { followerId, followingId } = await request.json();

    // Lösche die Follower-Beziehung
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fehler beim Entfolgen:', error);
    return NextResponse.json(
      { error: 'Entfolgen fehlgeschlagen' },
      { status: 500 }
    );
  }
}
