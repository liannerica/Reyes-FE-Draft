import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Edit2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SellerNavbar from "@/components/SellerNavbar";

const EditAuction: React.FC = () => {
  const { auctionId } = useParams<{ auctionId: string }>();
  const navigate = useNavigate();

  const [auctionData, setAuctionData] = useState<any>(null);
  const [canEdit, setCanEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        const mockAuction = {
          itemName: "Vintage Oil Painting",
          startingPrice: "1500",
          description: "An exquisite vintage oil painting from the early 20th century, featuring a serene landscape with intricate brushwork and rich, warm tones.",
          category: "Art",
          auctionType: "open",
          increment: "50",
          startTime: "2025-03-28T10:00",
          endTime: "2025-03-29T10:00",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        };

        setAuctionData(mockAuction);

        const createdAt = new Date(mockAuction.createdAt);
        const isEditable = Date.now() - createdAt.getTime() <= 24 * 60 * 60 * 1000;
        setCanEdit(isEditable);
      } catch (error) {
        console.error("Failed to fetch auction data:", error);
        alert("Failed to load auction details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionData();
  }, [auctionId]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (
      !auctionData.itemName ||
      !auctionData.startingPrice ||
      !auctionData.description ||
      !auctionData.startTime ||
      !auctionData.endTime
    ) {
      alert("Please fill in all required fields.");
      setSaving(false);
      return;
    }

    const updatedAuction = {
      ...auctionData,
      status: "PENDING",
    };

    console.log("Saving updated auction to database:", updatedAuction);

    setTimeout(() => {
      alert("Auction updated successfully!");
      navigate("/seller/dashboard");
      setSaving(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setAuctionData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F5F5] to-[#E0E0E0]">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <Edit2 size={48} className="mx-auto text-[#AA8F66]" />
          </div>
          <p className="text-[#5A3A31] text-lg">Loading auction details...</p>
        </div>
      </div>
    );
  }

  if (!canEdit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-[#E0E0E0]">
        <div className="container mx-auto pt-32 pb-16 px-4">
          <div className="mb-2">
            <Link
              to="/seller/dashboard"
              className="inline-flex items-center gap-2 text-[#5A3A31] hover:text-[#AA8F66] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Seller Dashboard
            </Link>
          </div>

          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="bg-white p-12 rounded-xl shadow-2xl text-center space-y-6 max-w-md">
              <div className="bg-red-50 p-4 rounded-lg">
                <h2 className="text-2xl font-bold text-red-800 mb-2">Editing Closed</h2>
                <p className="text-red-600">
                  Auction edits are only allowed within 24 hours of creation.
                </p>
              </div>
              <Link
                to="/seller/dashboard"
                className="inline-block px-6 py-3 bg-[#AA8F66] text-white rounded-lg hover:bg-[#8D7456] transition"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SellerNavbar />
      <div className="container mx-auto pt-16 pb-16 px-4 mt-14">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/seller/dashboard"
            className="inline-flex items-center gap-2 text-[#5A3A31] hover:text-[#AA8F66] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Seller Dashboard
          </Link>
        </div>

        <form
          onSubmit={handleSaveChanges}
          className="bg-white p-10 rounded-2xl shadow-2xl border border-[#AA8F66]/30 w-full max-w-4xl mx-auto space-y-8"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-[#5A3A31]">
              Edit <span className="text-[#AA8F66]">Auction Details</span>
            </h2>
            <p className="text-[#5A3A31]/70 max-w-2xl mx-auto">
              Refine your auction listing with precision. Ensure all details are accurate and compelling to attract potential bidders.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#5A3A31]">Item Name *</label>
              <Input
                type="text"
                placeholder="Enter Item Name"
                value={auctionData.itemName}
                onChange={(e) => handleInputChange("itemName", e.target.value)}
                className="h-12 text-sm border-[#AA8F66]/50 rounded-lg focus:ring-[#AA8F66] focus:border-[#AA8F66] w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#5A3A31]">Starting Price *</label>
              <Input
                type="text"
                placeholder="Enter Starting Price"
                value={auctionData.startingPrice}
                onChange={(e) => handleInputChange("startingPrice", e.target.value)}
                className="h-12 text-sm border-[#AA8F66]/50 rounded-lg focus:ring-[#AA8F66] focus:border-[#AA8F66] w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#5A3A31]">Description *</label>
            <Textarea
              placeholder="Provide a detailed and engaging description of your item"
              value={auctionData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-[150px] text-sm border-[#AA8F66]/50 rounded-lg focus:ring-[#AA8F66] focus:border-[#AA8F66] w-full"
            />
          </div>

          {/* Auction Type and Increment Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Auction Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#5A3A31]">Auction Type *</label>
              <div className="flex gap-2">
                {["open", "fixed"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleInputChange("auctionType", type)}
                    className={`flex-1 py-2 rounded-lg transition-all ${
                      auctionData.auctionType === type
                        ? "bg-[#5A3A31] text-white"
                        : "bg-gray-100 text-[#5A3A31] hover:bg-gray-200"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)} Bid
                  </button>
                ))}
              </div>
            </div>

            {/* Increment Amount (for Fixed Bid) */}
            {auctionData.auctionType === "fixed" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#5A3A31]">Increment Amount *</label>
                <Input
                  type="number"
                  placeholder="Enter increment (multiple of 50)"
                  value={auctionData.increment}
                  onChange={(e) => handleInputChange("increment", e.target.value)}
                  step={50}
                  min={50}
                  className="h-12 text-sm border-[#AA8F66]/50 rounded-lg focus:ring-[#AA8F66] focus:border-[#AA8F66] w-full"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#5A3A31]">Start Time *</label>
              <Input
                type="datetime-local"
                value={auctionData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
                className="h-12 text-sm border-[#AA8F66]/50 rounded-lg focus:ring-[#AA8F66] focus:border-[#AA8F66] w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#5A3A31]">End Time *</label>
              <Input
                type="datetime-local"
                value={auctionData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
                className="h-12 text-sm border-[#AA8F66]/50 rounded-lg focus:ring-[#AA8F66] focus:border-[#AA8F66] w-full"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              disabled={saving}
              className="h-14 text-base bg-[#5A3A31] hover:bg-[#8D7456] text-white transition-all duration-200 px-8 rounded-lg flex items-center gap-2"
            >
              <Edit2 size={20} />
              {saving ? "Saving Changes..." : "Update Auction"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAuction;