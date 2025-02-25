export interface AgenturFormData {
  // Grundinformationen
  name: string;
  email: string;
  website?: string;
  slogan?: string;
  kontaktperson?: string;
  telefon?: string;
  contacts: {
    type: string;
    value: string;
  }[];
  
  // Öffnungszeiten
  openingHours: {
    day: string;
    open: boolean;
    from: string;
    to: string;
  }[];

  // Preise
  preise: {
    duration: string;
    amount: number;
    currency: string;
  }[];

  // Beschreibung
  description?: string;
  
  // Medien
  logo?: string;
  images: string[];
  videos: string[];

  // Infrastruktur
  infrastructure?: string[];

  // Standort
  address?: string;
  plz?: string;
  city?: string;
  country?: string;

  // Status
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
} 