import { useState } from 'react';
import { Trash2, Calendar, Clock, MapPin, AlertCircle, MessageSquare, ArrowLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const BookingCart = () => {
  const { cart, removeFromCart, updateBookingDetails, getTotalPrice, getWhatsAppLink, clearCart } = useBooking();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [formErrors, setFormErrors] = useState({
    cart: false,
    customerName: false,
    customerEmail: false,
    customerPhone: false,
    bookingDetails: false,
  });

  const validateForm = () => {
    const errors = {
      cart: cart.length === 0,
      customerName: !customerName.trim(),
      customerEmail: !customerEmail.trim() || !/^\S+@\S+\.\S+$/.test(customerEmail),
      customerPhone: !customerPhone.trim(),
      bookingDetails: cart.some(item => !item.date || !item.venue),
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create WhatsApp link and redirect
      const whatsappLink = getWhatsAppLink(customerName, customerEmail, customerPhone);
      window.open(whatsappLink, '_blank');
      
      // Clear cart after successful submission
      clearCart();
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
    }
  };

  const handleClearCart = () => {
    // Ensure the clear cart function is called
    if (clearCart) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-900/70 border border-gray-800 rounded-lg shadow-md p-6 text-center"
        >
          <div className="purple-glow-sm bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Your Booking Cart is Empty</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">Add artists to your cart to create a booking request.</p>
          <Link
            to="/"
            className="inline-flex items-center px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Browse Artists
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
      <div className="bg-gray-900/80 border border-gray-800 rounded-lg shadow-md purple-glow-sm">
        <div className="p-6 border-b border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Your Booking Cart</h2>
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-800/80 hover:bg-red-700/80 text-white font-medium rounded-md flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Cart Items */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Artists ({cart.length})</h3>
              
              {formErrors.cart && (
                <div className="text-red-400 mb-4 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Please add at least one artist to book
                </div>
              )}
              
              {formErrors.bookingDetails && (
                <div className="text-red-400 mb-4 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Please complete all required booking details
                </div>
              )}
              
              <div className="space-y-4">
                {cart.map((item) => (
                  <motion.div 
                    key={item.artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col md:flex-row gap-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg"
                  >
                    <div className="w-full md:w-1/4">
                      <div className="relative h-80 md:h-69 rounded-md overflow-hidden">
                        <img 
                          src={item.artist.imageUrl} 
                          alt={item.artist.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 m-2">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.artist.id)}
                            className="bg-red-800/70 text-red-200 p-1 rounded-full hover:bg-red-700/80 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-3/4">
                      <div className="mb-3">
                        <h4 className="text-lg font-semibold text-white">{item.artist.name}</h4>
                        <div className="flex items-center text-sm">
                          <span className="bg-purple-900/70 text-purple-200 py-0.5 px-2 rounded-full text-xs mr-2">
                            {item.artist.genre}
                          </span>
                          <span className="text-gray-300">${item.artist.price}/hour</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1 flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-purple-400" />
                            Date*
                          </label>
                          <input
                            type="date"
                            className={`w-full p-2 bg-gray-800 border ${!item.date && formErrors.bookingDetails ? 'border-red-500' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            value={item.date || ''}
                            onChange={(e) => updateBookingDetails(item.artist.id, { date: e.target.value })}
                            onKeyDown={(e) => e.stopPropagation()}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1 flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-purple-400" />
                            Venue*
                          </label>
                          <input
                            type="text"
                            className={`w-full p-2 bg-gray-800 border ${!item.venue && formErrors.bookingDetails ? 'border-red-500' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="Venue location"
                            value={item.venue || ''}
                            onChange={(e) => updateBookingDetails(item.artist.id, { venue: e.target.value })}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1 flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-purple-400" />
                            Duration (hours)
                          </label>
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => {
                                const currentDuration = item.duration || 1;
                                const newDuration = Math.max(1, currentDuration - 1);
                                updateBookingDetails(item.artist.id, { duration: newDuration });
                              }}
                              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-l-md border-r border-gray-600"
                            >
                              -
                            </button>
                            <input
                              type="text" 
                              inputMode="numeric"
                              pattern="[0-9]*"
                              className="w-full p-2 bg-gray-800 border-y border-gray-700 text-white text-center focus:outline-none focus:ring-0"
                              value={item.duration || 1}
                              onChange={(e) => {
                                // Filter out non-numeric characters
                                const filtered = e.target.value.replace(/[^0-9]/g, '');
                                // Convert to number or use 1 as fallback
                                const value = filtered === '' ? 1 : Math.min(12, parseInt(filtered));
                                updateBookingDetails(item.artist.id, { duration: value });
                              }}
                              style={{ minWidth: '40px', maxWidth: '60px' }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const currentDuration = item.duration || 1;
                                const newDuration = Math.min(12, currentDuration + 1);
                                updateBookingDetails(item.artist.id, { duration: newDuration });
                              }}
                              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-r-md border-l border-gray-600"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Min: 1 hour, Max: 12 hours</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1 text-purple-400" />
                          Special Requests
                        </label>
                        <textarea
                          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          rows={2}
                          placeholder="Any special requirements..."
                          value={item.specialRequests || ''}
                          onChange={(e) => updateBookingDetails(item.artist.id, { specialRequests: e.target.value })}
                        ></textarea>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Customer Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Your Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Name*
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 bg-gray-800 border ${formErrors.customerName ? 'border-red-500' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="Your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                  {formErrors.customerName && (
                    <p className="text-red-400 text-xs mt-1">Please enter your name</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    className={`w-full p-2 bg-gray-800 border ${formErrors.customerEmail ? 'border-red-500' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="Your email address"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                  {formErrors.customerEmail && (
                    <p className="text-red-400 text-xs mt-1">Please enter a valid email</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Phone*
                  </label>
                  <input
                    type="tel"
                    className={`w-full p-2 bg-gray-800 border ${formErrors.customerPhone ? 'border-red-500' : 'border-gray-700'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="Your phone number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                  />
                  {formErrors.customerPhone && (
                    <p className="text-red-400 text-xs mt-1">Please enter your phone number</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="mb-6 bg-gray-800/70 border border-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Order Summary</h3>
              
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.artist.id} className="flex justify-between">
                    <span className="text-gray-400">
                      {item.artist.name} ({item.duration || 1} hours)
                    </span>
                    <span className="text-gray-300 font-medium">
                      ${item.artist.price * (item.duration || 1)}
                    </span>
                  </div>
                ))}
                
                <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between">
                  <span className="text-gray-200 font-semibold">Total</span>
                  <span className="text-purple-300 font-bold text-xl">${getTotalPrice()}</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">
                By completing this booking, you will be redirected to WhatsApp to finalize your request.
              </p>
              
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-md transition-colors"
              >
                Complete via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};