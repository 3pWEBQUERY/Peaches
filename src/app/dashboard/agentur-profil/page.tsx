import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AgenturProfilClient } from '@/components/AgenturProfilClient';

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

  // Überprüfe ob der Benutzer eine Agentur ist
  if (user.kontotyp !== 'AGENTUR') {
    redirect('/dashboard');
  }

  return user;
}

// Default export - Server Component
export default async function AgenturProfilPage() {
  await getProfileData(); // This will handle authentication and redirects
  return <AgenturProfilClient />;
}
