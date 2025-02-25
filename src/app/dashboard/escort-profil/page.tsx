import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { EscortProfilClient } from '../../../components/EscortProfilClient';
import { headers } from 'next/headers';

// Server Component
async function getProfileData() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      followers: true,
      following: true,
      likedBy: true,
    },
  });

  if (!user) {
    redirect('/login');
  }

  // Überprüfe ob der Benutzer ein Escort oder eine Agentur ist
  if (user.kontotyp !== 'ESCORT' && user.kontotyp !== 'AGENTUR') {
    redirect('/dashboard');
  }

  // Prüfe ob der Benutzer bereits ein Profil hat
  const existingProfile = await prisma.escortProfil.findFirst({
    where: {
      OR: [
        { escortUserId: user.id },
        { agenturUserId: user.id }
      ]
    }
  });

  if (existingProfile && user.kontotyp === 'ESCORT') {
    redirect('/dashboard/escort-profil/view');
  }

  return user;
}

// Default export - Server Component
export default async function EscortProfilPage() {
  await getProfileData(); // This will handle authentication and redirects
  return <EscortProfilClient />;
}
