'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { TabMenu } from '@/components/TabMenu';
import { Card, CardContent } from '@/components/ui/card';
import { User, AgenturProfil } from '@prisma/client';
import ProfileLayout from '@/components/ProfileLayout';

interface AgenturProfilViewProps {
  user: {
    id: string;
    email: string;
    password: string;
    anzeigename: string | null;
    profilbild: string | null;
    verifiziert: boolean;
    kontotyp: 'AGENTUR';
    views: number;
    createdAt: Date;
    updatedAt: Date;
    agenturProfil: AgenturProfil & {
      openingHours: {
        day: string;
        open: boolean;
        from: string;
        to: string;
      }[];
    };
    followers: User[];
    following: User[];
    likedBy: User[];
  };
}

export function AgenturProfilView({ user }: AgenturProfilViewProps) {
  const [activeTab, setActiveTab] = useState("Grundinformationen");
  const profile = user.agenturProfil;
  const contacts = profile.contacts as { type: string; value: string }[];

  // Infrastruktur-Übersetzungen
  const infrastrukturUebersetzungen: { [key: string]: string } = {
    // Parkmöglichkeiten
    'parking': 'Eigene Parkplätze',
    'no_parking': 'Keine eigenen Parkplätze',
    'public_parking': 'Öffentliche Parkplätze in der Nähe',
    
    // Zugänglichkeit
    'disabled_access': 'Barrierefrei',
    'not_disabled_access': 'Nicht Barrierefrei',
    
    // Verkehrsanbindung
    'public_transport': 'Gute ÖPNV-Anbindung',
    'limited_public_transport': 'Eingeschränkte ÖPNV-Anbindung',
    
    // Lage & Umgebung
    'city_center': 'Zentrale Lage',
    'outskirts': 'Außerhalb gelegen',
    'residential': 'Wohngebiet',
    'industrial': 'Gewerbegebiet',
    
    // Lärmschutz & Nachbarschaft
    'soundproof': 'Schallisoliert',
    'no_direct_neighbors': 'Keine direkten Nachbarn',
    'noise_restrictions': 'Lärmschutzauflagen',
    
    // Sicherheit
    'security_service': 'Sicherheitsdienst',
    'video_surveillance': 'Videoüberwachung',
    'alarm_system': 'Alarmanlage',

    // Ausstattung
    'equipment': 'Ausstattung',
    'features': 'Merkmale',
    'first_aid': 'Erste-Hilfe-Ausrüstung',
    'emergency_power': 'Notstromversorgung',
    'lounge_furniture': 'Lounge-Möbel',
    'showers': 'Duschen',
    'wifi': 'WLAN',
    'tables_chairs': 'Tische und Stühle',
    'restrooms': 'Sanitäranlagen',
    'lighting': 'Beleuchtungsanlage',
    'heating': 'Heizung',
    'emergency_exits': 'Notausgänge',
    'counter': 'Empfangstheke',
    'air_conditioning': 'Klimaanlage',
    'bar': 'Bar',
    'smoking_area': 'Raucherbereich',
    'sound_system': 'Soundanlage'
  };

  // Formatiere die Öffnungszeiten
  const formattedOpeningHours = profile.openingHours.map((hour) => ({
    day: hour.day,
    hours: hour.open ? `${hour.from} - ${hour.to}` : 'Geschlossen'
  }));

  // Profildaten für das ProfileLayout
  const profileData = {
    name: profile.name,
    photosCount: user.likedBy.length || 0,
    followersCount: user.followers.length || 0,
    description: profile.description || '',
    profilbild: profile.logo || '/placeholder-avatar.jpg',
    activity: 'AGENTUR',
    location: `${profile.city || ''}, ${profile.country || ''}`,
    favoriteTags: [
      { name: 'agentur' },
      { name: 'club' },
      { name: 'studio' }
    ],
    favoriteProfiles: user.followers.slice(0, 3).map(follower => ({
      imageUrl: follower.profilbild || '/placeholder-avatar.jpg',
      alt: follower.anzeigename || 'Follower'
    })),
    openingHours: formattedOpeningHours
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
                    <p><span className="font-medium">E-Mail:</span> {profile.email}</p>
                    {profile.website && (
                      <p><span className="font-medium">Website:</span> {profile.website}</p>
                    )}
                    {contacts.map((contact, index) => (
                      <p key={index}>
                        <span className="font-medium">{contact.type}:</span> {contact.value}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Bereich 2: Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[hsl(333.3,71.4%,50.6%)]">Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Adresse:</span> {profile.address}</p>
                    <p><span className="font-medium">PLZ/Ort:</span> {profile.plz} {profile.city}</p>
                    <p><span className="font-medium">Land:</span> {profile.country}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-[hsl(333.3,71.4%,50.6%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {profile.images?.length || 0} Bilder
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-[hsl(333.3,71.4%,50.6%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {profile.videos?.length || 0} Videos
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Beschreibung und Infrastruktur */}
              <div className="mt-6 pt-6 border-t space-y-6">
                {/* Beschreibung */}
                <div>
                  <h3 className="text-lg font-semibold text-[hsl(333.3,71.4%,50.6%)] mb-2">Beschreibung</h3>
                  <p className="text-gray-600 line-clamp-3">{profile.description || 'Keine Beschreibung vorhanden'}</p>
                </div>

                {/* Infrastruktur */}
                {profile.infrastructure && profile.infrastructure.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[hsl(333.3,71.4%,50.6%)] mb-2">Infrastruktur</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {profile.infrastructure.sort().map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-600">
                          <svg className="h-5 w-5 text-[hsl(333.3,71.4%,50.6%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{infrastrukturUebersetzungen[item] || item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 