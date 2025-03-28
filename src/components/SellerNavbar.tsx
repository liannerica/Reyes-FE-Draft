import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, Search, User, PlusCircle, Home } from 'lucide-react';
import { Input } from './ui/input';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { toast } from './ui/use-toast';
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.addEventListener('keydown', down);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `Finding results for "${searchQuery}"`,
      });

      // Navigate to auctions page with search query
      navigate(`/auctions?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const performSearch = (value: string) => {
    setIsSearchOpen(false);
    if (value) {
      navigate(`/auctions?search=${encodeURIComponent(value)}`);
      toast({
        title: "Search results",
        description: `Showing results for "${value}"`,
      });
    }
  };

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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-subtle py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo with subtle hover effect */}
        <Link 
          to="/" 
          className="font-serif text-2xl font-bold tracking-tight transition-transform hover:scale-105 active:scale-95"
        >
          Art<span className="text-[#AA8F66]">Auction</span>
        </Link>
        
        {/* Desktop Navigation with enhanced hover states */}
        <nav className="hidden md:flex items-center space-x-6">
          {[ // Existing navigation links
            { path: '/', name: 'Home' },
            { path: '/auctions', name: 'Auctions' },
            { path: '/artists', name: 'Artists' },
            { path: '/about', name: 'About' },
            { path: '/seller/dashboard', name: 'Dashboard' }, // New Dashboard link
          ].map(({ path, name }) => (
            <Link 
              key={path}
              to={path} 
              className={`relative group transition-colors duration-300 ${
                location.pathname === path || (path === '/artists' && location.pathname.startsWith('/artist/'))
                  ? 'text-[#AA8F66]' 
                  : 'text-gray-700 hover:text-[#AA8F66]'
              }`}
            >
              {name}
              <span 
                className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#AA8F66] transition-all duration-300 group-hover:w-full ${
                  location.pathname === path || (path === '/artists' && location.pathname.startsWith('/artist/'))
                    ? 'w-full' 
                    : ''
                }`}
              />
            </Link>
          ))}
        </nav>
        
        {/* Search, Profile, and Create New Auction */}
        <div className="flex items-center gap-4">
          <Button
            className="bg-[#AA8F66] hover:bg-[#9A7F56] text-white flex items-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            onClick={() => navigate('/seller/create-auction')}
          >
            <PlusCircle size={18} />
            Create New Auction
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="rounded-full hover:bg-[#AA8F66]/10 transition-all duration-300 transform hover:scale-110" 
                  size="icon"
                >
                  <Avatar className="border-2 border-[#AA8F66]/30 hover:border-[#AA8F66]/50">
                    <AvatarFallback className="bg-[#AA8F66]/10 text-[#AA8F66]">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-[#AA8F66]/20 shadow-lg">
                <DropdownMenuItem className="font-medium text-[#AA8F66]">
                  {user.name}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    to="/profile" 
                    className="hover:bg-[#AA8F66]/10 hover:text-[#AA8F66]"
                  >
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="hover:bg-red-50 hover:text-red-600"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="border-[#AA8F66] text-[#AA8F66] hover:bg-[#AA8F66]/10 transition-all duration-300 transform hover:scale-105" 
                asChild
              >
                <Link to="/login">Log in</Link>
              </Button>
              <Button 
                className="bg-[#AA8F66] hover:bg-[#9A7F56] text-white transition-all duration-300 transform hover:scale-105" 
                asChild
              >
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;