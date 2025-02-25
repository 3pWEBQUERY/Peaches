'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StandardServiceProps {
  selectedServices: string[];
  onServiceToggle: (service: string) => void;
  extraPrices: { [key: string]: { amount: string; currency: 'CHF' | 'EUR' } };
  onExtraPriceChange: (service: string, amount: string) => void;
  onCurrencyChange: (service: string, currency: 'CHF' | 'EUR') => void;
}

interface Service {
  name: string;
  description: string;
}

const standardServices: Service[] = [
  { name: 'Französisch', description: 'Oral ohne Kondom' },
  { name: 'Französisch Safe', description: 'Oral mit Kondom' },
  { name: 'GV', description: 'Geschlechtsverkehr' },
  { name: 'Spanisch', description: 'Brustverkehr' },
  { name: 'Zungenküsse', description: 'Küssen mit Zunge' },
  { name: 'Körperküsse', description: 'Küssen am ganzen Körper' },
  { name: 'Schmusen', description: 'Zärtliches Kuscheln' },
  { name: 'Dreier', description: 'Service zu dritt' },
  { name: 'Handentspannung', description: 'Manuelle Stimulation' },
  { name: 'Anal', description: 'Analverkehr' },
  { name: 'Striptease', description: 'Erotischer Tanz' },
  { name: 'Massage', description: 'Klassische Massage' },
  { name: 'Rollenspiele', description: 'Erotische Rollenspiele' },
  { name: 'Fußerotik', description: 'Erotische Fußmassage' },
  { name: 'Gesichtsbesamung', description: 'Gesichtsbesamung (Facial)' },
  { name: 'Dusche', description: 'Gemeinsames Duschen' },
  { name: 'Begleitservice', description: 'Begleitung zu Events' },
  { name: 'Girlfriend Experience', description: 'Zärtliche Freundin Erfahrung' },
  { name: 'Pornstar Experience', description: 'Ultimative Pornstar Erfahrung' },
  { name: 'Körperbesamung', description: 'Besamung auf den Körper' },
  { name: 'Deepthroat', description: 'Tiefes Oral' },
  { name: 'Fingerspiele', description: 'Manuelle Stimulation mit Fingern' },
  { name: 'Zungenanal', description: 'Orale Stimulation des Anus' },
  { name: 'Squirting', description: 'Weibliche Ejakulation' },
  { name: 'Natursekt aktiv', description: 'Natursekt geben' },
  { name: 'Natursekt passiv', description: 'Natursekt empfangen' },
  { name: 'Kaviar aktiv', description: 'Kaviar geben' },
  { name: 'Kaviar passiv', description: 'Kaviar empfangen' },
  { name: 'Nylons', description: 'Erotik mit Nylonstrümpfen' },
  { name: 'High Heels', description: 'Erotik mit High Heels' },
  { name: 'Dessous', description: 'Erotik in Dessous' },
  { name: 'Dildospiele', description: 'Spiele mit Dildo' },
  { name: 'Vibrator', description: 'Spiele mit Vibrator' },
  { name: 'Toys', description: 'Verwendung verschiedener Spielzeuge' },
  { name: 'Küssen', description: 'Zärtliches Küssen' },
  { name: 'Zungenanal aktiv', description: 'Aktives Lecken des Anus' },
  { name: 'Zungenanal passiv', description: 'Passives Lecken des Anus' },
  { name: 'Prostatamassage', description: 'Massage der Prostata' }
];

export function StandardService({ 
  selectedServices, 
  onServiceToggle, 
  extraPrices, 
  onExtraPriceChange,
  onCurrencyChange 
}: StandardServiceProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {standardServices.map((service) => (
          <TooltipProvider key={service.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-auto py-2 px-3 whitespace-normal text-left flex flex-col items-start gap-0.5 min-h-[60px] hover:bg-[hsl(333.3,71.4%,50.6%)] hover:text-white transition-colors",
                    selectedServices.includes(service.name) && "bg-[hsl(333.3,71.4%,50.6%)] text-white"
                  )}
                  onClick={() => onServiceToggle(service.name)}
                >
                  <span className="font-medium text-sm">{service.name}</span>
                  <span className={cn(
                    "text-xs",
                    selectedServices.includes(service.name) ? "text-white/80" : "text-gray-500",
                    "group-hover:text-white/80"
                  )}>
                    {service.description}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{service.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-sm font-medium mb-3">Extrapreise für ausgewählte Services</h3>
          <div className="space-y-2">
            {selectedServices.map((serviceName) => (
              <div key={serviceName} className="flex items-center gap-3">
                <span className="flex-1">{serviceName}</span>
                <div className="flex gap-2 items-center">
                  <div className="w-32 relative">
                    <Input
                      type="number"
                      min="0"
                      step="10"
                      value={extraPrices[serviceName]?.amount || ''}
                      onChange={(e) => onExtraPriceChange(serviceName, e.target.value)}
                      className="pl-6"
                      placeholder="0"
                    />
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {extraPrices[serviceName]?.currency}
                    </span>
                  </div>
                  <Select
                    value={extraPrices[serviceName]?.currency || 'CHF'}
                    onValueChange={(value) => onCurrencyChange(serviceName, value as 'CHF' | 'EUR')}
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 