import React from 'react';

const Analytics: React.FC = () => {
  // Mock data for demonstration
  const stats = [
    { name: 'Total Revenue', value: 'KSh 1,234,567', change: '+12%', changeType: 'positive' },
    { name: 'Total Orders', value: '456', change: '+8%', changeType: 'positive' },
    { name: 'Products Sold', value: '2,345', change: '+15%', changeType: 'positive' },
    { name: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', changeType: 'positive' },
  ];

  const recentActivities = [
    { id: 1, type: 'order', description: 'New order #1234 placed', time: '2 min ago' },
    { id: 2, type: 'product', description: 'Product "MacBook Pro Screen" added', time: '1 hour ago' },
    { id: 3, type: 'user', description: 'New user registration', time: '2 hours ago' },
    { id: 4, type: 'order', description: 'Order #1232 marked as delivered', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">{stat.name}</dt>
              <dd className="mt-1 flex items-baseline justify-between">
                <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                <div
                  className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium ${
                    stat.changeType === 'positive'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {stat.change}
                </div>
              </dd>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.description}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                Add Product
              </button>
              <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors">
                View Orders
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Manage Users
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for Charts */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Sales charts would be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;