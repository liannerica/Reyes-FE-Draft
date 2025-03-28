import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AuctionWarning: React.FC<{ auctionId: string }> = ({ auctionId }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(24 * 60 * 60 * 1000); // 24 hours in milliseconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const handleEditAuction = () => {
    if (timeLeft > 0) {
      navigate(`/seller/edit-auction/${auctionId}`); // Navigate to the edit auction page with the auction ID
    }
  };

  return (
    <div className="bg-gray-50 p-12 rounded-3xl shadow-lg space-y-8 border border-gray-300 max-w-4xl mx-auto">
      {/* Warning Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-black-800">Auction Pending Approval</h2>
        <p className="text-lg text-gray-600 mt-3">
          Your auction has been submitted and is currently under review by the admin.
        </p>
      </div>

      {/* Countdown Timer */}
      <div className="flex justify-center items-center bg-red-100 p-6 rounded-2xl border border-red-300">
        <p className="text-lg font-medium text-red-700">
          You have{" "}
          <span className="text-xl font-bold text-red-900">
            {hours}h {minutes}m {seconds}s
          </span>{" "}
          left to edit your auction before it's locked.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8 mt-4">
        <Button
          variant="outline"
          size="lg"
          className="w-56 h-14 text-lg"
          onClick={() => navigate("/seller/dashboard")}
        >
          Go to Dashboard
        </Button>
        <Button
          size="lg"
          className="w-56 h-14 text-lg bg-primary hover:bg-primary/90"
          disabled={timeLeft === 0}
          onClick={handleEditAuction}
        >
          {timeLeft === 0 ? "Editing Locked" : "Edit Auction"}
        </Button>
      </div>
    </div>
  );
};

export default AuctionWarning;