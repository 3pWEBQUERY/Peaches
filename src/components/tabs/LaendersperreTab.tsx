'use client';

import React, { useState } from 'react';
import { EscortFormData } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface LaendersperreTabProps {
  formData: EscortFormData;
  setFormData: React.Dispatch<React.SetStateAction<EscortFormData>>;
  onTabChange: (tab: string) => void;
}

// Kontinente und ihre Länder
const continents = {
  'Europa': [
    'Albanien', 'Andorra', 'Belgien', 'Bosnien und Herzegowina', 'Bulgarien', 'Dänemark', 
    'Deutschland', 'Estland', 'Finnland', 'Frankreich', 'Griechenland', 'Irland', 'Island', 
    'Italien', 'Kroatien', 'Lettland', 'Liechtenstein', 'Litauen', 'Luxemburg', 'Malta', 
    'Moldawien', 'Monaco', 'Montenegro', 'Niederlande', 'Nordmazedonien', 'Norwegen', 
    'Österreich', 'Polen', 'Portugal', 'Rumänien', 'Russland', 'San Marino', 'Schweden', 
    'Schweiz', 'Serbien', 'Slowakei', 'Slowenien', 'Spanien', 'Tschechien', 'Ukraine', 
    'Ungarn', 'Vatikanstadt', 'Vereinigtes Königreich', 'Weißrussland', 'Zypern'
  ],
  'Asien': [
    'Afghanistan', 'Armenien', 'Aserbaidschan', 'Bahrain', 'Bangladesch', 'Bhutan', 
    'Brunei', 'China', 'Georgien', 'Indien', 'Indonesien', 'Irak', 'Iran', 'Israel', 
    'Japan', 'Jemen', 'Jordanien', 'Kambodscha', 'Kasachstan', 'Katar', 'Kirgisistan', 
    'Kuwait', 'Laos', 'Libanon', 'Malaysia', 'Malediven', 'Mongolei', 'Myanmar', 'Nepal', 
    'Nordkorea', 'Oman', 'Pakistan', 'Philippinen', 'Saudi-Arabien', 'Singapur', 
    'Sri Lanka', 'Südkorea', 'Syrien', 'Tadschikistan', 'Taiwan', 'Thailand', 
    'Timor-Leste', 'Turkmenistan', 'Usbekistan', 'Vereinigte Arabische Emirate', 'Vietnam'
  ],
  'Afrika': [
    'Ägypten', 'Algerien', 'Angola', 'Äquatorialguinea', 'Äthiopien', 'Benin', 
    'Botswana', 'Burkina Faso', 'Burundi', 'Dschibuti', 'Elfenbeinküste', 'Eritrea', 
    'Eswatini', 'Gabun', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kamerun', 
    'Kap Verde', 'Kenia', 'Komoren', 'Kongo', 'Lesotho', 'Liberia', 'Libyen', 
    'Madagaskar', 'Malawi', 'Mali', 'Marokko', 'Mauretanien', 'Mauritius', 'Mosambik', 
    'Namibia', 'Niger', 'Nigeria', 'Ruanda', 'Sambia', 'São Tomé und Príncipe', 
    'Senegal', 'Seychellen', 'Sierra Leone', 'Simbabwe', 'Somalia', 'Südafrika', 
    'Sudan', 'Südsudan', 'Tansania', 'Togo', 'Tschad', 'Tunesien', 'Uganda', 
    'Zentralafrikanische Republik'
  ],
  'Nordamerika': [
    'Antigua und Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Costa Rica', 'Dominica', 
    'Dominikanische Republik', 'El Salvador', 'Grenada', 'Guatemala', 'Haiti', 'Honduras', 
    'Jamaika', 'Kanada', 'Kuba', 'Mexiko', 'Nicaragua', 'Panama', 'St. Kitts und Nevis', 
    'St. Lucia', 'St. Vincent und die Grenadinen', 'Trinidad und Tobago', 
    'Vereinigte Staaten von Amerika'
  ],
  'Südamerika': [
    'Argentinien', 'Bolivien', 'Brasilien', 'Chile', 'Ecuador', 'Guyana', 'Kolumbien', 
    'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela'
  ],
  'Ozeanien': [
    'Australien', 'Fidschi', 'Kiribati', 'Marshallinseln', 'Mikronesien', 'Nauru', 
    'Neuseeland', 'Palau', 'Papua-Neuguinea', 'Salomonen', 'Samoa', 'Tonga', 'Tuvalu', 
    'Vanuatu'
  ]
};

export function LaendersperreTab({ formData, setFormData, onTabChange }: LaendersperreTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedContinents, setExpandedContinents] = useState<string[]>([]);

  // Initialisiere geblockte Länder aus formData oder als leeres Array
  const [blockedCountries, setBlockedCountries] = useState<string[]>(
    formData.blocked_countries || []
  );

  const toggleContinent = (continent: string) => {
    setExpandedContinents(prev =>
      prev.includes(continent)
        ? prev.filter(c => c !== continent)
        : [...prev, continent]
    );
  };

  const toggleCountry = (country: string) => {
    const newBlockedCountries = blockedCountries.includes(country)
      ? blockedCountries.filter(c => c !== country)
      : [...blockedCountries, country];
    
    setBlockedCountries(newBlockedCountries);
    setFormData({
      ...formData,
      blocked_countries: newBlockedCountries
    });
  };

  const toggleEntireContinent = (continent: string, countries: string[]) => {
    const allCountriesBlocked = countries.every(country => 
      blockedCountries.includes(country)
    );

    const newBlockedCountries = allCountriesBlocked
      ? blockedCountries.filter(country => !countries.includes(country))
      : [...new Set([...blockedCountries, ...countries])];

    setBlockedCountries(newBlockedCountries);
    setFormData({
      ...formData,
      blocked_countries: newBlockedCountries
    });
  };

  const filteredContinents = Object.entries(continents).map(([continent, countries]) => ({
    continent,
    countries: countries.filter(country =>
      country.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(({ countries }) => countries.length > 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
          Ländersperre
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Wählen Sie die Länder aus, in denen Ihr Profil nicht sichtbar sein soll.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Suchleiste */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            type="text"
            placeholder="Land suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Kontinente und Länder */}
        <div className="space-y-4">
          {filteredContinents.map(({ continent, countries }) => (
            <Card key={continent}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{continent}</h3>
                    <Badge variant="secondary">
                      {countries.filter(country => blockedCountries.includes(country)).length}/{countries.length}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={countries.every(country => blockedCountries.includes(country))}
                      onCheckedChange={() => toggleEntireContinent(continent, countries)}
                      className="data-[state=checked]:bg-[hsl(333.3,71.4%,50.6%)]"
                    />
                    <Button
                      variant="ghost"
                      onClick={() => toggleContinent(continent)}
                      className="text-sm"
                    >
                      {expandedContinents.includes(continent) ? 'Einklappen' : 'Ausklappen'}
                    </Button>
                  </div>
                </div>

                {expandedContinents.includes(continent) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                    {countries.map((country) => (
                      <div
                        key={country}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                        onClick={() => toggleCountry(country)}
                      >
                        <Switch
                          checked={blockedCountries.includes(country)}
                          className="data-[state=checked]:bg-[hsl(333.3,71.4%,50.6%)]"
                        />
                        <span>{country}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onTabChange("Kontakt")}
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
    </div>
  );
} 