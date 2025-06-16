import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

export const inventoryAPI = {
  getInventory: () => api.get('/inventory'),
  addItem: (item) => api.post('/inventory', item),
};

export const vendorAPI = {
  getVendors: () => api.get('/vendors'),
};

export const orderAPI = {
  getOrders: () => api.get('/orders'),
};

export default api;