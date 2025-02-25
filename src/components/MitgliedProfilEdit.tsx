'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '@prisma/client';
import ProfileLayout from '@/components/ProfileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface MitgliedProfilEditProps {
  user: {
    id: string;
    email: string;
    password: string;
    anzeigename: string | null;
    profilbild: string | null;
    verifiziert: boolean;
    kontotyp: 'MITGLIED';
    views: number;
    createdAt: Date;
    updatedAt: Date;
    followers: User[];
    following: User[];
    likedBy: User[];
    beschreibung?: string;
  };
}

export function MitgliedProfilEdit({ user }: MitgliedProfilEditProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    anzeigename: user.anzeigename || '',
    beschreibung: user.beschreibung || '',
    profilbild: user.profilbild || '',
  });
  const [previewImage, setPreviewImage] = useState(user.profilbild || '/placeholder-avatar.jpg');

  // Profildaten für das ProfileLayout
  const profileData = {
    name: formData.anzeigename || user.email,
    photosCount: user.likedBy.length || 0,
    followersCount: user.followers.length || 0,
    description: formData.beschreibung || '',
    profilbild: previewImage,
    activity: 'MITGLIED',
    location: '',
    favoriteTags: [
      { name: 'mitglied' }
    ],
    favoriteProfiles: user.followers.slice(0, 3).map(follower => ({
      imageUrl: follower.profilbild || '/placeholder-avatar.jpg',
      alt: follower.anzeigename || 'Follower'
    }))
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Erstelle eine Vorschau des Bildes
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Hier würden Sie normalerweise das Bild zu Ihrem Server hochladen
      // und die URL in formData.profilbild speichern
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Fehler beim Hochladen des Bildes');
        }

        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          profilbild: data.url,
        }));
        toast.success('Bild erfolgreich hochgeladen');
      } catch (error) {
        toast.error('Fehler beim Hochladen des Bildes');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validiere und bereite die Daten vor
      const updateData = {
        anzeigename: formData.anzeigename?.trim() || null,
        beschreibung: formData.beschreibung?.trim() || null,
        profilbild: formData.profilbild?.trim() || null,
      };

      // Überprüfe, ob mindestens ein Feld einen Wert hat
      if (!updateData.anzeigename && !updateData.beschreibung && !updateData.profilbild) {
        toast.error('Bitte füllen Sie mindestens ein Feld aus');
        return;
      }

      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Aktualisieren des Profils');
      }

      toast.success(data.message || 'Profil erfolgreich aktualisiert');
      router.push('/dashboard/mitglied-profil/view');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Fehler beim Aktualisieren des Profils';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      {/* Profile Layout direkt neben der Sidebar */}
      <div className="w-[400px] border-r border-gray-200 bg-white h-screen overflow-y-auto">
        <ProfileLayout {...profileData} />
      </div>
      
      <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card className="w-full mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Bereich 1: Kontaktinformationen */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[hsl(333.3,71.4%,50.6%)]">Kontakt</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">E-Mail</Label>
                        <Input
                          type="email"
                          id="email"
                          value={user.email}
                          disabled
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bereich 2: Profildetails */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[hsl(333.3,71.4%,50.6%)]">Profildetails</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="anzeigename">Anzeigename</Label>
                        <Input
                          type="text"
                          id="anzeigename"
                          value={formData.anzeigename}
                          onChange={(e) => setFormData({ ...formData, anzeigename: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="beschreibung">Beschreibung</Label>
                        <textarea
                          id="beschreibung"
                          value={formData.beschreibung}
                          onChange={(e) => setFormData({ ...formData, beschreibung: e.target.value })}
                          className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          rows={4}
                          placeholder="Beschreibe dich kurz..."
                        />
                      </div>
                      <div>
                        <Label>Profilbild</Label>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="relative h-24 w-24 overflow-hidden rounded-full border border-gray-200">
                            <Image
                              src={previewImage}
                              alt="Profilbild"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageChange}
                              accept="image/*"
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-sm"
                            >
                              Bild ändern
                            </Button>
                            {previewImage !== '/placeholder-avatar.jpg' && (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  setPreviewImage('/placeholder-avatar.jpg');
                                  setFormData(prev => ({ ...prev, profilbild: '' }));
                                }}
                                className="text-sm text-red-500 hover:text-red-700"
                              >
                                Bild entfernen
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bereich 3: Aktionen */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push('/dashboard/mitglied-profil/view')}
                      className="hover:bg-[hsl(333.3,71.4%,50.6%)] hover:text-white"
                    >
                      Abbrechen
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,40%)] text-white"
                    >
                      Speichern
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
    </div>
  );
} 