import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface EscortCardProps {
  id: string;
  name: string;
  alter: number;
  stadt: string;
  bildUrl: string;
  verified: boolean;
  preis: number;
}

function createUrlSlug(name: string, id: string): string {
  // Entferne Sonderzeichen und ersetze Leerzeichen durch Bindestriche
  const cleanName = name
    .toLowerCase()
    .replace(/[äöüß]/g, (match) => {
      const umlauts: { [key: string]: string } = {
        'ä': 'ae',
        'ö': 'oe',
        'ü': 'ue',
        'ß': 'ss'
      };
      return umlauts[match] || match;
    })
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // Nimm die letzten 6 Zeichen der ID
  const shortId = id.slice(-6);

  return `${cleanName}-${shortId}`;
}

export function EscortCard({ id, name, alter, stadt, bildUrl, verified }: EscortCardProps) {
  const urlSlug = createUrlSlug(name, id);
  
  return (
    <Link href={`/escort/${urlSlug}`}>
      <Card className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={bildUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {verified && (
            <Badge className="absolute right-2 top-2 bg-blue-500/90 backdrop-blur-sm">
              ✓ Verifiziert
            </Badge>
          )}
          
          {/* Info auf dem Bild */}
          <div className="absolute bottom-0 left-0 w-full p-4 text-white">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-xl font-semibold drop-shadow-lg">{name}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="drop-shadow-lg">{stadt}</span>
                  <span className="text-xs">•</span>
                  <span className="drop-shadow-lg">{alter} Jahre</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
} 