import { useState } from 'react';
import { LineChart, BarChart, Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { AdminArtistList } from '../components/AdminArtistList';
import { AdminBookings } from '../components/AdminBookings';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'artists' | 'bookings'>('overview');
  
  // Mock data for dashboard stats
  const stats = {
    totalArtists: 8,
    totalBookings: 12,
    pendingBookings: 3,
    revenue: 15600,
    topGenres: [
      { name: 'Hip Hop', count: 3 },
      { name: 'Electronic', count: 2 },
      { name: 'R&B', count: 1 },
      { name: 'Rock', count: 1 },
      { name: 'Jazz', count: 1 }
    ],
    recentBookings: [
      { id: 'BK-1001', customer: 'John Smith', date: '2025-06-15', amount: 2700 },
      { id: 'BK-1002', customer: 'Emily Johnson', date: '2025-06-22', amount: 900 },
      { id: 'BK-1003', customer: 'Alex Chen', date: '2025-07-04', amount: 3450 }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your artists and bookings</p>
      </div>
      
      <div className="mb-8">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === 'artists'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('artists')}
          >
            Artists
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === 'bookings'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
        </div>
      </div>
      
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Artists</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalArtists}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalBookings}</p>
                <p className="text-xs text-yellow-600">{stats.pendingBookings} pending</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">${stats.revenue}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Top Genre</p>
                <p className="text-2xl font-bold text-gray-800">{stats.topGenres[0].name}</p>
                <p className="text-xs text-gray-500">{stats.topGenres[0].count} artists</p>
              </div>
            </div>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Genre Distribution</h2>
              <div className="h-64 flex items-center justify-center">
                <div className="flex items-end h-48 space-x-6">
                  {stats.topGenres.map((genre, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-12 bg-blue-500 rounded-t-md" 
                        style={{ 
                          height: `${(genre.count / Math.max(...stats.topGenres.map(g => g.count))) * 150}px`,
                          backgroundColor: index === 0 ? '#3b82f6' : index === 1 ? '#60a5fa' : index === 2 ? '#93c5fd' : '#bfdbfe'
                        }}
                      ></div>
                      <div className="text-xs text-gray-600 mt-2 w-16 text-center">{genre.name}</div>
                      <div className="text-xs font-bold">{genre.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Bookings</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentBookings.map((booking, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-800">{booking.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{booking.customer}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{new Date(booking.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">${booking.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <button 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => setActiveTab('bookings')}
                >
                  View All Bookings
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center"
                onClick={() => setActiveTab('artists')}
              >
                <Users className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-gray-800 font-medium">Manage Artists</span>
              </button>
              
              <button 
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center"
                onClick={() => setActiveTab('bookings')}
              >
                <Calendar className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-gray-800 font-medium">View Bookings</span>
              </button>
              
              <button 
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center"
                onClick={() => alert('Export functionality would be implemented in a real application')}
              >
                <BarChart className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-gray-800 font-medium">Export Reports</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'artists' && (
        <AdminArtistList />
      )}
      
      {activeTab === 'bookings' && (
        <AdminBookings />
      )}
    </div>
  );
};