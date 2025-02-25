import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AgenturFormData } from "@/types/agentur";

interface PreiseTabProps {
  formData: AgenturFormData;
  setFormData: React.Dispatch<React.SetStateAction<AgenturFormData>>;
  onTabChange: (tab: string) => void;
}

export function PreiseTab({ formData, setFormData, onTabChange }: PreiseTabProps) {
  const handleAddPreis = () => {
    setFormData({
      ...formData,
      preise: [...formData.preise, { duration: '', amount: 0, currency: 'EUR' }]
    });
  };

  const handlePreisChange = (index: number, field: keyof typeof formData.preise[0], value: string | number) => {
    const newPreise = [...formData.preise];
    newPreise[index] = {
      ...newPreise[index],
      [field]: field === 'amount' ? Number(value) : value
    };
    setFormData({
      ...formData,
      preise: newPreise
    });
  };

  const handleRemovePreis = (index: number) => {
    setFormData({
      ...formData,
      preise: formData.preise.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Preise</h2>
        <p className="mt-1 text-sm text-gray-600">
          Legen Sie die Preise für Ihre Services fest.
        </p>
      </div>

      <div className="space-y-4">
        {formData.preise.map((preis, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 items-end">
            <div>
              <Label>Dauer</Label>
              <Input
                value={preis.duration}
                onChange={(e) => handlePreisChange(index, 'duration', e.target.value)}
                placeholder="z.B. 1 Stunde"
              />
            </div>
            <div>
              <Label>Betrag</Label>
              <Input
                type="number"
                value={preis.amount}
                onChange={(e) => handlePreisChange(index, 'amount', e.target.value)}
                placeholder="0"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleRemovePreis(index)}
            >
              Entfernen
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddPreis}
          className="w-full"
        >
          Preis hinzufügen
        </Button>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={() => onTabChange("Services")}
          variant="outline"
        >
          Zurück
        </Button>
        <Button
          type="button"
          onClick={() => onTabChange("Standort")}
          className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
        >
          Weiter
        </Button>
      </div>
    </div>
  );
} 