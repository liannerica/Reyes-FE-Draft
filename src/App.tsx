import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import { useAuth } from "@/lib/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/client/Index";
import Login from "./pages/client/Login";
import SignUp from "./pages/client/SignUp";
import Profile from "./pages/client/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Items from "./pages/admin/Items";
import SellerApplications from "./pages/admin/SellerApplications";
import AuctionApprovals from "./pages/admin/AuctionApprovals";
import AuctionsPage from "./pages/client/AuctionsPage";
import AuctionPage from "./pages/client/AuctionPage";
import ArtistsPage from "./pages/client/ArtistsPage";
import ArtistDetailPage from "./pages/client/ArtistDetailPage";
import AboutPage from "./pages/client/AboutPage";
import NotFound from "./pages/client/NotFound";
import ForgotPassword from "./pages/client/ForgotPassword";
import ResetPassword from "./pages/client/ResetPassword";
import SellerApplication from "./pages/client/SellerApplication";
import SellerDashboard from "./pages/seller/Dashboard";
import AdminProfile from "./pages/admin/Profile";
import CreateAuction from "./pages/seller/CreateAuction";
import EditAuction from "./pages/seller/EditAuction";
import SellerTransaction from "./components/TransactionPayment";
import TransactionPayment from "./components/SellerTransaction";

// Create a client with default options for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

// Component to handle route access based on user role
const AppRoutes = () => {
  const { user, isAdmin } = useAuth();

  // If user is admin, only show admin routes
  if (user && isAdmin()) {
    return (
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        } />
        <Route path="/admin/items" element={
          <ProtectedRoute>
            <Items />
          </ProtectedRoute>
        } />
        <Route path="/admin/seller-applications" element={
          <ProtectedRoute>
            <SellerApplications />
          </ProtectedRoute>
        } />
        <Route path="/admin/auction-approvals" element={
          <ProtectedRoute>
            <AuctionApprovals />
          </ProtectedRoute>
        } />
        <Route path="/admin/profile" element={
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        } />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Redirect all other routes to admin dashboard */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    );
  }

  // Regular user routes (including non-logged in users)
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auctions" element={<AuctionsPage />} />
      <Route path="/artwork/:id" element={<AuctionPage />} />
      <Route path="/artists" element={<ArtistsPage />} />
      <Route path="/artist/:id" element={<ArtistDetailPage />} />
      <Route path="/about" element={<AboutPage />} />
      
      {/* Protected Routes */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/seller-application" element={
        <ProtectedRoute>
          <SellerApplication />
        </ProtectedRoute>
      } />
      
      {/* Seller Routes */}
      <Route path="/seller/dashboard" element={
        <ProtectedRoute>
          <SellerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/seller/create-auction" element={
        <ProtectedRoute>
          <CreateAuction />
        </ProtectedRoute>
      } />
      <Route path="/seller/edit-auction/:auctionId" element={
        <ProtectedRoute>
          <EditAuction />
        </ProtectedRoute>
      } />
      <Route path="/seller/transactions" element={
        <ProtectedRoute>
          <SellerTransaction />
        </ProtectedRoute>
      } />
      <Route path="/seller/transactions/payment/:transactionId" element={
        <ProtectedRoute>
          <TransactionPayment />
        </ProtectedRoute>
      } />

      
      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
