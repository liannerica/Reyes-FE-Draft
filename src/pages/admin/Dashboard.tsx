import { useState, useEffect } from 'react';
import { 
  Users, 
  ShoppingCart, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  LucideIcon,
  TrendingUp,
  TrendingDown,
  Coffee,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  DollarSign,
  Award,
  Crown,
  Paintbrush,
  Image,
  Palette,
  Frame,
  Brush
} from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { items, users, sellerApplications, auctionItems } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Define props interface for DashboardCard
interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  subValue?: string;
  colorClass: string;
  trend?: 'up' | 'down' | 'neutral';
  percentage?: number;
}

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Calculate dashboard data based on actual data from the data.ts file
  const dashboardData = {
    // Users Section
    totalUsers: users.length,
    newUsersThisMonth: users.filter(user => {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return user.createdAt >= startOfMonth;
    }).length,
    activeUsers: users.filter(user => user.status === 'active').length,
    inactiveUsers: users.filter(user => user.status === 'inactive').length,

    // Items Section
    totalItems: items.length,
    pendingItems: items.filter(item => item.status === 'pending').length,
    activeItems: items.filter(item => item.status === 'approved').length,
    soldItems: items.filter(item => item.status === 'sold').length,

    // Seller Applications
    totalSellerApplications: sellerApplications.length,
    pendingSellerApplications: sellerApplications.filter(app => app.status === 'pending').length,
    approvedSellerApplications: sellerApplications.filter(app => app.status === 'approved').length,
    rejectedSellerApplications: sellerApplications.filter(app => app.status === 'rejected').length,

    // Auction Approvals
    totalAuctions: auctionItems.length,
    pendingAuctions: auctionItems.filter(auction => auction.status === 'pending').length,
    activeAuctions: auctionItems.filter(auction => auction.status === 'approved').length,
    completedAuctions: auctionItems.filter(auction => auction.status === 'sold').length,

    // Recent Activity
    recentActivity: [
      { id: 1, type: 'User Registration', details: 'Jane Smith joined as a buyer', time: '2 mins ago', icon: Users },
      { id: 2, type: 'Seller Application', details: 'New application from Michael Johnson', time: '1 hour ago', icon: FileText },
      { id: 3, type: 'Item Listing', details: 'Vintage Watch added for auction', time: '3 hours ago', icon: ShoppingCart },
      { id: 4, type: 'Auction Approval', details: 'Diamond Necklace auction approved', time: '5 hours ago', icon: CheckCircle },
      { id: 5, type: 'User Update', details: 'Emily Wilson updated profile', time: '1 day ago', icon: Users },
    ],

    // Top Highest Bids
    topBids: auctionItems
      .filter(item => item.currentBid)
      .sort((a, b) => (b.currentBid || 0) - (a.currentBid || 0))
      .slice(0, 5)
      .map(item => ({
        id: item.id,
        name: item.name,
        bid: item.currentBid || 0,
        image: item.imageUrl || 'https://placehold.co/400x200',
        status: item.status,
        endDate: item.auctionEnd || new Date()
      })),
      
    // Top Customers
    topCustomers: [
      { id: '1', username: 'JohnCollector', totalBids: 25000, highestBid: 12000, avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: '2', username: 'ArtLover123', totalBids: 18500, highestBid: 8500, avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: '3', username: 'VintageHunter', totalBids: 15200, highestBid: 7500, avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
      { id: '4', username: 'RareFinds', totalBids: 12800, highestBid: 6400, avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
      { id: '5', username: 'AuctionMaster', totalBids: 10500, highestBid: 4800, avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg' }
    ]
  };

  // Card Component for Dashboard Sections
  const DashboardCard = ({ icon: Icon, title, value, subValue, colorClass, trend, percentage }: DashboardCardProps) => (
    <Card className="shadow-soft overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-t-4 h-full" style={{ borderTopColor: colorClass.replace('bg-', '').includes('-') ? `var(--${colorClass.replace('bg-', '')})` : `var(--${colorClass.replace('bg-', '')})` }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={cn("flex justify-center items-center rounded-full w-12 h-12", colorClass)}>
              <Icon className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm mb-1">{title}</h3>
              <p className="text-3xl font-bold">{value.toLocaleString()}</p>
            </div>
          </div>
          {trend && (
            <div className={cn("flex items-center", 
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 'text-gray-600'
            )}>
              {trend === 'up' ? <TrendingUp size={20} /> : 
               trend === 'down' ? <TrendingDown size={20} /> : null}
              {percentage !== undefined && <span className="ml-1 font-medium">{percentage}%</span>}
            </div>
          )}
        </div>
        {subValue && <p className="text-sm text-muted-foreground mt-3">{subValue}</p>}
      </CardContent>
    </Card>
  );

  // Section Header component
  const SectionHeader = ({ title, icon: Icon }: { title: string, icon?: LucideIcon }) => (
    <div className="mb-6">
      <div className="flex items-center">
        <div className="h-8 w-1 bg-primary rounded-full mr-3"></div>
        <div className="flex items-center">
          {Icon && <Icon className="text-primary mr-2" size={20} />}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-primary/50 via-transparent to-transparent mt-2"></div>
    </div>
  );

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header and greeting */}
        <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-xl mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-primary text-white p-3 rounded-full">
              <Palette size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Art Auction Dashboard</h1>
              <p className="text-muted-foreground">{greeting}, Admin. Here's what's happening with your art auction platform today.</p>
            </div>
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 size={16} />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} />
              <span>Collectors</span>
              <Badge variant="secondary" className="ml-1">{dashboardData.totalUsers}</Badge>
            </TabsTrigger>
            <TabsTrigger value="items" className="flex items-center gap-2">
              <Frame size={16} />
              <span>Artworks</span>
              <Badge variant="secondary" className="ml-1">{dashboardData.totalItems}</Badge>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity size={16} />
              <span>Activity</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab Content */}
          <TabsContent value="overview" className="mt-6 space-y-8">
            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <DashboardCard 
                icon={Users} 
                title="Total Collectors" 
                value={dashboardData.totalUsers}
                colorClass="bg-blue-600"
                trend="up"
                percentage={12}
              />
              <DashboardCard 
                icon={Frame} 
                title="Total Artworks" 
                value={dashboardData.totalItems}
                colorClass="bg-primary"
                trend="up"
                percentage={15}
              />
              <DashboardCard 
                icon={Paintbrush} 
                title="Artist Applications" 
                value={dashboardData.totalSellerApplications}
                colorClass="bg-amber-600"
                trend="up"
                percentage={10}
              />
              <DashboardCard 
                icon={Image} 
                title="Active Auctions" 
                value={dashboardData.totalAuctions}
                colorClass="bg-violet-600"
                trend="up"
                percentage={25}
              />
            </div>
            
            {/* Two Column Layout for Top Items/Customers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Highest Bids */}
              <div>
                <SectionHeader title="Top Bidded Artworks" icon={Award} />
                <Card className="shadow-soft">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Notable Art Bids</CardTitle>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <DollarSign size={14} /> Trending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.topBids.map((item, index) => (
                        <div key={item.id} className="flex items-center">
                          <div className="flex-shrink-0 relative w-12 h-12 rounded-md overflow-hidden mr-4">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute top-0 left-0 w-5 h-5 flex items-center justify-center bg-primary text-white text-xs font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium line-clamp-1">{item.name}</p>
                              <span className="text-xl font-bold text-primary">${item.bid.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", 
                                item.status === 'approved' ? "bg-green-100 text-green-800" : 
                                item.status === 'pending' ? "bg-amber-100 text-amber-800" : 
                                "bg-blue-100 text-blue-800"
                              )}>
                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                {item.status === 'sold' ? 'Sold' : 
                                 `Ends ${new Date(item.endDate).toLocaleDateString()}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-4">
                    <div className="w-full flex justify-end">
                      <button className="text-sm flex items-center text-primary hover:underline">
                        View all artworks <ChevronRight size={16} />
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Top Customers */}
              <div>
                <SectionHeader title="Top Art Collectors" icon={Crown} />
                <Card className="shadow-soft">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Leading Art Enthusiasts</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.topCustomers.map((customer, index) => (
                        <div key={customer.id} className="flex items-center">
                          <div className="flex-shrink-0 relative w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img 
                              src={customer.avatarUrl} 
                              alt={customer.username}
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute top-0 left-0 w-5 h-5 flex items-center justify-center bg-primary text-white text-xs font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">{customer.username}</p>
                              <span className="text-xl font-bold text-primary">${customer.highestBid.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-muted-foreground">Total Investments: ${customer.totalBids.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-4">
                    <div className="w-full flex justify-end">
                      <button className="text-sm flex items-center text-primary hover:underline">
                        View all collectors <ChevronRight size={16} />
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            {/* Two Column Layout for Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <Card className="shadow-soft">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Pending Approvals</CardTitle>
                      <Badge variant="outline">{dashboardData.pendingItems + dashboardData.pendingAuctions + dashboardData.pendingSellerApplications}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <Clock className="text-amber-600 mr-2" size={20} />
                          <span>Pending Artist Applications</span>
                        </div>
                        <Badge>{dashboardData.pendingSellerApplications}</Badge>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <Clock className="text-amber-600 mr-2" size={20} />
                          <span>Pending Artwork Verifications</span>
                        </div>
                        <Badge>{dashboardData.pendingItems}</Badge>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <Clock className="text-amber-600 mr-2" size={20} />
                          <span>Pending Auction Listings</span>
                        </div>
                        <Badge>{dashboardData.pendingAuctions}</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-4">
                    <div className="w-full flex justify-end mt-4">
                      <button className="text-sm flex items-center text-primary hover:underline">
                        Review all pending <ChevronRight size={16} />
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <div className="flex items-center">
                      <PieChart className="text-primary mr-2" size={18} />
                      <CardTitle>Gallery Statistics</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Active Collectors</div>
                        <div className="text-2xl font-bold">{Math.round(dashboardData.activeUsers / dashboardData.totalUsers * 100)}%</div>
                        <div className="h-2 bg-muted mt-2 rounded-full overflow-hidden">
                          <div className="h-full bg-green-600" style={{ width: `${Math.round(dashboardData.activeUsers / dashboardData.totalUsers * 100)}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Artworks Sold</div>
                        <div className="text-2xl font-bold">{Math.round(dashboardData.soldItems / dashboardData.totalItems * 100)}%</div>
                        <div className="h-2 bg-muted mt-2 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600" style={{ width: `${Math.round(dashboardData.soldItems / dashboardData.totalItems * 100)}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Verified Artists</div>
                        <div className="text-2xl font-bold">{Math.round(dashboardData.approvedSellerApplications / dashboardData.totalSellerApplications * 100)}%</div>
                        <div className="h-2 bg-muted mt-2 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${Math.round(dashboardData.approvedSellerApplications / dashboardData.totalSellerApplications * 100)}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Live Auctions</div>
                        <div className="text-2xl font-bold">{Math.round(dashboardData.activeAuctions / dashboardData.totalAuctions * 100)}%</div>
                        <div className="h-2 bg-muted mt-2 rounded-full overflow-hidden">
                          <div className="h-full bg-violet-600" style={{ width: `${Math.round(dashboardData.activeAuctions / dashboardData.totalAuctions * 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Users Tab Content */}
          <TabsContent value="users" className="mt-6 space-y-8">
            <SectionHeader title="Art Collectors Overview" icon={Users} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <DashboardCard 
                icon={Users} 
                title="Total Collectors" 
                value={dashboardData.totalUsers}
                subValue={`+${dashboardData.newUsersThisMonth} this month`}
                colorClass="bg-blue-600"
                trend="up"
                percentage={12}
              />
              <DashboardCard 
                icon={Users} 
                title="Active Collectors" 
                value={dashboardData.activeUsers}
                colorClass="bg-green-600"
                trend="up"
                percentage={8}
              />
              <DashboardCard 
                icon={Users} 
                title="Inactive Collectors" 
                value={dashboardData.inactiveUsers}
                colorClass="bg-red-600"
                trend="down"
                percentage={3}
              />
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Collector Registrations</h3>
                <button className="text-primary text-sm hover:underline">View All Collectors</button>
              </div>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 text-muted-foreground font-medium">Collector</th>
                      <th className="text-left p-3 text-muted-foreground font-medium">Role</th>
                      <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                      <th className="text-right p-3 text-muted-foreground font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.slice(0, 5).map(user => (
                      <tr key={user.id} className="hover:bg-muted/30">
                        <td className="p-3">
                          <div className="flex items-center">
                            <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{user.role === 'seller' ? 'Artist' : user.role === 'buyer' ? 'Collector' : 'Admin'}</td>
                        <td className="p-3">
                          <span className={cn("px-2 py-1 rounded-full text-xs font-medium", 
                            user.status === 'active' ? "bg-green-100 text-green-800" : 
                            user.status === 'pending' ? "bg-amber-100 text-amber-800" : 
                            "bg-red-100 text-red-800"
                          )}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-3 text-right text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Items Tab Content */}
          <TabsContent value="items" className="mt-6 space-y-8">
            <SectionHeader title="Artwork Management" icon={Frame} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <DashboardCard 
                icon={Frame} 
                title="Total Artworks" 
                value={dashboardData.totalItems}
                colorClass="bg-primary"
                trend="up"
                percentage={15}
              />
              <DashboardCard 
                icon={Clock} 
                title="Pending Verification" 
                value={dashboardData.pendingItems}
                colorClass="bg-amber-600"
                trend="neutral"
              />
              <DashboardCard 
                icon={CheckCircle} 
                title="Verified Artworks" 
                value={dashboardData.activeItems}
                colorClass="bg-green-600"
                trend="up"
                percentage={7}
              />
              <DashboardCard 
                icon={ShoppingCart} 
                title="Sold Artworks" 
                value={dashboardData.soldItems}
                colorClass="bg-blue-600"
                trend="up"
                percentage={22}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Recent Artworks</h3>
                    <button className="text-primary text-sm hover:underline">View All Artworks</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.slice(0, 4).map(item => (
                      <div key={item.id} className="border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                        <div className="h-40 bg-muted w-full">
                          <img 
                            src={item.imageUrl || 'https://placehold.co/400x200'} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{item.name}</h4>
                            <span className={cn("px-2 py-1 rounded-full text-xs font-medium", 
                              item.status === 'approved' ? "bg-green-100 text-green-800" : 
                              item.status === 'pending' ? "bg-amber-100 text-amber-800" : 
                              item.status === 'sold' ? "bg-blue-100 text-blue-800" :
                              "bg-red-100 text-red-800"
                            )}>
                              {item.status === 'approved' ? 'Verified' : 
                               item.status === 'pending' ? 'Pending' : 
                               item.status === 'sold' ? 'Sold' : 'Rejected'}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{item.description}</p>
                          <div className="flex justify-between items-center mt-3">
                            <p className="font-bold">${item.price.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-4">
                <Card className="shadow-soft h-full">
                  <CardHeader>
                    <CardTitle>Artwork Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Verified</span>
                          <span className="text-sm text-muted-foreground">{Math.round(dashboardData.activeItems / dashboardData.totalItems * 100)}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-muted rounded-full">
                          <div className="h-2.5 rounded-full bg-green-600" style={{ width: `${Math.round(dashboardData.activeItems / dashboardData.totalItems * 100)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Pending</span>
                          <span className="text-sm text-muted-foreground">{Math.round(dashboardData.pendingItems / dashboardData.totalItems * 100)}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-muted rounded-full">
                          <div className="h-2.5 rounded-full bg-amber-600" style={{ width: `${Math.round(dashboardData.pendingItems / dashboardData.totalItems * 100)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Sold</span>
                          <span className="text-sm text-muted-foreground">{Math.round(dashboardData.soldItems / dashboardData.totalItems * 100)}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-muted rounded-full">
                          <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${Math.round(dashboardData.soldItems / dashboardData.totalItems * 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-medium mb-3">Art Categories</h4>
                      <div className="space-y-2">
                        {['Paintings', 'Sculptures', 'Photography', 'Digital Art', 'Mixed Media'].map((category, index) => (
                          <div key={category} className="flex items-center justify-between">
                            <span className="text-sm">{category}</span>
                            <span className="text-sm font-medium">{Math.floor(Math.random() * 20) + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Activity Tab Content */}
          <TabsContent value="activity" className="mt-6 space-y-8">
            <SectionHeader title="Gallery Activity" icon={Activity} />
            
            <Card className="shadow-soft overflow-hidden border border-muted">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {dashboardData.recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center p-5 hover:bg-muted transition-colors duration-200">
                      <div className={cn("flex justify-center items-center rounded-full w-12 h-12 mr-5",
                        activity.type.includes('User') ? "bg-blue-600" :
                        activity.type.includes('Seller') ? "bg-primary" :
                        activity.type.includes('Item') ? "bg-amber-600" : 
                        "bg-green-600"
                      )}>
                        <activity.icon className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-lg">{
                            activity.type === 'User Registration' ? 'New Collector Registration' :
                            activity.type === 'Seller Application' ? 'New Artist Application' :
                            activity.type === 'Item Listing' ? 'New Artwork Listed' :
                            activity.type === 'Auction Approval' ? 'Auction Approval' :
                            activity.type
                          }</p>
                          <Badge variant="outline">{activity.time}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">{activity.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-4">
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Load More Activity
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
