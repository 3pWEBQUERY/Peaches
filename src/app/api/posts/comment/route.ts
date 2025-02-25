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

    const { postId, content } = await request.json();

    if (!postId || !content) {
      return NextResponse.json(
        { error: 'Post ID und Inhalt sind erforderlich' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Benutzer nicht gefunden' },
        { status: 404 }
      );
    }

    // Erstelle den Kommentar
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: user.id,
        postId,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json({
      message: 'Kommentar erfolgreich erstellt',
      comment,
    });
  } catch (error) {
    console.error('Fehler beim Erstellen des Kommentars:', error);
    return NextResponse.json(
      { error: 'Interner Server-Fehler' },
      { status: 500 }
    );
  }
} 