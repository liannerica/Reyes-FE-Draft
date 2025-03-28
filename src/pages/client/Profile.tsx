import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import ClientLayout from "@/components/ClientLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AdminOnly, SellerOnly } from "@/components/RoleBasedContent";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [isLoading, setIsLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });
  
  const [settingsData, setSettingsData] = useState({
    notifications: {
      email: true,
      browser: true,
      marketing: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
    },
    preferences: {
      theme: "light",
      language: "en",
    },
  });
  
  const getInitials = (name: string = "") => {
    if (!name) return "";
    
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfileData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSwitchChange = (settingGroup: string, settingName: string) => {
    setSettingsData((prev) => ({
      ...prev,
      [settingGroup]: {
        ...prev[settingGroup as keyof typeof prev],
        [settingName]: !prev[settingGroup as keyof typeof prev][settingName as any],
      },
    }));
  };
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real application, you would call an API here
    setTimeout(() => {
      toast.success("Profile updated successfully");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real application, you would call an API here
    setTimeout(() => {
      toast.success("Settings saved successfully");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real application, you would call an API here
    setTimeout(() => {
      toast.success("Password changed successfully");
      setIsLoading(false);
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1000);
  };
  
  const handleDeleteAccount = () => {
    setIsLoading(true);
    
    // In a real application, you would call an API here
    setTimeout(() => {
      toast.success("Account deleted successfully");
      setIsLoading(false);
      logout();
    }, 1000);
  };
  
  const handleLogout = () => {
    logout();
  };
  
  if (!user) {
    return (
      <ClientLayout>
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Not Logged In</h1>
            <p className="mb-4">Please log in to view your profile</p>
            <Button className="bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white" asChild>
              <a href="/login">Log In</a>
            </Button>
          </div>
        </div>
      </ClientLayout>
    );
  }
  
  return (
    <ClientLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between mb-6 items-start md:items-center">
          <h1 className="text-2xl font-bold">My Profile</h1>
          
          <div className="flex mt-4 md:mt-0 space-x-4">
            <AdminOnly>
              <Button variant="outline" className="border-[#AA8F66] text-[#AA8F66] hover:bg-[#AA8F66]/10" asChild>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </Button>
            </AdminOnly>
            
            <SellerOnly>
              <Button variant="outline" className="border-[#AA8F66] text-[#AA8F66] hover:bg-[#AA8F66]/10" asChild>
                <a href="/seller/dashboard">Seller Dashboard</a>
              </Button>
            </SellerOnly>
            
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarFallback className="text-xl">
                      {getInitials(user.name || user.username)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">
                    {user.name || user.username}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                  <div className="mt-2 px-2 py-1 bg-[#AA8F66]/20 text-[#AA8F66] rounded-full text-xs font-medium">
                    {user.role}
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveTab("account")}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                        activeTab === "account" ? "bg-[#AA8F66]/20 text-[#AA8F66]" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Account Information
                    </button>
                    <button
                      onClick={() => setActiveTab("settings")}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                        activeTab === "settings" ? "bg-[#AA8F66]/20 text-[#AA8F66]" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Settings
                    </button>
                    <button
                      onClick={() => setActiveTab("security")}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                        activeTab === "security" ? "bg-[#AA8F66]/20 text-[#AA8F66]" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Security
                    </button>
                    <button
                      onClick={() => setActiveTab("danger")}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                        activeTab === "danger" ? "bg-[#AA8F66]/20 text-[#AA8F66]" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Danger Zone
                    </button>
                  </nav>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Profile Content */}
          <div className="lg:col-span-3">
            {activeTab === "account" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account information and profile details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile}>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            name="username"
                            value={profileData.username}
                            onChange={handleProfileInputChange}
                            placeholder="Username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleProfileInputChange}
                            placeholder="Email address"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileInputChange}
                          placeholder="Full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleProfileInputChange}
                          placeholder="Tell us about yourself"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileInputChange}
                          placeholder="Phone number"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">Address</h3>
                        <div className="space-y-2">
                          <Label htmlFor="street">Street Address</Label>
                          <Input
                            id="street"
                            name="address.street"
                            value={profileData.address.street}
                            onChange={handleProfileInputChange}
                            placeholder="Street address"
                          />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="address.city"
                              value={profileData.address.city}
                              onChange={handleProfileInputChange}
                              placeholder="City"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State / Province</Label>
                            <Input
                              id="state"
                              name="address.state"
                              value={profileData.address.state}
                              onChange={handleProfileInputChange}
                              placeholder="State / Province"
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="zip">ZIP / Postal Code</Label>
                            <Input
                              id="zip"
                              name="address.zip"
                              value={profileData.address.zip}
                              onChange={handleProfileInputChange}
                              placeholder="ZIP / Postal Code"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              name="address.country"
                              value={profileData.address.country}
                              onChange={handleProfileInputChange}
                              placeholder="Country"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white" type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Profile"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveSettings}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-notifications" className="flex-1">
                              Email Notifications
                              <p className="text-sm text-gray-500 font-normal">
                                Receive email notifications about your account activity
                              </p>
                            </Label>
                            <Switch
                              id="email-notifications"
                              checked={settingsData.notifications.email}
                              onCheckedChange={() => handleSwitchChange("notifications", "email")}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="browser-notifications" className="flex-1">
                              Browser Notifications
                              <p className="text-sm text-gray-500 font-normal">
                                Receive browser notifications when you're online
                              </p>
                            </Label>
                            <Switch
                              id="browser-notifications"
                              checked={settingsData.notifications.browser}
                              onCheckedChange={() => handleSwitchChange("notifications", "browser")}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="marketing-notifications" className="flex-1">
                              Marketing Emails
                              <p className="text-sm text-gray-500 font-normal">
                                Receive emails about new features and special offers
                              </p>
                            </Label>
                            <Switch
                              id="marketing-notifications"
                              checked={settingsData.notifications.marketing}
                              onCheckedChange={() => handleSwitchChange("notifications", "marketing")}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h3 className="text-lg font-medium mb-3">Privacy</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="show-email" className="flex-1">
                              Show Email Address
                              <p className="text-sm text-gray-500 font-normal">
                                Allow other users to see your email address
                              </p>
                            </Label>
                            <Switch
                              id="show-email"
                              checked={settingsData.privacy.showEmail}
                              onCheckedChange={() => handleSwitchChange("privacy", "showEmail")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white" type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Settings"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your password and account security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          name="currentPassword"
                          type="password"
                          placeholder="Enter current password"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          name="newPassword"
                          type="password"
                          placeholder="Enter new password"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white" type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Change Password"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "danger" && (
              <Card className="border-red-200">
                <CardHeader className="text-red-800">
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription className="text-red-700">
                    These actions are irreversible. Please proceed with caution.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-red-200 rounded-md bg-red-50">
                      <h3 className="text-lg font-medium text-red-800 mb-2">Delete Account</h3>
                      <p className="text-red-700 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              disabled={isLoading}
                              className="bg-red-600 text-white hover:bg-red-700"
                            >
                              {isLoading ? "Deleting..." : "Delete Account"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}