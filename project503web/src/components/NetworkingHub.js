import React, { useState, useEffect } from 'react';

const NetworkingHub = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [businesses, setBusinesses] = useState([]);
  const [networkConnections, setNetworkConnections] = useState([]);
  const [collaborations, setCollaborations] = useState([]);

  useEffect(() => {
    // Simulate loading business network data
    setBusinesses([
      {
        id: 1,
        name: 'TechCorp Solutions',
        industry: 'Technology',
        location: 'Mumbai',
        employees: '50-100',
        specialties: ['Software Development', 'AI/ML', 'Cloud Services'],
        matchScore: 95,
        connectionStatus: 'not_connected',
        revenue: '$2M',
        growthRate: '+25%',
        avatar: '🏢'
      },
      {
        id: 2,
        name: 'Green Earth Manufacturing',
        industry: 'Manufacturing',
        location: 'Delhi',
        employees: '200-500',
        specialties: ['Sustainable Products', 'Supply Chain', 'Quality Control'],
        matchScore: 88,
        connectionStatus: 'connected',
        revenue: '$5M',
        growthRate: '+15%',
        avatar: '🏭'
      },
      {
        id: 3,
        name: 'Digital Marketing Pro',
        industry: 'Marketing',
        location: 'Bangalore',
        employees: '10-50',
        specialties: ['Digital Campaigns', 'SEO', 'Social Media'],
        matchScore: 82,
        connectionStatus: 'pending',
        revenue: '$800K',
        growthRate: '+40%',
        avatar: '📱'
      },
      {
        id: 4,
        name: 'LogiFlow Logistics',
        industry: 'Logistics',
        location: 'Chennai',
        employees: '100-200',
        specialties: ['Freight Management', 'Warehousing', 'Last Mile Delivery'],
        matchScore: 91,
        connectionStatus: 'not_connected',
        revenue: '$3M',
        growthRate: '+20%',
        avatar: '🚛'
      }
    ]);

    setNetworkConnections([
      { id: 1, businessName: 'TechCorp Solutions', connectionDate: '2025-01-10', projects: 3, value: '$150K' },
      { id: 2, businessName: 'Green Earth Manufacturing', connectionDate: '2024-12-15', projects: 1, value: '$75K' }
    ]);

    setCollaborations([
      {
        id: 1,
        title: 'Supply Chain Optimization Project',
        partners: ['TechCorp Solutions', 'LogiFlow Logistics'],
        status: 'active',
        value: '$200K',
        progress: 65,
        deadline: '2025-03-15'
      },
      {
        id: 2,
        title: 'Sustainable Product Line Launch',
        partners: ['Green Earth Manufacturing', 'Digital Marketing Pro'],
        status: 'planning',
        value: '$120K',
        progress: 25,
        deadline: '2025-04-01'
      }
    ]);
  }, []);

  const handleConnect = (businessId) => {
    setBusinesses(prev => prev.map(business => 
      business.id === businessId 
        ? { ...business, connectionStatus: 'pending' }
        : business
    ));
  };

  const renderDiscoverTab = () => (
    <div style={styles.tabContent}>
      <div style={styles.sectionHeader}>
        <h3>🔍 Discover Businesses</h3>
        <p>Find and connect with businesses that match your industry and needs</p>
      </div>

      <div style={styles.filterBar}>
        <select style={styles.filter}>
          <option>All Industries</option>
          <option>Technology</option>
          <option>Manufacturing</option>
          <option>Marketing</option>
          <option>Logistics</option>
        </select>
        <select style={styles.filter}>
          <option>All Locations</option>
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Bangalore</option>
          <option>Chennai</option>
        </select>
        <select style={styles.filter}>
          <option>Company Size</option>
          <option>1-10 employees</option>
          <option>10-50 employees</option>
          <option>50-100 employees</option>
          <option>100+ employees</option>
        </select>
      </div>

      <div style={styles.businessGrid}>
        {businesses.map(business => (
          <div key={business.id} style={styles.businessCard}>
            <div style={styles.businessHeader}>
              <div style={styles.businessAvatar}>{business.avatar}</div>
              <div style={styles.businessInfo}>
                <h4 style={styles.businessName}>{business.name}</h4>
                <p style={styles.businessIndustry}>{business.industry} • {business.location}</p>
              </div>
              <div style={styles.matchScore}>
                <span style={styles.matchPercent}>{business.matchScore}%</span>
                <span style={styles.matchLabel}>Match</span>
              </div>
            </div>

            <div style={styles.businessMetrics}>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>Revenue</span>
                <span style={styles.metricValue}>{business.revenue}</span>
              </div>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>Growth</span>
                <span style={styles.metricValue}>{business.growthRate}</span>
              </div>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>Size</span>
                <span style={styles.metricValue}>{business.employees}</span>
              </div>
            </div>

            <div style={styles.specialties}>
              {business.specialties.map((specialty, index) => (
                <span key={index} style={styles.specialtyTag}>{specialty}</span>
              ))}
            </div>

            <div style={styles.businessActions}>
              {business.connectionStatus === 'not_connected' && (
                <button 
                  style={styles.connectBtn}
                  onClick={() => handleConnect(business.id)}
                >
                  🤝 Connect
                </button>
              )}
              {business.connectionStatus === 'pending' && (
                <button style={styles.pendingBtn} disabled>
                  ⏳ Pending
                </button>
              )}
              {business.connectionStatus === 'connected' && (
                <button style={styles.connectedBtn}>
                  ✅ Connected
                </button>
              )}
              <button style={styles.viewBtn}>👁️ View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNetworkTab = () => (
    <div style={styles.tabContent}>
      <div style={styles.sectionHeader}>
        <h3>🌐 Your Business Network</h3>
        <p>Manage your existing business connections and collaborations</p>
      </div>

      <div style={styles.networkStats}>
        <div style={styles.statCard}>
          <h4>Connected Businesses</h4>
          <span style={styles.statNumber}>{networkConnections.length}</span>
        </div>
        <div style={styles.statCard}>
          <h4>Active Projects</h4>
          <span style={styles.statNumber}>{collaborations.filter(c => c.status === 'active').length}</span>
        </div>
        <div style={styles.statCard}>
          <h4>Total Network Value</h4>
          <span style={styles.statNumber}>$225K</span>
        </div>
      </div>

      <div style={styles.connectionsGrid}>
        {networkConnections.map(connection => (
          <div key={connection.id} style={styles.connectionCard}>
            <h4>{connection.businessName}</h4>
            <p>Connected: {connection.connectionDate}</p>
            <p>Joint Projects: {connection.projects}</p>
            <p>Total Value: {connection.value}</p>
            <div style={styles.connectionActions}>
              <button style={styles.messageBtn}>💬 Message</button>
              <button style={styles.collaborateBtn}>🤝 Collaborate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCollaborationsTab = () => (
    <div style={styles.tabContent}>
      <div style={styles.sectionHeader}>
        <h3>🚀 Active Collaborations</h3>
        <p>Track your ongoing business partnerships and joint projects</p>
      </div>

      <div style={styles.collaborationsGrid}>
        {collaborations.map(collab => (
          <div key={collab.id} style={styles.collaborationCard}>
            <div style={styles.collabHeader}>
              <h4>{collab.title}</h4>
              <span style={[
                styles.statusBadge,
                { backgroundColor: collab.status === 'active' ? '#27ae60' : '#f39c12' }
              ]}>
                {collab.status}
              </span>
            </div>

            <div style={styles.collabDetails}>
              <p><strong>Partners:</strong> {collab.partners.join(', ')}</p>
              <p><strong>Value:</strong> {collab.value}</p>
              <p><strong>Deadline:</strong> {collab.deadline}</p>
            </div>

            <div style={styles.progressSection}>
              <div style={styles.progressHeader}>
                <span>Progress: {collab.progress}%</span>
              </div>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${collab.progress}%`
                  }}
                />
              </div>
            </div>

            <div style={styles.collabActions}>
              <button style={styles.viewProjectBtn}>📊 View Details</button>
              <button style={styles.updateBtn}>📝 Update Progress</button>
            </div>
          </div>
        ))}
      </div>

      <button style={styles.newCollabBtn}>
        ➕ Start New Collaboration
      </button>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>🌟 Business Networking Hub</h2>
        <p>Connect, collaborate, and grow your business network</p>
      </div>

      <div style={styles.tabs}>
        <button 
          style={[styles.tab, activeTab === 'discover' && styles.activeTab]}
          onClick={() => setActiveTab('discover')}
        >
          🔍 Discover
        </button>
        <button 
          style={[styles.tab, activeTab === 'network' && styles.activeTab]}
          onClick={() => setActiveTab('network')}
        >
          🌐 My Network
        </button>
        <button 
          style={[styles.tab, activeTab === 'collaborations' && styles.activeTab]}
          onClick={() => setActiveTab('collaborations')}
        >
          🚀 Collaborations
        </button>
      </div>

      {activeTab === 'discover' && renderDiscoverTab()}
      {activeTab === 'network' && renderNetworkTab()}
      {activeTab === 'collaborations' && renderCollaborationsTab()}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
    margin: '20px 0'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
    borderBottom: '1px solid #dee2e6'
  },
  tab: {
    padding: '12px 24px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#7f8c8d',
    borderBottom: '3px solid transparent'
  },
  activeTab: {
    color: '#3498db',
    borderBottomColor: '#3498db',
    fontWeight: 'bold'
  },
  tabContent: {
    minHeight: '400px'
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  filterBar: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  filter: {
    padding: '8px 16px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    fontSize: '14px'
  },
  businessGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px'
  },
  businessCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    border: '1px solid #f0f0f0'
  },
  businessHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px'
  },
  businessAvatar: {
    fontSize: '40px',
    marginRight: '15px'
  },
  businessInfo: {
    flex: 1
  },
  businessName: {
    margin: '0 0 5px 0',
    color: '#2c3e50'
  },
  businessIndustry: {
    margin: 0,
    color: '#7f8c8d',
    fontSize: '14px'
  },
  matchScore: {
    textAlign: 'center'
  },
  matchPercent: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#27ae60'
  },
  matchLabel: {
    fontSize: '12px',
    color: '#7f8c8d'
  },
  businessMetrics: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  metric: {
    textAlign: 'center'
  },
  metricLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#7f8c8d'
  },
  metricValue: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  specialties: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '15px'
  },
  specialtyTag: {
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px'
  },
  businessActions: {
    display: 'flex',
    gap: '10px'
  },
  connectBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    flex: 1
  },
  pendingBtn: {
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    flex: 1,
    cursor: 'not-allowed'
  },
  connectedBtn: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    flex: 1
  },
  viewBtn: {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    flex: 1
  },
  networkStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  statNumber: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3498db',
    marginTop: '10px'
  },
  connectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  connectionCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  connectionActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px'
  },
  messageBtn: {
    backgroundColor: '#9b59b6',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1
  },
  collaborateBtn: {
    backgroundColor: '#e67e22',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1
  },
  collaborationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  collaborationCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  collabHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  statusBadge: {
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  collabDetails: {
    marginBottom: '15px'
  },
  progressSection: {
    marginBottom: '15px'
  },
  progressHeader: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#7f8c8d'
  },
  progressBar: {
    backgroundColor: '#ecf0f1',
    borderRadius: '10px',
    height: '8px',
    overflow: 'hidden'
  },
  progressFill: {
    backgroundColor: '#3498db',
    height: '100%',
    borderRadius: '10px',
    transition: 'width 0.3s ease'
  },
  collabActions: {
    display: 'flex',
    gap: '10px'
  },
  viewProjectBtn: {
    backgroundColor: '#34495e',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1
  },
  updateBtn: {
    backgroundColor: '#16a085',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1
  },
  newCollabBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'block',
    margin: '0 auto'
  }
};

export default NetworkingHub;