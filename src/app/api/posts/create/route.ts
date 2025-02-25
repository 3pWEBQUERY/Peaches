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

    // Hole die Daten aus dem Request-Body
    const data = await request.json();
    const { content, images, escortProfilId } = data;

    if (!content) {
      return NextResponse.json(
        { error: 'Inhalt ist erforderlich' },
        { status: 400 }
      );
    }

    // Hole den aktuellen Benutzer mit seinen Beziehungen
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        escortProfil: true,
        verwalteteEscorts: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Benutzer nicht gefunden' },
        { status: 404 }
      );
    }

    // Überprüfe die Berechtigung für das Escort-Profil
    if (escortProfilId) {
      // Für Escort-User: Nur eigenes Profil erlaubt
      if (user.kontotyp === 'ESCORT' && user.escortProfil?.id !== escortProfilId) {
        return NextResponse.json(
          { error: 'Keine Berechtigung für dieses Profil' },
          { status: 403 }
        );
      }
      
      // Für Agentur-User: Nur verwaltete Profile erlaubt
      if (user.kontotyp === 'AGENTUR') {
        const hasAccess = user.verwalteteEscorts?.some(
          (profil) => profil.id === escortProfilId
        );
        
        if (!hasAccess) {
          return NextResponse.json(
            { error: 'Keine Berechtigung für dieses Profil' },
            { status: 403 }
          );
        }
      }
    }

    // Erstelle den Post
    const post = await prisma.post.create({
      data: {
        content,
        images: images || [],
        authorId: user.id,
        escortProfilId: escortProfilId || null,
      },
      include: {
        author: true,
        escortProfil: true,
        likes: {
          include: {
            user: true
          }
        },
        comments: {
          include: {
            author: true
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Post erfolgreich erstellt',
      post
    });
  } catch (error) {
    console.error('Fehler beim Erstellen des Posts:', error);
    return NextResponse.json(
      { error: 'Interner Server-Fehler' },
      { status: 500 }
    );
  }
} 