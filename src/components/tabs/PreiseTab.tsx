'use client';

import React from 'react';
import { EscortFormData } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PreiseTabProps {
  formData: EscortFormData;
  setFormData: React.Dispatch<React.SetStateAction<EscortFormData>>;
  onTabChange: (tab: string) => void;
}

interface TimeBlock {
  duration: string;
  label: string;
  description: string;
}

const timeBlocks: TimeBlock[] = [
  { duration: "15min", label: "15 Minuten", description: "Quickie" },
  { duration: "30min", label: "30 Minuten", description: "Express Service" },
  { duration: "1h", label: "1 Stunde", description: "Standard Buchung" },
  { duration: "2h", label: "2 Stunden", description: "Erweiterte Zeit" },
  { duration: "3h", label: "3 Stunden", description: "Ausgiebige Zeit" },
  { duration: "4h", label: "4 Stunden", description: "Halber Tag" },
  { duration: "6h", label: "6 Stunden", description: "Business Tag" },
  { duration: "8h", label: "8 Stunden", description: "Voller Tag" },
  { duration: "12h", label: "12 Stunden", description: "Tag & Nacht" },
  { duration: "24h", label: "24 Stunden", description: "Ganzer Tag" },
  { duration: "48h", label: "2 Tage", description: "Wochenende" },
  { duration: "72h", label: "3 Tage", description: "Verlängertes Wochenende" },
  { duration: "168h", label: "1 Woche", description: "Urlaubsbegleitung" },
];

export function PreiseTab({ formData, setFormData, onTabChange }: PreiseTabProps) {
  const [showAdvancedPricing, setShowAdvancedPricing] = React.useState(false);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
          Preise
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Definieren Sie Ihre Preisstruktur für verschiedene Zeiträume und Dienstleistungen.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Währungsauswahl */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Standardwährung</Label>
            <p className="text-sm text-gray-500">Wählen Sie Ihre bevorzugte Währung</p>
          </div>
          <Select
            value={formData.standardCurrency || 'CHF'}
            onValueChange={(value) => setFormData({...formData, standardCurrency: value as 'CHF' | 'EUR'})}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CHF">CHF</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Erweiterte Preisgestaltung Switch */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Erweiterte Preisgestaltung</Label>
            <p className="text-sm text-gray-500">Aktivieren Sie verschiedene Zeitintervalle</p>
          </div>
          <Switch
            checked={showAdvancedPricing}
            onCheckedChange={setShowAdvancedPricing}
            className="data-[state=checked]:bg-[hsl(333.3,71.4%,50.6%)] data-[state=checked]:border-[hsl(333.3,71.4%,50.6%)]"
          />
        </div>

        {/* Basis Preise */}
        {!showAdvancedPricing && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="stundensatz" className="block text-sm font-medium text-gray-700 mb-1">
                1 Stunde
              </label>
              <div className="relative">
                <Input
                  id="stundensatz"
                  type="number"
                  value={formData.stundensatz}
                  onChange={(e) => setFormData({...formData, stundensatz: e.target.value})}
                  className="pl-8"
                  min="0"
                  step="10"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {formData.standardCurrency || 'CHF'}
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="zwei_stunden" className="block text-sm font-medium text-gray-700 mb-1">
                2 Stunden
              </label>
              <div className="relative">
                <Input
                  id="zwei_stunden"
                  type="number"
                  value={formData.zwei_stunden}
                  onChange={(e) => setFormData({...formData, zwei_stunden: e.target.value})}
                  className="pl-8"
                  min="0"
                  step="10"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {formData.standardCurrency || 'CHF'}
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="drei_stunden" className="block text-sm font-medium text-gray-700 mb-1">
                3 Stunden
              </label>
              <div className="relative">
                <Input
                  id="drei_stunden"
                  type="number"
                  value={formData.drei_stunden}
                  onChange={(e) => setFormData({...formData, drei_stunden: e.target.value})}
                  className="pl-8"
                  min="0"
                  step="10"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {formData.standardCurrency || 'CHF'}
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="uebernachtung" className="block text-sm font-medium text-gray-700 mb-1">
                Übernachtung
              </label>
              <div className="relative">
                <Input
                  id="uebernachtung"
                  type="number"
                  value={formData.uebernachtung}
                  onChange={(e) => setFormData({...formData, uebernachtung: e.target.value})}
                  className="pl-8"
                  min="0"
                  step="50"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {formData.standardCurrency || 'CHF'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Erweiterte Preise */}
        {showAdvancedPricing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {timeBlocks.map((block) => (
              <Card key={block.duration} className="relative overflow-hidden group">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{block.label}</h3>
                      <p className="text-sm text-gray-500">{block.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="number"
                        value={formData.prices?.[block.duration]?.amount || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          prices: {
                            ...formData.prices,
                            [block.duration]: {
                              amount: e.target.value,
                              currency: formData.prices?.[block.duration]?.currency || formData.standardCurrency || 'CHF'
                            }
                          }
                        })}
                        className="pl-12"
                        min="0"
                        step="10"
                        placeholder="0"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 min-w-[30px]">
                        {formData.prices?.[block.duration]?.currency || formData.standardCurrency || 'CHF'}
                      </span>
                    </div>
                    <Select
                      value={formData.prices?.[block.duration]?.currency || formData.standardCurrency || 'CHF'}
                      onValueChange={(value) => setFormData({
                        ...formData,
                        prices: {
                          ...formData.prices,
                          [block.duration]: {
                            amount: formData.prices?.[block.duration]?.amount || '',
                            currency: value as 'CHF' | 'EUR'
                          }
                        }
                      })}
                    >
                      <SelectTrigger className="w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CHF">CHF</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div>
          <label htmlFor="extras" className="block text-sm font-medium text-gray-700 mb-1">
            Extras & Aufpreise
          </label>
          <textarea
            id="extras"
            value={formData.extras}
            onChange={(e) => setFormData({...formData, extras: e.target.value})}
            placeholder="Beschreiben Sie hier Ihre Extras und Aufpreise..."
            className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onTabChange("Service")}
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