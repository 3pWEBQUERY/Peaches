import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ImageCarousel from "@/components/escorts/ImageCarousel";
import ProfileHeader from "@/components/escorts/ProfileHeader";
import InfoBar from "@/components/escorts/InfoBar";
import ActionButtons from "@/components/escorts/ActionButtons";
import ProfileTabs from '@/components/escorts/ProfileTabs';
import ContactButtons from '@/components/escorts/ContactButtons';
import EscortHeader from '@/components/escorts/EscortHeader';
import EscortFooter from '@/components/escorts/EscortFooter';
import Image from "next/image";
import type { Contact, Price } from '@/components/escorts/ProfileTabs';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

// Diese Funktion löst die params auf und stellt die Metadaten bereit
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const profile = await getEscortData(slug);
  
  if (!profile) {
    return {
      title: 'Profil nicht gefunden',
      description: 'Das angeforderte Profil konnte nicht gefunden werden.'
    };
  }

  return {
    title: `${profile.name} | Peach Escort`,
    description: profile.slogan || `Profil von ${profile.name}`,
  };
}

async function getEscortData(slug: string) {
  try {
    // Extrahiere die ID aus dem Slug (letzte 6 Zeichen)
    const id = slug.slice(-6);
    
    // Hole das Profil aus der Datenbank
    const profile = await prisma.escortProfil.findFirst({
      where: {
        id: {
          endsWith: id
        }
      },
      include: {
        escortUser: {
          select: {
            id: true,
            verifiziert: true
          }
        }
      }
    });

    if (!profile) {
      return null;
    }

    // Überprüfe, ob der Slug korrekt ist
    const expectedSlug = profile.künstlername
      .toLowerCase()
      .replace(/[äöüß]/g, match => ({
        'ä': 'ae',
        'ö': 'oe',
        'ü': 'ue',
        'ß': 'ss'
      })[match] || match)
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '-' + id;

    if (slug !== expectedSlug) {
      return null;
    }

    return {
      id: profile.id,
      name: profile.künstlername,
      slogan: profile.slogan || "",
      beschreibung: profile.beschreibung,
      alter: profile.alter,
      nationalität: profile.nationalität,
      sprachen: profile.sprachen as any[],
      größe: profile.größe,
      gewicht: profile.gewicht,
      koerperbau: profile.koerperbau,
      haarfarbe: profile.haarfarbe,
      haarlaenge: profile.haarlaenge,
      brusttyp: profile.brusttyp,
      brustgroesse: profile.brustgroesse,
      intimbereich: profile.intimbereich,
      tattoos: profile.tattoos,
      piercings: profile.piercings,
      rauchen: profile.rauchen,
      alkohol: profile.alkohol,
      bilder: profile.bilder,
      anzeigebild: profile.anzeigebild,
      services: typeof profile.services === 'string' ? JSON.parse(profile.services) : profile.services,
      stundensatz: profile.stundensatz,
      zwei_stunden: profile.zwei_stunden,
      drei_stunden: profile.drei_stunden,
      uebernachtung: profile.uebernachtung,
      strasse: profile.strasse,
      hausnummer: profile.hausnummer,
      plz: profile.plz,
      ort: profile.ort,
      bundesland: profile.bundesland,
      land: profile.land,
      telefon: profile.telefon,
      whatsapp: profile.whatsapp,
      telegram: profile.telegram,
      signal: profile.signal,
      email: profile.email,
      website: profile.website,
      userId: profile.escortUser?.id,
      verified: profile.escortUser?.verifiziert || false,
      updatedAt: profile.updatedAt,
    };
  } catch (error) {
    console.error('Fehler beim Laden des Profils:', error);
    return null;
  }
}

