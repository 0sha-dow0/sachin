import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ShoppingCart, Users, 
  Home, Lock, ChevronDown, ChevronUp
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useArtists } from '../context/ArtistContext';
import logo from '../assets/logo.png'; // Adjust if your logo path is different

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cart } = useBooking();
  const { comparisonList } = useArtists();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="h-10 w-10 rounded-full overflow-hidden purple-glow-sm">
              <img 
                src={logo} 
                alt="Music Booking" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/40';
                }}
              />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Gold Berry</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-purple-300 bg-purple-900/40 border border-purple-700/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <div className="flex items-center">
                <Home className="w-4 h-4 mr-1.5" />
                Home
              </div>
            </Link>
            
            <Link 
              to="/compare" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/compare') 
                  ? 'text-purple-300 bg-purple-900/40 border border-purple-700/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1.5" />
                Compare
                {comparisonList.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                    {comparisonList.length}
                  </span>
                )}
              </div>
            </Link>
            
            <Link 
              to="/cart" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/cart') 
                  ? 'text-purple-300 bg-purple-900/40 border border-purple-700/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <div className="flex items-center">
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                Booking
                {cart.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>
            
            <Link 
              to="/admin" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/admin') 
                  ? 'text-purple-300 bg-purple-900/40 border border-purple-700/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-1.5" />
                Admin
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'text-purple-300 bg-purple-900/40 border border-purple-700/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Home
              </div>
            </Link>
            
            <Link 
              to="/compare" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/compare') 
                  ? 'text-purple-300 bg-purple-900/40 border border-purple-700/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Compare Artists
                {comparisonList.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                    {comparisonList.length}
                  </span>
                )}
              </div>
            </Link>
            
            <Link 
              to="/cart" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/cart') 
                  ? 'text-purple-300 bg-purple-900/40 border border-purple-700/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Booking Cart
                {cart.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>
            
            <Link 
              to="/admin" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/admin') 
                  ? 'text-purple-300 bg-purple-900/40 border border-purple-700/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Admin Panel
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};