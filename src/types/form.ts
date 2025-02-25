export interface OpeningHours {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface ContactInfo {
  type: string;
  value: string;
}

export interface FormData {
  name: string;
  email: string;
  website: string;
  contacts: ContactInfo[];
  openingHours: {
    monday: OpeningHours;
    tuesday: OpeningHours;
    wednesday: OpeningHours;
    thursday: OpeningHours;
    friday: OpeningHours;
    saturday: OpeningHours;
    sunday: OpeningHours;
  };
  description?: string;
  address?: string;
  plz?: string;
  city?: string;
  country?: string;
  images?: string[];
  infrastructure?: string[];
  logo?: string;
  videos?: string[];
} 