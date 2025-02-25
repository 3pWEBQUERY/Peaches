import { EscortCard } from './EscortCard';

interface Escort {
  id: string;
  name: string;
  alter: number;
  stadt: string;
  bildUrl: string;
  verified: boolean;
  preis: number;
}

interface EscortGridProps {
  escorts: Escort[];
}

export function EscortGrid({ escorts }: EscortGridProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[90%] max-w-[1600px]">
        <section className="py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {escorts.map((escort) => (
              <EscortCard
                key={escort.id}
                id={escort.id}
                name={escort.name}
                alter={escort.alter}
                stadt={escort.stadt}
                bildUrl={escort.bildUrl}
                verified={escort.verified}
                preis={escort.preis}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 