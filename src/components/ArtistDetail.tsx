import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, ShoppingCart, Users, ArrowLeft, 
  Music, MapPin, Instagram, Twitter, Phone, 
  Calendar, DollarSign
} from 'lucide-react';
import { useArtists } from '../context/ArtistContext';
import { useBooking } from '../context/BookingContext';
import { motion } from 'framer-motion';

export const ArtistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getArtistById, addToComparison, comparisonList } = useArtists();
  const { addToCart, cart } = useBooking();
  const [artist, setArtist] = useState(getArtistById(id || ''));
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!artist) {
    return (
      <div className="text-center py-12 mt-20">
        <h2 className="text-2xl font-bold text-white mb-4">Artist Not Found</h2>
        <p className="text-gray-300 mb-6">The artist you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
        >
          Browse Artists
        </Link>
      </div>
    );
  }

  const isInComparison = comparisonList.some(a => a.id === artist.id);
  const comparisonDisabled = comparisonList.length >= 3 && !isInComparison;
  const isInCart = cart.some(item => item.artist.id === artist.id);

  const getBorderColor = () => {
    switch (artist.tier) {
      case 'bronze': return 'border-amber-700';
      case 'silver': return 'border-gray-400';
      case 'gold': return 'border-yellow-400';
      case 'special': return 'border-gradient-to-r from-purple-500 via-pink-500 to-red-500';
      default: return 'border-amber-700';
    }
  };

  const getStatColor = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 80) return 'text-lime-500';
    if (value >= 70) return 'text-yellow-500';
    if (value >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
      <div className="mb-8">
        <Link to="/" className="text-purple-400 hover:text-purple-300 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Artists
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Artist card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`lg:col-span-1 ${getBorderColor()} border-2 rounded-lg overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl`}
        >
          <div className="relative">
            <img 
              src={artist.imageUrl} 
              alt={artist.name} 
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
            <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-70 text-white px-2 py-1 rounded flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm font-bold">{artist.rating}</span>
            </div>
            <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 text-white px-2 py-1 rounded">
              <span className="text-sm font-bold">${artist.price}/hr</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-white font-bold text-2xl">{artist.name}</h1>
              <span className="text-sm px-2 py-1 bg-blue-600 text-white rounded-full">{artist.position}</span>
            </div>
            
            <div className="flex items-center mb-3">
              <Music className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-300">{artist.genre}</span>
            </div>
            
            <div className="flex items-center mb-6">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-300">{artist.location}</span>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">PAC</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-700 rounded-full h-2 mr-2">
                    <div className={`h-2 rounded-full ${getStatColor(artist.pace).replace('text-', 'bg-')}`} style={{ width: `${artist.pace}%` }}></div>
                  </div>
                  <span className={`font-bold ${getStatColor(artist.pace)}`}>{artist.pace}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">SHO</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-700 rounded-full h-2 mr-2">
                    <div className={`h-2 rounded-full ${getStatColor(artist.shooting).replace('text-', 'bg-')}`} style={{ width: `${artist.shooting}%` }}></div>
                  </div>
                  <span className={`font-bold ${getStatColor(artist.shooting)}`}>{artist.shooting}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">PAS</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-700 rounded-full h-2 mr-2">
                    <div className={`h-2 rounded-full ${getStatColor(artist.passing).replace('text-', 'bg-')}`} style={{ width: `${artist.passing}%` }}></div>
                  </div>
                  <span className={`font-bold ${getStatColor(artist.passing)}`}>{artist.passing}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">DRI</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-700 rounded-full h-2 mr-2">
                    <div className={`h-2 rounded-full ${getStatColor(artist.dribbling).replace('text-', 'bg-')}`} style={{ width: `${artist.dribbling}%` }}></div>
                  </div>
                  <span className={`font-bold ${getStatColor(artist.dribbling)}`}>{artist.dribbling}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">DEF</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-700 rounded-full h-2 mr-2">
                    <div className={`h-2 rounded-full ${getStatColor(artist.defense).replace('text-', 'bg-')}`} style={{ width: `${artist.defense}%` }}></div>
                  </div>
                  <span className={`font-bold ${getStatColor(artist.defense)}`}>{artist.defense}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">PHY</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-700 rounded-full h-2 mr-2">
                    <div className={`h-2 rounded-full ${getStatColor(artist.physical).replace('text-', 'bg-')}`} style={{ width: `${artist.physical}%` }}></div>
                  </div>
                  <span className={`font-bold ${getStatColor(artist.physical)}`}>{artist.physical}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => addToCart(artist)}
                disabled={isInCart}
                className={`w-full py-2 px-4 rounded flex items-center justify-center ${
                  isInCart 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isInCart ? 'Added to Booking' : 'Add to Booking'}
              </button>
              
              <button
                onClick={() => !comparisonDisabled && addToComparison(artist)}
                disabled={comparisonDisabled}
                className={`w-full py-2 px-4 rounded flex items-center justify-center ${
                  isInComparison 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : comparisonDisabled 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                <Users className="w-5 h-5 mr-2" />
                {isInComparison ? 'Added to Compare' : 'Add to Compare'}
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Right column - Artist details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Bio section with artist details */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">About {artist.name}</h2>
            <p className="text-gray-300 leading-relaxed mb-6">{artist.description}</p>
            
            <h3 className="text-lg font-semibold text-white mb-4">Artist Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-3 bg-blue-900/40 border border-blue-800/50 rounded-lg">
                <Music className="w-6 h-6 text-blue-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Genre</div>
                  <div className="font-medium text-white">{artist.genre}</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-green-900/40 border border-green-800/50 rounded-lg">
                <MapPin className="w-6 h-6 text-green-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="font-medium text-white">{artist.location}</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-yellow-900/40 border border-yellow-800/50 rounded-lg">
                <Star className="w-6 h-6 text-yellow-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Rating</div>
                  <div className="font-medium text-white">{artist.rating}/100</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-purple-900/40 border border-purple-800/50 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Position</div>
                  <div className="font-medium text-white">{artist.position}</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-red-900/40 border border-red-800/50 rounded-lg">
                <DollarSign className="w-6 h-6 text-red-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Rate</div>
                  <div className="font-medium text-white">${artist.price}/hour</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-indigo-900/40 border border-indigo-800/50 rounded-lg">
                <Phone className="w-6 h-6 text-indigo-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-400">Booking Status</div>
                  <div className="font-medium text-white">Available</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Music samples section */}
          {artist.soundcloudUrl && (
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Listen to {artist.name}</h2>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="text-gray-400 text-sm mb-2">SoundCloud Preview</div>
                <iframe
                  width="100%"
                  height="120"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(artist.soundcloudUrl || '')}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                  className="rounded"
                ></iframe>
              </div>
            </div>
          )}
          
          {/* Social media section */}
          {(artist.instagramUrl || artist.twitterUrl) && (
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Follow {artist.name}</h2>
              <div className="flex flex-wrap gap-4">
                {artist.instagramUrl && (
                  <a
                    href={artist.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-colors"
                  >
                    <Instagram className="w-5 h-5 mr-2" />
                    Instagram
                  </a>
                )}
                
                {artist.twitterUrl && (
                  <a
                    href={artist.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Twitter className="w-5 h-5 mr-2" />
                    Twitter
                  </a>
                )}
              </div>
            </div>
          )}
          
          {/* Booking CTA */}
          <div className="bg-purple-900/30 rounded-lg shadow-md p-6 border border-purple-800/50">
            <h2 className="text-xl font-bold text-purple-300 mb-2">Ready to book {artist.name}?</h2>
            <p className="text-purple-200 mb-4">Add to your booking cart and complete your booking details.</p>
            <button
              onClick={() => addToCart(artist)}
              disabled={isInCart}
              className={`py-3 px-6 rounded-md font-medium text-center ${
                isInCart 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isInCart ? 'Already in Booking Cart' : 'Add to Booking Cart'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};