"use client";

import { useState, useEffect } from 'react';

const videos = [
  '/hero-bg-1.mp4',
  '/hero-bg-2.mp4',
  '/hero-bg-3.mp4'
];

export default function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center">
      {/* Video Background Layer */}
      <div className="absolute inset-0">
        {videos.map((video, index) => (
          <video
            key={video}
            src={video}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentVideo ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
          />
        ))}
        {/* Overlay für besseren Kontrast */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-8">
          <div className="text-white max-w-2xl">
            <h1 className="text-6xl font-bold mb-4 text-white">
              Finde deinen perfekten{" "}
              <span className="relative">
                <span className="absolute inset-0 bg-[hsl(333.3,71.4%,50.6%)]"></span>
                <span className="relative mix-blend-destination-out">
                  Begleitung
                </span>
              </span>
            </h1>
            <p className="text-xl mb-8">
              Exklusive Escorts, diskrete Begleitung und unvergessliche Momente. 
              Erlebe Premium-Service auf höchstem Niveau.
            </p>
            <button className="px-6 py-3 bg-[hsl(333.3,71.4%,50.6%)] text-white rounded-md hover:bg-[hsl(335.1,77.6%,42%)] transition-colors">
              Registrieren
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
