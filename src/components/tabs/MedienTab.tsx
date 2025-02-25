'use client';

import React, { useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { EscortFormData } from '@/types/escort';
import Image from 'next/image';

interface MedienTabProps {
  formData: EscortFormData;
  setFormData: React.Dispatch<React.SetStateAction<EscortFormData>>;
  onTabChange: (tab: string) => void;
}

export function MedienTab({ formData, setFormData, onTabChange }: MedienTabProps) {
  const { toast } = useToast();
  const anzeigebildInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleAnzeigebildUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Bildupload fehlgeschlagen');
      }

      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        anzeigebild: data.url,
      }));

      toast({
        title: "Erfolg",
        description: "Anzeigebild wurde erfolgreich hochgeladen",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Bildupload fehlgeschlagen",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const maxFiles = 30 - formData.bilder.length;
    
    if (files.length > maxFiles) {
      toast({
        title: "Hinweis",
        description: `Es können nur ${maxFiles} weitere Bilder hochgeladen werden. Die ersten ${maxFiles} Bilder werden hochgeladen.`,
        variant: "default",
      });
    }

    const filesToUpload = files.slice(0, maxFiles);
    let uploadedCount = 0;
    const totalFiles = filesToUpload.length;

    try {
      toast({
        title: "Upload gestartet",
        description: `${totalFiles} Bilder werden hochgeladen...`,
      });

      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Bildupload fehlgeschlagen');
        }

        const data = await response.json();
        
        setFormData(prev => ({
          ...prev,
          bilder: [...prev.bilder, data.url],
        }));

        uploadedCount++;
        
        // Zeige Fortschritt an
        if (uploadedCount < totalFiles) {
          toast({
            title: "Upload läuft",
            description: `${uploadedCount} von ${totalFiles} Bildern hochgeladen...`,
          });
        }
      }

      // Zeige finale Erfolgsmeldung
      toast({
        title: "Erfolg",
        description: `${uploadedCount} Bilder wurden erfolgreich hochgeladen`,
        variant: "default",
      });

      // Reset das File-Input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      toast({
        title: "Fehler",
        description: `Fehler beim Upload. ${uploadedCount} von ${totalFiles} Bildern wurden hochgeladen.`,
        variant: "destructive",
      });
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Videoupload fehlgeschlagen');
      }

      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        videos: [...prev.videos, data.url],
      }));

      toast({
        title: "Erfolg",
        description: "Video wurde erfolgreich hochgeladen",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Videoupload fehlgeschlagen",
        variant: "destructive",
      });
    }
  };

  const removeAnzeigebild = () => {
    setFormData(prev => ({
      ...prev,
      anzeigebild: '',
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bilder: prev.bilder.filter((_, i) => i !== index),
    }));
  };

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
            Medien
          </h2>
          <p className="text-sm text-gray-600 pb-4">
            Laden Sie Ihr Anzeigebild, Galerie und Videos hoch, um sich optimal zu präsentieren.
          </p>
        </div>

        {/* Anzeigebild Upload */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Anzeigebild <span className="text-[hsl(333.3,71.4%,50.6%)]">*</span></h3>
          <p className="text-sm text-gray-600">Laden Sie Ihr Hauptbild hoch (PNG oder JPG, max. 5MB)</p>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                <label htmlFor="anzeigebild-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[hsl(333.3,71.4%,50.6%)] hover:text-[hsl(333.3,71.4%,45%)]">
                  <span>Anzeigebild hochladen</span>
                  <input
                    id="anzeigebild-upload"
                    name="anzeigebild-upload"
                    type="file"
                    accept="image/png,image/jpeg"
                    className="sr-only"
                    ref={anzeigebildInputRef}
                    onChange={handleAnzeigebildUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Galerie Upload */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Galerie</h3>
          <p className="text-sm text-gray-600">Laden Sie bis zu 30 Bilder hoch (PNG, JPG oder WebP, max. 10MB pro Bild)</p>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                <label htmlFor="gallery-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[hsl(333.3,71.4%,50.6%)] hover:text-[hsl(333.3,71.4%,45%)]">
                  <span>Bilder hochladen</span>
                  <input
                    id="gallery-upload"
                    name="gallery-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    className="sr-only"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">{formData.bilder.length} von 30 Bildern hochgeladen</p>
            </div>
          </div>
        </div>

        {/* Video Upload */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Videos</h3>
          <p className="text-sm text-gray-600">Laden Sie bis zu 5 Videos hoch (MP4, MOV, AVI oder WebM, max. 250MB pro Video)</p>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                <label htmlFor="video-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[hsl(333.3,71.4%,50.6%)] hover:text-[hsl(333.3,71.4%,45%)]">
                  <span>Videos hochladen</span>
                  <input
                    id="video-upload"
                    name="video-upload"
                    type="file"
                    accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
                    multiple
                    className="sr-only"
                    ref={videoInputRef}
                    onChange={handleVideoUpload}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">{formData.videos.length} von 5 Videos hochgeladen</p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          {formData.anzeigebild && (
            <div>
              <h4 className="text-sm font-medium mb-2">Anzeigebild Vorschau</h4>
              <div className="relative">
                <div className="relative aspect-video w-full max-w-md">
                  <Image
                    src={formData.anzeigebild}
                    alt="Anzeigebild"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <button
                  onClick={removeAnzeigebild}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {formData.bilder.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Galerie Vorschau</h4>
              <div className="grid grid-cols-3 gap-4">
                {formData.bilder.map((bild, index) => (
                  <div key={index} className="relative">
                    <div className="relative aspect-video">
                      <Image
                        src={bild}
                        alt={`Bild ${index + 1}`}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData.videos.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Video Vorschau</h4>
              <div className="grid grid-cols-2 gap-4">
                {formData.videos.map((video, index) => (
                  <div key={index} className="relative">
                    <video
                      src={video}
                      controls
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      onClick={() => removeVideo(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => onTabChange("Beschreibung")}
        >
          Zurück
        </Button>
        <Button
          type="button"
          className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
          onClick={() => onTabChange("Service")}
        >
          Weiter
        </Button>
      </div>
    </div>
  );
} 