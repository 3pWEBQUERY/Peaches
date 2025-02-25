import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'Keine Datei hochgeladen' }, { status: 400 });
    }

    // Überprüfe Dateityp
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'video/webm'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Nicht unterstütztes Dateiformat' 
      }, { status: 400 });
    }

    // Überprüfe Dateigröße
    const maxSize = file.type.startsWith('video') ? 250 * 1024 * 1024 : 10 * 1024 * 1024; // 250MB für Videos, 10MB für Bilder
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'Datei zu groß' 
      }, { status: 400 });
    }

    // Generiere eindeutigen Dateinamen
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Bestimme den Dateityp und erstelle den entsprechenden Ordner
    const isVideo = file.type.startsWith('video');
    const mediaType = isVideo ? 'videos' : 'images';
    const fileName = `${randomUUID()}.${file.type.split('/')[1]}`;
    
    // Erstelle die Ordnerstruktur
    const mediaDir = join(process.cwd(), 'public', 'uploads', mediaType);
    const filePath = join(mediaDir, fileName);
    
    // Speichere die Datei
    await writeFile(filePath, buffer);
    
    // Gib die URL zurück
    const url = `/uploads/${mediaType}/${fileName}`;

    return NextResponse.json({ url });

  } catch (error) {
    console.error('Fehler beim Hochladen:', error);
    return NextResponse.json({ 
      error: 'Fehler beim Hochladen der Datei' 
    }, { status: 500 });
  }
}
