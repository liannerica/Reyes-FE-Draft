import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface User {
  id: string;
  username: string;
  name?: string;
  email: string;
  role: 'CUSTOMER' | 'SELLER' | 'ADMIN';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isSeller: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Test users for demo purposes
const TEST_USERS = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'ADMIN' as const,
    name: 'Admin User'
  },
  {
    username: 'seller',
    email: 'seller@example.com',
    password: 'seller123',
    role: 'SELLER' as const,
    name: 'Seller User'
  },
  {
    username: 'customer',
    email: 'customer@example.com',
    password: 'customer123',
    role: 'CUSTOMER' as const,
    name: 'Customer User'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // If user is admin and trying to access non-admin routes, redirect to admin dashboard
        if (parsedUser.role === 'ADMIN' && !location.pathname.startsWith('/admin')) {
          navigate('/admin/dashboard', { replace: true });
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [location.pathname]);

  // Helper functions for role checking
  const isAdmin = () => user?.role === 'ADMIN';
  const isSeller = () => user?.role === 'SELLER' || user?.role === 'ADMIN';

  const login = async (emailOrUsername: string, password: string): Promise<boolean> => {
    try {
      const testUser = TEST_USERS.find(user => 
        (user.username === emailOrUsername || user.email === emailOrUsername) && 
        user.password === password
      );
      
      if (testUser) {
        const userData: User = {
          id: `user-${testUser.username}`,
          username: testUser.username,
          email: testUser.email,
          role: testUser.role,
          name: testUser.name,
          createdAt: new Date().toISOString()
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Redirect admin users to admin dashboard after login
        if (testUser.role === 'ADMIN') {
          navigate('/admin/dashboard', { replace: true });
        }
        return true;
      } else if (emailOrUsername && password) {
        const userData: User = {
          id: "user-" + Math.random().toString(36).substring(2, 9),
          username: emailOrUsername.includes('@') ? emailOrUsername.split('@')[0] : emailOrUsername,
          email: emailOrUsername.includes('@') ? emailOrUsername : `${emailOrUsername}@example.com`,
          role: 'CUSTOMER',
          createdAt: new Date().toISOString(),
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (username: string, email: string, password: string, name?: string): Promise<boolean> => {
    try {
      if (username && email && password) {
        const userData: User = {
          id: "user-" + Math.random().toString(36).substring(2, 9),
          username,
          name,
          email,
          role: 'CUSTOMER',
          createdAt: new Date().toISOString(),
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin, isSeller }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 