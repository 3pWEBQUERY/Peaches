export interface LanguageSkill {
  code: string;
  level: number; // 1-5 Sterne
}

export interface EscortFormData {
  künstlername: string;
  slogan: string;
  beschreibung: string;
  geschlecht: string;
  alter: string;
  // Optische Merkmale
  größe: string;
  gewicht: string;
  koerperbau: string;
  haarlaenge: string;
  haarfarbe: string;
  brusttyp: string;
  brustgroesse: string;
  intimbereich: string;
  tattoos: string[];
  piercings: string[];
  // Sonstiges
  rauchen: string;
  alkohol: string;
  // Weitere Felder
  nationalität: string;
  sprachen: LanguageSkill[];
  services: string[];
  // Medien
  anzeigebild: string;
  logo: string;
  bilder: string[];
  videos: string[];
  // Preise
  stundensatz: string;
  zwei_stunden: string;
  drei_stunden: string;
  uebernachtung: string;
  standardCurrency: 'CHF' | 'EUR';
  prices: {
    [key: string]: {
      amount: string;
      currency: 'CHF' | 'EUR';
    };
  };
  extras: string;
  // Standort
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  bundesland: string;
  land: string;
  anfahrt: string;
  // Kontakt
  telefon: string;
  whatsapp: string;
  telegram: string;
  signal: string;
  email: string;
  website: string;
  socialMedia: {
    [key: string]: string;
  };
  erreichbar_24h: boolean;
  termine_spontan: boolean;
  erreichbarkeit: string;
  // Zustimmungen
  agb_akzeptiert: boolean;
  datenschutz_akzeptiert: boolean;
  blocked_countries?: string[];
  tags: {
    custom: string[];
    selected: string[];
  };
}

export interface EscortProfilFormProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
} 