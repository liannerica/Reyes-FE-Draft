import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Clock,
  MessageSquare,
  TrendingUp,
  Tag,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Navbar from "../../components/Navbar";
import AuctionChat from "../../components/AuctionChat";
import BiddingInterface from "../../components/BiddingInterface";
import {
  Artwork,
  getArtworkById,
  formatCurrency,
  formatTimeRemaining,
} from "../../data/artworks";

const AuctionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundArtwork = getArtworkById(id);

      if (foundArtwork) {
        setArtwork(foundArtwork);
      }

      setLoading(false);
    }
  }, [id]);

  const handleSendMessage = (message: string) => {
    if (!artwork) return;

    // In a real app, this would be sent to a backend API
    const newMessage = {
      id: `c${Date.now()}`,
      userId: "current-user",
      userName: "You",
      message,
      timestamp: new Date(),
    };

    setArtwork({
      ...artwork,
      chat: [...artwork.chat, newMessage],
    });

    toast({
      title: "Message sent",
      description: "Your message has been sent to the auction chat",
    });
  };

  const handlePlaceBid = (amount: number) => {
    if (!artwork) return;

    // In a real app, this would be sent to a backend API
    const newBid = {
      id: `b${Date.now()}`,
      userId: "current-user",
      userName: "You",
      amount,
      timestamp: new Date(),
    };

    setArtwork({
      ...artwork,
      currentBid: amount,
      bids: [...artwork.bids, newBid],
    });

    toast({
      title: "Bid placed",
      description: `Your bid of ${formatCurrency(amount)} has been placed`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto pt-32 pb-16 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gallery-beige h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gallery-beige rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gallery-beige rounded"></div>
                  <div className="h-4 bg-gallery-beige rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto pt-32 pb-16 px-4">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-2xl font-display font-medium mb-4">
              Artwork Not Found
            </h1>
            <p className="text-gallery-text/70 mb-6">
              The artwork you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gallery-accent hover:text-gallery-accent/80"
            >
              <ArrowLeft size={16} />
              Return to Home
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
            to="/"
            className="inline-flex items-center gap-1 text-sm text-gallery-text/70 hover:text-gallery-accent transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Auctions
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Artwork Image and Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-subtle">
              <div className="aspect-[4/3] relative text-yellow-700 ">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-contain bg-gallery-beige/20"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-subtle p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-display text-yellow-700 font-medium mb-2">
                  {artwork.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gallery-text/70">
                  <User size={14} />
                  <span>{artwork.artist}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1 text-xs bg-gallery-beige px-2 py-1 rounded">
                  <Tag size={12} />
                  {artwork.type}
                </span>
                <span className="inline-flex items-center gap-1 text-xs bg-gallery-accent/10 text-gallery-accent px-2 py-1 rounded">
                  <Clock size={12} />
                  {formatTimeRemaining(artwork.auctionEnds)}
                </span>
                <span className="inline-flex items-center gap-1 text-xs bg-gallery-beige px-2 py-1 rounded">
                  <MessageSquare size={12} />
                  {artwork.chat.length} messages
                </span>
                <span className="inline-flex items-center gap-1 text-xs bg-gallery-beige px-2 py-1 rounded">
                  <TrendingUp size={12} />
                  {artwork.bids.length} bids
                </span>
              </div>

              <div className="pt-4 border-t border-gallery-border">
                <h2 className="text-lg font-medium mb-3">Description</h2>
                <p className="text-gallery-text/80 leading-relaxed">
                  {artwork.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gallery-border">
                <h2 className="text-lg font-medium mb-3">Bid History</h2>
                {artwork.bids.length > 0 ? (
                  <div className="space-y-3">
                    {[...artwork.bids].reverse().map((bid) => (
                      <div
                        key={bid.id}
                        className="flex justify-between items-center p-3 rounded-md bg-gallery-beige/30 hover:bg-gallery-beige/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gallery-accent/20 flex items-center justify-center text-xs font-medium text-gallery-accent">
                            {bid.userName.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {bid.userName}
                            </p>
                            <p className="text-xs text-gallery-text/60">
                              {new Date(bid.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gallery-accent">
                          {formatCurrency(bid.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gallery-text/60 italic">
                    No bids have been placed yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bidding Interface and Chat */}
          <div className="space-y-8">
            <BiddingInterface artwork={artwork} onPlaceBid={handlePlaceBid} />

            <div className="h-[400px]">
              <AuctionChat
                artwork={artwork}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
