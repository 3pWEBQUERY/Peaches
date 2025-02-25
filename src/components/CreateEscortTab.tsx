'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Tag {
  name: string;
}

interface FavoriteProfile {
  imageUrl: string;
  alt: string;
}

interface ProfileLayoutProps {
  name: string;
  photosCount: number;
  followersCount: number;
  description: string;
  profilbild: string;
  favoriteTags: Tag[];
  activity: string;
  location: string;
  favoriteProfiles: FavoriteProfile[];
}

const TagBadge = ({ name }: { name: string }) => (
  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer">
    {name}
  </span>
);

export default function ProfileLayout({
  name = 'Vorschau',
  photosCount = 0,
  followersCount = 0,
  description = 'Keine Beschreibung verfügbar',
  profilbild = '/placeholder.jpg',
  favoriteTags = [],
  activity = 'Offline',
  location = 'Nicht angegeben',
  favoriteProfiles = [],
}: Partial<ProfileLayoutProps>) {
  return (
    <div className="max-w-md bg-white">
      {/* Header Bereich - leer, aber mit gleicher Höhe */}
      <div className="h-[72px] border-b border-gray-200">
      </div>

      {/* Profilbild und Basisinfo */}
      <div className="relative">
        <div className="aspect-square relative overflow-hidden rounded-lg m-4">
          <Image
            src={profilbild}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Profilinfo */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">{name}</h1>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600">{photosCount} Likes</span>
            <span className="text-gray-300 mx-2">•</span>
            <span className="text-sm text-gray-600">{followersCount} Follower</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6">{description}</p>

        {/* Favorite Tags */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Beliebte Tags</h2>
          <div className="flex flex-wrap gap-2">
            {favoriteTags.map((tag, index) => (
              <TagBadge key={index} name={tag.name} />
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Aktivität</h2>
          <p className="text-sm text-gray-600">{activity}</p>
        </div>

        {/* Location */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Standort</h2>
          <p className="text-sm text-gray-600">{location}</p>
        </div>

        {/* Favorite Profiles */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Beliebte Profile</h2>
          <div className="flex gap-2">
            {favoriteProfiles.map((profile, index) => (
              <div key={index} className="w-12 h-12 relative rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
                <Image
                  src={profile.imageUrl}
                  alt={profile.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
