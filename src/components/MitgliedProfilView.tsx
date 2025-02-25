'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '@prisma/client';
import ProfileLayout from '@/components/ProfileLayout';
import Image from 'next/image';

interface MitgliedProfilViewProps {
  user: {
    id: string;
    email: string;
    password: string;
    anzeigename: string | null;
    profilbild: string | null;
    verifiziert: boolean;
    kontotyp: 'MITGLIED';
    views: number;
    createdAt: Date;
    updatedAt: Date;
    followers: User[];
    following: User[];
    likedBy: User[];
    beschreibung?: string;
  };
}

export function MitgliedProfilView({ user }: MitgliedProfilViewProps) {
  // Profildaten für das ProfileLayout
  const profileData = {
    name: user.anzeigename || user.email,
    photosCount: user.likedBy.length || 0,  // Anzahl der Likes
    followersCount: user.followers.length || 0,  // Anzahl der Follower
    description: user.beschreibung || '', // Zeige die Beschreibung an
    profilbild: user.profilbild || '/placeholder-avatar.jpg',
    activity: 'MITGLIED',
    location: '',
    favoriteTags: [
      { name: 'mitglied' }
    ],
    favoriteProfiles: user.followers.slice(0, 3).map(follower => ({
      imageUrl: follower.profilbild || '/placeholder-avatar.jpg',
      alt: follower.anzeigename || 'Follower'
    }))
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
          <Card className="w-full mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Bereich 1: Kontaktinformationen */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[hsl(333.3,71.4%,50.6%)]">Kontakt</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">E-Mail:</span> {user.email}</p>
                  </div>
                </div>

                {/* Bereich 2: Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[hsl(333.3,71.4%,50.6%)]">Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Mitglied seit:</span> {new Date(user.createdAt).toLocaleDateString('de-DE')}</p>
                    <p><span className="font-medium">Verifizierungsstatus:</span> {user.verifiziert ? 'Verifiziert' : 'Nicht verifiziert'}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-[hsl(333.3,71.4%,50.6%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {user.views} Profilaufrufe
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Beschreibung */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold text-[hsl(333.3,71.4%,50.6%)] mb-2">Beschreibung</h3>
                <p className="text-gray-600">{user.beschreibung || 'Keine Beschreibung vorhanden'}</p>
              </div>

              {/* Bereich 3: Aktivitäten */}
              <div className="mt-6 pt-6 border-t space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[hsl(333.3,71.4%,50.6%)] mb-2">Aktivitäten</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Follower Card */}
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-700">Follower</h4>
                        <span className="text-2xl font-bold text-[hsl(333.3,71.4%,50.6%)]">{user.followers.length}</span>
                      </div>
                      <div className="space-y-2">
                        {user.followers.slice(0, 3).map((follower) => (
                          <div key={follower.id} className="flex items-center gap-2">
                            <div className="relative w-8 h-8">
                              <Image
                                src={follower.profilbild || '/placeholder-avatar.jpg'}
                                alt={follower.anzeigename || 'Follower'}
                                fill
                                className="rounded-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-600 truncate">
                              {follower.anzeigename || follower.email}
                            </span>
                          </div>
                        ))}
                        {user.followers.length > 3 && (
                          <p className="text-sm text-gray-500 mt-2">
                            +{user.followers.length - 3} weitere
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Following Card */}
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-700">Following</h4>
                        <span className="text-2xl font-bold text-[hsl(333.3,71.4%,50.6%)]">{user.following.length}</span>
                      </div>
                      <div className="space-y-2">
                        {user.following.slice(0, 3).map((following) => (
                          <div key={following.id} className="flex items-center gap-2">
                            <div className="relative w-8 h-8">
                              <Image
                                src={following.profilbild || '/placeholder-avatar.jpg'}
                                alt={following.anzeigename || 'Following'}
                                fill
                                className="rounded-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-600 truncate">
                              {following.anzeigename || following.email}
                            </span>
                          </div>
                        ))}
                        {user.following.length > 3 && (
                          <p className="text-sm text-gray-500 mt-2">
                            +{user.following.length - 3} weitere
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Likes Card */}
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-700">Likes</h4>
                        <span className="text-2xl font-bold text-[hsl(333.3,71.4%,50.6%)]">{user.likedBy.length}</span>
                      </div>
                      <div className="space-y-2">
                        {user.likedBy.slice(0, 3).map((liker) => (
                          <div key={liker.id} className="flex items-center gap-2">
                            <div className="relative w-8 h-8">
                              <Image
                                src={liker.profilbild || '/placeholder-avatar.jpg'}
                                alt={liker.anzeigename || 'Liker'}
                                fill
                                className="rounded-full object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-600 truncate">
                              {liker.anzeigename || liker.email}
                            </span>
                          </div>
                        ))}
                        {user.likedBy.length > 3 && (
                          <p className="text-sm text-gray-500 mt-2">
                            +{user.likedBy.length - 3} weitere
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 