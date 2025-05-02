import { useState } from 'react';
import { Calendar, CheckCircle, Clock, X, Search, Download, Eye } from 'lucide-react';

// Mock data for bookings
const mockBookings = [
  {
    id: 'BK-1001',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    customerPhone: '+1 (555) 123-4567',
    artists: ['DJ Pace', 'MC Striker'],
    date: '2025-06-15',
    venue: 'The Grand Hall, New York',
    totalPrice: 2700,
    status: 'confirmed',
    createdAt: '2025-05-20T14:30:00Z'
  },
  {
    id: 'BK-1002',
    customerName: 'Emily Johnson',
    customerEmail: 'emily@example.com',
    customerPhone: '+1 (555) 987-6543',
    artists: ['The Defence'],
    date: '2025-06-22',
    venue: 'Riverside Club, Chicago',
    totalPrice: 900,
    status: 'pending',
    createdAt: '2025-05-21T09:15:00Z'
  },
  {
    id: 'BK-1003',
    customerName: 'Alex Chen',
    customerEmail: 'alex@example.com',
    customerPhone: '+1 (555) 222-3333',
    artists: ['Soul Passer', 'Physical Force', 'Dance Dribbler'],
    date: '2025-07-04',
    venue: 'Sunset Beach Resort, Miami',
    totalPrice: 3450,
    status: 'confirmed',
    createdAt: '2025-05-15T11:45:00Z'
  },
  {
    id: 'BK-1004',
    customerName: 'Maria Rodriguez',
    customerEmail: 'maria@example.com',
    customerPhone: '+1 (555) 444-5555',
    artists: ['The Midfielder'],
    date: '2025-06-30',
    venue: 'Downtown Lounge, Los Angeles',
    totalPrice: 1000,
    status: 'completed',
    createdAt: '2025-04-28T16:20:00Z'
  },
  {
    id: 'BK-1005',
    customerName: 'David Wilson',
    customerEmail: 'david@example.com',
    customerPhone: '+1 (555) 777-8888',
    artists: ['Reggae Defender', 'DJ Pace'],
    date: '2025-08-15',
    venue: 'Mountain View Center, Denver',
    totalPrice: 1950,
    status: 'pending',
    createdAt: '2025-05-22T10:05:00Z'
  }
];

export const AdminBookings = () => {
  const [bookings] = useState(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<typeof mockBookings[0] | null>(null);

  const filteredBookings = bookings.filter(booking =>
    (statusFilter === 'all' || booking.status === statusFilter) &&
    (booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
     booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     booking.artists.some(artist => artist.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const viewBookingDetails = (booking: typeof mockBookings[0]) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-blue-50 border-b border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">Booking Management</h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full sm:w-64 pl-10 px-4 py-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <button
              onClick={() => alert('Export functionality would be implemented in a real application')}
              className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artists</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                  <div className="text-xs text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                  <div className="text-xs text-gray-500">{booking.customerEmail}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {booking.artists.map((artist, index) => (
                      <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full mr-1 mb-1">
                        {artist}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    {formatDate(booking.date)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${booking.totalPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => viewBookingDetails(booking)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No bookings found matching your filters</p>
          </div>
        )}
      </div>
      
      {/* Booking Details Modal */}
      {modalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">
                Booking Details: {selectedBooking.id}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusBadgeClass(selectedBooking.status)}`}>
                  {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                </span>
                <span className="text-gray-500 text-sm">Created: {new Date(selectedBooking.createdAt).toLocaleString()}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800 font-medium">{selectedBooking.customerName}</p>
                    <p className="text-gray-600">{selectedBooking.customerEmail}</p>
                    <p className="text-gray-600">{selectedBooking.customerPhone}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Event Details</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-800">{formatDate(selectedBooking.date)}</span>
                    </div>
                    <div className="flex items-start mb-2">
                      <Clock className="w-4 h-4 text-gray-400 mr-2 mt-1" />
                      <span className="text-gray-800">Duration details would be shown here</span>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-4 h-4 text-gray-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-800">{selectedBooking.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Booked Artists</h4>
                <div className="space-y-2">
                  {selectedBooking.artists.map((artist, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                      <div className="text-gray-800 font-medium">{artist}</div>
                      <div className="text-gray-500">Details would show here</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-800">${selectedBooking.totalPrice - 100}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Service Fee:</span>
                  <span className="text-gray-800">$100</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${selectedBooking.totalPrice}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="space-x-2">
                  <button 
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200"
                    onClick={() => alert('Print functionality would be implemented in a real application')}
                  >
                    Print
                  </button>
                  <button 
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200"
                    onClick={() => alert('Export functionality would be implemented in a real application')}
                  >
                    Export
                  </button>
                </div>
                
                <div className="space-x-2">
                  {selectedBooking.status === 'pending' && (
                    <>
                      <button 
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm hover:bg-red-200"
                        onClick={() => alert('Cancel functionality would be implemented in a real application')}
                      >
                        Cancel
                      </button>
                      <button 
                        className="px-3 py-1 bg-green-100 text-green-600 rounded-md text-sm hover:bg-green-200"
                        onClick={() => alert('Confirm functionality would be implemented in a real application')}
                      >
                        Confirm
                      </button>
                    </>
                  )}
                  
                  {selectedBooking.status === 'confirmed' && (
                    <button 
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200"
                      onClick={() => alert('Mark as completed functionality would be implemented in a real application')}
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};