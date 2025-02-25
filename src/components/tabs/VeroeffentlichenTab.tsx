'use client';

import React from 'react';
import { EscortFormData } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface VeroeffentlichenTabProps {
  formData: EscortFormData;
  setFormData: React.Dispatch<React.SetStateAction<EscortFormData>>;
  onTabChange: (tab: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

export function VeroeffentlichenTab({ formData, setFormData, onTabChange, isLoading, onSubmit }: VeroeffentlichenTabProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
          Veröffentlichen
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Überprüfen Sie alle Angaben sorgfältig und veröffentlichen Sie Ihr Profil.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="space-y-2">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Bitte stellen Sie sicher, dass alle erforderlichen Informationen korrekt und vollständig sind.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Vor der Veröffentlichung:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>Überprüfen Sie Ihre persönlichen Informationen</li>
                <li>Stellen Sie sicher, dass Ihre Beschreibung aussagekräftig ist</li>
                <li>Kontrollieren Sie die hochgeladenen Bilder und Videos</li>
                <li>Überprüfen Sie die angegebenen Services und Preise</li>
                <li>Kontrollieren Sie Ihre Kontaktdaten</li>
                <li>Überprüfen Sie die Standortangaben</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agb"
                  checked={formData.agb_akzeptiert}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, agb_akzeptiert: checked as boolean})
                  }
                  className="data-[state=checked]:bg-[hsl(333.3,71.4%,50.6%)] data-[state=checked]:border-[hsl(333.3,71.4%,50.6%)]"
                />
                <label
                  htmlFor="agb"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ich akzeptiere die AGB und Nutzungsbedingungen
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="datenschutz"
                  checked={formData.datenschutz_akzeptiert}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, datenschutz_akzeptiert: checked as boolean})
                  }
                  className="data-[state=checked]:bg-[hsl(333.3,71.4%,50.6%)] data-[state=checked]:border-[hsl(333.3,71.4%,50.6%)]"
                />
                <label
                  htmlFor="datenschutz"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ich akzeptiere die Datenschutzerklärung
                </label>
              </div>
            </div>

            <Button
              onClick={(e) => {
                e.preventDefault();
                console.log('Button wurde geklickt');
                console.log('AGBs akzeptiert:', formData.agb_akzeptiert);
                console.log('Datenschutz akzeptiert:', formData.datenschutz_akzeptiert);
                onSubmit();
              }}
              disabled={isLoading || !formData.agb_akzeptiert || !formData.datenschutz_akzeptiert}
              className={cn(
                "w-full text-white",
                (!formData.agb_akzeptiert || !formData.datenschutz_akzeptiert)
                  ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
                  : "bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,45%)]"
              )}
            >
              {isLoading 
                ? 'Wird veröffentlicht...' 
                : (!formData.agb_akzeptiert || !formData.datenschutz_akzeptiert)
                  ? 'Bitte AGBs und Datenschutzerklärung akzeptieren'
                  : 'Profil veröffentlichen'
              }
            </Button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-start pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onTabChange("Kontakt")}
            >
              Zurück
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 