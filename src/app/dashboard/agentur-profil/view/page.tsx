import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AgenturProfilView } from '@/components/AgenturProfilView';
import { User, Follow, Like, AgenturProfil, Prisma } from '@prisma/client';

interface UserWithRelations extends User {
  agenturProfil: (AgenturProfil & {
    openingHours: string;
  }) | null;
  followers: (Follow & { follower: User })[];
  following: (Follow & { following: User })[];
  likedBy: (Like & { fromUser: User })[];
}

interface OpeningHour {
  day: string;
  open: boolean;
  from: string;
  to: string;
}

// Server Component
async function getProfileData() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      agenturProfil: true,
      followers: {
        include: {
          follower: true
        }
      },
      following: {
        include: {
          following: true
        }
      },
      likedBy: {
        include: {
          fromUser: true
        }
      },
    },
  }) as UserWithRelations | null;

  if (!user) {
    redirect('/login');
  }

  // Überprüfe ob der Benutzer eine Agentur ist
  if (user.kontotyp !== 'AGENTUR') {
    redirect('/dashboard');
  }

  if (!user.agenturProfil) {
    redirect('/dashboard/agentur-profil');
  }

  // Parse die Öffnungszeiten aus dem JSON-String
  let openingHours: OpeningHour[] = [];
  try {
    if (typeof user.agenturProfil.openingHours === 'string') {
      const parsedHours = JSON.parse(user.agenturProfil.openingHours);
      // Konvertiere das Array-Format in das erwartete Format
      openingHours = parsedHours.map((hour: any) => ({
        day: hour.day,
        open: Boolean(hour.open),
        from: hour.from,
        to: hour.to
      }));
    } else {
      // Wenn es bereits ein Array ist, verwende es direkt
      openingHours = user.agenturProfil.openingHours as unknown as OpeningHour[];
    }
  } catch (error) {
    console.error('Fehler beim Parsen der Öffnungszeiten:', error, 'Rohdaten:', user.agenturProfil.openingHours);
    // Fallback zu Standardöffnungszeiten
    openingHours = [
      { day: 'Montag', open: false, from: '09:00', to: '18:00' },
      { day: 'Dienstag', open: false, from: '09:00', to: '18:00' },
      { day: 'Mittwoch', open: false, from: '09:00', to: '18:00' },
      { day: 'Donnerstag', open: false, from: '09:00', to: '18:00' },
      { day: 'Freitag', open: false, from: '09:00', to: '18:00' },
      { day: 'Samstag', open: false, from: '09:00', to: '18:00' },
      { day: 'Sonntag', open: false, from: '09:00', to: '18:00' }
    ];
  }

  // Stelle sicher, dass die Öffnungszeiten im richtigen Format sind
  const formattedOpeningHours = openingHours.map(hour => ({
    day: hour.day,
    open: Boolean(hour.open),
    from: hour.from || '09:00',
    to: hour.to || '18:00'
  }));

  // Transformiere die Daten in das erwartete Format
  return {
    ...user,
    kontotyp: 'AGENTUR' as const,
    agenturProfil: {
      ...user.agenturProfil,
      openingHours: formattedOpeningHours
    },
    followers: user.followers.map(f => f.follower),
    following: user.following.map(f => f.following),
    likedBy: user.likedBy.map(l => l.fromUser)
  };
}

// Default export - Server Component
export default async function AgenturProfilViewPage() {
  const user = await getProfileData();
  return <AgenturProfilView user={user} />;
} 