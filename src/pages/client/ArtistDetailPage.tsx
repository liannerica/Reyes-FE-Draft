import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileImage, Grid, ExternalLink } from "lucide-react";
import Navbar from "../../components/Navbar";
import ArtworkCard from "../../components/ArtworkCard";
import { getArtistById } from "../../data/artists";
import { getArtworksByArtist } from "../../data/artworks";

const ArtistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const artist = getArtistById(id || "");
  const artworks = getArtworksByArtist(artist?.name || "");

  if (!artist) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto pt-32 pb-16 px-4">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-2xl font-display font-medium mb-4">
              Artist Not Found
            </h1>
            <p className="text-gallery-text/70 mb-6">
              The artist you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/artists"
              className="inline-flex items-center gap-2 text-gallery-accent hover:text-gallery-accent/80"
            >
              <ArrowLeft size={16} />
              Return to Artists
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto pt-32 pb-16 px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/artists"
            className="inline-flex items-center gap-1 text-sm text-gallery-text/70 hover:text-gallery-accent transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Artists
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Artist Profile */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white rounded-lg shadow-subtle overflow-hidden">
              <div className="aspect-square">
                <img
                  src={artist.profileImage}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>

              <div className="p-6 space-y-4">
                <h1 className="text-2xl font-display font-medium">
                  {artist.name}
                </h1>
                <p className="text-sm text-gallery-text/70">
                  {artist.specialty}
                </p>

                <div className="flex items-center gap-4 text-sm text-gallery-text/60">
                  <span className="flex items-center gap-1">
                    <FileImage size={14} />
                    {artist.artworksCount} artworks
                  </span>
                  <span className="flex items-center gap-1">
                    <Grid size={14} />
                    {artist.collections.length} collections
                  </span>
                </div>

                <p className="text-sm text-gallery-text/80 leading-relaxed pt-4 border-t border-gallery-border">
                  {artist.bio}
                </p>

                {artist.website && (
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-gallery-accent hover:text-gallery-accent/80"
                  >
                    <ExternalLink size={14} />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Artist Collections and Artworks */}
          <div className="lg:col-span-2 space-y-12">
            {/* Collections */}
            <div>
              <h2 className="text-2xl font-display font-medium mb-6">
                Collections
              </h2>

              <div className="space-y-8">
                {artist.collections.map((collection, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-xl font-display border-b border-gallery-border pb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-gallery-text/80 mb-4">
                      {collection.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                      {artworks
                        .filter(
                          (artwork) => artwork.collection === collection.name
                        )
                        .map((artwork) => (
                          <ArtworkCard key={artwork.id} artwork={artwork} />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Artworks */}
            <div>
              <h2 className="text-2xl font-display font-medium mb-6">
                All Artworks
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                {artworks.map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailPage;
