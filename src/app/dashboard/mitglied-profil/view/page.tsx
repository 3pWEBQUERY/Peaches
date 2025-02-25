import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { MitgliedProfilView } from '@/components/MitgliedProfilView';

// Server Component
async function getProfileData() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
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
      }
    }
  });

  if (!user) {
    redirect('/login');
  }

  // Überprüfe ob der Benutzer ein Mitglied ist
  if (user.kontotyp !== 'MITGLIED') {
    redirect('/dashboard');
  }

  // Transformiere die Daten in das erwartete Format
  return {
    ...user,
    kontotyp: 'MITGLIED' as const,
    followers: user.followers.map(f => f.follower),
    following: user.following.map(f => f.following),
    likedBy: user.likedBy.map(l => l.fromUser),
    beschreibung: user.beschreibung || undefined
  };
}

// Default export - Server Component
export default async function MitgliedProfilViewPage() {
  const user = await getProfileData();
  return <MitgliedProfilView user={user} />;
} 