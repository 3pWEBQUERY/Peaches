'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BegleitServiceProps {
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

const begleitServices: Service[] = [
    // Dining & Kulinarik
    { name: 'Dinner Date', description: 'Gehobenes Dining Experience' },
    { name: 'Lunch Date', description: 'Geschäftsessen Begleitung' },
    { name: 'Weinprobe', description: 'Begleitung zur Weindegustation' },
    { name: 'Gourmet Tour', description: 'Kulinarische Stadtführung' },
    { name: 'Cooking Date', description: 'Gemeinsames Kochen & Dinner' },
    
    // Events & Unterhaltung
    { name: 'Theater Begleitung', description: 'Kulturelle Abendbegleitung' },
    { name: 'Konzert Date', description: 'Musikalische Begleitung' },
    { name: 'Oper Begleitung', description: 'Klassische Abendbegleitung' },
    { name: 'Casino Begleitung', description: 'Stilvolle Casino Begleitung' },
    { name: 'Club & Party', description: 'Nachtleben Begleitung' },
    { name: 'VIP Events', description: 'Exklusive Veranstaltungen' },
    
    // Business & Networking
    { name: 'Business Event', description: 'Geschäftliche Veranstaltungen' },
    { name: 'Messe Begleitung', description: 'Professionelle Messebegleitung' },
    { name: 'Networking Event', description: 'Geschäftliche Netzwerktreffen' },
    { name: 'Konferenz Plus', description: 'Konferenz & Abendprogramm' },
    { name: 'Meeting Support', description: 'Geschäftliche Unterstützung' },
    
    // Reisen & Ausflüge
    { name: 'Reisebegleitung', description: 'Nationale & internationale Reisen' },
    { name: 'Städtetrip', description: 'Gemeinsame Städtereisen' },
    { name: 'Weekend Getaway', description: 'Wochenendausflüge' },
    { name: 'Wellness Reise', description: 'Spa & Wellness Begleitung' },
    { name: 'Yacht Charter', description: 'Maritime Begleitung' },
    { name: 'Ski Urlaub', description: 'Winterurlaub Begleitung' },
    
    // Sport & Aktivitäten
    { name: 'Golf Begleitung', description: 'Gemeinsame Golfrunde' },
    { name: 'Tennis Partner', description: 'Tennis & Aktivitäten' },
    { name: 'Fitness Date', description: 'Gemeinsames Training' },
    { name: 'Wanderbegleitung', description: 'Outdoor Aktivitäten' },
    { name: 'Ski Begleitung', description: 'Wintersport Partner' },
    
    // Kultur & Bildung
    { name: 'Museum Tour', description: 'Kulturelle Führungen' },
    { name: 'Galerie Begleitung', description: 'Kunst & Ausstellungen' },
    { name: 'Stadtführung', description: 'Private Stadtbesichtigung' },
    { name: 'Kultur Programm', description: 'Umfassendes Kulturprogramm' },
    { name: 'Sprachpartner', description: 'Sprachliche Begleitung' },
    
    // Shopping & Lifestyle
    { name: 'Shopping Tour', description: 'Persönliche Einkaufsbegleitung' },
    { name: 'Style Beratung', description: 'Mode & Style Consulting' },
    { name: 'Luxury Shopping', description: 'High-End Einkaufserlebnis' },
    { name: 'Beauty Day', description: 'Spa & Shopping Tag' },
    { name: 'Personal Shopper', description: 'Exklusive Einkaufsberatung' },
    
    // Premium Experiences
    { name: 'VIP Escort', description: 'Premium Begleitservice' },
    { name: 'Luxus Wochenende', description: 'Exklusives Wochenendpaket' },
    { name: 'First Class Trip', description: 'Luxuriöse Reisebegleitung' },
    { name: 'Elite Events', description: 'High Society Veranstaltungen' },
    { name: 'Luxury Lifestyle', description: 'Gehobene Lebensstilbegleitung' },
    
    // Spezielle Anlässe
    { name: 'Hochzeit Plus', description: 'Begleitung zu Hochzeiten' },
    { name: 'Jubiläum Date', description: 'Besondere Anlässe' },
    { name: 'Geburtstag Plus', description: 'Geburtstagsbegleitung' },
    { name: 'Silvester Date', description: 'Silvester & Feierlichkeiten' },
    { name: 'Event Planning', description: 'Eventplanung & Begleitung' }
];

export function BegleitService({ 
  selectedServices, 
  onServiceToggle,
  extraPrices,
  onExtraPriceChange,
  onCurrencyChange
}: BegleitServiceProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {begleitServices.map((service) => (
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