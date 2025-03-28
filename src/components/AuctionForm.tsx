import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  CalendarIcon, 
  DollarSignIcon, 
  TagIcon, 
  InfoIcon, 
  ClockIcon 
} from "lucide-react";

interface AuctionFormProps {
  onSubmit: (auctionData: any) => void;
  isEditable: boolean;
  initialData?: Partial<AuctionData>;
}

interface AuctionData {
  itemName: string;
  description: string;
  startingPrice: number;
  auctionType: "open" | "fixed";
  increment?: number;
  category: string;
  startTime: string;
  endTime: string;
}

const AuctionForm: React.FC<AuctionFormProps> = ({ 
  onSubmit, 
  isEditable = true,
  initialData = {} 
}) => {
  // Predefined categories with icons
  const categoriesWithIcons = [
    { name: "Art", icon: "🎨" },
    { name: "Collectibles", icon: "🏺" },
    { name: "Electronics", icon: "💻" },
    { name: "Fashion", icon: "👗" },
    { name: "Furniture", icon: "🛋️" },
    { name: "Jewelry", icon: "💍" },
    { name: "Sports", icon: "⚽" },
    { name: "Toys", icon: "🧸" },
  ];

  // State management with initial data
  const [formData, setFormData] = useState<AuctionData>({
    itemName: initialData.itemName || "",
    description: initialData.description || "",
    startingPrice: initialData.startingPrice || 0,
    auctionType: initialData.auctionType || "open",
    increment: initialData.increment || 50,
    category: initialData.category || "",
    startTime: initialData.startTime || "",
    endTime: initialData.endTime || "",
  });

  // Dynamic form validation state
  const [errors, setErrors] = useState<Partial<Record<keyof AuctionData, string>>>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Validate form before submission
  const validateForm = () => {
    const newErrors: Partial<Record<keyof AuctionData, string>> = {};

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.startingPrice <= 0) {
      newErrors.startingPrice = "Starting price must be greater than 0";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (formData.auctionType === "fixed" && (!formData.increment || formData.increment % 50 !== 0)) {
      newErrors.increment = "Increment must be a multiple of 50";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (new Date(formData.startTime) >= new Date(formData.endTime)) {
      newErrors.endTime = "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      onSubmit(formData);
      // Note: Actual loading state management should be handled by parent component
      setTimeout(() => setLoading(false), 2000);
    }
  };

  // Update form data dynamically
  const updateFormData = (key: keyof AuctionData, value: any) => {
    if (isEditable) {
      setFormData(prev => ({
        ...prev,
        [key]: value
      }));
      // Clear error when user starts typing/selecting
      if (errors[key]) {
        setErrors(prev => ({ ...prev, [key]: undefined }));
      }
    }
  };

  // Special handler for auction type to reset increment
  const handleAuctionTypeChange = (type: "open" | "fixed") => {
    if (isEditable) {
      setFormData(prev => ({
        ...prev,
        auctionType: type,
        increment: type === "open" ? undefined : 50
      }));
    }
  };

  return (
    <div className="flex justify-center mt-2">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl space-y-6 border border-[#5A3A31]"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#110407] mb-2">
            {isEditable ? "Create" : "View"} Your <span className="text-[#AA8F66]">Auction</span>
          </h2>
          <p className="text-[#5A3A31]">
            {isEditable 
              ? "Fill in the details of your auction item" 
              : "Auction item details"}
          </p>
        </div>

        {/* Item Name */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-[#110407]">
            <InfoIcon className="w-4 h-4" /> Item Name
          </label>
          <Input 
            placeholder="Enter item name" 
            value={formData.itemName}
            onChange={(e) => updateFormData('itemName', e.target.value)}
            disabled={!isEditable}
            className={`w-full ${errors.itemName ? 'border-red-500' : ''} 
              ${!isEditable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
          {errors.itemName && (
            <p className="text-red-500 text-xs mt-1">{errors.itemName}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-[#110407]">
            <InfoIcon className="w-4 h-4" /> Description
          </label>
          <Textarea 
            placeholder="Describe your item in detail" 
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            disabled={!isEditable}
            className={`w-full ${errors.description ? 'border-red-500' : ''} 
              ${!isEditable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        {/* Price and Auction Type */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Starting Price */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#110407]">
              <DollarSignIcon className="w-4 h-4" /> Starting Price
            </label>
            <Input 
              type="number" 
              placeholder="Enter starting price"
              value={formData.startingPrice || ''} // Allow empty input
              onChange={(e) => {
                const value = e.target.value === '' ? '' : parseFloat(e.target.value); // Allow empty input
                updateFormData('startingPrice', value);
              }}
              min={0} // Prevent negative values in the input field
              disabled={!isEditable}
              className={`w-full ${errors.startingPrice ? 'border-red-500' : ''} 
                ${!isEditable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {errors.startingPrice && (
              <p className="text-red-500 text-xs mt-1">{errors.startingPrice}</p>
            )}
          </div>

          {/* Auction Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#110407]">Auction Type</label>
            <div className="flex gap-2">
              {["open", "fixed"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleAuctionTypeChange(type as "open" | "fixed")}
                  disabled={!isEditable}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    formData.auctionType === type 
                      ? 'bg-[#5A3A31] text-white' 
                      : 'bg-gray-100 text-[#110407] hover:bg-gray-200'
                  } ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} Bid
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Increment (for Fixed Bid) */}
        {formData.auctionType === "fixed" && (
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[#110407]">
                <ClockIcon className="w-4 h-4" /> Increment Amount
                </label>
                <Input
                type="number"
                placeholder="Enter increment (multiple of 50)"
                value={formData.increment}
                onChange={(e) => updateFormData("increment", parseFloat(e.target.value))}
                step={50}
                min={50}
                disabled={!isEditable}
                className={`w-full ${errors.increment ? "border-red-500" : ""} ${
                    !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                />
                {errors.increment && (
                <p className="text-red-500 text-xs mt-1">{errors.increment}</p>
                )}
            </div>
        )}

        {/* Category */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-[#110407]">
            <TagIcon className="w-4 h-4" /> Category
          </label>
          <div className="grid grid-cols-4 gap-2">
            {categoriesWithIcons.map(({name, icon}) => (
              <button
                key={name}
                type="button"
                onClick={() => updateFormData('category', name)}
                disabled={!isEditable}
                className={`py-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                  formData.category === name 
                    ? 'bg-[#5A3A31] text-white' 
                    : 'bg-gray-100 text-[#110407] hover:bg-gray-200'
                } ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>{icon}</span>
                <span className="text-xs">{name}</span>
              </button>
            ))}
          </div>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
          )}
        </div>

        {/* Time Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Start Time */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#110407]">
              <CalendarIcon className="w-4 h-4" /> Start Time
            </label>
            <Input 
              type="datetime-local" 
              value={formData.startTime}
              onChange={(e) => updateFormData('startTime', e.target.value)}
              disabled={!isEditable}
              className={`w-full ${errors.startTime ? 'border-red-500' : ''} 
                ${!isEditable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {errors.startTime && (
              <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
            )}
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#110407]">
              <CalendarIcon className="w-4 h-4" /> End Time
            </label>
            <Input 
              type="datetime-local" 
              value={formData.endTime}
              onChange={(e) => updateFormData('endTime', e.target.value)}
              disabled={!isEditable}
              className={`w-full ${errors.endTime ? 'border-red-500' : ''} 
                ${!isEditable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {errors.endTime && (
              <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        {isEditable && (
          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#5A3A31] hover:bg-[#AA8F66] text-white py-3 rounded-lg transition-all"
            >
              {loading ? "Submitting..." : "Create Auction"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuctionForm;