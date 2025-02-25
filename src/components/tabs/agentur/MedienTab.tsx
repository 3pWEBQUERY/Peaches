import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AgenturFormData } from "@/types/agentur";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Loader2, X } from "lucide-react";

interface MedienTabProps {
  formData: AgenturFormData;
  setFormData: React.Dispatch<React.SetStateAction<AgenturFormData>>;
  onTabChange: (tab: string) => void;
}

export function MedienTab({ formData, setFormData, onTabChange }: MedienTabProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFile = async (file: File, type: 'logo' | 'images' | 'videos') => {
    try {
      setIsUploading(true);
      setUploadError(null);
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload fehlgeschlagen');
      }

      const { url } = await response.json();

      setFormData(prev => {
        if (type === 'logo') {
          return { ...prev, logo: url };
        } else if (type === 'images') {
          return { ...prev, images: [...prev.images, url] };
        } else {
          return { ...prev, videos: [...prev.videos, url] };
        }
      });
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload fehlgeschlagen');
    } finally {
      setIsUploading(false);
    }
  };

  const onDropLogo = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      await uploadFile(acceptedFiles[0], 'logo');
    }
  }, []);

  const onDropImages = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      await uploadFile(file, 'images');
    }
  }, []);

  const onDropVideos = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      await uploadFile(file, 'videos');
    }
  }, []);

  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
    onDrop: onDropLogo,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxFiles: 1
  });

  const { getRootProps: getImagesRootProps, getInputProps: getImagesInputProps } = useDropzone({
    onDrop: onDropImages,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    }
  });

  const { getRootProps: getVideosRootProps, getInputProps: getVideosInputProps } = useDropzone({
    onDrop: onDropVideos,
    accept: {
      'video/mp4': [],
      'video/quicktime': [],
      'video/x-msvideo': [],
      'video/webm': []
    }
  });

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const removeLogo = () => {
    setFormData(prev => ({
      ...prev,
      logo: undefined
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
            Laden Sie Ihr Logo, Bilder und Videos hoch, um Ihre Agentur, Club oder Studio visuell zu präsentieren.
          </p>
        </div>

        {uploadError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {uploadError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {/* Logo-Upload */}
          <div className="space-y-2">
            <Label>Logo</Label>
            <div {...getLogoRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[hsl(333.3,71.4%,50.6%)] transition-colors">
              <input {...getLogoInputProps()} />
              {formData.logo ? (
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src={formData.logo}
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLogo();
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Ziehen Sie Ihr Logo hierher oder klicken Sie zum Auswählen
                </p>
              )}
            </div>
          </div>

          {/* Bildupload-Bereich */}
          <div className="space-y-2">
            <Label>Bilder</Label>
            <div {...getImagesRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[hsl(333.3,71.4%,50.6%)] transition-colors">
              <input {...getImagesInputProps()} />
              <p className="text-sm text-gray-600">
                Ziehen Sie Bilder hierher oder klicken Sie zum Auswählen
              </p>
            </div>
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={image}
                      alt={`Bild ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video-Upload-Bereich */}
          <div className="space-y-2">
            <Label>Videos</Label>
            <div {...getVideosRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[hsl(333.3,71.4%,50.6%)] transition-colors">
              <input {...getVideosInputProps()} />
              <p className="text-sm text-gray-600">
                Ziehen Sie Videos hierher oder klicken Sie zum Auswählen
              </p>
            </div>
            {formData.videos.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {formData.videos.map((video, index) => (
                  <div key={index} className="relative">
                    <video
                      src={video}
                      controls
                      className="w-full rounded-lg"
                    />
                    <button
                      onClick={() => removeVideo(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isUploading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg flex items-center gap-2">
            <Loader2 className="animate-spin" />
            <span>Upload läuft...</span>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={() => onTabChange("Beschreibung")}
          variant="outline"
        >
          Zurück
        </Button>
        <Button
          type="button"
          onClick={() => onTabChange("Infrastruktur")}
          className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
        >
          Weiter
        </Button>
      </div>
    </div>
  );
} 