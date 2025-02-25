'use client';

import React from 'react';
import { EscortFormData } from '@/types/escort';
import { Button } from '@/components/ui/button';

interface BeschreibungTabProps {
  formData: EscortFormData;
  setFormData: React.Dispatch<React.SetStateAction<EscortFormData>>;
  onTabChange: (tab: string) => void;
}

export function BeschreibungTab({ formData, setFormData, onTabChange }: BeschreibungTabProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
          Beschreibung
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Beschreiben Sie sich und Ihre Dienstleistungen ausführlich, um potenzielle Kunden von sich zu überzeugen.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div>
          <label htmlFor="beschreibung" className="block text-sm font-medium text-gray-700 mb-1">
            Über mich
          </label>
          <textarea
            id="beschreibung"
            value={formData.beschreibung}
            onChange={(e) => setFormData({...formData, beschreibung: e.target.value})}
            placeholder="Erzählen Sie etwas über sich..."
            className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[200px]"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onTabChange("Grundinformationen")}
          >
            Zurück
          </Button>
          <Button
            type="button"
            className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
            onClick={() => onTabChange("Medien")}
          >
            Weiter
          </Button>
        </div>
      </div>
    </div>
  );
} 