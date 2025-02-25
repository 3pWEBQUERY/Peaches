'use client';

import React from 'react';
import { EscortFormData } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StandortTabProps {
  formData: EscortFormData;
  setFormData: React.Dispatch<React.SetStateAction<EscortFormData>>;
  onTabChange: (tab: string) => void;
}

// Definiere die Regionen für jedes Land
const regions = {
  CH: [
    'Aargau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Basel-Landschaft',
    'Basel-Stadt', 'Bern', 'Freiburg', 'Genf', 'Glarus', 'Graubünden', 'Jura',
    'Luzern', 'Neuenburg', 'Nidwalden', 'Obwalden', 'Schaffhausen', 'Schwyz',
    'Solothurn', 'St. Gallen', 'Tessin', 'Thurgau', 'Uri', 'Waadt', 'Wallis',
    'Zug', 'Zürich'
  ],
  DE: [
    'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen',
    'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen',
    'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen',
    'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'
  ],
  AT: [
    'Burgenland', 'Kärnten', 'Niederösterreich', 'Oberösterreich',
    'Salzburg', 'Steiermark', 'Tirol', 'Vorarlberg', 'Wien'
  ]
};

export function StandortTab({ formData, setFormData, onTabChange }: StandortTabProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
          Standort
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Wählen Sie Ihr Land und geben Sie Ihre Standortinformationen an.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Länderauswahl */}
        <div className="space-y-4">
          <Label>Land auswählen</Label>
          <div className="grid grid-cols-3 gap-4">
            <Button
              type="button"
              variant={formData.land === 'Schweiz' ? 'default' : 'outline'}
              className={formData.land === 'Schweiz' ? 'bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,45%)]' : ''}
              onClick={() => setFormData({...formData, land: 'Schweiz', bundesland: ''})}
            >
              🇨🇭 Schweiz
            </Button>
            <Button
              type="button"
              variant={formData.land === 'Deutschland' ? 'default' : 'outline'}
              className={formData.land === 'Deutschland' ? 'bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,45%)]' : ''}
              onClick={() => setFormData({...formData, land: 'Deutschland', bundesland: ''})}
            >
              🇩🇪 Deutschland
            </Button>
            <Button
              type="button"
              variant={formData.land === 'Österreich' ? 'default' : 'outline'}
              className={formData.land === 'Österreich' ? 'bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,45%)]' : ''}
              onClick={() => setFormData({...formData, land: 'Österreich', bundesland: ''})}
            >
              🇦🇹 Österreich
            </Button>
          </div>
        </div>

        {/* Kanton/Bundesland Auswahl */}
        {formData.land && (
          <div className="space-y-4">
            <Label>
              {formData.land === 'Schweiz' ? 'Kanton' : 'Bundesland'} auswählen
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {formData.land === 'Schweiz' && regions.CH.map((region) => (
                <Button
                  key={region}
                  type="button"
                  variant={formData.bundesland === region ? 'default' : 'outline'}
                  className={cn(
                    "w-full text-sm",
                    formData.bundesland === region ? 'bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,45%)]' : ''
                  )}
                  onClick={() => setFormData({...formData, bundesland: region})}
                >
                  {region}
                </Button>
              ))}
              {formData.land === 'Deutschland' && regions.DE.map((region) => (
                <Button
                  key={region}
                  type="button"
                  variant={formData.bundesland === region ? 'default' : 'outline'}
                  className={cn(
                    "w-full text-sm",
                    formData.bundesland === region ? 'bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,45%)]' : ''
                  )}
                  onClick={() => setFormData({...formData, bundesland: region})}
                >
                  {region}
                </Button>
              ))}
              {formData.land === 'Österreich' && regions.AT.map((region) => (
                <Button
                  key={region}
                  type="button"
                  variant={formData.bundesland === region ? 'default' : 'outline'}
                  className={cn(
                    "w-full text-sm",
                    formData.bundesland === region ? 'bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,45%)]' : ''
                  )}
                  onClick={() => setFormData({...formData, bundesland: region})}
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Detaillierte Standortangaben */}
        {formData.bundesland && (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="strasse">Straße</Label>
                  <Input
                    id="strasse"
                    value={formData.strasse}
                    onChange={(e) => setFormData({...formData, strasse: e.target.value})}
                    placeholder="Straßenname"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hausnummer">Hausnummer</Label>
                  <Input
                    id="hausnummer"
                    value={formData.hausnummer || ''}
                    onChange={(e) => setFormData({...formData, hausnummer: e.target.value})}
                    placeholder="Hausnummer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plz">PLZ</Label>
                  <Input
                    id="plz"
                    value={formData.plz}
                    onChange={(e) => setFormData({...formData, plz: e.target.value})}
                    placeholder="Postleitzahl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ort">Stadt</Label>
                  <Input
                    id="ort"
                    value={formData.ort}
                    onChange={(e) => setFormData({...formData, ort: e.target.value})}
                    placeholder="Stadt"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="anfahrt">Anfahrtsbeschreibung (optional)</Label>
                <textarea
                  id="anfahrt"
                  value={formData.anfahrt}
                  onChange={(e) => setFormData({...formData, anfahrt: e.target.value})}
                  placeholder="Geben Sie hier zusätzliche Hinweise zur Anfahrt..."
                  className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onTabChange("Preise")}
          >
            Zurück
          </Button>
          <Button
            type="button"
            className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
            onClick={() => onTabChange("Kontakt")}
          >
            Weiter
          </Button>
        </div>
      </div>
    </div>
  );
} 