'use client';

import { AdressenMerkmale } from '@/components/AdressenMerkmale';
import { AdressenAusstattung } from '@/components/AdressenAusstattung';
import { AgenturFormData } from '@/types/agentur';
import { Button } from '@/components/ui/button';

interface InfrastrukturTabProps {
  formData: AgenturFormData;
  setFormData: React.Dispatch<React.SetStateAction<AgenturFormData>>;
  onTabChange: (tab: string) => void;
}

export function InfrastrukturTab({ formData, setFormData, onTabChange }: InfrastrukturTabProps) {
  // Standardmäßig 'features' aktiv, wenn keine Auswahl getroffen wurde
  const activeSection = formData.infrastructure?.includes('equipment') ? 'equipment' : 'features';

  const handleInfrastructureChange = (newInfrastructure: string[]) => {
    setFormData(prevData => ({
      ...prevData,
      infrastructure: newInfrastructure
    }));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
            Infrastruktur
          </h2>
          <p className="text-sm text-gray-600 pb-4">
            Wählen Sie die Merkmale und Ausstattung Ihres Unternehmens aus, um potentiellen Kunden einen besseren Überblick zu geben.
          </p>
        </div>

        {/* Infrastruktur Tabs */}
        <div className="space-y-6">
          <div className="flex space-x-4 border-b">
            <button
              className={`pb-2 text-sm font-medium ${
                activeSection === 'features'
                ? 'text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)]'
                : 'text-gray-500 hover:text-[hsl(333.3,71.4%,50.6%)]'
              }`}
              onClick={() => {
                const newInfrastructure = (formData.infrastructure || []).filter(i => i !== 'equipment');
                handleInfrastructureChange(newInfrastructure);
              }}
            >
              Adressen-Merkmale
            </button>
            <button
              className={`pb-2 text-sm font-medium ${
                activeSection === 'equipment'
                ? 'text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)]' 
                : 'text-gray-500 hover:text-[hsl(333.3,71.4%,50.6%)]'
              }`}
              onClick={() => {
                const newInfrastructure = [...(formData.infrastructure || []), 'equipment'];
                handleInfrastructureChange(newInfrastructure);
              }}
            >
              Adressen-Ausstattung
            </button>
          </div>

          {/* Zeige nur den aktiven Inhalt an */}
          {activeSection === 'features' ? (
            <AdressenMerkmale 
              infrastructure={formData.infrastructure || []} 
              onInfrastructureChange={handleInfrastructureChange} 
            />
          ) : (
            <AdressenAusstattung 
              infrastructure={formData.infrastructure || []} 
              onInfrastructureChange={handleInfrastructureChange} 
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onTabChange("Medien")}
          >
            Zurück
          </Button>
          <Button
            type="button"
            className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
            onClick={() => onTabChange("Standort")}
          >
            Weiter
          </Button>
        </div>
      </div>
    </div>
  );
} 