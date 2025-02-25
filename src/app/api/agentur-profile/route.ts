import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Überprüfe ob der User eingeloggt ist
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Sie müssen eingeloggt sein' },
        { status: 401 }
      );
    }

    // Hole den User aus der Datenbank
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { agenturProfil: true }
    });

    // Überprüfe ob der User existiert und eine Agentur ist
    if (!user || user.kontotyp !== 'AGENTUR') {
      return NextResponse.json(
        { error: 'Nur Agenturen können ein Profil erstellen' },
        { status: 403 }
      );
    }

    const data = await request.json();

    // Validiere die erforderlichen Felder
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name und E-Mail sind erforderlich' },
        { status: 400 }
      );
    }

    // Formatiere die Daten für die Datenbank
    const profileData = {
      name: data.name,
      email: data.email,
      website: data.website || null,
      contacts: data.contacts || [],
      openingHours: data.openingHours || {},
      description: data.description || null,
      address: data.address || null,
      plz: data.plz || null,
      city: data.city || null,
      country: data.country || null,
      infrastructure: data.infrastructure || [],
      logo: data.logo || null,
      images: data.images || [],
      videos: data.videos || []
    };

    // Erstelle oder aktualisiere das Agenturprofil
    const agenturProfil = await prisma.agenturProfil.upsert({
      where: {
        agenturUserId: user.id
      },
      create: {
        agenturUser: { connect: { id: user.id } },
        ...profileData
      },
      update: profileData
    });

    return NextResponse.json({ success: true, data: agenturProfil });

  } catch (error) {
    console.error('Fehler beim Speichern des Agenturprofils:', error);
    return NextResponse.json(
      { error: 'Fehler beim Speichern des Profils' },
      { status: 500 }
    );
  }
}
