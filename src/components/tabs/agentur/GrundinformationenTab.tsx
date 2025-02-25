import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AgenturFormData } from "@/types/agentur";

interface GrundinformationenTabProps {
  formData: AgenturFormData;
  setFormData: React.Dispatch<React.SetStateAction<AgenturFormData>>;
  onTabChange: (tab: string) => void;
}

export function GrundinformationenTab({ formData, setFormData, onTabChange }: GrundinformationenTabProps) {
  const handleOpeningHourChange = (index: number, field: 'open' | 'from' | 'to', value: boolean | string) => {
    const newOpeningHours = [...formData.openingHours];
    newOpeningHours[index] = {
      ...newOpeningHours[index],
      [field]: value
    };
    setFormData({ ...formData, openingHours: newOpeningHours });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
            Grundinformationen
          </h2>
          <p className="text-sm text-gray-600 pb-4">
            Geben Sie die grundlegenden Informationen und Öffnungszeiten Ihrer Agentur, Club oder Studio ein.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name der Agentur *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Geben Sie den Namen Ihrer Agentur ein"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slogan">Slogan</Label>
            <Input
              id="slogan"
              value={formData.slogan || ''}
              onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
              placeholder="Ein einprägsamer Slogan für Ihre Agentur"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefon">Telefon</Label>
            <Input
              id="telefon"
              type="tel"
              value={formData.telefon || ''}
              onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
              placeholder="+49 123 4567890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="kontakt@ihre-agentur.de"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website || ''}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://www.ihre-agentur.de"
            />
          </div>

          <div className="space-y-4">
            <Label>Öffnungszeiten</Label>
            {formData.openingHours.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32">
                  <Label>{day.day}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={day.open}
                    onCheckedChange={(checked) => handleOpeningHourChange(index, 'open', checked)}
                    className="data-[state=checked]:bg-[hsl(333.3,71.4%,50.6%)]"
                  />
                  <span className="text-sm text-gray-600">
                    {day.open ? 'Geöffnet' : 'Geschlossen'}
                  </span>
                </div>
                {day.open && (
                  <>
                    <Input
                      type="time"
                      value={day.from}
                      onChange={(e) => handleOpeningHourChange(index, 'from', e.target.value)}
                      className="w-32"
                    />
                    <span>bis</span>
                    <Input
                      type="time"
                      value={day.to}
                      onChange={(e) => handleOpeningHourChange(index, 'to', e.target.value)}
                      className="w-32"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => onTabChange("Beschreibung")}
          className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
        >
          Weiter
        </Button>
      </div>
    </div>
  );
} 