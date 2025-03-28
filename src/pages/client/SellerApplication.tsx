import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import ClientLayout from "@/components/ClientLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const businessTypes = [
  "Individual Artist",
  "Art Gallery",
  "Art Dealer",
  "Art Collective",
  "Other",
];

const experienceLevels = [
  "0-2 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

const categories = [
  "Paintings",
  "Sculptures",
  "Photography",
  "Digital Art",
  "Prints",
  "Mixed Media",
  "Ceramics",
  "Textiles",
];

export default function SellerApplication() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    
    // Business Information
    businessName: "",
    businessType: "",
    website: "",
    socialMedia: "",
    
    // Business Address
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    
    // Experience
    experience: "",
    background: "",
    
    // Categories
    selectedCategories: [] as string[],
    
    // Agreement
    agreesToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreesToTerms: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (category: string) => {
    setFormData((prev) => {
      const categories = prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category];
      return { ...prev, selectedCategories: categories };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreesToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    try {
      // In a real app, this would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Application submitted successfully");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to submit application");
    }
  };

  // If user is already a seller or admin, redirect to appropriate page
  if (user?.role === "SELLER" || user?.role === "ADMIN") {
    return (
      <ClientLayout>
        <div className="container py-8">
          <Card>
            <CardHeader>
              <CardTitle>Already a Seller</CardTitle>
              <CardDescription>
                You already have seller privileges on this platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <a href="/seller/dashboard">Go to Seller Dashboard</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="container max-w-4xl py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Become a Seller</h1>
          <p className="text-muted-foreground">
            Complete this form to apply as a seller on our platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Provide your contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Tell us about your art business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => handleSelectChange("businessType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialMedia">Social Media Links (Optional)</Label>
                  <Input
                    id="socialMedia"
                    name="socialMedia"
                    value={formData.socialMedia}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Address */}
          <Card>
            <CardHeader>
              <CardTitle>Business Address</CardTitle>
              <CardDescription>
                Provide your business location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
              <CardDescription>
                Share your art experience and background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Years of Experience</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => handleSelectChange("experience", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="background">Professional Background</Label>
                  <Textarea
                    id="background"
                    name="background"
                    value={formData.background}
                    onChange={handleInputChange}
                    placeholder="Tell us about your art background, achievements, and experience..."
                    className="min-h-[100px]"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
              <CardDescription>
                Select the types of art you plan to sell
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={formData.selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreesToTerms}
                  onCheckedChange={handleCheckboxChange}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="terms">
                    I agree to the terms and conditions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    By submitting this application, you agree to our{" "}
                    <a href="/terms" className="text-primary underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-primary underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </ClientLayout>
  );
} 