export default async function EscortProfilePage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const profile = await getEscortData(slug);
  
  if (!profile) {
    notFound();
  }

  console.log('Profile data:', {
    name: profile.name,
    alter: profile.alter,
    nationality: profile.nationalität,
    services: profile.services
  });

  // Kontakte korrekt typisieren und filtern
  const contacts = [
    profile.telefon ? { type: 'phone', value: profile.telefon, isPublic: true } : null,
    profile.whatsapp ? { type: 'whatsapp', value: profile.whatsapp, isPublic: true } : null,
    profile.website ? { type: 'website', value: profile.website, isPublic: true } : null
  ].filter((contact): contact is Contact => contact !== null);

  // Preise korrekt typisieren und filtern
  const prices = [
    { duration: '1 Stunde', amount: profile.stundensatz, currency: 'EUR' },
    profile.zwei_stunden ? { duration: '2 Stunden', amount: profile.zwei_stunden, currency: 'EUR' } : null,
    profile.drei_stunden ? { duration: '3 Stunden', amount: profile.drei_stunden, currency: 'EUR' } : null,
    profile.uebernachtung ? { duration: 'Übernachtung', amount: profile.uebernachtung, currency: 'EUR' } : null
  ].filter((price): price is Price => price !== null);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full">
        <EscortHeader />
      </div>
      <main className="flex-1 bg-gradient-to-b from-[hsl(355.7,100%,97.3%)] to-white">
        <div className="relative pt-[64px]">
          <ImageCarousel images={profile.bilder} />
          
          <div className="absolute bottom-0 left-0 right-0 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end">
                <ProfileHeader
                  name={profile.name}
                  slogan={profile.slogan}
                />
                <ActionButtons 
                  escortId={profile.id}
                  escortName={profile.name}
                  userId={profile.userId}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 sm:px-6 lg:px-8">
          <InfoBar
            nationality={profile.nationalität || ""}
            updatedAt={profile.updatedAt}
            lastOnline={profile.updatedAt}
            responseTime="13 Stunden"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="lg:flex lg:gap-8 relative">
            {/* Linke Spalte - 25% */}
            <div className="lg:w-1/4 lg:block">
              <div className="lg:sticky lg:top-24">
                <div className="overflow-hidden bg-white rounded-lg shadow-sm">
                  {/* Anzeigebild */}
                  <div className="relative aspect-[3/4] rounded-t-lg overflow-hidden">
                    <Image
                      src={profile.anzeigebild || profile.bilder[0] || '/default-profile.jpg'}
                      alt={profile.name}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Medien-Counter */}
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      {profile.bilder.length > 0 && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md text-white text-sm font-medium">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{profile.bilder.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Kontakt-Buttons */}
                  <div>
                    <ContactButtons 
                      contacts={contacts}
                      escortId={profile.id}
                      displayName={profile.name}
                      userId={profile.userId}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rechte Spalte - 75% */}
            <div className="lg:w-3/4">
              <ProfileTabs 
                id={profile.id}
                displayName={profile.name}
                alter={profile.alter}
                gender={null}
                nationality={profile.nationalität}
                languages={profile.sprachen}
                height={profile.größe}
                weight={profile.gewicht}
                bodyType={profile.koerperbau}
                hairColor={profile.haarfarbe}
                hairLength={profile.haarlaenge}
                breastType={profile.brusttyp}
                breastSize={profile.brustgroesse}
                intimateArea={profile.intimbereich}
                tattoos={profile.tattoos.join(', ')}
                piercings={profile.piercings.join(', ')}
                smoking={profile.rauchen}
                alcohol={profile.alkohol}
                description={profile.beschreibung}
                galleryImages={profile.bilder}
                services={profile.services || []}
                prices={prices}
                contacts={contacts}
                location={{
                  country: profile.land || 'DE',
                  region: profile.bundesland,
                  city: profile.ort,
                  street: profile.strasse,
                  houseNumber: profile.hausnummer,
                  postalCode: profile.plz
                }}
                posts={[]}
              />
            </div>
          </div>
        </div>
      </main>
      <div className="mt-24"></div>
      <EscortFooter />
    </div>
  );
} 