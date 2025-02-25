'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent } from '@/components/ui/card';
import { GrundinformationenTab } from '@/components/tabs/agentur/GrundinformationenTab';
import { BeschreibungTab } from '@/components/tabs/agentur/BeschreibungTab';
import { MedienTab } from '@/components/tabs/agentur/MedienTab';
import { InfrastrukturTab } from '@/components/tabs/agentur/InfrastrukturTab';
import { StandortTab } from '@/components/tabs/agentur/StandortTab';
import { VeroeffentlichenTab } from '@/components/tabs/agentur/VeroeffentlichenTab';
import { AgenturFormData } from '@/types/agentur';

interface AgenturProfilFormProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const initialFormData: AgenturFormData = {
  name: '',
  email: '',
  website: '',
  contacts: [],
  openingHours: [
    { day: 'Montag', open: true, from: '09:00', to: '18:00' },
    { day: 'Dienstag', open: true, from: '09:00', to: '18:00' },
    { day: 'Mittwoch', open: true, from: '09:00', to: '18:00' },
    { day: 'Donnerstag', open: true, from: '09:00', to: '18:00' },
    { day: 'Freitag', open: true, from: '09:00', to: '18:00' },
    { day: 'Samstag', open: false, from: '09:00', to: '18:00' },
    { day: 'Sonntag', open: false, from: '09:00', to: '18:00' }
  ],
  preise: [],
  description: '',
  logo: '',
  images: [],
  videos: [],
  infrastructure: [],
  address: '',
  plz: '',
  city: '',
  country: '',
  isActive: false,
  isVerified: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

export function AgenturProfilForm({ activeTab, onTabChange }: AgenturProfilFormProps) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<AgenturFormData>(initialFormData);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Grundinformationen":
        return <GrundinformationenTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Beschreibung":
        return <BeschreibungTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Medien":
        return <MedienTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Infrastruktur":
        return <InfrastrukturTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Standort":
        return <StandortTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      case "Veröffentlichen":
        return <VeroeffentlichenTab formData={formData} setFormData={setFormData} onTabChange={onTabChange} />;
      default:
        return null;
    }
  };

  if (session?.user?.kontotyp !== 'AGENTUR') {
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
