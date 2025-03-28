import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, Search, User } from 'lucide-react';
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
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight">
          Art<span className="text-[#AA8F66]">Auction</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'text-gallery-accent after:w-full' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/auctions" 
            className={`nav-link ${location.pathname === '/auctions' ? 'text-gallery-accent after:w-full' : ''}`}
          >
            Auctions
          </Link>
          <Link 
            to="/artists" 
            className={`nav-link ${location.pathname === '/artists' || location.pathname.startsWith('/artist/') ? 'text-gallery-accent after:w-full' : ''}`}
          >
            Artists
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'text-gallery-accent after:w-full' : ''}`}
          >
            About
          </Link>
        </nav>
        
        {/* Search and Profile */}
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
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-[#AA8F66] text-[#AA8F66] hover:bg-[#AA8F66]/10" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="bg-[#AA8F66] hover:bg-[#AA8F66]/90 text-white" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="flex items-center space-x-3 md:hidden">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 rounded-full hover:bg-gallery-beige/50 transition-colors"
          aria-label="Search"
        >
          <Search size={20} className="text-gallery-text" />
        </button>
        
        <Link 
          to="/profile" 
          className="p-2 rounded-full hover:bg-gallery-beige/50 transition-colors"
          aria-label="Profile"
        >
          <User size={20} className="text-gallery-text" />
        </Link>
        
        <button 
          className="text-gallery-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-4 py-20">
          <form onSubmit={handleSearch} className="relative mb-8">
            <Input
              type="search"
              placeholder="Search artworks..."
              className="w-full pr-8 text-sm focus-visible:ring-gallery-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gallery-text/70 hover:text-gallery-accent"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </form>
          
          <nav className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gallery-border"
            >
              Home <ChevronRight size={18} />
            </Link>
            <Link 
              to="/auctions" 
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gallery-border"
            >
              Auctions <ChevronRight size={18} />
            </Link>
            <Link 
              to="/artists" 
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gallery-border"
            >
              Artists <ChevronRight size={18} />
            </Link>
            <Link 
              to="/about" 
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gallery-border"
            >
              About <ChevronRight size={18} />
            </Link>
            <Link 
              to="/profile" 
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gallery-border"
            >
              Profile <ChevronRight size={18} />
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput 
          placeholder="Search artworks, artists..." 
          onValueChange={(value) => setSearchQuery(value)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Links">
            <CommandItem onSelect={() => navigate('/auctions')}>
              <Search className="mr-2 h-4 w-4" />
              <span>All Auctions</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate('/artists')}>
              <Search className="mr-2 h-4 w-4" />
              <span>All Artists</span>
            </CommandItem>
          </CommandGroup>
          {searchQuery.length > 0 && (
            <CommandGroup heading="Search">
              <CommandItem onSelect={() => performSearch(searchQuery)}>
                <Search className="mr-2 h-4 w-4" />
                <span>Search for "{searchQuery}"</span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Navbar;
