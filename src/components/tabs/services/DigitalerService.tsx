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

interface DigitalerServiceProps {
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

const digitalServices: Service[] = [
  // Live Video Services
  { name: 'Live Videochat', description: 'Privater Live Video Chat' },
  { name: 'Video Call', description: 'Persönlicher Video Anruf' },
  { name: 'Cam2Cam', description: 'Gegenseitiger Videochat' },
  { name: 'Gruppen Videochat', description: 'Videochat mit mehreren Teilnehmern' },
  { name: 'VR Chat', description: 'Virtual Reality Chat Erlebnis' },
  { name: 'Live Streaming', description: 'Exklusiver Live Stream' },
  
  // Telefon Services
  { name: 'Telefonsex', description: 'Erotische Telefongespräche' },
  { name: 'Telefonberatung', description: 'Diskrete telefonische Beratung' },
  { name: 'Voice Messages', description: 'Personalisierte Sprachnachrichten' },
  { name: 'ASMR', description: 'Erotische Audio-Erlebnisse' },
  { name: 'Rollenspiel Call', description: 'Telefonisches Rollenspiel' },
  
  // Chat & Messaging
  { name: 'Live Text Chat', description: 'Echtzeit Textchat' },
  { name: 'WhatsApp Chat', description: 'Privater WhatsApp Service' },
  { name: 'Telegram Chat', description: 'Diskreter Telegram Service' },
  { name: 'Snapchat Premium', description: 'Exklusiver Snapchat Zugang' },
  { name: 'Email Service', description: 'Persönlicher Email Austausch' },
  
  // Content Services
  { name: 'Foto Sets', description: 'Personalisierte Fotoserien' },
  { name: 'Custom Videos', description: 'Maßgeschneiderte Videos' },
  { name: 'OnlyFans VIP', description: 'Exklusiver OnlyFans Content' },
  { name: 'Digitale GFE', description: 'Virtuelle Freundin Erfahrung' },
  { name: 'Fetisch Content', description: 'Spezieller Fetisch Content' },
  
  // Interaktive Dienste
  { name: 'Fernsteuerung', description: 'Steuerung von Lovense Toys' },
  { name: 'VR Experience', description: 'Virtual Reality Erlebnisse' },
  { name: 'Online Games', description: 'Erotische Online Spiele' },
  { name: 'Virtuelle Dates', description: 'Online Dating Erlebnis' },
  { name: 'Digitale Shows', description: 'Personalisierte Online Shows' },
  
  // Coaching & Beratung
  { name: 'Sex Coaching', description: 'Online Sexual Coaching' },
  { name: 'Fetisch Beratung', description: 'Fetisch & BDSM Beratung' },
  { name: 'Beziehungs Chat', description: 'Beziehungsberatung Online' },
  { name: 'Dirty Talk Training', description: 'Anleitung zum Dirty Talk' },
  { name: 'Dominanz Online', description: 'Virtuelle Dominanz Session' },
  
  // Premium Pakete
  { name: 'All Access Pass', description: 'Zugang zu allen digitalen Services' },
  { name: 'Weekend Special', description: 'Wochenend-Komplett-Paket' },
  { name: 'VIP Membership', description: 'Premium Mitgliedschaft' },
  { name: 'Digital GFE Plus', description: 'Erweiterte digitale GFE' },
  { name: 'Custom Package', description: 'Individuelles Digital Paket' }
];

export function DigitalerService({ 
  selectedServices, 
  onServiceToggle,
  extraPrices,
  onExtraPriceChange,
  onCurrencyChange
}: DigitalerServiceProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {digitalServices.map((service) => (
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