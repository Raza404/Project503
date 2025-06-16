import React, { useState, useEffect } from 'react';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setDashboardData(null);
    setCurrentView('dashboard');
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [inventoryRes, vendorsRes, ordersRes] = await Promise.all([
        fetch('http://localhost:5000/api/inventory'),
        fetch('http://localhost:5000/api/vendors'),
        fetch('http://localhost:5000/api/orders')
      ]);

      const inventory = await inventoryRes.json();
      const vendors = await vendorsRes.json();
      const orders = await ordersRes.json();

      const inventoryData = inventory.data || [];
      const vendorsData = vendors.data || [];
      const ordersData = orders.data || [];

      const lowStock = inventoryData.filter(item => item.quantity <= item.minThreshold).length;
      const activeOrders = ordersData.filter(order => order.status !== 'Delivered').length;

      setDashboardData({
        inventoryCount: inventoryData.length,
        lowStockItems: lowStock,
        activeOrders: activeOrders,
        vendorCount: vendorsData.length,
        inventory: inventoryData,
        vendors: vendorsData,
        orders: ordersData
      });

    } catch (error) {
      console.error('Dashboard error:', error);
      alert('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && !dashboardData) {
      loadDashboardData();
    }
  }, [user, dashboardData]);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const navigationItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
    { id: 'networking', icon: '🌐', label: 'Network' },
    { id: 'inventory', icon: '📦', label: 'Inventory' },
    { id: 'insights', icon: '🧠', label: 'Insights' },
    { id: 'orders', icon: '📋', label: 'Orders' },
    { id: 'vendors', icon: '🤝', label: 'Vendors' },
    { id: 'reports', icon: '📄', label: 'Reports' }
  ];

  const Sidebar = () => (
    <div style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.sidebarHeader}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>P</div>
          <span style={styles.logoText}>Project 503</span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav style={styles.navigation}>
        {navigationItems.map(item => (
          <div
            key={item.id}
            style={currentView === item.id ? styles.navItemActive : styles.navItem}
            onClick={() => setCurrentView(item.id)}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            <span style={styles.navLabel}>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div style={styles.sidebarFooter}>
        <div style={styles.userProfile}>
          <div style={styles.userAvatar}>
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>{user?.email?.split('@')[0]}</div>
            <div style={styles.userRole}>Administrator</div>
          </div>
        </div>
        <button style={styles.logoutButton} onClick={handleLogout}>
          🚪
        </button>
      </div>
    </div>
  );

  const TopBar = () => (
    <div style={styles.topBar}>
      <div style={styles.topLeft}>
        <h1 style={styles.pageTitle}>
          {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
        </h1>
        <div style={styles.breadcrumb}>
          Home {'>'} {currentView}
        </div>
      </div>
      <div style={styles.topRight}>
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Search..." 
            style={styles.searchInput}
          />
        </div>
        <div style={styles.topIcons}>
          <span style={styles.topIcon}>🔔</span>
          <span style={styles.topIcon}>⚙️</span>
          <span style={styles.topIcon}>❓</span>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div style={styles.content}>
      {/* Main Revenue Card & Stats */}
      <div style={styles.topSection}>
        <div style={styles.revenueCard}>
          <div style={styles.revenueContent}>
            <div style={styles.revenueLabel}>Total Revenue</div>
            <div style={styles.revenueValue}>₹3,468.96</div>
            <div style={styles.revenueTrend}>
              📈 +15% from last month
            </div>
          </div>
          <div style={styles.revenueChart}>
            <svg width="120" height="60">
              <polyline
                fill="none"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="2"
                points="0,40 20,35 40,30 60,25 80,20 100,15 120,10"
              />
            </svg>
          </div>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{dashboardData?.inventoryCount || 0}</div>
            <div style={styles.statLabel}>Inventory Items</div>
          </div>
          
          <div style={styles.trafficCard}>
            <div style={styles.trafficChart}>
              <svg width="80" height="80">
                <circle cx="40" cy="40" r="30" stroke="#f0f0f0" strokeWidth="6" fill="none" />
                <circle 
                  cx="40" cy="40" r="30" 
                  stroke="url(#gradient)" strokeWidth="6" fill="none"
                  strokeDasharray="140" strokeDashoffset="35"
                  transform="rotate(-90 40 40)"
                />
                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={styles.trafficLabel}>Traffic</div>
            </div>
            <div style={styles.trafficStats}>
              <div style={styles.trafficStat}>
                <span style={styles.trafficPercent}>33%</span>
                <span style={styles.trafficType}>Desktop</span>
              </div>
              <div style={styles.trafficStat}>
                <span style={styles.trafficPercent}>55%</span>
                <span style={styles.trafficType}>Mobile</span>
              </div>
              <div style={styles.trafficStat}>
                <span style={styles.trafficPercent}>12%</span>
                <span style={styles.trafficType}>Tablet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Cards */}
      <div style={styles.gradientCards}>
        <div style={{...styles.gradientCard, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          <div style={styles.cardIcon}>📊</div>
          <div style={styles.cardValue}>₹432</div>
          <div style={styles.cardLabel}>Analytics Revenue</div>
        </div>
        
        <div style={{...styles.gradientCard, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
          <div style={styles.cardIcon}>🤝</div>
          <div style={styles.cardValue}>₹432</div>
          <div style={styles.cardLabel}>Network Value</div>
        </div>
        
        <div style={{...styles.gradientCard, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
          <div style={styles.cardIcon}>📦</div>
          <div style={styles.cardValue}>₹432</div>
          <div style={styles.cardLabel}>Inventory Value</div>
        </div>
        
        <div style={{...styles.gradientCard, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'}}>
          <div style={styles.cardIcon}>💰</div>
          <div style={styles.cardValue}>₹432</div>
          <div style={styles.cardLabel}>Monthly Profit</div>
        </div>
      </div>

      {/* Activities & Orders */}
      <div style={styles.bottomSection}>
        <div style={styles.activitiesCard}>
          <h3 style={styles.sectionTitle}>Recent Activities</h3>
          <div style={styles.activitiesList}>
            {[
              { icon: '📊', title: 'Task Updated', subtitle: 'Finance team updated budget', time: '2 min ago', color: '#e91e63' },
              { icon: '📋', title: 'Email Added', subtitle: 'New client inquiry received', time: '5 min ago', color: '#9c27b0' },
              { icon: '📄', title: 'Published Article', subtitle: 'Blog post about Q1 results', time: '1 hour ago', color: '#2196f3' },
              { icon: '⚡', title: 'Quick Updated', subtitle: 'Inventory levels synchronized', time: '2 hours ago', color: '#ff9800' }
            ].map((activity, index) => (
              <div key={index} style={styles.activityItem}>
                <div style={{...styles.activityIcon, backgroundColor: activity.color}}>
                  {activity.icon}
                </div>
                <div style={styles.activityContent}>
                  <div style={styles.activityTitle}>{activity.title}</div>
                  <div style={styles.activitySubtitle}>{activity.subtitle}</div>
                </div>
                <div style={styles.activityTime}>{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.ordersCard}>
          <h3 style={styles.sectionTitle}>Order Status</h3>
          <div style={styles.ordersTable}>
            <div style={styles.tableHeader}>
              <span>Product</span>
              <span>Customer</span>
              <span>Total</span>
              <span>Status</span>
            </div>
            {[
              { product: 'Office Chairs', customer: 'John Doe', total: '₹2,341', status: 'delivered', color: '#4caf50' },
              { product: 'Laptops', customer: 'Jane Smith', total: '₹1,567', status: 'pending', color: '#ff9800' },
              { product: 'Desk Setup', customer: 'Mike Johnson', total: '₹3,890', status: 'shipped', color: '#2196f3' }
            ].map((order, index) => (
              <div key={index} style={styles.tableRow}>
                <span>{order.product}</span>
                <span>{order.customer}</span>
                <span>{order.total}</span>
                <span style={{...styles.statusBadge, backgroundColor: order.color}}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Analytics = () => (
    <div style={styles.content}>
      <div style={styles.analyticsHeader}>
        <h2 style={styles.analyticsTitle}>Business Analytics</h2>
        <div style={styles.analyticsControls}>
          <select style={styles.dateFilter}>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>
          <button style={styles.exportButton}>📊 Export</button>
        </div>
      </div>

      <div style={styles.analyticsGrid}>
        <div style={styles.mainChart}>
          <h3 style={styles.chartTitle}>Revenue Trend</h3>
          <div style={styles.chartContainer}>
            <svg width="100%" height="250">
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(102,126,234,0.3)" />
                  <stop offset="100%" stopColor="rgba(102,126,234,0.05)" />
                </linearGradient>
              </defs>
              <path
                d="M 0 180 Q 100 160 200 140 T 400 120 T 600 100 L 600 250 L 0 250 Z"
                fill="url(#areaGradient)"
                stroke="#667eea"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>

        <div style={styles.sideCharts}>
          <div style={styles.smallChart}>
            <h4 style={styles.chartTitle}>Performance</h4>
            <div style={styles.performanceMetrics}>
              {[
                { label: 'Efficiency', value: 85, color: '#4caf50' },
                { label: 'Quality', value: 92, color: '#2196f3' },
                { label: 'Speed', value: 78, color: '#ff9800' }
              ].map((metric, index) => (
                <div key={index} style={styles.metricRow}>
                  <span style={styles.metricLabel}>{metric.label}</span>
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        width: `${metric.value}%`,
                        backgroundColor: metric.color
                      }}
                    />
                  </div>
                  <span style={styles.metricValue}>{metric.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ComingSoon = ({ section }) => (
    <div style={styles.comingSoonContainer}>
      <div style={styles.comingSoonContent}>
        <h2>🚧 {section} Coming Soon</h2>
        <p>This section is being redesigned with the new modern interface.</p>
        <button 
          style={styles.backButton}
          onClick={() => setCurrentView('dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}>⏳</div>
          <h2>Loading...</h2>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      default:
        return <ComingSoon section={currentView.charAt(0).toUpperCase() + currentView.slice(1)} />;
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.mainContent}>
        <TopBar />
        {renderContent()}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  // Sidebar Styles
  sidebar: {
    width: '260px',
    backgroundColor: 'white',
    borderRight: '1px solid #e1e8ed',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    zIndex: 1000
  },
  sidebarHeader: {
    padding: '20px',
    borderBottom: '1px solid #e1e8ed'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2c3e50'
  },
  navigation: {
    flex: 1,
    padding: '20px 0'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    cursor: 'pointer',
    color: '#7f8c8d',
    transition: 'all 0.2s ease',
    borderRadius: '0 25px 25px 0',
    margin: '2px 0',
    marginRight: '20px'
  },
  navItemActive: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    cursor: 'pointer',
    color: '#667eea',
    backgroundColor: 'rgba(102,126,234,0.1)',
    borderRadius: '0 25px 25px 0',
    margin: '2px 0',
    marginRight: '20px',
    borderRight: '3px solid #667eea'
  },
  navIcon: {
    fontSize: '18px',
    width: '20px',
    textAlign: 'center'
  },
  navLabel: {
    fontSize: '14px',
    fontWeight: '500'
  },
  sidebarFooter: {
    padding: '20px',
    borderTop: '1px solid #e1e8ed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  userAvatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2c3e50'
  },
  userRole: {
    fontSize: '12px',
    color: '#7f8c8d'
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    color: '#7f8c8d'
  },

  // Main Content Styles
  mainContent: {
    flex: 1,
    marginLeft: '260px',
    display: 'flex',
    flexDirection: 'column'
  },
  topBar: {
    height: '80px',
    backgroundColor: 'white',
    borderBottom: '1px solid #e1e8ed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 30px',
    position: 'sticky',
    top: 0,
    zIndex: 999
  },
  topLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: 0
  },
  breadcrumb: {
    fontSize: '14px',
    color: '#7f8c8d'
  },
  topRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '25px',
    padding: '8px 16px',
    gap: '8px',
    width: '250px'
  },
  searchIcon: {
    fontSize: '16px',
    color: '#7f8c8d'
  },
  searchInput: {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    flex: 1,
    fontSize: '14px'
  },
  topIcons: {
    display: 'flex',
    gap: '15px'
  },
  topIcon: {
    fontSize: '18px',
    cursor: 'pointer',
    color: '#7f8c8d',
    padding: '8px',
    borderRadius: '6px'
  },

  // Content Styles
  content: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px'
  },
  loadingSpinner: {
    fontSize: '48px',
    marginBottom: '20px'
  },

  // Dashboard Styles
  topSection: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '25px',
    height: '200px'
  },
  revenueCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '30px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(102,126,234,0.3)'
  },
  revenueContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  revenueLabel: {
    fontSize: '16px',
    opacity: 0.9
  },
  revenueValue: {
    fontSize: '36px',
    fontWeight: 'bold'
  },
  revenueTrend: {
    fontSize: '14px',
    opacity: 0.9
  },
  revenueChart: {
    opacity: 0.8
  },
  statsGrid: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gap: '15px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  statLabel: {
    fontSize: '14px',
    color: '#7f8c8d',
    marginTop: '5px'
  },
  trafficCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  trafficChart: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  trafficLabel: {
    position: 'absolute',
    fontSize: '12px',
    fontWeight: '600',
    color: '#2c3e50'
  },
  trafficStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  trafficStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  trafficPercent: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  trafficType: {
    fontSize: '10px',
    color: '#7f8c8d'
  },

  // Gradient Cards
  gradientCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px'
  },
  gradientCard: {
    borderRadius: '20px',
    padding: '25px',
    color: 'white',
    height: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
  },
  cardIcon: {
    fontSize: '24px'
  },
  cardValue: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  cardLabel: {
    fontSize: '14px',
    opacity: 0.9
  },

  // Bottom Section
  bottomSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '25px'
  },
  activitiesCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  ordersCard: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '20px',
    margin: '0 0 20px 0'
  },
  activitiesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px 0'
  },
  activityIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: 'white'
  },
  activityContent: {
    flex: 1
  },
  activityTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2c3e50'
  },
  activitySubtitle: {
    fontSize: '12px',
    color: '#7f8c8d'
  },
  activityTime: {
    fontSize: '11px',
    color: '#bdc3c7'
  },
  ordersTable: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 80px 80px',
    gap: '15px',
    padding: '12px 0',
    borderBottom: '2px solid #f8f9fa',
    fontSize: '12px',
    fontWeight: '600',
    color: '#7f8c8d',
    textTransform: 'uppercase'
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 80px 80px',
    gap: '15px',
    padding: '12px 0',
    alignItems: 'center',
    fontSize: '14px',
    borderBottom: '1px solid #f8f9fa'
  },
  statusBadge: {
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase'
  },

  // Analytics Styles
  analyticsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  analyticsTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: 0
  },
  analyticsControls: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  dateFilter: {
    padding: '8px 12px',
    border: '1px solid #e1e8ed',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: 'white',
    outline: 'none'
  },
  exportButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '25px'
  },
  mainChart: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  chartTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '20px',
    margin: '0 0 20px 0'
  },
  chartContainer: {
    height: '250px',
    position: 'relative'
  },
  sideCharts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  smallChart: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  performanceMetrics: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  metricRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  metricLabel: {
    fontSize: '12px',
    color: '#7f8c8d',
    width: '60px'
  },
  progressBar: {
    flex: 1,
    height: '6px',
    backgroundColor: '#f0f0f0',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  },
  metricValue: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#2c3e50',
    width: '35px',
    textAlign: 'right'
  },

  // Coming Soon Styles
  comingSoonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    padding: '20px'
  },
  comingSoonContent: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  backButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '20px'
  }
};

export default App;