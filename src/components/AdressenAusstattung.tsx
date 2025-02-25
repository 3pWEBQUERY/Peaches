import { Button } from '@/components/ui/button';

interface AdressenAusstattungProps {
  infrastructure: string[];
  onInfrastructureChange: (newInfrastructure: string[]) => void;
}

export function AdressenAusstattung({ infrastructure, onInfrastructureChange }: AdressenAusstattungProps) {
  const toggleInfrastructure = (value: string) => {
    const newInfrastructure = infrastructure?.includes(value)
      ? infrastructure.filter(i => i !== value)
      : [...(infrastructure || []), value];
    onInfrastructureChange(newInfrastructure);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Grundausstattung</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('wifi') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('wifi')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          <span>WLAN</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('air_conditioning') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('air_conditioning')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Klimaanlage</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('heating') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('heating')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10a7 7 0 0114 0v4a7 7 0 11-14 0v-4z" />
          </svg>
          <span>Heizung</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('elevator') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('elevator')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span>Aufzug</span>
        </Button>
      </div>

      <h3 className="text-lg font-medium">Sanitäranlagen</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('restrooms') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('restrooms')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
          </svg>
          <span>WC-Anlagen</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('showers') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('showers')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
          </svg>
          <span>Duschen</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('changing_rooms') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('changing_rooms')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Umkleiden</span>
        </Button>
      </div>

      <h3 className="text-lg font-medium">Zusatzausstattung</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('smoking_area') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('smoking_area')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" />
          </svg>
          <span>Raucherbereich</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('kitchen') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('kitchen')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
          </svg>
          <span>Küche/Kochmöglichkeit</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('bar') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('bar')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>Bar</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('stage') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('stage')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Bühne</span>
        </Button>
      </div>

      <h3 className="text-lg font-medium">Medientechnik</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('projector') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('projector')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Beamer/Projektor</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('screen') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('screen')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          <span>Leinwand</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('sound_system') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('sound_system')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          <span>Beschallungsanlage</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('lighting') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('lighting')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 10-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>Beleuchtungsanlage</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('dj_equipment') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('dj_equipment')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" />
          </svg>
          <span>DJ-Equipment</span>
        </Button>
      </div>

      <h3 className="text-lg font-medium">Möblierung</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('tables_chairs') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('tables_chairs')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span>Tische & Stühle</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('lounge_furniture') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('lounge_furniture')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span>Lounge-Möbel</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('stage_elements') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('stage_elements')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span>Bühnenelemente</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('wardrobe') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('wardrobe')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span>Garderobe</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('counter') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('counter')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span>Theke/Empfang</span>
        </Button>
      </div>

      <h3 className="text-lg font-medium">Technik & Sicherheit</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('emergency_power') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('emergency_power')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Notstromversorgung</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('first_aid') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('first_aid')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Erste-Hilfe-Ausrüstung</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('fire_extinguisher') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('fire_extinguisher')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
          <span>Feuerlöscher</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('emergency_exits') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('emergency_exits')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span>Notausgänge</span>
        </Button>
        <Button
          variant="outline"
          className={`justify-start space-x-2 ${
            infrastructure?.includes('smoke_detectors') ? 'bg-[hsl(333.3,71.4%,95%)] border-[hsl(333.3,71.4%,50.6%)]' : ''
          }`}
          onClick={() => toggleInfrastructure('smoke_detectors')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Rauchmelder</span>
        </Button>
      </div>
    </div>
  );
} 