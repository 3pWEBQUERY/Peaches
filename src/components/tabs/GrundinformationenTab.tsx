'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EscortFormData } from '@/types/escort';
import { nationalities } from '@/data/nationalities';
import { languages } from '@/data/languages';
import { Star, ChevronsUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface GrundinformationenTabProps {
  formData: EscortFormData;
  setFormData: React.Dispatch<React.SetStateAction<EscortFormData>>;
  onTabChange: (tab: string) => void;
}

export function GrundinformationenTab({ formData, setFormData, onTabChange }: GrundinformationenTabProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [languageSearchValue, setLanguageSearchValue] = useState("");

  const filteredNationalities = nationalities.filter((nationality) => {
    if (searchValue === "") return true;
    return nationality.name.toLowerCase().includes(searchValue.toLowerCase()) ||
           nationality.code.toLowerCase().includes(searchValue.toLowerCase());
  });

  const filteredLanguages = languages.filter((language) => {
    if (languageSearchValue === "") return true;
    return language.name.toLowerCase().includes(languageSearchValue.toLowerCase()) ||
           language.code.toLowerCase().includes(languageSearchValue.toLowerCase());
  });

  const selectedNationality = nationalities.find(n => n.code === formData.nationalität);

  const handleLanguageSelect = (languageCode: string) => {
    if (!formData.sprachen.some(lang => lang.code === languageCode)) {
      setFormData({
        ...formData,
        sprachen: [...formData.sprachen, { code: languageCode, level: 1 }]
      });
    }
  };

  const handleLanguageLevel = (languageCode: string, level: number) => {
    setFormData({
      ...formData,
      sprachen: formData.sprachen.map(lang => 
        lang.code === languageCode ? { ...lang, level } : lang
      )
    });
  };

  const removeLanguage = (languageCode: string) => {
    setFormData({
      ...formData,
      sprachen: formData.sprachen.filter(lang => lang.code !== languageCode)
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
          Grundinformationen
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Geben Sie Ihre persönlichen Informationen und Sprachkenntnisse an.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="künstlername" className="block text-sm font-medium text-gray-700 mb-1">
                Anzeigename
              </label>
              <Input
                id="künstlername"
                value={formData.künstlername}
                onChange={(e) => setFormData({...formData, künstlername: e.target.value})}
                required
                placeholder="Ihr Anzeigename"
              />
            </div>
            <div>
              <label htmlFor="slogan" className="block text-sm font-medium text-gray-700 mb-1">
                Slogan
              </label>
              <Input
                id="slogan"
                value={formData.slogan}
                onChange={(e) => setFormData({...formData, slogan: e.target.value})}
                placeholder="Ihr persönlicher Slogan"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="geschlecht" className="block text-sm font-medium text-gray-700 mb-1">
                Geschlecht
              </label>
              <Select
                value={formData.geschlecht}
                onValueChange={(value) => setFormData({...formData, geschlecht: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie Ihr Geschlecht" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weiblich">Weiblich</SelectItem>
                  <SelectItem value="männlich">Männlich</SelectItem>
                  <SelectItem value="trans">Trans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="alter" className="block text-sm font-medium text-gray-700 mb-1">
                Alter
              </label>
              <Input
                id="alter"
                type="number"
                value={formData.alter}
                onChange={(e) => setFormData({...formData, alter: e.target.value})}
                required
                placeholder="18"
                min="18"
                max="99"
              />
            </div>
          </div>
          <div>
            <label htmlFor="nationalität" className="block text-sm font-medium text-gray-700 mb-1">
              Nationalität
            </label>
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={isOpen}
                className="w-full justify-between"
                onClick={() => setIsOpen(!isOpen)}
              >
                {selectedNationality ? (
                  <span className="flex items-center gap-2">
                    <span>{selectedNationality.flag}</span>
                    <span>{selectedNationality.name}</span>
                  </span>
                ) : (
                  "Wählen Sie Ihre Nationalität"
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
              {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md border shadow-lg">
                  <div className="p-2">
                    <Input
                      placeholder="Nationalität suchen..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredNationalities.length === 0 ? (
                      <div className="py-6 text-center text-sm text-gray-500">
                        Keine Nationalität gefunden.
                      </div>
                    ) : (
                      <div className="py-1">
                        {filteredNationalities.map((nationality) => (
                          <button
                            key={nationality.code}
                            className={cn(
                              "flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100",
                              formData.nationalität === nationality.code && "bg-gray-100"
                            )}
                            onClick={() => {
                              setFormData({...formData, nationalität: nationality.code});
                              setSearchValue("");
                              setIsOpen(false);
                            }}
                          >
                            <span>{nationality.flag}</span>
                            <span>{nationality.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="sprachen" className="block text-sm font-medium text-gray-700 mb-1">
              Sprachen
            </label>
            <div className="space-y-2">
              {formData.sprachen.map((lang) => {
                const language = languages.find(l => l.code === lang.code);
                if (!language) return null;
                
                return (
                  <div key={lang.code} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-2">
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleLanguageLevel(lang.code, star)}
                          className="focus:outline-none"
                        >
                          <Star 
                            className={cn(
                              "w-5 h-5",
                              star <= lang.level 
                                ? "fill-[hsl(333.3,71.4%,50.6%)] text-[hsl(333.3,71.4%,50.6%)]" 
                                : "text-gray-300"
                            )} 
                          />
                        </button>
                      ))}
                      <button
                        onClick={() => removeLanguage(lang.code)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={isLanguageOpen}
                  className="w-full justify-between"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  <span>Sprache hinzufügen</span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
                {isLanguageOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-md border shadow-lg">
                    <div className="p-2">
                      <Input
                        placeholder="Sprache suchen..."
                        value={languageSearchValue}
                        onChange={(e) => setLanguageSearchValue(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {filteredLanguages.length === 0 ? (
                        <div className="py-6 text-center text-sm text-gray-500">
                          Keine Sprache gefunden.
                        </div>
                      ) : (
                        <div className="py-1">
                          {filteredLanguages.map((language) => (
                            <button
                              key={language.code}
                              className={cn(
                                "flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100",
                                formData.sprachen.some(lang => lang.code === language.code) && "bg-gray-100"
                              )}
                              onClick={() => {
                                handleLanguageSelect(language.code);
                                setLanguageSearchValue("");
                                setIsLanguageOpen(false);
                              }}
                              disabled={formData.sprachen.some(lang => lang.code === language.code)}
                            >
                              <span>{language.flag}</span>
                              <span>{language.name}</span>
                              <span className="text-gray-500 ml-1">({language.nativeName})</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Optische Merkmale */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[hsl(333.3,71.4%,50.6%)]">Optisch</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="größe" className="block text-sm font-medium text-gray-700 mb-1">
                Größe (cm)
              </label>
              <Input
                id="größe"
                type="number"
                value={formData.größe}
                onChange={(e) => setFormData({...formData, größe: e.target.value})}
                placeholder="170"
                min="140"
                max="220"
              />
            </div>
            <div>
              <label htmlFor="gewicht" className="block text-sm font-medium text-gray-700 mb-1">
                Gewicht (kg)
              </label>
              <Input
                id="gewicht"
                type="number"
                value={formData.gewicht}
                onChange={(e) => setFormData({...formData, gewicht: e.target.value})}
                placeholder="60"
                min="40"
                max="150"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="koerperbau" className="block text-sm font-medium text-gray-700 mb-1">
                Körperbau
              </label>
              <Select
                value={formData.koerperbau}
                onValueChange={(value) => setFormData({...formData, koerperbau: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie Ihren Körperbau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="schlank">Schlank</SelectItem>
                  <SelectItem value="sportlich">Sportlich</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="kurvig">Kurvig</SelectItem>
                  <SelectItem value="mollig">Mollig</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="haarlaenge" className="block text-sm font-medium text-gray-700 mb-1">
                Haarlänge
              </label>
              <Select
                value={formData.haarlaenge}
                onValueChange={(value) => setFormData({...formData, haarlaenge: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie Ihre Haarlänge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kurz">Kurz</SelectItem>
                  <SelectItem value="mittellang">Mittellang</SelectItem>
                  <SelectItem value="lang">Lang</SelectItem>
                  <SelectItem value="sehr_lang">Sehr lang</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="haarfarbe" className="block text-sm font-medium text-gray-700 mb-1">
                Haarfarbe
              </label>
              <Select
                value={formData.haarfarbe}
                onValueChange={(value) => setFormData({...formData, haarfarbe: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie Ihre Haarfarbe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blond">Blond</SelectItem>
                  <SelectItem value="braun">Braun</SelectItem>
                  <SelectItem value="schwarz">Schwarz</SelectItem>
                  <SelectItem value="rot">Rot</SelectItem>
                  <SelectItem value="grau">Grau</SelectItem>
                  <SelectItem value="gefärbt">Gefärbt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="brusttyp" className="block text-sm font-medium text-gray-700 mb-1">
                Brusttyp
              </label>
              <Select
                value={formData.brusttyp}
                onValueChange={(value) => setFormData({...formData, brusttyp: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie Ihren Brusttyp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natuerlich">Natürlich</SelectItem>
                  <SelectItem value="silikon">Silikon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="brustgroesse" className="block text-sm font-medium text-gray-700 mb-1">
                Brustgröße
              </label>
              <Select
                value={formData.brustgroesse}
                onValueChange={(value) => setFormData({...formData, brustgroesse: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie Ihre Brustgröße" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AA">AA</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="E">E</SelectItem>
                  <SelectItem value="F">F</SelectItem>
                  <SelectItem value="G">G</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="intimbereich" className="block text-sm font-medium text-gray-700 mb-1">
                Intimbereich
              </label>
              <Select
                value={formData.intimbereich}
                onValueChange={(value) => setFormData({...formData, intimbereich: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie Ihren Intimbereich" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rasiert">Rasiert</SelectItem>
                  <SelectItem value="teilrasiert">Teilrasiert</SelectItem>
                  <SelectItem value="natuerlich">Natürlich</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="tattoos" className="block text-sm font-medium text-gray-700 mb-1">
                Tätowierungen
              </label>
              <div className="space-y-2">
                <Select
                  value={formData.tattoos.length === 0 ? "keine" : "vorhanden"}
                  onValueChange={(value) => {
                    if (value === "keine") {
                      setFormData({...formData, tattoos: []});
                    } else if (formData.tattoos.length === 0) {
                      setFormData({...formData, tattoos: ["Arm"]});
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Haben Sie Tätowierungen?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="keine">Keine</SelectItem>
                    <SelectItem value="vorhanden">Ja, an folgenden Stellen:</SelectItem>
                  </SelectContent>
                </Select>

                {formData.tattoos.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 p-2 border rounded-md">
                    {[
                      "Arm", "Bein", "Rücken", "Bauch", "Brust",
                      "Hals", "Hand", "Fuß", "Schulter", "Nacken",
                      "Gesicht", "Hüfte", "Po", "Intim"
                    ].map((position) => (
                      <div key={position} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tattoo-${position}`}
                          checked={formData.tattoos.includes(position)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                tattoos: [...formData.tattoos, position]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                tattoos: formData.tattoos.filter(t => t !== position)
                              });
                            }
                          }}
                        />
                        <label
                          htmlFor={`tattoo-${position}`}
                          className="text-sm cursor-pointer"
                        >
                          {position}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="piercings" className="block text-sm font-medium text-gray-700 mb-1">
                Piercings
              </label>
              <div className="space-y-2">
                <Select
                  value={formData.piercings.length === 0 ? "keine" : "vorhanden"}
                  onValueChange={(value) => {
                    if (value === "keine") {
                      setFormData({...formData, piercings: []});
                    } else if (formData.piercings.length === 0) {
                      setFormData({...formData, piercings: ["Ohr"]});
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Haben Sie Piercings?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="keine">Keine</SelectItem>
                    <SelectItem value="vorhanden">Ja, an folgenden Stellen:</SelectItem>
                  </SelectContent>
                </Select>

                {formData.piercings.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 p-2 border rounded-md">
                    {[
                      "Ohr", "Nase", "Lippe", "Zunge", "Augenbraue",
                      "Bauchnabel", "Brustwarze", "Intim", "Septum",
                      "Tragus", "Helix", "Industrial", "Surface"
                    ].map((position) => (
                      <div key={position} className="flex items-center space-x-2">
                        <Checkbox
                          id={`piercing-${position}`}
                          checked={formData.piercings.includes(position)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                piercings: [...formData.piercings, position]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                piercings: formData.piercings.filter(p => p !== position)
                              });
                            }
                          }}
                        />
                        <label
                          htmlFor={`piercing-${position}`}
                          className="text-sm cursor-pointer"
                        >
                          {position}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sonstiges */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[hsl(333.3,71.4%,50.6%)]">Sonstiges</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="rauchen" className="block text-sm font-medium text-gray-700 mb-1">
                Rauchen
              </label>
              <Select
                value={formData.rauchen}
                onValueChange={(value) => setFormData({...formData, rauchen: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Rauchen Sie?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nein">Nein</SelectItem>
                  <SelectItem value="gelegentlich">Gelegentlich</SelectItem>
                  <SelectItem value="ja">Ja</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="alkohol" className="block text-sm font-medium text-gray-700 mb-1">
                Alkohol
              </label>
              <Select
                value={formData.alkohol}
                onValueChange={(value) => setFormData({...formData, alkohol: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Trinken Sie Alkohol?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nein">Nein</SelectItem>
                  <SelectItem value="gelegentlich">Gelegentlich</SelectItem>
                  <SelectItem value="ja">Ja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end pt-6">
        <Button
          type="button"
          className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
          onClick={() => onTabChange("Beschreibung")}
        >
          Weiter
        </Button>
      </div>
    </div>
  );
} 