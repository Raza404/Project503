const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
// Business Networking endpoints (add this before error handling)

// Get business connections
app.get('/api/business/connections', (req, res) => {
  console.log('🌐 Business connections requested');
  res.json({
    success: true,
    message: 'Business connections retrieved',
    data: [
      {
        id: 1,
        businessName: 'TechCorp Solutions',
        industry: 'Technology',
        connectionDate: '2025-01-10',
        projects: 3,
        value: '$150K',
        status: 'active'
      },
      {
        id: 2,
        businessName: 'Green Earth Manufacturing',
        industry: 'Manufacturing',
        connectionDate: '2024-12-15',
        projects: 1,
        value: '$75K',
        status: 'active'
      }
    ]
  });
});

// Get business opportunities
app.get('/api/business/opportunities', (req, res) => {
  console.log('🎯 Business opportunities requested');
  res.json({
    success: true,
    message: 'Business opportunities retrieved',
    data: [
      {
        id: 1,
        title: 'Supply Chain Optimization Project',
        description: 'Multi-business collaboration to optimize supply chain efficiency',
        estimatedValue: '$200K',
        participants: ['TechCorp Solutions', 'LogiFlow Logistics'],
        deadline: '2025-03-15',
        status: 'open'
      },
      {
        id: 2,
        title: 'Sustainable Product Line Development',
        description: 'Joint venture to develop eco-friendly products',
        estimatedValue: '$350K',
        participants: ['Green Earth Manufacturing', 'Digital Marketing Pro'],
        deadline: '2025-04-01',
        status: 'in_progress'
      }
    ]
  });
});

// Get business analytics
app.get('/api/business/analytics', (req, res) => {
  console.log('📊 Business analytics requested');
  res.json({
    success: true,
    message: 'Business analytics retrieved',
    data: {
      networkGrowth: [
        { month: 'Oct', connections: 5 },
        { month: 'Nov', connections: 8 },
        { month: 'Dec', connections: 12 },
        { month: 'Jan', connections: 18 },
        { month: 'Feb', connections: 25 }
      ],
      collaborationValue: [
        { quarter: 'Q3 2024', value: 45000 },
        { quarter: 'Q4 2024', value: 78000 },
        { quarter: 'Q1 2025', value: 125000 }
      ],
      industryDistribution: [
        { industry: 'Technology', count: 8 },
        { industry: 'Manufacturing', count: 5 },
        { industry: 'Logistics', count: 4 },
        { industry: 'Marketing', count: 3 },
        { industry: 'Finance', count: 2 }
      ]
    }
  });
});

// Business insights endpoint
app.get('/api/business/insights', (req, res) => {
  console.log('🧠 Business insights requested');
  res.json({
    success: true,
    message: 'Business insights retrieved',
    data: {
      recommendations: [
        {
          type: 'growth',
          priority: 'high',
          title: 'Market Expansion Opportunity',
          description: 'Consider entering the sustainable products market - 40% growth potential identified',
          action: 'Schedule market research meeting',
          potentialValue: '$500K'
        },
        {
          type: 'partnership',
          priority: 'medium',
          title: 'Strategic Partnership',
          description: 'TechCorp Solutions shows 95% compatibility for long-term collaboration',
          action: 'Initiate partnership discussion',
          potentialValue: '$200K'
        },
        {
          type: 'efficiency',
          priority: 'medium',
          title: 'Operational Optimization',
          description: 'Automate inventory reordering to reduce manual work by 60%',
          action: 'Implement AI-powered inventory system',
          potentialValue: '$50K savings'
        }
      ],
      marketPosition: {
        rank: 'Top 25%',
        score: 75,
        benchmarks: {
          customerSatisfaction: { value: 92, industry: 74 },
          marketShare: { value: 15, industry: 12 },
          innovation: { value: 68, industry: 58 }
        }
      }
    }
  });
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://10.0.2.2:5000', 'http://localhost:8081'], 
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome message
console.log('🚀 Starting Project 503 Backend Server...');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '✅ Project 503 Backend is running perfectly!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: 'Connected',
    status: 'Healthy'
  });
});

