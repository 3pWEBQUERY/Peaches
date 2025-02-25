import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ProfileLayout from '@/components/ProfileLayout';

// Server Component
async function getEscortProfiles() {
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
      escortProfil: true,
    },
  });

  if (!user) {
    redirect('/login');
  }

  // Überprüfe ob der Benutzer eine Agentur ist
  if (user.kontotyp !== 'AGENTUR' && user.kontotyp !== 'ESCORT') {
    redirect('/dashboard');
  }

  // Hole die Profile basierend auf dem Kontotyp
  const profiles = await prisma.escortProfil.findMany({
    where: user.kontotyp === 'AGENTUR' 
      ? { agenturUserId: user.id }
      : { escortUserId: user.id },
    include: {
      escortUser: true,
      agenturUser: true,
    }
  });

  return { user, profiles };
}

// Default export - Server Component
export default async function EscortProfilesPage() {
  const { user, profiles } = await getEscortProfiles();

  const profileData = {
    name: user.anzeigename || 'Unnamed User',
    photosCount: user.likedBy.length,
    followersCount: user.followers.length,
    description: user.beschreibung || 'No description provided',
    profilbild: user.profilbild || '/placeholder-avatar.jpg',
    favoriteTags: [
      { name: 'escort' },
      { name: 'profile' },
      { name: 'service' },
      { name: 'luxury' },
      { name: 'vip' },
    ],
    activity: user.kontotyp,
    location: user.escortProfil?.ort ? `${user.escortProfil.ort}, ${user.escortProfil.land || ''}` : 'Keine Angabe',
    favoriteProfiles: [
      { imageUrl: '/placeholder-avatar.jpg', alt: 'Profile 1' },
      { imageUrl: '/placeholder-avatar.jpg', alt: 'Profile 2' },
      { imageUrl: '/placeholder-avatar.jpg', alt: 'Profile 3' },
      { imageUrl: '/placeholder-avatar.jpg', alt: 'Profile 4' },
      { imageUrl: '/placeholder-avatar.jpg', alt: 'Profile 5' },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      {/* Profile Layout direkt neben der Sidebar */}
      <div className="w-[400px] border-r border-gray-200 bg-white h-screen overflow-y-auto">
        <ProfileLayout {...profileData} />
      </div>
      
      <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-[hsl(333.3,71.4%,50.6%)]">
            Escort Profile
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <Card key={profile.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/dashboard/escort-profil/${profile.id}`}>
                  <div className="relative h-48">
                    {profile.anzeigebild ? (
                      <Image
                        src={profile.anzeigebild}
                        alt={profile.künstlername}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Kein Bild</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{profile.künstlername}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{profile.alter} Jahre • {profile.nationalität || 'Keine Angabe'}</p>
                      <p>{profile.ort || 'Keine Angabe'}, {profile.land || 'Keine Angabe'}</p>
                      <p className="font-medium text-[hsl(333.3,71.4%,50.6%)]">
                        Ab {profile.stundensatz} {profile.standardCurrency}
                      </p>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}

            {/* "Neues Profil erstellen" Karte */}
            <Link href="/dashboard/escort-profil">
              <Card className="h-full flex items-center justify-center p-6 border-2 border-dashed border-gray-300 hover:border-[hsl(333.3,71.4%,50.6%)] hover:text-[hsl(333.3,71.4%,50.6%)] transition-colors">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="font-medium">Neues Profil erstellen</span>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 