import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AgenturFormData } from "@/types/agentur";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface VeroeffentlichenTabProps {
  formData: AgenturFormData;
  setFormData: React.Dispatch<React.SetStateAction<AgenturFormData>>;
  onTabChange: (tab: string) => void;
}

export function VeroeffentlichenTab({ formData, setFormData, onTabChange }: VeroeffentlichenTabProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handlePublish = async () => {
    try {
      setIsPublishing(true);

      const response = await fetch('/api/agentur-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Fehler beim Veröffentlichen des Profils');
      }

      toast({
        title: "Erfolg!",
        description: "Ihr Agenturprofil wurde erfolgreich veröffentlicht.",
      });

      // Weiterleitung zur Profilansicht
      router.push('/dashboard/agentur-profil/view');

    } catch (error) {
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten',
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // Überprüfe, ob alle erforderlichen Felder ausgefüllt sind
  const isFormValid = Boolean(
    formData.name &&
    formData.email &&
    formData.openingHours?.length > 0
  );

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
            Veröffentlichen
          </h2>
          <p className="text-sm text-gray-600 pb-4">
            Aktivieren Sie Ihr Profil, um es für potentielle Kunden sichtbar zu machen.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Profil aktivieren</Label>
              <p className="text-sm text-gray-600">
                Aktivieren Sie Ihr Profil, um es öffentlich sichtbar zu machen.
              </p>
            </div>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              className="data-[state=checked]:bg-[hsl(333.3,71.4%,50.6%)]"
            />
          </div>

          {!isFormValid && (
            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
              <p className="text-sm">
                Bitte füllen Sie alle erforderlichen Felder aus, bevor Sie das Profil veröffentlichen:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm">
                {!formData.name && <li>Name der Agentur</li>}
                {!formData.email && <li>E-Mail-Adresse</li>}
                {!formData.openingHours?.length && <li>Öffnungszeiten</li>}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={() => onTabChange("Standort")}
          variant="outline"
        >
          Zurück
        </Button>
        <Button
          type="button"
          onClick={handlePublish}
          disabled={isPublishing || !isFormValid || !formData.isActive}
          className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
        >
          {isPublishing ? "Wird veröffentlicht..." : "Profil veröffentlichen"}
        </Button>
      </div>
    </div>
  );
} 