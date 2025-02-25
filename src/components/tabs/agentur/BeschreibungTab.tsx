import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AgenturFormData } from "@/types/agentur";

interface BeschreibungTabProps {
  formData: AgenturFormData;
  setFormData: React.Dispatch<React.SetStateAction<AgenturFormData>>;
  onTabChange: (tab: string) => void;
}

export function BeschreibungTab({ formData, setFormData, onTabChange }: BeschreibungTabProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
            Beschreibung
          </h2>
          <p className="text-sm text-gray-600 pb-4">
            Beschreiben Sie Ihre Agentur, Club oder Studio detailliert und heben Sie Ihre besonderen Merkmale hervor.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Ausführliche Beschreibung</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Beschreiben Sie Ihre Agentur, Ihre Philosophie und was Sie von anderen unterscheidet..."
              className="h-64 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={() => onTabChange("Grundinformationen")}
          variant="outline"
        >
          Zurück
        </Button>
        <Button
          type="button"
          onClick={() => onTabChange("Medien")}
          className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
        >
          Weiter
        </Button>
      </div>
    </div>
  );
} 