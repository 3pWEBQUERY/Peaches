import Sidebar from '@/components/Sidebar';
import PhotoFeed from '@/components/PhotoFeed';
import { KontotypUpdate } from '@/components/KontotypUpdate';
import ProfileLayout from '@/components/ProfileLayout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
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

  const profileData = {
    name: user.anzeigename || 'Unnamed User',
    photosCount: user.likedBy.length, // Anzahl der erhaltenen Likes
    followersCount: user.followers.length,
    description: 'No description provided',
    profilbild: user.profilbild || '/placeholder-avatar.jpg',
    favoriteTags: [
      { name: 'instadaily' },
      { name: 'photooftheday' },
      { name: 'photography' },
      { name: 'nature' },
      { name: 'landscape' },
    ],
    activity: user.kontotyp,
    location: 'Paris, France', // TODO: Add location to user model
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
          <div className="mb-8">
            <KontotypUpdate />
          </div>
          <PhotoFeed />
        </div>
      </main>
    </div>
  );
}
