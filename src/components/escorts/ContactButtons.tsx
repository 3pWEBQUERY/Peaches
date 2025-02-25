'use client';

import { Phone, MessageCircle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ContactButtonsProps {
  contacts: Array<{
    type: string;
    value: string;
    isPublic: boolean;
    preferredTime?: string | null;
  }>;
  escortId: string;
  displayName?: string;
  userId?: string;
}

export default function ContactButtons({ contacts, escortId, displayName, userId }: ContactButtonsProps) {
  const router = useRouter();

  const handleMessage = () => {
    if (userId) {
      router.push(`/messages?userId=${userId}`);
    } else {
      const messageButton = document.querySelector('[data-message-button]') as HTMLButtonElement;
      if (messageButton) messageButton.click();
    }
  };

  const phoneContact = contacts.find(c => c.type === 'phone' && c.isPublic);
  const whatsappContact = contacts.find(c => c.type === 'whatsapp' && c.isPublic);
  const websiteContact = contacts.find(c => c.type === 'website' && c.isPublic);

  return (
    <div className="p-4">
      {/* Hinweisbereich für Mitglieder */}
      <div className="mb-6 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg p-4 border border-pink-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-[hsl(346.8,77.2%,49.8%)]" />
          <h3 className="font-semibold text-gray-900">Mitglieder-Vorteile</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Als registriertes Mitglied können Sie direkte Nachrichten an <span className="font-semibold">{displayName || 'diesen Escort'}</span> senden. 
          Genießen Sie eine sichere und diskrete Kommunikation über unsere Plattform.
        </p>
      </div>

      {/* Trennlinie */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500 bg-white">Kontaktmöglichkeiten</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2">
      {phoneContact && (
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2 bg-[hsl(346.8,77.2%,49.8%)] hover:bg-[hsl(346.8,77.2%,45%)] hover:text-white text-white" 
          onClick={() => window.location.href = `tel:${phoneContact.value}`}
        >
          <Phone className="h-4 w-4" />
          <span>Anrufen</span>
        </Button>
      )}
      
      {whatsappContact && (
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90 hover:text-white" 
          onClick={() => window.open(`https://wa.me/${whatsappContact.value.replace(/\s+/g, '')}`, '_blank')}
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp</span>
        </Button>
      )}

      <Button 
        variant="outline" 
        className="w-full flex items-center gap-2 bg-[hsl(0,72.2%,50.6%)] hover:bg-[hsl(0,72.2%,45%)] hover:text-white text-white" 
        onClick={handleMessage}
      >
        <MessageCircle className="h-4 w-4" />
        <span>Nachricht</span>
      </Button>

      {websiteContact && (
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2 bg-[hsl(346.8,77.2%,49.8%)] hover:bg-[hsl(346.8,77.2%,45%)] hover:text-white text-white" 
          onClick={() => window.open(websiteContact.value, '_blank')}
        >
          <Globe className="h-4 w-4" />
          <span>Website</span>
        </Button>
      )}
      </div>
    </div>
  );
} 