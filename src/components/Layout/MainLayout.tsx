import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);
  
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/admin/dashboard':
        return 'Dashboard';
      case '/admin/users':
        return 'Users Management';
      case '/admin/items':
        return 'Items Management';
      case '/admin/seller-applications':
        return 'Seller Applications';
      case '/admin/auction-approvals':
        return 'Auction Approvals';
      case '/admin/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main 
        className={`pt-16 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'ml-20' : 'ml-0 md:ml-64'
        }`}
      >
        <div className="p-4 md:p-6 lg:p-8 animate-in fade-in">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">{getPageTitle()}</h1>
            <p className="text-muted-foreground mt-1">Manage your auction platform</p>
          </div>
          
          <div className="animate-in slide-in-from-right duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
