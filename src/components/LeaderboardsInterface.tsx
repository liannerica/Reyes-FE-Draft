import React from 'react';
import { formatCurrency } from '../data/artworks';

interface LeaderboardEntry {
  name: string;
  bid: number;
}

interface LeaderboardsProps {
  entries: LeaderboardEntry[];
}

const Leaderboards: React.FC<LeaderboardsProps> = ({ entries }) => {
  return (
    <div className="border border-gallery-border rounded-lg bg-white shadow-subtle p-5 mb-6">
      <h3 className="font-display text-xl font-medium mb-4">Leaderboard</h3>
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-gallery-border"
          >
            <span className="text-sm font-medium">{index + 1}. {entry.name}</span>
            <span className="font-semibold text-gallery-text/70">{formatCurrency(entry.bid)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboards;