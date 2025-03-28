import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SellerNavbar from "../../components/SellerNavbar";
import AuctionForm from "@/components/AuctionForm";
import AuctionWarning from "@/components/AuctionWarning";

const CreateAuction: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(true);
  const [isNavigating, setIsNavigating] = useState<boolean>(false); // State for transition
  const navigate = useNavigate();

  const handleAuctionSubmit = () => {
    setIsSubmitted(true);
    setCanEdit(false);
  };

  const handleBackClick = () => {
    setIsNavigating(true); // Trigger transition
    setTimeout(() => {
      navigate("/auctions"); // Navigate after transition
    }, 300); // Match the duration of the transition
  };

  return (
    <div
      className={`min-h-screen bg-white transition-opacity duration-300 ${
        isNavigating ? "opacity-0" : "opacity-100"
      }`}
    >
      <SellerNavbar />
      <div className="container mx-auto pt-32 pb-16 px-4">
        {/* Breadcrumb */}
        <div className="mb-2">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-1 text-sm text-gallery-text/70 hover:text-gallery-accent transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>

        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-full max-w-3xl">
            {!isSubmitted && <AuctionForm onSubmit={handleAuctionSubmit} isEditable={canEdit} />}
            {isSubmitted && <AuctionWarning auctionId={""} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;