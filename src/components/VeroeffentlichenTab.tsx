'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface VeroeffentlichenTabProps {
  isLoading: boolean;
  onSubmit: () => void;
}

export function VeroeffentlichenTab({ isLoading, onSubmit }: VeroeffentlichenTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profil veröffentlichen</h3>
        <p className="text-sm text-gray-500 mb-4">
          Überprüfen Sie Ihre Eingaben und veröffentlichen Sie Ihr Profil.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Bitte stellen Sie sicher, dass alle erforderlichen Informationen korrekt und vollständig sind.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Vor der Veröffentlichung:</h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>Überprüfen Sie Ihre persönlichen Informationen</li>
            <li>Stellen Sie sicher, dass Ihre Beschreibung aussagekräftig ist</li>
            <li>Kontrollieren Sie die hochgeladenen Bilder und Videos</li>
            <li>Überprüfen Sie die angegebenen Services und Preise</li>
          </ul>
        </div>

        <Button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,45%)] text-white"
        >
          {isLoading ? 'Wird veröffentlicht...' : 'Profil veröffentlichen'}
        </Button>
      </div>
    </div>
  );
} 