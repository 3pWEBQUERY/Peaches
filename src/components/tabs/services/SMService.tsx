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

interface SMServiceProps {
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

const smServices: Service[] = [
  // Dominanz & Unterwerfung
  { name: 'Bizarr', description: 'Bizarre Spiele' },
  { name: 'Dominante Spiele', description: 'Dominanz und Unterwerfung' },
  { name: 'Devot', description: 'Devote Rollenspiele' },
  { name: 'Femdom', description: 'Weibliche Dominanz' },
  { name: 'Maledom', description: 'Männliche Dominanz' },
  { name: 'Sklavenerziehung', description: 'Intensive Unterwerfung' },
  { name: 'Master/Slave', description: 'Master/Slave Rollenspiele' },
  { name: 'Sissification', description: 'Feminisierung' },
  
  // Bondage & Fesselung
  { name: 'Bondage', description: 'Kunstvolle Fesselungen' },
  { name: 'Seilbondage', description: 'Japanische Seilkunst' },
  { name: 'Fesseln', description: 'Klassische Fesselspiele' },
  { name: 'Suspension', description: 'Aufhängung/Schweben' },
  { name: 'Mumifizierung', description: 'Komplette Einwicklung' },
  { name: 'Käfighaltung', description: 'Einschließung im Käfig' },

  // Fetisch
  { name: 'Latex', description: 'Latex Fetisch' },
  { name: 'Leder', description: 'Leder Fetisch' },
  { name: 'Nylon', description: 'Nylon Fetisch' },
  { name: 'Gummi', description: 'Gummi Fetisch' },
  { name: 'Windeln', description: 'ABDL/Windel Fetisch' },
  { name: 'Smoking', description: 'Rauch Fetisch' },
  { name: 'Fuß Fetisch', description: 'Fuß Verehrung' },
  
  // Bestrafung & Disziplin
  { name: 'Soft SM', description: 'Leichte SM Praktiken' },
  { name: 'Spanking', description: 'Erziehungsspiele' },
  { name: 'Peitschen', description: 'Peitschenspiele' },
  { name: 'Rohrstock', description: 'Bestrafung mit Rohrstock' },
  { name: 'Paddling', description: 'Bestrafung mit Paddle' },
  { name: 'CBT', description: 'Cock & Ball Torture' },
  { name: 'Nipple Torture', description: 'Brustwarzen Folter' },
  
  // Kontrolle & Macht
  { name: 'Keuschhaltung', description: 'Keuschheitstraining' },
  { name: 'Orgasmuskontrolle', description: 'Kontrollierte Befriedigung' },
  { name: 'Atemkontrolle', description: 'Kontrollierte Atmung' },
  { name: 'Petplay', description: 'Haustier Rollenspiel' },
  { name: 'Ponyplay', description: 'Pony Rollenspiel' },
  
  // Sensorische Spiele
  { name: 'Wachs', description: 'Wachsspiele' },
  { name: 'Elektro', description: 'Elektrostimulation' },
  { name: 'Nadeln', description: 'Nadelspiele' },
  { name: 'Klinik', description: 'Klinikspiele' },
  { name: 'Knebeln', description: 'Knebelspiele' },
  { name: 'Augenbinde', description: 'Sinnliche Blindfolds' },
  { name: 'Sensorische Deprivation', description: 'Sinnesentzug' },
  
  // Spezielle Praktiken
  { name: 'Spitting', description: 'Spucken' },
  { name: 'Trampling', description: 'Betreten werden' },
  { name: 'Face Sitting', description: 'Gesicht Sitzen' },
  { name: 'Würgen', description: 'Kontrolliertes Würgen' },
  { name: 'Toilettenerziehung', description: 'WC Training' },
  
  // Rollenspiele
  { name: 'Lehrer/Schüler', description: 'Autoritäts Rollenspiel' },
  { name: 'Boss/Sekretärin', description: 'Büro Rollenspiel' },
  { name: 'Arzt/Patient', description: 'Medizinisches Rollenspiel' },
  { name: 'Polizist/Gefangener', description: 'Verhör Rollenspiel' }
];

export function SMService({ selectedServices, onServiceToggle, extraPrices, onExtraPriceChange, onCurrencyChange }: SMServiceProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {smServices.map((service) => (
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