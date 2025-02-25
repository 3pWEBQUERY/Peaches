'use client';

import { useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  if (!images.length) return null;

  return (
    <>
      <div id="gallery" className="w-full h-[500px] bg-black overflow-hidden">
        <div 
          className="flex overflow-x-auto h-full snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative w-[375px] flex-none h-full cursor-pointer snap-start select-none"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Bild ${index + 1}`}
                fill
                className="object-cover"
                priority={index < 5}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal für Großansicht */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedImage(null);
            }
          }}
        >
          <div className="relative w-[90vw] h-[90vh]">
            <button
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 hover:bg-opacity-75"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src={selectedImage}
              alt="Großansicht"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
} 