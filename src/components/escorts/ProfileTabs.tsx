'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { worldCountries } from '@/data/world-countries';
import { languages as languagesList } from '@/data/languages';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import React from 'react';

export interface Price {
  duration: string;
  amount: number;
  currency: string;
}

export interface Contact {
  type: string;
  value: string;
  isPublic: boolean;
  preferredTime?: string | null;
}

interface Location {
  country: string;
  region?: string | null;
  city?: string | null;
  street?: string | null;
  houseNumber?: string | null;
  postalCode?: string | null;
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  images: string[];
}

interface Language {
  code: string;
  level: number;
}

interface ProfileTabsProps {
  id: string;
  displayName: string;
  alter: number | null;
  gender: string | null;
  nationality: string | null;
  languages: Language[];
  height: number | null;
  weight: number | null;
  bodyType: string | null;
  hairColor: string | null;
  hairLength: string | null;
  breastType: string | null;
  breastSize: string | null;
  intimateArea: string | null;
  tattoos: string;
  piercings: string;
  smoking: string | null;
  alcohol: string | null;
  description: string | null;
  galleryImages: string[];
  services: string[];
  prices: Price[];
  contacts: Contact[];
  location: Location;
  posts: Post[];
}

function LanguageFlag({ code }: { code: string }) {
  const getFlagCode = (code: string) => {
    // Spezielle Behandlung für Sprach-/Ländercodes
    switch (code.toLowerCase()) {
      case 'en': return 'gb';  // Englisch -> Großbritannien
      case 'et': return 'ee';  // Estnisch -> Estland
      case 'schweiz': return 'ch';  // Schweiz -> CH
      default: return code.toLowerCase();
    }
  };

  console.log('Flag code:', code, '-> mapped to:', getFlagCode(code)); // Debug-Log

  return (
    <div className="w-6 h-6 rounded-full overflow-hidden shadow-sm bg-gray-50">
      <div className="w-full h-full relative">
        <Image
          src={`/flags/${getFlagCode(code)}.svg`}
          alt={`${code} flag`}
          fill
          className="object-contain"
          sizes="24px"
          priority
        />
      </div>
    </div>
  );
}

