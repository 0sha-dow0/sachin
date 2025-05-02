import { useState } from 'react';
import { Star, ShoppingCart, User, Music, Map, Plus, Info, RotateCcw, ExternalLink } from 'lucide-react';
import { Artist } from '../types';
import { useArtists } from '../context/ArtistContext';
import { useBooking } from '../context/BookingContext';
import { Link } from 'react-router-dom';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard = ({ artist }: ArtistCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { addToComparison, comparisonList } = useArtists();
  const { addToCart } = useBooking();
  
  const {
    id, name, imageUrl, genre, rating, price, location,
    pace, shooting, passing, dribbling, defense, physical,
    tier, position, soundcloudUrl
  } = artist;

  const getBorderColor = () => {
    switch (tier) {
      case 'bronze': return 'border-amber-700';
      case 'silver': return 'border-gray-400';
      case 'gold': return 'border-yellow-400';
      case 'special': return 'border-gradient-to-r from-purple-500 via-pink-500 to-red-500';
      default: return 'border-amber-700';
    }
  };

  const isInComparison = comparisonList.some(a => a.id === id);
  // const comparisonDisabled = comparisonList.length >= 3 && !isInComparison;
  const comparisonDisabled = false;
  const getStatColor = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 80) return 'text-lime-500';
    if (value >= 70) return 'text-yellow-500';
    if (value >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="relative h-[420px] w-[300px]">
      {/* Front of card - Always visible */}
      <div className="absolute inset-0 w-full h-full glass rounded-lg overflow-hidden flex flex-col">
        <div className="relative h-2/5">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
          <div className="absolute top-2 left-2 glass px-2 py-1 rounded flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm font-bold text-white">{rating}</span>
          </div>
          <div className="absolute top-2 right-2 glass px-2 py-1 rounded">
            <span className="text-sm font-bold text-white">${price}/hr</span>
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-bold text-lg truncate">{name}</h3>
            <span className="text-xs px-2 py-1 glass text-white rounded-full">{position}</span>
          </div>
          
          <div className="flex items-center mb-2">
            <Music className="w-4 h-4 text-gray-200 mr-1" />
            <span className="text-gray-100 text-sm">{genre}</span>
          </div>
          
          <div className="flex items-center mb-3">
            <Map className="w-4 h-4 text-gray-200 mr-1" />
            <span className="text-gray-100 text-sm truncate">{location}</span>
          </div>
          
          <div className="space-y-1 flex-1">
            <div className="flex justify-between">
              <span className="text-gray-200 text-xs font-medium">PAC</span>
              <span className={`text-xs font-bold ${getStatColor(pace)}`}>{pace}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-200 text-xs font-medium">SHO</span>
              <span className={`text-xs font-bold ${getStatColor(shooting)}`}>{shooting}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-200 text-xs font-medium">PAS</span>
              <span className={`text-xs font-bold ${getStatColor(passing)}`}>{passing}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-200 text-xs font-medium">DRI</span>
              <span className={`text-xs font-bold ${getStatColor(dribbling)}`}>{dribbling}</span>
            </div>
          </div>
          
          {/* Button row at bottom */}
          <div className="mt-auto pt-2 flex justify-between items-center">
            <Link
              to={`/artist/${id}`}
              className="flex items-center justify-center px-3 py-1.5 glass text-white rounded hover:bg-white/20"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              <span className="text-xs">View Details</span>
            </Link>
            
            <button 
              onClick={() => setIsFlipped(true)}
              className="glass text-white p-1.5 rounded-full hover:bg-white/20"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Back of card - Shows on flip */}
      <div 
        className={`absolute inset-0 w-full h-full purple-card rounded-lg overflow-hidden transition-all duration-500 ${
          isFlipped ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="p-4 h-full flex flex-col bg-purple-900/60 backdrop-blur-sm">
          <h3 className="text-white font-bold text-lg mb-2">{name}</h3>
          
          {soundcloudUrl ? (
            <div className="mb-3 h-30 max-h-30">
              <iframe
                width="100%"
                height="100%"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudUrl)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
              ></iframe>
            </div>
          ) : (
            <div className="h-24 flex items-center justify-center text-white font-medium">
              No music samples available
            </div>
          )}
          
          <div className="mt-auto space-y-2">
            <Link
              to={`/artist/${id}`}
              className="block w-full text-center py-2 bg-purple-700 hover:bg-purple-600 text-white font-medium rounded"
              onClick={(e) => e.stopPropagation()}
            >
              View Details
            </Link>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(artist);
              }}
              className="w-full py-2 bg-purple-700 hover:bg-purple-600 text-white font-medium rounded flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Booking
            </button>
            
            <button
  onClick={(e) => {
    e.stopPropagation();
    if (!isInComparison) {
      addToComparison(artist);
    }
  }}
  disabled={false} // Always allow adding to comparison
  className={`w-full py-2 rounded flex items-center justify-center font-medium ${
    isInComparison 
      ? 'bg-purple-700 hover:bg-purple-600 text-white' 
      : 'bg-purple-700 hover:bg-purple-600 text-white'
  }`}
>
  <Plus className="w-4 h-4 mr-2" />
  {isInComparison ? 'Added to Compare' : 'Add to Compare'}
</button>
          </div>

          <button 
            onClick={() => setIsFlipped(false)}
            className="absolute top-2 right-2 bg-purple-700 text-white p-1.5 rounded-full hover:bg-purple-600"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};