import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { EscortGrid } from '../components/EscortGrid';
import { prisma } from '@/lib/prisma';

async function getEscorts() {
  const escorts = await prisma.escortProfil.findMany({
    select: {
      id: true,
      künstlername: true,
      alter: true,
      ort: true,
      bilder: true,
      stundensatz: true,
      escortUser: {
        select: {
          verifiziert: true
        }
      }
    },
    take: 15
  });

  return escorts.map(escort => ({
    id: escort.id,
    name: escort.künstlername,
    alter: escort.alter,
    stadt: escort.ort || 'Keine Angabe',
    bildUrl: escort.bilder[0] || '/placeholder-escort.jpg',
    verified: escort.escortUser?.verifiziert || false,
    preis: escort.stundensatz
  }));
}

export default async function Home() {
  const escorts = await getEscorts();
  
  return (
    <main className="min-h-screen">
      <Header />
      <div className="relative">
        <HeroSection />
        <EscortGrid escorts={escorts} />
      </div>
      <Footer />
    </main>
  );
}
