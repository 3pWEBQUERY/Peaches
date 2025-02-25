'use client';

import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import type { FormData } from '@/types/form';
import { Button } from '@/components/ui/button';
import { EscortFormData } from '@/types/escort';

interface GalerieTabProps {
  formData: EscortFormData;
  setFormData: React.Dispatch<React.SetStateAction<EscortFormData>>;
  onTabChange: (tab: string) => void;
}

export function GalerieTab({ formData, setFormData, onTabChange }: GalerieTabProps) {
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        bilder: [...prev.bilder, data.url],
      }));
    } catch (error) {
      console.error('Fehler beim Bildupload:', error);
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
    } catch (error) {
      console.error('Fehler beim Videoupload:', error);
    }
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
            Laden Sie Ihr Logo, Bilder und Videos hoch, um Ihr Unternehmen optimal zu präsentieren.
          </p>
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Logo <span className="text-[hsl(333.3,71.4%,50.6%)]">*</span></h3>
          <p className="text-sm text-gray-600">Laden Sie Ihr Unternehmenslogo hoch (PNG oder JPG, max. 5MB)</p>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[hsl(333.3,71.4%,50.6%)] hover:text-[hsl(333.3,71.4%,45%)]">
                  <span>Logo hochladen</span>
                  <input
                    id="logo-upload"
                    name="logo-upload"
                    type="file"
                    accept="image/png,image/jpeg"
                    className="sr-only"
                    required
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          localStorage.setItem('companyLogo', reader.result as string);
                          setFormData({...formData, logo: reader.result as string});
                        };
                        reader.readAsDataURL(file);
                      } else {
                        toast({
                          title: "Fehler",
                          description: "Die Datei ist zu groß. Maximale Größe ist 5MB.",
                          variant: "destructive",
                        });
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Galerie Upload */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Bilder</h3>
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
          {formData.logo && (
            <div>
              <h4 className="text-sm font-medium mb-2">Logo Vorschau</h4>
              <img src={formData.logo} alt="Logo" className="max-h-32 object-contain" />
            </div>
          )}
          
          {formData.bilder.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Galerie Vorschau</h4>
              <div className="grid grid-cols-3 gap-4">
                {formData.bilder.map((bild, index) => (
                  <div key={index} className="relative">
                    <img
                      src={bild}
                      alt={`Bild ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
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
          onClick={() => onTabChange("Infrastruktur")}
        >
          Weiter
        </Button>
      </div>
    </div>
  );
} 