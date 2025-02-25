'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, EscortProfil } from '@prisma/client';
import { toast } from 'sonner';
import ProfileLayout from '@/components/ProfileLayout';

interface NewsfeedCreateProps {
  data: {
    user: User & {
      escortProfil?: EscortProfil;
      verwalteteEscorts?: EscortProfil[];
    };
  };
}

export default function NewsfeedCreate({ data }: NewsfeedCreateProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    content: '',
    images: [] as string[],
    escortProfilId: '',
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [escortProfiles, setEscortProfiles] = useState<EscortProfil[]>([]);

  useEffect(() => {
    // Wenn der User eine Agentur ist, hole die verwalteten Escort-Profile
    if (data.user.kontotyp === 'AGENTUR' && data.user.verwalteteEscorts) {
      setEscortProfiles(data.user.verwalteteEscorts);
    }
    // Wenn der User ein Escort ist, setze das eigene Profil
    else if (data.user.kontotyp === 'ESCORT' && data.user.escortProfil) {
      setEscortProfiles([data.user.escortProfil]);
      setFormData(prev => ({ ...prev, escortProfilId: data.user.escortProfil!.id }));
    }
  }, [data.user]);

  // Profildaten für das ProfileLayout
  const profileData = {
    name: data.user.anzeigename || data.user.email,
    photosCount: 0,
    followersCount: 0,
    description: data.user.beschreibung || '',
    profilbild: data.user.profilbild || '/placeholder-avatar.jpg',
    activity: data.user.kontotyp,
    location: '',
    favoriteTags: [
      { name: 'newsfeed' },
      { name: 'social' }
    ],
    favoriteProfiles: []
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      
      // Erstelle Vorschau-URLs für die Bilder
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => {
      // URL.revokeObjectURL für die entfernte URL aufrufen
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Zuerst die Bilder hochladen
      const uploadedImageUrls = [];
      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Fehler beim Hochladen der Bilder');
        }

        const { url } = await uploadResponse.json();
        uploadedImageUrls.push(url);
      }

      // Dann den Post erstellen
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: formData.content,
          images: uploadedImageUrls,
          escortProfilId: formData.escortProfilId || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Erstellen des Posts');
      }

      toast.success('Post erfolgreich erstellt');
      router.push('/dashboard/newsfeed/view');
    } catch (error) {
      toast.error('Fehler beim Erstellen des Posts');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      {/* Profile Layout (Bereich 2) */}
      <div className="w-[400px] border-r border-gray-200 bg-white h-screen overflow-y-auto">
        <ProfileLayout {...profileData} />
      </div>
      
      {/* Editor (Bereich 3) */}
      <main className="flex-1 h-screen overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto p-8">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {data.user.kontotyp === 'AGENTUR' && escortProfiles.length > 0 && (
                  <div>
                    <Label htmlFor="escortProfil">Für welches Profil?</Label>
                    <Select
                      value={formData.escortProfilId}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, escortProfilId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wähle ein Profil" />
                      </SelectTrigger>
                      <SelectContent>
                        {escortProfiles.map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>
                            {profile.künstlername}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="content">Text</Label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
                    placeholder="Was möchtest du teilen?"
                  />
                </div>

                <div>
                  <Label>Bilder</Label>
                  <div className="mt-2 space-y-4">
                    {imagePreviewUrls.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} className="relative">
                            <div className="relative aspect-video">
                              <Image
                                src={url}
                                alt={`Bild ${index + 1}`}
                                fill
                                className="rounded-lg object-cover"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => removeImage(index)}
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        Bilder hinzufügen
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/dashboard/newsfeed/view')}
                    className="hover:bg-[hsl(333.3,71.4%,50.6%)] hover:text-white"
                  >
                    Abbrechen
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,40%)] text-white"
                  >
                    Veröffentlichen
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 