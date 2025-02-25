'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { GrundinformationenTab } from '@/components/tabs/GrundinformationenTab';
import { BeschreibungTab } from '@/components/tabs/BeschreibungTab';
import { MedienTab } from '@/components/tabs/MedienTab';
import { ServiceTab } from '@/components/tabs/ServiceTab';
import { PreiseTab } from '@/components/tabs/PreiseTab';
import { StandortTab } from '@/components/tabs/StandortTab';
import { KontaktTab } from '@/components/tabs/KontaktTab';
import { LaendersperreTab } from '@/components/tabs/LaendersperreTab';
import { TagsTab } from '@/components/tabs/TagsTab';
import { VeroeffentlichenTab } from '@/components/tabs/VeroeffentlichenTab';
import { EscortFormData, EscortProfilFormProps, LanguageSkill } from '@/types/escort';
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function EscortProfilForm({ activeTab, onTabChange }: EscortProfilFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EscortFormData>({
    künstlername: '',
    slogan: '',
    beschreibung: '',
    geschlecht: '',
    alter: '',
    größe: '',
    gewicht: '',
    koerperbau: '',
    haarlaenge: '',
    haarfarbe: '',
    brusttyp: '',
    brustgroesse: '',
    intimbereich: '',
    tattoos: [],
    piercings: [],
    rauchen: '',
    alkohol: '',
    nationalität: '',
    sprachen: [],
    services: [],
    anzeigebild: '',
    logo: '',
    bilder: [],
    videos: [],
    stundensatz: '',
    zwei_stunden: '',
    drei_stunden: '',
    uebernachtung: '',
    standardCurrency: 'EUR',
    prices: {},
    extras: '',
    strasse: '',
    hausnummer: '',
    plz: '',
    ort: '',
    bundesland: '',
    land: '',
    anfahrt: '',
    telefon: '',
    whatsapp: '',
    telegram: '',
    signal: '',
    email: '',
    website: '',
    socialMedia: {},
    erreichbar_24h: false,
    termine_spontan: false,
    erreichbarkeit: '',
    agb_akzeptiert: false,
    datenschutz_akzeptiert: false,
    blocked_countries: [],
    tags: {
      custom: [],
      selected: []
    }
  });
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

  const handleSubmit = async () => {
    console.log('handleSubmit wurde aufgerufen');
    console.log('Formular-Daten:', formData);
    
    setIsLoading(true);

    // Validiere Pflichtfelder
    const requiredFields = {
      künstlername: 'Künstlername',
      geschlecht: 'Geschlecht',
      alter: 'Alter',
      größe: 'Größe'
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, _]) => {
        const value = formData[key as keyof EscortFormData];
        return !value || value === '' || value === '0';
      })
      .map(([_, label]) => label);

    console.log('Fehlende Felder:', missingFields);

    if (missingFields.length > 0) {
      toast({
        title: "Fehlende Pflichtfelder",
        description: (
          <div className="space-y-2">
            <p>Bitte füllen Sie folgende Felder aus:</p>
            <ul className="list-disc list-inside">
              {missingFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
            <p className="mt-2">
              Bitte gehen Sie zurück zu den entsprechenden Tabs und füllen Sie die fehlenden Informationen aus.
            </p>
          </div>
        ),
        variant: "destructive",
      });
      
      // Navigiere zum ersten Tab mit fehlenden Feldern
      if (missingFields.includes('Künstlername') || missingFields.includes('Geschlecht') || 
          missingFields.includes('Alter') || missingFields.includes('Größe')) {
        onTabChange('Grundinformationen');
      }
      
      setIsLoading(false);
      return;
    }

    // Prüfe AGBs und Datenschutzerklärung
    if (!formData.agb_akzeptiert || !formData.datenschutz_akzeptiert) {
      toast({
        title: "Zustimmung erforderlich",
        description: "Bitte akzeptieren Sie die AGBs und die Datenschutzerklärung",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sende Daten an den Server...');
      // Bereite die Daten vor
      const submitData = {
        ...formData,
        alter: formData.alter ? parseInt(formData.alter) : 0,
        größe: formData.größe ? parseInt(formData.größe) : 0,
        gewicht: formData.gewicht ? parseInt(formData.gewicht) : null,
        stundensatz: formData.stundensatz ? parseFloat(formData.stundensatz) : 0,
        zwei_stunden: formData.zwei_stunden ? parseFloat(formData.zwei_stunden) : null,
        drei_stunden: formData.drei_stunden ? parseFloat(formData.drei_stunden) : null,
        uebernachtung: formData.uebernachtung ? parseFloat(formData.uebernachtung) : null,
      };

      console.log('Aufbereitete Daten:', submitData);

      const response = await fetch('/api/escort-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();
      console.log('Server-Antwort:', data);

      if (!response.ok) {
        // Zeige detaillierte Fehlermeldung
        if (data.missingFields) {
          throw new Error(`Pflichtfelder fehlen: ${data.missingFields.join(', ')}`);
        }
        throw new Error(data.error || 'Ein Fehler ist aufgetreten');
      }

      toast({
        title: "Erfolg!",
        description: "Ihr Escort-Profil wurde erfolgreich erstellt.",
      });

      // Weiterleitung zur Profilansicht
      router.push('/dashboard/escort-profil/view');

    } catch (error) {
      console.error('Fehler beim Erstellen des Profils:', error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const renderTabContent = () => {
    switch (activeTab) {
      case "Grundinformationen":
        return <GrundinformationenTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Beschreibung":
        return <BeschreibungTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Medien":
        return <MedienTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Service":
        return <ServiceTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Preise":
        return <PreiseTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Standort":
        return <StandortTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Kontakt":
        return <KontaktTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Ländersperre":
        return <LaendersperreTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "#Tags":
        return <TagsTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Veröffentlichen":
        return <VeroeffentlichenTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} isLoading={isLoading} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  // Prüfen ob der User ein Escort-Konto hat
  if (session?.user?.kontotyp !== 'ESCORT' && session?.user?.kontotyp !== 'AGENTUR') {
    return null;
  }

  return (
    <Card className="w-full mb-6">
      <CardContent className="pt-6">
        {renderTabContent()}
      </CardContent>
    </Card>
  );
}
