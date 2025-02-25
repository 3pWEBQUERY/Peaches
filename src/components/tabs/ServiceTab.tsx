'use client';

import React, { useState } from 'react';
import { EscortFormData } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StandardService } from './services/StandardService';
import { SMService } from './services/SMService';
import { MassageService } from './services/MassageService';
import { DigitalerService } from './services/DigitalerService';
import { BegleitService } from './services/BegleitService';

interface ServiceTabProps {
  formData: EscortFormData;
  setFormData: React.Dispatch<React.SetStateAction<EscortFormData>>;
  onTabChange: (tab: string) => void;
}

interface ExtraPrice {
  amount: string;
  currency: 'CHF' | 'EUR';
}

export function ServiceTab({ formData, setFormData, onTabChange }: ServiceTabProps) {
  const [activeTab, setActiveTab] = useState("standard");
  const [extraPrices, setExtraPrices] = useState<{ [key: string]: ExtraPrice }>({});

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));

    // Wenn ein Service entfernt wird, entferne auch seinen Extrapreis
    if (formData.services.includes(service)) {
      const newExtraPrices = { ...extraPrices };
      delete newExtraPrices[service];
      setExtraPrices(newExtraPrices);
    } else {
      // Wenn ein neuer Service hinzugefügt wird, setze CHF als Standardwährung
      setExtraPrices(prev => ({
        ...prev,
        [service]: { amount: '', currency: 'CHF' }
      }));
    }
  };

  const handleExtraPriceChange = (service: string, amount: string) => {
    setExtraPrices(prev => ({
      ...prev,
      [service]: { ...prev[service], amount }
    }));
  };

  const handleCurrencyChange = (service: string, currency: 'CHF' | 'EUR') => {
    setExtraPrices(prev => ({
      ...prev,
      [service]: { ...prev[service], currency }
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
          Services
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Wählen Sie die Services aus, die Sie anbieten möchten.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 gap-4">
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="sm">SM</TabsTrigger>
            <TabsTrigger value="massage">Massage</TabsTrigger>
            <TabsTrigger value="digital">Digital</TabsTrigger>
            <TabsTrigger value="begleit">Begleit</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="standard">
              <StandardService
                selectedServices={formData.services}
                onServiceToggle={handleServiceToggle}
                extraPrices={extraPrices}
                onExtraPriceChange={handleExtraPriceChange}
                onCurrencyChange={handleCurrencyChange}
              />
            </TabsContent>
            <TabsContent value="sm">
              <SMService
                selectedServices={formData.services}
                onServiceToggle={handleServiceToggle}
                extraPrices={extraPrices}
                onExtraPriceChange={handleExtraPriceChange}
                onCurrencyChange={handleCurrencyChange}
              />
            </TabsContent>
            <TabsContent value="massage">
              <MassageService
                selectedServices={formData.services}
                onServiceToggle={handleServiceToggle}
                extraPrices={extraPrices}
                onExtraPriceChange={handleExtraPriceChange}
                onCurrencyChange={handleCurrencyChange}
              />
            </TabsContent>
            <TabsContent value="digital">
              <DigitalerService
                selectedServices={formData.services}
                onServiceToggle={handleServiceToggle}
                extraPrices={extraPrices}
                onExtraPriceChange={handleExtraPriceChange}
                onCurrencyChange={handleCurrencyChange}
              />
            </TabsContent>
            <TabsContent value="begleit">
              <BegleitService
                selectedServices={formData.services}
                onServiceToggle={handleServiceToggle}
                extraPrices={extraPrices}
                onExtraPriceChange={handleExtraPriceChange}
                onCurrencyChange={handleCurrencyChange}
              />
            </TabsContent>
          </div>
        </Tabs>

        {/* Selected Services Summary */}
        {formData.services.length > 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Ausgewählte Services ({formData.services.length})</h4>
            <div className="flex flex-wrap gap-2">
              {formData.services.map((service) => (
                <div
                  key={service}
                  className="bg-[hsl(333.3,71.4%,50.6%)] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  <span>{service}</span>
                  <button
                    onClick={() => handleServiceToggle(service)}
                    className="hover:text-red-200"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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
            onClick={() => onTabChange("Preise")}
          >
            Weiter
          </Button>
        </div>
      </div>
    </div>
  );
} 