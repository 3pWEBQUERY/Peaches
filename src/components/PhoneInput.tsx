'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  id: string;
}

const countryOptions = [
  { code: 'CH', prefix: '+41', flag: '🇨🇭' },
  { code: 'DE', prefix: '+49', flag: '🇩🇪' },
  { code: 'AT', prefix: '+43', flag: '🇦🇹' },
];

export function PhoneInput({ value, onChange, required, placeholder, id }: PhoneInputProps) {
  // Extrahiere Vorwahl und Nummer aus dem value
  const [prefix, setPrefix] = useState(() => {
    const foundPrefix = countryOptions.find(option => value.startsWith(option.prefix));
    return foundPrefix?.prefix || '+41'; // Schweiz als Standard
  });

  const [number, setNumber] = useState(() => {
    const foundPrefix = countryOptions.find(option => value.startsWith(option.prefix));
    return foundPrefix ? value.slice(foundPrefix.prefix.length) : value;
  });

  const handlePrefixChange = (newPrefix: string) => {
    setPrefix(newPrefix);
    onChange(newPrefix + number);
  };

  const handleNumberChange = (newNumber: string) => {
    setNumber(newNumber);
    onChange(prefix + newNumber);
  };

  return (
    <div className="relative">
      <Select value={prefix} onValueChange={handlePrefixChange}>
        <SelectTrigger className="absolute left-0 top-0 bottom-0 w-[100px] rounded-r-none border-r-0 bg-gray-50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {countryOptions.map(option => (
            <SelectItem key={option.code} value={option.prefix}>
              <span className="flex items-center gap-2">
                <span className="text-lg">{option.flag}</span>
                <span>{option.prefix}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        id={id}
        value={number}
        onChange={(e) => handleNumberChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="pl-[110px]"
      />
    </div>
  );
} 