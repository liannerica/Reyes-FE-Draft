import React from "react";
import { Link } from "react-router-dom";
import { User, Grid, FileImage } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../components/Navbar";
import { artists } from "../../data/artists";

// This function would fetch artists from your backend in a production environment
const fetchArtists = async () => {
  // In production, this would be an API call:
  // const response = await fetch('/api/artists');
  // return response.json();

  // For now, we'll use the local data but structured like an API response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: artists,
        status: "success",
      });
    }, 500); 
  });
};

const ArtistsPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["artists"],
    queryFn: fetchArtists,
    // Using the dummy data while simulating API call
    initialData: { data: artists, status: "success" },
  });

  // Fixed the TypeScript error by properly typing the data
  const artistsData = data ? (data as any).data || [] : [];

  if (error) {
    console.error("Error fetching artists:", error);
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto pt-32 pb-16 px-4">
        <h1 className="text-3xl font-medium mb-8 text-center">
          Our Gallery Artists
        </h1>

        <p className="text-center max-w-2xl mx-auto mb-12 text-gallery-text/80">
          Discover the talented artists who showcase their work in our gallery.
          Each artist brings their unique vision and expertise to create
          memorable pieces.
        </p>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gallery-accent border-r-transparent"></div>
            <p className="mt-4 text-gallery-text/70">Loading artists...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistsData.map((artist) => (
              <Link
                key={artist.id}
                to={`/artist/${artist.id}`}
                className="group"
              >
                <div className="art-item-card h-full flex flex-col">
                  <div className="relative aspect-square mb-4 overflow-hidden rounded-md bg-gallery-beige/30">
                    <img
                      src={artist.profileImage}
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-medium mb-2 group-hover:text-gallery-accent transition-colors">
                      {artist.name}
                    </h3>

                    <p className="text-sm text-gallery-text/70 mb-3">
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistsPage;