// Authentication endpoints
app.post('/api/auth/register', (req, res) => {
  console.log('📝 Registration attempt:', req.body);
  const { email, password, companyName } = req.body;
  
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }
  
  res.json({ 
    success: true, 
    message: 'User registered successfully!',
    user: {
      id: 'user_' + Date.now(),
      email: email,
      companyName: companyName || 'My Company'
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  console.log('🔐 Login attempt:', req.body);
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }
  
  res.json({ 
    success: true, 
    message: 'Login successful!',
    token: 'jwt_token_' + Date.now(),
    user: {
      id: 'user_123',
      email: email,
      companyName: 'Demo Company'
    }
  });
});

// Inventory endpoints
app.get('/api/inventory', (req, res) => {
  console.log('📦 Inventory requested');
  res.json({ 
    success: true,
    message: 'Inventory data retrieved',
    data: [
      { 
        id: 1, 
        itemName: 'Office Chairs', 
        quantity: 25, 
        minThreshold: 10,
        category: 'Furniture',
        lastUpdated: '2025-01-15'
      },
      { 
        id: 2, 
        itemName: 'Laptop Batteries', 
        quantity: 150, 
        minThreshold: 50,
        category: 'Electronics',
        lastUpdated: '2025-01-14'
      },
      { 
        id: 3, 
        itemName: 'Coffee Beans', 
        quantity: 8, 
        minThreshold: 20,
        category: 'Consumables',
        lastUpdated: '2025-01-13',
        alert: 'Low Stock!'
      }
    ]
  });
});

app.post('/api/inventory', (req, res) => {
  console.log('📦 Adding new inventory item:', req.body);
  res.json({ 
    success: true,
    message: 'Inventory item added successfully!',
    item: {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    }
  });
});

// Vendors endpoints
app.get('/api/vendors', (req, res) => {
  console.log('🤝 Vendors list requested');
  res.json({ 
    success: true,
    message: 'Vendors data retrieved',
    data: [
      { 
        id: 1, 
        name: 'ABC Office Supplies', 
        rating: 4.8,
        location: 'Mumbai',
        specialties: ['Office Furniture', 'Stationery'],
        responseTime: '2 hours'
      },
      { 
        id: 2, 
        name: 'TechGear Solutions', 
        rating: 4.5,
        location: 'Delhi',
        specialties: ['Electronics', 'IT Equipment'],
        responseTime: '1 hour'
      },
      { 
        id: 3, 
        name: 'Fresh Supplies Co', 
        rating: 4.2,
        location: 'Bangalore',
        specialties: ['Consumables', 'Food & Beverages'],
        responseTime: '4 hours'
      }
    ]
  });
});

// Orders endpoints
app.get('/api/orders', (req, res) => {
  console.log('📋 Orders requested');
  res.json({ 
    success: true,
    message: 'Orders data retrieved',
    data: [
      {
        id: 'ORD_001',
        vendorName: 'ABC Office Supplies',
        items: ['Office Chairs x5', 'Desk Lamps x10'],
        status: 'In Transit',
        totalAmount: 25000,
        orderDate: '2025-01-10',
        expectedDelivery: '2025-01-18'
      },
      {
        id: 'ORD_002',
        vendorName: 'Fresh Supplies Co',
        items: ['Coffee Beans x50kg'],
        status: 'Delivered',
        totalAmount: 15000,
        orderDate: '2025-01-05',
        expectedDelivery: '2025-01-12'
      }
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error occurred:', err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

app.listen(PORT, () => {
  console.log('\n🎉 PROJECT 503 BACKEND STARTED SUCCESSFULLY!');
  console.log('=====================================');
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
  console.log('=====================================\n');
});