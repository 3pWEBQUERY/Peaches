'use client';

interface ProfileHeaderProps {
  name: string;
  slogan: string;
}

export default function ProfileHeader({ name, slogan }: ProfileHeaderProps) {
  const scrollToGallery = () => {
    const galleryElement = document.getElementById('gallery');
    if (galleryElement) {
      galleryElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-5xl font-bold uppercase tracking-wider mb-2">
        {name}
      </h1>
      <p className="text-xl mb-6 opacity-90">
        {slogan}
      </p>
      <button
        onClick={scrollToGallery}
        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-full 
                 transition-all duration-300 border border-white/50 hover:border-white
                 uppercase tracking-wider text-sm font-medium"
      >
        ALLE FOTOS ANSEHEN
      </button>
    </div>
  );
} 