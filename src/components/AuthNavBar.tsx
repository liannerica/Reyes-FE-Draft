import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, Users, Package, UserPlus, Gavel } from "lucide-react";

export default function AuthNavBar() {
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          {isAdmin() ? (
            <>
              <Link to="/admin/dashboard" className="font-bold text-xl">Admin Panel</Link>
              <div className="hidden md:flex gap-4">
                <Link to="/admin/dashboard" className="text-sm font-medium hover:underline flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link to="/admin/users" className="text-sm font-medium hover:underline flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Users
                </Link>
                <Link to="/admin/items" className="text-sm font-medium hover:underline flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Items
                </Link>
                <Link to="/admin/seller-applications" className="text-sm font-medium hover:underline flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Seller Applications
                </Link>
                <Link to="/admin/auction-approvals" className="text-sm font-medium hover:underline flex items-center gap-2">
                  <Gavel className="h-4 w-4" />
                  Auction Approvals
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link to="/" className="font-bold text-xl">ArtAuction</Link>
              <div className="hidden md:flex gap-4">
                <Link to="/auctions" className="text-sm font-medium hover:underline">Auctions</Link>
                <Link to="/artists" className="text-sm font-medium hover:underline">Artists</Link>
                <Link to="/about" className="text-sm font-medium hover:underline">About</Link>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full" size="icon">
                  <Avatar>
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">{user.name}</DropdownMenuItem>
                {isAdmin() ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/users">Users</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/items">Items</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/seller-applications">Seller Applications</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/auction-approvals">Auction Approvals</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 