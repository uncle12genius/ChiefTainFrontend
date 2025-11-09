import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { orderService } from '../../../services/orderService';
import { productService } from '../../../services/productService';
import LoadingSpinner from '../../common/LoadingSpinner';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  pendingOrders: number;
  lowStockProducts: number;
}

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('month');

  useEffect(() => {
    fetchDashboardStats();
  }, [timeRange]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      // In a real app, you'd have an admin service to fetch these stats
      const [orders, products] = await Promise.all([
        orderService.getOrders(),
        productService.getProducts({ page: 1, size: 1000 }),
      ]);

      // Mock calculations for demo
      const mockStats: DashboardStats = {
        totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
        totalOrders: orders.length,
        totalProducts: products.products.length,
        totalUsers: 1243, // Mock data
        pendingOrders: orders.filter(o => o.status === 'PLACED' || o.status === 'CONFIRMED').length,
        lowStockProducts: products.products.filter(p => p.stock < 10).length,
      };

      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `KSh ${stats?.totalRevenue.toLocaleString() || '0'}`,
      icon: '💰',
      color: 'bg-green-500',
      change: '+12.5%',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders.toString() || '0',
      icon: '📦',
      color: 'bg-blue-500',
      change: '+8.2%',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts.toString() || '0',
      icon: '🛍️',
      color: 'bg-purple-500',
      change: '+5.1%',
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers.toString() || '0',
      icon: '👥',
      color: 'bg-orange-500',
      change: '+15.3%',
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders.toString() || '0',
      icon: '⏳',
      color: 'bg-yellow-500',
      change: '-3.2%',
    },
    {
      title: 'Low Stock',
      value: stats?.lowStockProducts.toString() || '0',
      icon: '⚠️',
      color: 'bg-red-500',
      change: '+2.1%',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-600">Welcome back, {user?.firstName}! Here's what's happening today.</p>
        </div>
        
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="input-field w-auto"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last period
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New order placed', user: 'John Doe', time: '2 min ago' },
              { action: 'Product added', user: 'Admin', time: '1 hour ago' },
              { action: 'User registered', user: 'Jane Smith', time: '2 hours ago' },
              { action: 'Order shipped', user: 'System', time: '3 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">by {activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-primary text-white p-4 rounded-lg text-center hover:bg-primary-dark transition-colors">
              <div className="text-2xl mb-2">➕</div>
              <div className="text-sm font-medium">Add Product</div>
            </button>
            
            <button className="bg-secondary text-white p-4 rounded-lg text-center hover:bg-secondary-dark transition-colors">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">View Reports</div>
            </button>
            
            <button className="bg-gray-100 text-gray-700 p-4 rounded-lg text-center hover:bg-gray-200 transition-colors">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm font-medium">Manage Users</div>
            </button>
            
            <button className="bg-gray-100 text-gray-700 p-4 rounded-lg text-center hover:bg-gray-200 transition-colors">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium">Settings</div>
            </button>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-gray-500">Sales charts will be displayed here</p>
            <p className="text-sm text-gray-400">Integration with charts library needed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;