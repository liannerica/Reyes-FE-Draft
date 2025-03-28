import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  UserCheck, 
  Gavel, 
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from "@/lib/auth-context";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div
      className={cn(
        "h-screen fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out border-r border-border bg-card flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center w-full" : ""
          )}
        >
          <div className="h-10 w-10 bg-main rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          {!collapsed && (
            <span className="text-xl font-bold ml-2 ">AuctionHub</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn("p-0 h-8 w-8", collapsed ? "hidden" : "")}
        >
          <ChevronLeft size={18} />
        </Button>
      </div>

      {collapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="absolute -right-3 top-16 h-6 w-6 rounded-full border border-border bg-background shadow-sm"
        >
          <ChevronRight size={14} />
        </Button>
      )}

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className={cn(
                "flex items-center p-3 text-base font-normal rounded-lg transition-colors",
                isActive("/admin/dashboard")
                  ? "bg-primary text-white"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <LayoutDashboard size={20} />
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={cn(
                "flex items-center p-3 text-base font-normal rounded-lg transition-colors",
                isActive("/admin/users")
                  ? "bg-primary text-white"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <Users size={20} />
              {!collapsed && <span className="ml-3">Users</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/items"
              className={cn(
                "flex items-center p-3 text-base font-normal rounded-lg transition-colors",
                isActive("/admin/items")
                  ? "bg-primary text-white"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <Package size={20} />
              {!collapsed && <span className="ml-3">Items</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/seller-applications"
              className={cn(
                "flex items-center p-3 text-base font-normal rounded-lg transition-colors",
                isActive("/admin/seller-applications")
                  ? "bg-primary text-white"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <UserCheck size={20} />
              {!collapsed && <span className="ml-3">Seller Applications</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/auction-approvals"
              className={cn(
                "flex items-center p-3 text-base font-normal rounded-lg transition-colors",
                isActive("/admin/auction-approvals")
                  ? "bg-primary text-white"
                  : "hover:bg-muted text-foreground"
              )}
            >
              <Gavel size={20} />
              {!collapsed && <span className="ml-3">Auction Approvals</span>}
            </Link>
          </li>
        </ul>

        <div className="pt-5 mt-5 border-t border-border">
          <ul className="space-y-2">
            <li>
              <Link
                to={user?.role === 'ADMIN' ? "/admin/profile" : "/profile"}
                className={cn(
                  "flex items-center p-3 text-base font-normal rounded-lg transition-colors",
                  isActive(user?.role === 'ADMIN' ? "/admin/profile" : "/profile")
                    ? "bg-primary text-white"
                    : "hover:bg-muted text-foreground"
                )}
              >
                <User size={20} />
                {!collapsed && <span className="ml-3">Profile</span>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center">
          <div className="flex items-center">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="User"
              className="h-8 w-8 rounded-full"
            />
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button 
              onClick={logout}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
