import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // You could show a loading spinner here
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    // Redirect to login page with a return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 