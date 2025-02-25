'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { KontoTyp } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export function KontotypUpdate() {
  const { data: session, update: updateSession } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Warte auf die Session-Daten
  if (!session) {
    return null;
  }

  // Prüfe ob der User ein Mitglied ist
  const isMitglied = session.user?.kontotyp === 'MITGLIED';

  if (!isMitglied) {
    return null; // Komponente nicht anzeigen wenn User kein Mitglied ist
  }

  const handleKontotypUpdate = async (neuerKontotyp: 'ESCORT' | 'AGENTUR') => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user/update-kontotyp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ neuerKontotyp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten');
      }

      // Session aktualisieren um neue Rolle zu reflektieren
      await updateSession();
      
      // Warte kurz und lade dann die Seite neu
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      toast({
        title: "Erfolg!",
        description: `Dein Konto wurde erfolgreich zu ${neuerKontotyp} aktualisiert.`,
      });

    } catch (error) {
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Werde Escort oder Agentur</CardTitle>
        <CardDescription>
          Wähle deinen gewünschten Kontotyp aus, um ein Profil erstellen zu können.
          <br />
          <span className="block mt-2 text-sm">
            Hinweis: Der Agentur-Kontotyp ist für Agenturen, Clubs und Studios gedacht.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button
          onClick={() => handleKontotypUpdate('ESCORT')}
          disabled={isLoading}
          className="flex-1 bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,45%)]"
        >
          Als Escort registrieren
        </Button>
        <Button
          onClick={() => handleKontotypUpdate('AGENTUR')}
          disabled={isLoading}
          className="flex-1 bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,45%)]"
        >
          Als Agentur registrieren
        </Button>
      </CardContent>
    </Card>
  );
}