export default function ProfileTabs({
  displayName,
  alter,
  gender,
  nationality,
  languages,
  height,
  weight,
  bodyType,
  hairColor,
  hairLength,
  breastType,
  breastSize,
  intimateArea,
  tattoos,
  piercings,
  smoking,
  alcohol,
  description,
  galleryImages,
  services,
  prices,
  location,
  posts
}: ProfileTabsProps) {
  console.log('ProfileTabs props:', { displayName, alter, gender, nationality });
  console.log('Services:', services); // Debug-Log für Services
  
  const [selectedTab, setSelectedTab] = useState('grundinformationen');

  const getCountryName = (code: string): string => {
    for (const continent of worldCountries) {
      const country = continent.countries.find(
        (country) => country.code === code.toUpperCase()
      );
      if (country) {
        return country.name;
      }
    }
    return code;
  };

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
      <TabsList className="grid grid-cols-6 gap-4 bg-white h-auto p-0 rounded-lg">
        <TabsTrigger
          value="grundinformationen"
          className="hover:bg-[hsl(333.3,71.4%,50.6%)] hover:text-white data-[state=active]:bg-[hsl(333.3,71.4%,50.6%)] data-[state=active]:text-white"
        >
          Grundinformationen
        </TabsTrigger>
        <TabsTrigger
          value="galerie"
          className="hover:bg-[hsl(333.3,71.4%,50.6%)] hover:text-white data-[state=active]:bg-[hsl(333.3,71.4%,50.6%)] data-[state=active]:text-white"
        >
          Galerie
        </TabsTrigger>
        <TabsTrigger
          value="services"
          className="hover:bg-[hsl(333.3,71.4%,50.6%)] hover:text-white data-[state=active]:bg-[hsl(333.3,71.4%,50.6%)] data-[state=active]:text-white"
        >
          Services
        </TabsTrigger>
        <TabsTrigger
          value="preise"
          className="hover:bg-[hsl(333.3,71.4%,50.6%)] hover:text-white data-[state=active]:bg-[hsl(333.3,71.4%,50.6%)] data-[state=active]:text-white"
        >
          Preise
        </TabsTrigger>
        <TabsTrigger
          value="standort"
          className="hover:bg-[hsl(333.3,71.4%,50.6%)] hover:text-white data-[state=active]:bg-[hsl(333.3,71.4%,50.6%)] data-[state=active]:text-white"
        >
          Standort
        </TabsTrigger>
        <TabsTrigger
          value="beitraege"
          className="hover:bg-[hsl(333.3,71.4%,50.6%)] hover:text-white data-[state=active]:bg-[hsl(333.3,71.4%,50.6%)] data-[state=active]:text-white"
        >
          Beiträge
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="grundinformationen">
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Persönliche Details</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Name</dt>
                    <dd>{displayName}</dd>
                  </div>
                  {alter && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Alter</dt>
                      <dd>{alter} Jahre</dd>
                    </div>
                  )}
                  {gender && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Geschlecht</dt>
                      <dd>{gender}</dd>
                    </div>
                  )}
                  {nationality && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Nationalität</dt>
                      <dd className="flex items-center gap-2">
                        <LanguageFlag code={nationality} />
                        <span>{getCountryName(nationality)}</span>
                      </dd>
                    </div>
                  )}
                  {languages.length > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Sprachen</dt>
                      <dd className="flex flex-col">
                        <div className="grid grid-cols-[24px_auto_100px] gap-x-3 gap-y-3 items-center">
                          {languages.map((lang) => {
                            const languageInfo = languagesList.find(l => l.code === lang.code);
                            if (!languageInfo) return null;
                            
                            return (
                              <React.Fragment key={lang.code}>
                                <LanguageFlag code={lang.code} />
                                <span className="text-right">{languageInfo.name}</span>
                                <span style={{ color: 'hsl(333.3,71.4%,50.6%)' }} className="text-right">
                                  {"★".repeat(lang.level)}
                                  <span className="opacity-30">{"★".repeat(5 - lang.level)}</span>
                                </span>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Körperliche Merkmale</h3>
                <dl className="space-y-2">
                  {height && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Größe</dt>
                      <dd>{height} cm</dd>
                    </div>
                  )}
                  {weight && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Gewicht</dt>
                      <dd>{weight} kg</dd>
                    </div>
                  )}
                  {bodyType && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Körperbau</dt>
                      <dd>{bodyType}</dd>
                    </div>
                  )}
                  {hairColor && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Haarfarbe</dt>
                      <dd>{hairColor}</dd>
                    </div>
                  )}
                  {hairLength && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Haarlänge</dt>
                      <dd>{hairLength}</dd>
                    </div>
                  )}
                  {breastType && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Brusttyp</dt>
                      <dd>{breastType}</dd>
                    </div>
                  )}
                  {breastSize && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Brustgröße</dt>
                      <dd>{breastSize}</dd>
                    </div>
                  )}
                  {intimateArea && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Intimbereich</dt>
                      <dd>{intimateArea}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Besondere Merkmale</h3>
                <dl className="space-y-2">
                  {tattoos && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Tattoos</dt>
                      <dd>{tattoos}</dd>
                    </div>
                  )}
                  {piercings && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Piercings</dt>
                      <dd>{piercings}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Gewohnheiten</h3>
                <dl className="space-y-2">
                  {smoking && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Rauchen</dt>
                      <dd>{smoking}</dd>
                    </div>
                  )}
                  {alcohol && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Alkohol</dt>
                      <dd>{alcohol}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            {/* Beschreibung als eigener Bereich unter den Details */}
            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-semibold mb-4">Über mich</h3>
              <div className="prose max-w-none">
                {description ? (
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                ) : (
                  <p className="text-gray-500 italic">
                    {displayName} hat noch keine Beschreibung hinzugefügt.
                  </p>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="galerie">
          <Card className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`Bild ${index + 1} von ${displayName}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {Array.isArray(services) && services.length > 0 ? (
                services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-center text-sm hover:border-[hsl(333.3,71.4%,50.6%)] transition-colors"
                  >
                    {service}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic col-span-full">
                  {displayName} hat noch keine Services hinzugefügt.
                </p>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preise">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Preise</h3>
            <dl className="space-y-2 max-w-md">
              {prices.map((price, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <dt className="text-gray-600">{price.duration}</dt>
                  <dd className="font-semibold">
                    {price.amount.toLocaleString('de-DE', {
                      style: 'currency',
                      currency: price.currency
                    })}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </TabsContent>

        <TabsContent value="standort">
          <Card className="p-6">
            <div className="space-y-8">
              {/* Header mit Icon */}
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-10 h-10 rounded-full bg-[hsl(333.3,71.4%,50.6%)] bg-opacity-10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[hsl(333.3,71.4%,50.6%)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Standort</h3>
                  <p className="text-sm text-gray-500">Hier findest du mich</p>
                </div>
              </div>

              {/* Adressdetails in modernem Layout */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Stadt & Region */}
                  <div className="bg-gradient-to-br from-[hsl(333.3,71.4%,50.6%)] to-[hsl(333.3,71.4%,40%)] rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <h4 className="font-medium">Stadt & Region</h4>
                    </div>
                    <p className="text-2xl font-semibold mb-1">{location.city}</p>
                    {location.region && (
                      <p className="text-sm opacity-90">{location.region}</p>
                    )}
                  </div>

                  {/* Land */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <svg
                        className="w-5 h-5 text-[hsl(333.3,71.4%,50.6%)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h4 className="font-medium text-gray-900">Land</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <LanguageFlag code={location.country} />
                      <p className="text-lg text-gray-900">{getCountryName(location.country)}</p>
                    </div>
                  </div>
                </div>

                {/* Detaillierte Adresse */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <svg
                      className="w-5 h-5 text-[hsl(333.3,71.4%,50.6%)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <h4 className="font-medium text-gray-900">Adresse</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Straße & Hausnummer</p>
                      <p className="text-lg text-gray-900">
                        {location.street} {location.houseNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">PLZ & Ort</p>
                      <p className="text-lg text-gray-900">
                        {location.postalCode} {location.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="beitraege">
          <Card className="p-6">
            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <article key={post.id} className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {new Date(post.createdAt).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                    <div className="prose max-w-none mb-4">
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                    {post.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {post.images.map((image, index) => (
                          <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                            <Image
                              src={image}
                              alt={`Bild ${index + 1} zum Beitrag`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                {displayName} hat noch keine Beiträge veröffentlicht.
              </p>
            )}
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
} 