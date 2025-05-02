import { createContext, useState, useContext, ReactNode } from 'react';
import { Artist } from '../types';

interface BookingItem {
  artist: Artist;
  date?: string;
  venue?: string;
  duration?: number;
  specialRequests?: string;
}

interface BookingContextType {
  cart: BookingItem[];
  addToCart: (artist: Artist) => void;
  removeFromCart: (artistId: string) => void;
  updateBookingDetails: (artistId: string, details: Partial<Omit<BookingItem, 'artist'>>) => void;
  getTotalPrice: () => number;
  getWhatsAppLink: (name: string, email: string, phone: string) => string;
  clearCart: () => void;
}

// Create context with a default undefined value
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Define hook first as a function declaration
function useBookingHook() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

// Use function declaration for Provider
function BookingProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<BookingItem[]>([]);

  const addToCart = (artist: Artist) => {
    if (!cart.some(item => item.artist.id === artist.id)) {
      setCart([...cart, { 
        artist, 
        date: '', 
        venue: '', 
        duration: 1,
        specialRequests: '' 
      }]);
    }
  };

  const removeFromCart = (artistId: string) => {
    setCart(cart.filter(item => item.artist.id !== artistId));
  };

  const updateBookingDetails = (artistId: string, details: Partial<Omit<BookingItem, 'artist'>>) => {
    setCart(
      cart.map(item => 
        item.artist.id === artistId 
          ? { ...item, ...details } 
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const duration = item.duration || 1;
      return total + (item.artist.price * duration);
    }, 0);
  };

  const getWhatsAppLink = (name: string, email: string, phone: string) => {
    const bookingDetails = cart.map(item => {
      return `
Artist: ${item.artist.name}
Date: ${item.date}
Venue: ${item.venue}
Duration: ${item.duration || 1} hour(s)
Price: $${item.artist.price * (item.duration || 1)}
${item.specialRequests ? `Special Requests: ${item.specialRequests}` : ''}
`;
    }).join('\n');

    const message = `
*New Booking Request*

Customer Information:
Name: ${name}
Email: ${email}
Phone: ${phone}

*Booking Details:*
${bookingDetails}

Total Amount: $${getTotalPrice()}
`;

    return `https://wa.me/9513301050?text=${encodeURIComponent(message)}`;
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <BookingContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateBookingDetails, 
        getTotalPrice,
        getWhatsAppLink,
        clearCart
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// Export as named exports
export { BookingProvider, useBookingHook as useBooking };