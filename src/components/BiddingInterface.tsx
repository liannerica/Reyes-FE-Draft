
import React, { useState } from 'react';
import { Artwork, formatCurrency } from '../data/artworks';
import { Clock, TrendingUp } from 'lucide-react';

interface BiddingInterfaceProps {
  artwork: Artwork;
  onPlaceBid: (amount: number) => void;
}

const BiddingInterface: React.FC<BiddingInterfaceProps> = ({ artwork, onPlaceBid }) => {
  const minBid = artwork.currentBid + Math.ceil(artwork.currentBid * 0.05); // Minimum 5% increase
  const [bidAmount, setBidAmount] = useState(minBid);
  
  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setBidAmount(isNaN(value) ? minBid : value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bidAmount >= minBid) {
      onPlaceBid(bidAmount);
    }
  };

  const getBidIncrements = () => {
    return [
      minBid,
      minBid + Math.ceil(artwork.currentBid * 0.1),
      minBid + Math.ceil(artwork.currentBid * 0.2)
    ];
  };

  const incrementOptions = getBidIncrements();
  
  const timeRemaining = () => {
    const now = new Date();
    const endTime = new Date(artwork.auctionEnds);
    const diff = endTime.getTime() - now.getTime();
    
    // If auction has ended
    if (diff <= 0) return { ended: true, display: "Auction ended" };
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return {
      ended: false,
      days,
      hours,
      minutes,
      seconds,
      display: `${days}d ${hours}h ${minutes}m ${seconds}s`
    };
  };
  
  const remaining = timeRemaining();

  return (
    <div className="border border-gallery-border rounded-lg bg-white shadow-subtle p-5">
      <h3 className="font-display text-xl font-medium mb-4">Place Your Bid</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center pb-2 border-b border-gallery-border">
          <span className="text-sm text-gallery-text/70">Starting Bid</span>
          <span className="font-medium">{formatCurrency(artwork.startingBid)}</span>
        </div>
        
        <div className="flex justify-between items-center pb-2 border-b border-gallery-border">
          <span className="text-sm text-gallery-text/70">Current Bid</span>
          <span className="font-semibold text-gallery-accent">{formatCurrency(artwork.currentBid)}</span>
        </div>
        
        <div className="flex justify-between items-center pb-2 border-b border-gallery-border">
          <span className="text-sm text-gallery-text/70">Minimum Bid</span>
          <span className="font-medium">{formatCurrency(minBid)}</span>
        </div>
        
        <div className="flex items-center gap-2 py-1">
          <Clock size={16} className="text-gallery-text/70" />
          <span className="text-sm font-medium">
            {remaining.ended ? "Auction ended" : "Time Remaining:"}
          </span>
          {!remaining.ended && (
            <span className="text-sm font-semibold text-gallery-accent bg-gallery-accent/10 px-2 py-0.5 rounded">
              {remaining.display}
            </span>
          )}
        </div>
      </div>
      
      {!remaining.ended && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="bid-amount" className="block text-sm font-medium mb-1">
              Your Bid
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="bid-amount"
                min={minBid}
                value={bidAmount}
                onChange={handleBidChange}
                className="block w-full rounded-md border border-gallery-border py-2 pl-7 pr-3 focus:outline-none focus:ring-1 focus:ring-gallery-accent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {incrementOptions.map((amount, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setBidAmount(amount)}
                className="py-1 px-2 text-sm rounded border border-gallery-border hover:bg-gallery-beige/50 transition-colors text-center"
              >
                {formatCurrency(amount)}
              </button>
            ))}
          </div>
          
          <button
            type="submit"
            disabled={bidAmount < minBid}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-white font-medium transition-colors ${
              bidAmount >= minBid
                ? "bg-gallery-accent hover:bg-gallery-accent/90"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <TrendingUp size={18} />
            Place Bid
          </button>
        </form>
      )}
      
      {remaining.ended && (
        <div className="bg-gray-100 rounded-md p-4 text-center">
          <p className="text-sm text-gallery-text/70">This auction has ended.</p>
        </div>
      )}
    </div>
  );
};

export default BiddingInterface;
