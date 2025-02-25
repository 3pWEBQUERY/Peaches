import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    // Request-Daten validieren
    const data = await request.json().catch(() => null);
    if (!data) {
      return NextResponse.json({ error: 'Ungültige Anfragedaten' }, { status: 400 });
    }

    console.log('Empfangene Daten:', {
      künstlername: data.künstlername,
      geschlecht: data.geschlecht,
      alter: data.alter,
      größe: data.größe,
      stundensatz: data.stundensatz
    });

    // Pflichtfelder überprüfen
    const missingFields = [];
    if (!data.künstlername) missingFields.push('künstlername');
    if (!data.geschlecht) missingFields.push('geschlecht');
    if (!data.alter) missingFields.push('alter');
    if (!data.größe) missingFields.push('größe');

    if (missingFields.length > 0) {
      console.log('Fehlende Pflichtfelder:', missingFields);
      return NextResponse.json({ 
        error: 'Pflichtfelder fehlen',
        missingFields
      }, { status: 400 });
    }

    // Benutzer abrufen
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { escortProfil: true }
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'Benutzer nicht gefunden' }, { status: 404 });
    }

    // Berechtigungen prüfen
    if (currentUser.kontotyp === 'MITGLIED') {
      return NextResponse.json({ 
        error: 'Mitglieder können keine Escort-Profile erstellen' 
      }, { status: 403 });
    }

    if (currentUser.kontotyp === 'ESCORT' && currentUser.escortProfil) {
      return NextResponse.json({ 
        error: 'Escorts können nur ein Profil erstellen' 
      }, { status: 403 });
    }

    // Profil erstellen
    let escortProfil;
    try {
      const createData = {
        künstlername: data.künstlername,
        beschreibung: data.beschreibung || null,
        geschlecht: data.geschlecht,
        alter: parseInt(data.alter) || 0,
        größe: parseInt(data.größe) || 0,
        gewicht: data.gewicht ? parseInt(data.gewicht) : null,
        koerperbau: data.koerperbau || null,
        haarlaenge: data.haarlaenge || null,
        haarfarbe: data.haarfarbe || null,
        brusttyp: data.brusttyp || null,
        brustgroesse: data.brustgroesse || null,
        intimbereich: data.intimbereich || null,
        tattoos: Array.isArray(data.tattoos) ? data.tattoos : [],
        piercings: Array.isArray(data.piercings) ? data.piercings : [],
        rauchen: data.rauchen || null,
        alkohol: data.alkohol || null,
        nationalität: data.nationalität || null,
        sprachen: data.sprachen || [],
        services: Array.isArray(data.services) ? data.services : [],
        anzeigebild: data.anzeigebild || null,
        logo: data.logo || null,
        bilder: Array.isArray(data.bilder) ? data.bilder : [],
        videos: Array.isArray(data.videos) ? data.videos : [],
        stundensatz: data.stundensatz ? parseFloat(data.stundensatz) : 0,
        zwei_stunden: data.zwei_stunden ? parseFloat(data.zwei_stunden) : null,
        drei_stunden: data.drei_stunden ? parseFloat(data.drei_stunden) : null,
        uebernachtung: data.uebernachtung ? parseFloat(data.uebernachtung) : null,
        standardCurrency: data.standardCurrency || 'EUR',
        prices: data.prices || null,
        extras: data.extras || null,
        strasse: data.strasse || null,
        hausnummer: data.hausnummer || null,
        plz: data.plz || null,
        ort: data.ort || null,
        bundesland: data.bundesland || null,
        land: data.land || null,
        anfahrt: data.anfahrt || null,
        telefon: data.telefon || null,
        whatsapp: data.whatsapp || null,
        telegram: data.telegram || null,
        signal: data.signal || null,
        email: data.email || null,
        website: data.website || null,
        socialMedia: data.socialMedia || null,
        erreichbar_24h: Boolean(data.erreichbar_24h),
        termine_spontan: Boolean(data.termine_spontan),
        erreichbarkeit: data.erreichbarkeit || null,
        blocked_countries: Array.isArray(data.blocked_countries) ? data.blocked_countries : [],
        tags: data.tags || { custom: [], selected: [] }
      };

      if (currentUser.kontotyp === 'ESCORT') {
        escortProfil = await prisma.escortProfil.create({
          data: {
            ...createData,
            escortUser: {
              connect: { id: currentUser.id }
            }
          }
        });
      } else if (currentUser.kontotyp === 'AGENTUR') {
        escortProfil = await prisma.escortProfil.create({
          data: {
            ...createData,
            agenturUser: {
              connect: { id: currentUser.id }
            }
          }
        });
      }

      return NextResponse.json({ 
        message: 'Escort-Profil erfolgreich erstellt',
        profil: escortProfil 
      });

    } catch (error) {
      console.log('Prisma Fehler:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        code: (error as any)?.code,
        meta: (error as any)?.meta
      });

      return NextResponse.json({ 
        error: 'Fehler beim Erstellen des Profils',
        details: error instanceof Error ? error.message : 'Unbekannter Fehler'
      }, { status: 500 });
    }

  } catch (error) {
    // Strukturierte Fehlermeldung
    let errorDetails = 'Unbekannter Fehler';
    
    if (error instanceof Error) {
      errorDetails = error.message;
      // Optional: Log für Debugging
      console.log('API Error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }

    const errorResponse = {
      error: 'Fehler beim Erstellen des Profils',
      details: errorDetails
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Benutzer ID erforderlich' }, { status: 400 });
    }

    const profile = await prisma.escortProfil.findMany({
      where: {
        OR: [
          { escortUserId: userId },
          { agenturUserId: userId }
        ]
      }
    });

    return NextResponse.json(profile);

  } catch (error) {
    // Strukturierte Fehlermeldung
    let errorDetails = 'Unbekannter Fehler';
    
    if (error instanceof Error) {
      errorDetails = error.message;
      // Optional: Log für Debugging
      console.log('API Error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }

    const errorResponse = {
      error: 'Interner Serverfehler',
      details: errorDetails
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
