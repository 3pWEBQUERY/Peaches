'use client';

import React, { useState } from 'react';
import { EscortFormData } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface TagsTabProps {
  formData: EscortFormData;
  setFormData: React.Dispatch<React.SetStateAction<EscortFormData>>;
  onTabChange: (tab: string) => void;
}

// Beliebte Tags (diese könnten später aus einer API kommen)
const popularTags = [
  // Persönlichkeit
  { id: 'freundlich', label: 'Freundlich', category: 'Persönlichkeit' },
  { id: 'humorvoll', label: 'Humorvoll', category: 'Persönlichkeit' },
  { id: 'charmant', label: 'Charmant', category: 'Persönlichkeit' },
  { id: 'selbstbewusst', label: 'Selbstbewusst', category: 'Persönlichkeit' },
  { id: 'verführerisch', label: 'Verführerisch', category: 'Persönlichkeit' },
  
  // Stil
  { id: 'elegant', label: 'Elegant', category: 'Stil' },
  { id: 'glamourös', label: 'Glamourös', category: 'Stil' },
  { id: 'natürlich', label: 'Natürlich', category: 'Stil' },
  { id: 'sportlich', label: 'Sportlich', category: 'Stil' },
  { id: 'luxuriös', label: 'Luxuriös', category: 'Stil' },
  
  // Erfahrung
  { id: 'erfahren', label: 'Erfahren', category: 'Erfahrung' },
  { id: 'geduldig', label: 'Geduldig', category: 'Erfahrung' },
  { id: 'einfühlsam', label: 'Einfühlsam', category: 'Erfahrung' },
  { id: 'diskret', label: 'Diskret', category: 'Erfahrung' },
  { id: 'professionell', label: 'Professionell', category: 'Erfahrung' },
  
  // Interessen
  { id: 'kultur', label: 'Kultur', category: 'Interessen' },
  { id: 'reisen', label: 'Reisen', category: 'Interessen' },
  { id: 'kulinarik', label: 'Kulinarik', category: 'Interessen' },
  { id: 'kunst', label: 'Kunst', category: 'Interessen' },
  { id: 'musik', label: 'Musik', category: 'Interessen' },
];

export function TagsTab({ formData, setFormData, onTabChange }: TagsTabProps) {
  const [newTag, setNewTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Gruppiere Tags nach Kategorie
  const groupedTags = popularTags.reduce((acc, tag) => {
    if (!acc[tag.category]) {
      acc[tag.category] = [];
    }
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<string, typeof popularTags>);

  const addCustomTag = () => {
    if (newTag.trim() && !formData.tags.custom.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: {
          ...formData.tags,
          custom: [...formData.tags.custom, newTag.trim()]
        }
      });
      setNewTag('');
    }
  };

  const removeCustomTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: {
        ...formData.tags,
        custom: formData.tags.custom.filter(tag => tag !== tagToRemove)
      }
    });
  };

  const togglePopularTag = (tagId: string) => {
    setFormData({
      ...formData,
      tags: {
        ...formData.tags,
        selected: formData.tags.selected.includes(tagId)
          ? formData.tags.selected.filter(id => id !== tagId)
          : [...formData.tags.selected, tagId]
      }
    });
  };

  const filteredTags = Object.entries(groupedTags).map(([category, tags]) => ({
    category,
    tags: tags.filter(tag => 
      tag.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(group => group.tags.length > 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[hsl(333.3,71.4%,50.6%)] border-b-2 border-[hsl(333.3,71.4%,50.6%)] pb-2">
          #Tags
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Fügen Sie Tags hinzu, um Ihr Profil besser zu beschreiben.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Eigene Tags */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Eigene Tags</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Neuen Tag eingeben..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
                  className="flex-1"
                />
                <Button
                  onClick={addCustomTag}
                  className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
                >
                  <PlusIcon className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.tags.custom.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-2"
                  >
                    #{tag}
                    <button
                      onClick={() => removeCustomTag(tag)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Beliebte Tags */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Beliebte Tags</h3>
            </div>
            
            <div className="space-y-4">
              <Input
                placeholder="Tags durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />

              {filteredTags.map(({ category, tags }) => (
                <div key={category} className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">
                    {category}
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant={formData.tags.selected.includes(tag.id) ? 'default' : 'outline'}
                        className={cn(
                          "cursor-pointer",
                          formData.tags.selected.includes(tag.id)
                            ? 'bg-[hsl(333.3,71.4%,50.6%)] hover:bg-[hsl(333.3,71.4%,45%)]'
                            : ''
                        )}
                        onClick={() => togglePopularTag(tag.id)}
                      >
                        #{tag.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onTabChange("Ländersperre")}
          >
            Zurück
          </Button>
          <Button
            type="button"
            className="bg-[hsl(333.3,71.4%,50.6%)] text-white hover:bg-[hsl(333.3,71.4%,45%)]"
            onClick={() => onTabChange("Veröffentlichen")}
          >
            Weiter
          </Button>
        </div>
      </div>
    </div>
  );
} 