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

interface MassageServiceProps {
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

const massageServices: Service[] = [
  // Erotische Massagen
  { name: 'Tantra Massage', description: 'Sinnliche tantrische Massage' },
  { name: 'Body to Body', description: 'Körper an Körper Massage' },
  { name: 'Lingam Massage', description: 'Tantrische Massage für den Mann' },
  { name: 'Yoni Massage', description: 'Tantrische Massage für die Frau' },
  { name: 'Nuru Massage', description: 'Japanische Ganzkörper-Gleit-Massage' },
  { name: 'Happy Ending', description: 'Massage mit erfüllendem Abschluss' },
  { name: 'Prostate Massage', description: 'Prostata-Wellness-Massage' },
  
  // Klassische Massagen
  { name: 'Klassische Massage', description: 'Traditionelle Entspannungsmassage' },
  { name: 'Schwedische Massage', description: 'Klassische europäische Massage' },
  { name: 'Sport Massage', description: 'Kräftige Massage für Muskeln' },
  { name: 'Tiefengewebe', description: 'Intensive Tiefengewebsmassage' },
  
  // Spezielle Techniken
  { name: 'Hot Stone', description: 'Massage mit warmen Steinen' },
  { name: 'Öl Massage', description: 'Sinnliche Massage mit warmen Ölen' },
  { name: 'Aromaöl Massage', description: 'Massage mit duftenden Ölen' },
  { name: 'Seifenschaum', description: 'Massage mit cremigem Schaum' },
  { name: 'Honig Massage', description: 'Entgiftende Honig-Massage' },
  { name: 'Kräuterstempel', description: 'Massage mit warmen Kräuterstempeln' },
  
  // Asiatische Massagen
  { name: 'Thai Massage', description: 'Traditionelle Thai-Massage' },
  { name: 'Shiatsu', description: 'Japanische Druckpunkt-Massage' },
  { name: 'Lomi Lomi', description: 'Hawaiianische Tempelmassage' },
  { name: 'Ayurveda', description: 'Indische Heilmassage' },
  { name: 'Bamboo Massage', description: 'Massage mit Bambusstäben' },
  
  // Teilkörper-Massagen
  { name: 'Kopf Massage', description: 'Entspannende Kopfmassage' },
  { name: 'Gesichts Massage', description: 'Verjüngende Gesichtsmassage' },
  { name: 'Nacken Massage', description: 'Stress-lösende Nackenmassage' },
  { name: 'Rücken Massage', description: 'Wohltuende Rückenmassage' },
  { name: 'Fuß Massage', description: 'Belebende Fußmassage' },
  { name: 'Hand Massage', description: 'Entspannende Handmassage' },
  
  // Spezial-Massagen
  { name: 'Vier Hand Massage', description: 'Massage von zwei Masseuren' },
  { name: 'Paarmassage', description: 'Gemeinsame Massage für Paare' },
  { name: 'Unterwasser', description: 'Massage im Wasserbad' },
  { name: 'Schwangerschaft', description: 'Sanfte Massage für Schwangere' },
  { name: 'Lymphdrainage', description: 'Entstauende Lymphmassage' },
  
  // Wellness-Kombinationen
  { name: 'Peeling Massage', description: 'Peeling mit anschließender Massage' },
  { name: 'Schoko Massage', description: 'Massage mit warmer Schokolade' },
  { name: 'Wellness Paket', description: 'Umfassendes Massage-Verwöhnprogramm' },
  { name: 'Ganzkörper Plus', description: 'Intensive Ganzkörpermassage mit Extra-Service' }
];

export function MassageService({ 
  selectedServices, 
  onServiceToggle, 
  extraPrices, 
  onExtraPriceChange,
  onCurrencyChange 
}: MassageServiceProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {massageServices.map((service) => (
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