import { ReactNode } from "react";
import { useAuth } from "@/lib/auth-context";

interface AdminOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AdminOnly({ children, fallback }: AdminOnlyProps) {
  const { isAdmin } = useAuth();
  
  if (isAdmin()) {
    return <>{children}</>;
  }
  
  return fallback ? <>{fallback}</> : null;
}

interface SellerOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SellerOnly({ children, fallback }: SellerOnlyProps) {
  const { isSeller } = useAuth();
  
  if (isSeller()) {
    return <>{children}</>;
  }
  
  return fallback ? <>{fallback}</> : null;
}

interface AuthenticatedOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthenticatedOnly({ children, fallback }: AuthenticatedOnlyProps) {
  const { user } = useAuth();
  
  if (user) {
    return <>{children}</>;
  }
  
  return fallback ? <>{fallback}</> : null;
}

interface RoleInfoProps {
  showRole?: boolean;
}

export function RoleInfo({ showRole = true }: RoleInfoProps) {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm w-full">
      <div className="flex flex-col space-y-1.5 p-2">
        <h3 className="text-lg font-semibold leading-none tracking-tight">Account Information</h3>
      </div>
      <div className="p-2">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Username:</span>
            <span className="text-sm">{user.username}</span>
          </div>
          {user.name && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Name:</span>
              <span className="text-sm">{user.name}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Email:</span>
            <span className="text-sm">{user.email}</span>
          </div>
          {showRole && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Account Type:</span>
              <span className="text-sm inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                {user.role}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 