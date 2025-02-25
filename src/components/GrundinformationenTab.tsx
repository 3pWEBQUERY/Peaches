'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/PhoneInput';
import { FormData } from '@/types/form';
import { EscortFormData } from '@/types/escort';

interface OpeningHours {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

interface ContactInfo {
  type: string;
  value: string;
}

interface GrundinformationenTabProps {
  formData: EscortFormData;
  setFormData: React.Dispatch<React.SetStateAction<EscortFormData>>;
  onTabChange: (tab: string) => void;
}

export function GrundinformationenTab({ formData, setFormData, onTabChange }: GrundinformationenTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Grundinformationen</h3>
        <p className="text-sm text-gray-500 mb-4">
          Geben Sie Ihre persönlichen Informationen ein.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="künstlername" className="block text-sm font-medium text-gray-700 mb-1">
            Künstlername
          </label>
          <input
            id="künstlername"
            value={formData.künstlername}
            onChange={(e) => setFormData({...formData, künstlername: e.target.value})}
            required
            placeholder="Ihr Künstlername"
            className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="alter" className="block text-sm font-medium text-gray-700 mb-1">
              Alter
            </label>
            <input
              id="alter"
              type="number"
              value={formData.alter}
              onChange={(e) => setFormData({...formData, alter: e.target.value})}
              required
              placeholder="18"
              min="18"
              max="99"
              className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="größe" className="block text-sm font-medium text-gray-700 mb-1">
              Größe (cm)
            </label>
            <input
              id="größe"
              type="number"
              value={formData.größe}
              onChange={(e) => setFormData({...formData, größe: e.target.value})}
              required
              placeholder="170"
              min="140"
              max="220"
              className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="gewicht" className="block text-sm font-medium text-gray-700 mb-1">
              Gewicht (kg)
            </label>
            <input
              id="gewicht"
              type="number"
              value={formData.gewicht}
              onChange={(e) => setFormData({...formData, gewicht: e.target.value})}
              placeholder="60"
              min="40"
              max="150"
              className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="nationalität" className="block text-sm font-medium text-gray-700 mb-1">
              Nationalität
            </label>
            <input
              id="nationalität"
              value={formData.nationalität}
              onChange={(e) => setFormData({...formData, nationalität: e.target.value})}
              placeholder="Ihre Nationalität"
              className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="stundensatz" className="block text-sm font-medium text-gray-700 mb-1">
            Stundensatz (€)
          </label>
          <input
            id="stundensatz"
            type="number"
            value={formData.stundensatz}
            onChange={(e) => setFormData({...formData, stundensatz: e.target.value})}
            required
            placeholder="150"
            min="0"
            step="10"
            className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
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