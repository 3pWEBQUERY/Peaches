'use client';

import Image from 'next/image';

interface Story {
  title: string;
  imageUrl: string;
}

interface FeedPhoto {
  imageUrl: string;
  alt: string;
}

export default function PhotoFeed() {
  const featuredStories: Story[] = [
    { title: 'Short Movies', imageUrl: '/placeholder-story-1.jpg' },
    { title: 'Summer Echoes', imageUrl: '/placeholder-story-2.jpg' },
    { title: "Rider's Story", imageUrl: '/placeholder-story-3.jpg' },
    { title: 'Love Sample', imageUrl: '/placeholder-story-4.jpg' },
    { title: 'Paradise City', imageUrl: '/placeholder-story-5.jpg' },
  ];

  const feedPhotos: FeedPhoto[] = [
    { imageUrl: '/placeholder-feed-1.jpg', alt: 'Orange house in mountains' },
    { imageUrl: '/placeholder-feed-2.jpg', alt: 'Ship in mountain harbor' },
    { imageUrl: '/placeholder-feed-3.jpg', alt: 'Couple at mountain lake' },
    { imageUrl: '/placeholder-feed-4.jpg', alt: 'Person hiking in green hills' },
    { imageUrl: '/placeholder-feed-5.jpg', alt: 'Person with white goat' },
    { imageUrl: '/placeholder-feed-6.jpg', alt: 'Mountain landscape' },
  ];

  return (
    <div className="space-y-8">

      {/* Featured Stories */}
      <div>
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Featured Stories</h2>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {featuredStories.map((story, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group"
            >
              <Image
                src={story.imageUrl}
                alt={story.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-sm text-white font-medium">{story.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Feed */}
      <div>
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Photo Feed</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {feedPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            >
              <Image
                src={photo.imageUrl}
                alt={photo.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
