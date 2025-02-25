'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AgenturFormData } from '@/types/agentur';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface StandortTabProps {
  formData: AgenturFormData;
  setFormData: React.Dispatch<React.SetStateAction<AgenturFormData>>;
  onTabChange: (tab: string) => void;
}

const countries = [
  { code: 'CH', name: 'Schweiz', flag: '🇨🇭' },
  { code: 'DE', name: 'Deutschland', flag: '🇩🇪' },
  { code: 'AT', name: 'Österreich', flag: '🇦🇹' },
];

export function StandortTab({ formData, setFormData, onTabChange }: StandortTabProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
            Standort
          </h2>
          <p className="text-sm text-gray-600 pb-4">
            Geben Sie die Adresse Ihres Unternehmens ein.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Straße, Hausnummer"
            />
          </div>
          <div>
            <Label htmlFor="plz" className="block text-sm font-medium text-gray-700 mb-1">
              PLZ
            </Label>
            <Input
              id="plz"
              value={formData.plz}
              onChange={(e) => setFormData({...formData, plz: e.target.value})}
              placeholder="PLZ"
            />
          </div>
          <div>
            <Label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Stadt
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              placeholder="Stadt"
            />
          </div>
          <div>
            <Label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Land
            </Label>
            <Select 
              value={formData.country || 'CH'} 
              onValueChange={(value) => setFormData({...formData, country: value})}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country.code} value={country.code}>
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{country.flag}</span>
                      <span>{country.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => onTabChange("Infrastruktur")}
        >
          Zurück
        </Button>
        <Button
          type="button"
          className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
          onClick={() => onTabChange("Veröffentlichen")}
        >
          Weiter
        </Button>
      </div>
    </div>
  );
} 