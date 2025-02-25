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
  activity: string;
  location: string;
  favoriteTags: { name: string }[];
  favoriteProfiles: { imageUrl: string; alt: string }[];
  openingHours: {
    day: string;
    hours: string;
  }[];
}

const TagBadge = ({ name }: { name: string }) => (
  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer">
    {name}
  </span>
);

export default function ProfileLayout({
  name,
  photosCount,
  followersCount,
  description,
  profilbild,
  favoriteTags,
  activity,
  location,
  favoriteProfiles,
  openingHours,
}: ProfileLayoutProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 space-y-6">
        {/* Profilbild und Name */}
        <div className="space-y-4 mt-8">
          <div className="relative w-full aspect-square">
            <img
              src={profilbild}
              alt={name}
              className="w-full h-full object-cover rounded-lg border-2 border-white shadow-lg"
            />
            <div className="absolute bottom-3 right-3 bg-[hsl(333.3,71.4%,50.6%)] rounded-full p-2 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
            <p className="text-base text-gray-600 mt-1">{activity}</p>
          </div>
        </div>

        {/* Statistiken */}
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-2xl font-semibold text-[hsl(333.3,71.4%,50.6%)]">{photosCount}</p>
            <p className="text-sm text-gray-600">Likes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-[hsl(333.3,71.4%,50.6%)]">{followersCount}</p>
            <p className="text-sm text-gray-600">Follower</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-[hsl(333.3,71.4%,50.6%)]">0</p>
            <p className="text-sm text-gray-600">Bewertungen</p>
          </div>
        </div>

        {/* Standort */}
        {location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="h-5 w-5 text-[hsl(333.3,71.4%,50.6%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
        )}

        {/* Tags */}
        {favoriteTags && favoriteTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {favoriteTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[hsl(333.3,71.4%,50.6%)] bg-opacity-10 text-[hsl(333.3,71.4%,50.6%)] rounded-full text-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Favorite Profiles */}
        {favoriteProfiles && favoriteProfiles.length > 0 && (
          <div className="pt-6 border-t">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Follower</h2>
            <div className="flex -space-x-2">
              {favoriteProfiles.map((profile, index) => (
                <img
                  key={index}
                  src={profile.imageUrl}
                  alt={profile.alt}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
          </div>
        )}

        {/* Öffnungszeiten */}
        {openingHours && openingHours.length > 0 && (
          <div className="pt-6 border-t">
            <div className="flex items-center gap-2 mb-4">
              <svg className="h-5 w-5 text-[hsl(333.3,71.4%,50.6%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-sm font-semibold text-gray-900">Öffnungszeiten</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2.5">
                {openingHours.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700 min-w-[100px]">{item.day}</span>
                    <span className={`flex-1 text-right ${item.hours === 'Geschlossen' ? 'text-red-500' : 'text-[hsl(333.3,71.4%,50.6%)]'}`}>
                      {item.hours === 'Geschlossen' ? (
                        <span className="inline-flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {item.hours}
                        </span>
                      ) : (
                        <span className="inline-flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {item.hours}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
