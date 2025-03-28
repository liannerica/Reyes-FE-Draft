import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import ArtworkCard from "../../components/ArtworkCard";
import GalleryExhibit from "../../components/GalleryExhibit";
import { artworks } from "../../data/artworks";

const Index = () => {
  const featuredArtworks = artworks.filter((artwork) => artwork.featured);
  const recentArtworks = [...artworks]
    .sort((a, b) => b.auctionEnds.getTime() - a.auctionEnds.getTime())
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight mb-6 animate-slide-up">
              Discover and Collect{" "}
              <span className="text-gallery-accent">Extraordinary</span>{" "}
              Artworks
            </h1>
            <p className="text-lg text-gallery-text/80 mb-8 animate-slide-up animation-delay-100">
              Participate in exclusive auctions featuring unique pieces from
              established and emerging artists around the world.
            </p>
            <div className="animate-slide-up animation-delay-200">
              <Link
                to="/auctions"
                className="inline-flex items-center gap-2 bg-gallery-accent text-white px-6 py-3 rounded-md hover:bg-gallery-accent/90 transition-colors shadow-subtle"
              >
                Explore Auctions
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibition Section */}
      <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-white to-gallery-beige/20">
        <div className="container mx-auto">
          <div className="mb-8 text-center ">
            <h2 className="text-3xl font-display font-medium mb-2">
              Featured Exhibition
            </h2>
            <p className="text-gallery-text/70">
              Experience our curated selection in a virtual space
            </p>
          </div>

          <GalleryExhibit featuredArtworks={featuredArtworks} />
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-medium">
              Featured Auctions
            </h2>
            <Link
              to="/auctions"
              className="text-yellow-700 hover:text-gallery-accent/80 transition-colors font-medium flex items-center gap-1"
            >
              View All
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Auctions */}
      <section className="py-16 px-4 md:px-8 bg-gallery-beige/20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl  font-display font-medium">
              Recent Auctions
            </h2>
            <Link
              to="/auctions"
              className="text-yellow-700 hover:text-gallery-accent/80 transition-colors font-medium flex items-center gap-1"
            >
              View All
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 bg-white border-t border-gallery-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-display font-semibold tracking-tight">
                Art<span className="text-gallery-accent">Sphere</span>
              </h2>
              <p className="text-sm text-gallery-text/70 mt-1">
                Fine Art Auction Platform
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h3 className="text-sm font-semibold mb-2">Navigation</h3>
                <ul className="text-sm space-y-1">
                  <li>
                    <Link
                      to="/"
                      className="hover:text-gallery-accent transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/auctions"
                      className="hover:text-gallery-accent transition-colors"
                    >
                      Auctions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/gallery"
                      className="hover:text-gallery-accent transition-colors"
                    >
                      Gallery
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">About</h3>
                <ul className="text-sm space-y-1">
                  <li>
                    <Link
                      to="/about"
                      className="hover:text-gallery-accent transition-colors"
                    >
                      Our Mission
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/artists"
                      className="hover:text-gallery-accent transition-colors"
                    >
                      Artists
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-gallery-accent transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Legal</h3>
                <ul className="text-sm space-y-1">
                  <li>
                    <Link
                      to="/terms"
                      className="hover:text-gallery-accent transition-colors"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="hover:text-gallery-accent transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gallery-border text-center text-sm text-gallery-text/60">
            <p>© {new Date().getFullYear()} ArtSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
