import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { conversationId, content } = data;

    if (!conversationId || !content) {
      return NextResponse.json(
        { error: 'Fehlende Daten' },
        { status: 400 }
      );
    }

    // Überprüfe, ob der Benutzer Teil der Konversation ist
    const participant = await prisma.conversationParticipant.findUnique({
      where: {
        userId_conversationId: {
          userId: session.user.id,
          conversationId: conversationId,
        },
      },
    });

    if (!participant) {
      return NextResponse.json(
        { error: 'Nicht berechtigt' },
        { status: 403 }
      );
    }

    // Erstelle die neue Nachricht
    const message = await prisma.message.create({
      data: {
        content,
        senderId: session.user.id,
        conversationId,
      },
      include: {
        sender: true,
      },
    });

    return NextResponse.json({
      message: 'Nachricht erfolgreich gesendet',
      data: message,
    });
  } catch (error) {
    console.error('Fehler beim Senden der Nachricht:', error);
    return NextResponse.json(
      { error: 'Interner Server-Fehler' },
      { status: 500 }
    );
  }
} 