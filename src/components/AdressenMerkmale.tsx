import { Button } from '@/components/ui/button';

interface AdressenMerkmaleProps {
  infrastructure: string[];
  onInfrastructureChange: (newInfrastructure: string[]) => void;
}

export function AdressenMerkmale({ infrastructure, onInfrastructureChange }: AdressenMerkmaleProps) {
  const toggleInfrastructure = (value: string) => {
    const newInfrastructure = infrastructure?.includes(value)
      ? infrastructure.filter(i => i !== value)
      : [...(infrastructure || []), value];
    onInfrastructureChange(newInfrastructure);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Parkmöglichkeiten</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('parking') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('parking')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Eigene Parkplätze</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('no_parking') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('no_parking')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Keine eigenen Parkplätze</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('public_parking') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('public_parking')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>Öffentliche Parkplätze in der Nähe</span>
        </Button>
      </div>

      <h3 className="text-lg font-medium">Zugänglichkeit</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('disabled_access') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('disabled_access')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Barrierefrei</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('not_disabled_access') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('not_disabled_access')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Nicht Barrierefrei</span>
        </Button>
      </div>

      <h3 className="text-lg font-medium">Verkehrsanbindung</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('public_transport') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('public_transport')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Gute ÖPNV-Anbindung</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('limited_public_transport') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('limited_public_transport')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Eingeschränkte ÖPNV-Anbindung</span>
        </Button>
      </div>

      <h3 className="text-lg font-medium">Lage & Umgebung</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('city_center') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('city_center')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>Zentrale Lage</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('outskirts') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('outskirts')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Außerhalb gelegen</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('residential') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('residential')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Wohngebiet</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('industrial') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('industrial')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>Gewerbegebiet</span>
        </Button>
      </div>

      <h3 className="text-lg font-medium">Lärmschutz & Nachbarschaft</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('soundproof') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('soundproof')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Schallisoliert</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('no_direct_neighbors') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('no_direct_neighbors')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Keine direkten Nachbarn</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('noise_restrictions') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('noise_restrictions')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Lärmschutzauflagen</span>
        </Button>
      </div>

      <h3 className="text-lg font-medium">Sicherheit</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('security_service') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('security_service')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Sicherheitsdienst</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('video_surveillance') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('video_surveillance')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Videoüberwachung</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('alarm_system') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('alarm_system')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span>Alarmanlage</span>
        </Button>
      </div>
    </div>
  );
} 