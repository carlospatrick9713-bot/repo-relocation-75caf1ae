import { useState, useEffect } from 'react';
import rioHero1 from '@/assets/rio-hero.jpg';
import rioHero2 from '@/assets/rio-hero-2.jpg';
import rioHero3 from '@/assets/rio-hero-3.jpg';

const heroImages = [rioHero1, rioHero2, rioHero3];

export default function HeroCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
    </div>
  );
}
