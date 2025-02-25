import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { worldCountries } from "@/data/world-countries";
import { Globe2, RefreshCw, Clock, Mail } from 'lucide-react';

interface Country {
  code: string;
  name: string;
}

function getCountryName(code: string): string {
  for (const continent of worldCountries) {
    const country = continent.countries.find(
      (country: Country) => country.code === code.toUpperCase()
    );
    if (country) {
      return country.name;
    }
  }
  return code;
}

interface InfoBarProps {
  nationality: string;
  updatedAt: Date;
  lastOnline: Date;
  responseTime: string;
}

export default function InfoBar({
  nationality,
  updatedAt,
  lastOnline,
  responseTime,
}: InfoBarProps) {
  return (
    <div className="grid grid-cols-4 gap-4 py-3 px-6 bg-white/90 shadow-lg backdrop-blur-md text-gray-800 text-sm mt-[-20px] rounded-lg border border-gray-100/20">
      <div className="flex flex-col relative">
        <div className="flex items-center pl-7 mb-[-3px]">
          <span className="font-medium">Nationalität</span>
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <Globe2 className="w-5 h-5 text-[hsl(346.8,77.2%,49.8%)]" />
        </div>
        <div className="flex items-center pl-7">
          <span className="font-medium">{getCountryName(nationality)}</span>
        </div>
      </div>

      <div className="flex flex-col relative">
        <div className="flex items-center pl-7 mb-[-3px]">
          <span className="font-medium">Aktualisiert</span>
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <RefreshCw className="w-5 h-5 text-[hsl(346.8,77.2%,49.8%)]" />
        </div>
        <div className="flex items-center pl-7">
          <span className="font-medium">
            {formatDistanceToNow(updatedAt, {
              addSuffix: true,
              locale: de,
            })}
          </span>
        </div>
      </div>

      <div className="flex flex-col relative">
        <div className="flex items-center pl-7 mb-[-3px]">
          <span className="font-medium">Zuletzt online</span>
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <Clock className="w-5 h-5 text-[hsl(346.8,77.2%,49.8%)]" />
        </div>
        <div className="flex items-center pl-7">
          <span className="font-medium">
            {formatDistanceToNow(lastOnline, {
              addSuffix: true,
              locale: de,
            })}
          </span>
        </div>
      </div>

      <div className="flex flex-col relative">
        <div className="flex items-center pl-7 mb-[-3px]">
          <span className="font-medium">Antwortzeit</span>
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <Mail className="w-5 h-5 text-[hsl(346.8,77.2%,49.8%)]" />
        </div>
        <div className="flex items-center pl-7">
          <span className="font-medium">{responseTime}</span>
        </div>
      </div>
    </div>
  );
} 