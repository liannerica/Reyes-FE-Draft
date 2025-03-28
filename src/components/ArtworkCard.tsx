
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Artwork, formatCurrency, formatTimeRemaining } from '../data/artworks';

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  return (
    <Link
      to={`/artwork/${artwork.id}`}
      className="art-item-card group block"
    >
      <div className="relative aspect-[4/5] mb-3 overflow-hidden rounded">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback image if artwork image fails to load
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-white opacity-100 transition-opacity duration-300">
          <p className="text-xs font-medium">
            <Clock size={12} className="inline mr-1" />
            {formatTimeRemaining(artwork.auctionEnds)}
          </p>
        </div>
      </div>
      <h3 className="text-lg font-display font-medium text-gallery-text leading-tight transition-colors duration-300 group-hover:text-gallery-accent">
        {artwork.title}
      </h3>
      <p className="text-sm text-gray-600 mt-1">{artwork.artist}</p>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-sm font-medium">
          Current Bid
        </p>
        <p className="text-sm font-semibold text-gallery-accent">
          {formatCurrency(artwork.currentBid)}
        </p>
      </div>
    </Link>
  );
};

export default ArtworkCard;
