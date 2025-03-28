
import React, { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Artwork } from '../data/artworks';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GalleryExhibitProps {
  featuredArtworks: Artwork[];
}

const GalleryExhibit: React.FC<GalleryExhibitProps> = ({ featuredArtworks }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  
  const activeArtwork = featuredArtworks[activeIndex];

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
    };
    
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta && e.gamma) {
      }
    };
    
    const animate = () => {
      const easeValue = 0.03;
      currentX += (mouseX - currentX) * easeValue;
      currentY += (mouseY - currentY) * easeValue;
      
      const mainImage = container.querySelector('.main-artwork') as HTMLElement;
      if (mainImage) {
        const moveX = currentX * 15;
        const moveY = currentY * 15;
        mainImage.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }
      
      const background = container.querySelector('.exhibit-background') as HTMLElement;
      if (background) {
        const moveX = currentX * -10;
        const moveY = currentY * -10;
        background.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    if (isMobile) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    } else {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (isMobile) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      } else {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile, activeIndex]);

  const nextArtwork = () => {
    setActiveIndex((prev) => (prev + 1) % featuredArtworks.length);
    setShowInfo(false);
  };

  const prevArtwork = () => {
    setActiveIndex((prev) => (prev - 1 + featuredArtworks.length) % featuredArtworks.length);
    setShowInfo(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-lg shadow-subtle"
    >
      {/* Exhibit Background */}
      <div className="exhibit-background bg-no-repeat bg-cover bg-center bg-[url('https://en.idei.club/uploads/posts/2023-06/thumbs/1685833682_en-idei-club-p-yale-art-gallery-dizain-krasivo-3.jpg')] absolute inset-0 bg-gradient-to-b from-gallery-cream to-gallery-beige/30 opacity-70"></div>

      {/* Main Artwork */}
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-black/30 overflow-hidden">
          <img
            src={activeArtwork.image}
            alt={activeArtwork.title}
            className="main-artwork object-contain max-h-[80%] max-w-[80%] shadow-lg shadow-white/70 rounded"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevArtwork}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-subtle hover:bg-white transition-all duration-300"
          aria-label="Previous artwork"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextArtwork}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-subtle hover:bg-white transition-all duration-300"
          aria-label="Next artwork"
        >
          <ChevronRight size={20} />
        </button>

        {/* Info Button */}
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="absolute bottom-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-subtle hover:bg-white transition-all duration-300"
          aria-label="Artwork information"
        >
          <Info size={20} />
        </button>

        {/* Artwork Info Panel */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-4 transform transition-transform duration-300 ${
            showInfo ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <h3 className="text-lg md:text-xl font-display font-medium mb-1">
            {activeArtwork.title}
          </h3>
          <p className="text-sm text-gallery-text/70 mb-2">
            by {activeArtwork.artist}
          </p>
          <p className="text-sm text-gallery-text/80 line-clamp-2 mb-2">
            {activeArtwork.description}
          </p>
          <Link
            to={`/artwork/${activeArtwork.id}`}
            className="text-sm text-gallery-accent hover:text-gallery-accent/80 inline-block"
          >
            View auction details
          </Link>
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredArtworks.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setShowInfo(false);
            }}
            className={`h-2 w-2 rounded-full transition-all ${
              activeIndex === index
                ? "bg-gallery-accent w-4"
                : "bg-gallery-accent/40 hover:bg-gallery-accent/60"
            }`}
            aria-label={`Show artwork ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-16 left-0 right-0 text-center">
        <p className="text-sm text-gallery-text/60 italic">
        </p>
      </div>
    </div>
  );
};

export default GalleryExhibit;
