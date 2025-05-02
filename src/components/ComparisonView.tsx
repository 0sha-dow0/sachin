import { useState, useEffect } from 'react';
import { useArtists } from '../context/ArtistContext';
import { Artist } from '../types';
import { X, Star, Music, MapPin, ShoppingCart, Plus, Info, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export const ComparisonView = () => {
  const { comparisonList, removeFromComparison, clearComparison } = useArtists();
  const { addToCart } = useBooking();
  const [selectedCategories, setSelectedCategories] = useState({
    pace: true,
    shooting: true,
    passing: true,
    dribbling: true,
    defense: true,
    physical: true,
  });
  
  const handleClearAll = () => {
    if (clearComparison) {
      clearComparison();
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCategory = (category: keyof typeof selectedCategories) => {
    setSelectedCategories({
      ...selectedCategories,
      [category]: !selectedCategories[category],
    });
  };

  const getHighestStat = (statName: keyof Artist) => {
    if (comparisonList.length === 0) return 0;
    return Math.max(...comparisonList.map(artist => artist[statName] as number));
  };

  const getStatColor = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 80) return 'text-lime-500';
    if (value >= 70) return 'text-yellow-500';
    if (value >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  const getProgressColor = (value: number) => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 80) return 'bg-lime-500';
    if (value >= 70) return 'bg-yellow-500';
    if (value >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Calculate columns based on number of artists + 1 for labels
  const gridCols = comparisonList.length + 1;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Compare Artists</h1>
            <p className="text-gray-400">Compare multiple artists side by side</p>
          </div>
          
          <div className="flex space-x-3">
            <Link 
              to="/" 
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Artists
            </Link>
            
            <button 
              onClick={handleClearAll}
              className={`px-4 py-2 bg-red-900/60 hover:bg-red-800 text-white rounded-md flex items-center ${
                comparisonList.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={comparisonList.length === 0}
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </button>
          </div>
        </div>
      </div>
      
      {comparisonList.length === 0 ? (
        <div className="bg-gray-900/70 border border-gray-800 rounded-lg py-16 text-center">
          <div className="purple-glow-sm bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-3">No Artists Added to Compare</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Add artists to compare their attributes and skills side by side.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Browse Artists
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg overflow-x-auto purple-glow-sm">
            <div className="min-w-max">
              <div className={`grid grid-cols-${gridCols} gap-4 p-6`} style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` 
              }}>
                <div className=""></div>
                
                {comparisonList.map((artist) => (
                  <motion.div 
                    key={artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                  >
                    <div className="relative mb-4">
                      <img 
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeFromComparison(artist.id)}
                        className="absolute -top-3 -right-3 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 truncate">{artist.name}</h3>
                    
                    <div className="mb-2 flex items-center">
                      <Music className="w-4 h-4 text-gray-400 mr-1.5" />
                      <span className="text-gray-300">{artist.genre}</span>
                    </div>
                    
                    <div className="mb-3 flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1.5" />
                      <span className="text-gray-300">{artist.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-gray-300">{artist.rating}</span>
                      </div>
                      <span className="text-gray-300">${artist.price}/hr</span>
                    </div>
                    
                    <div className="space-y-2">
                      <Link
                        to={`/artist/${artist.id}`}
                        className="flex items-center justify-center w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded mb-2"
                      >
                        <ExternalLink className="w-4 h-4 mr-1.5" />
                        View Details
                      </Link>
                      
                      <button
                        onClick={() => addToCart(artist)}
                        className="flex items-center justify-center w-full py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1.5" />
                        Add to Booking
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="border-t border-gray-800 mt-4 pt-6 pb-2 px-6">
                <h3 className="text-xl font-bold text-white mb-4">Stat Comparison</h3>
                <div className="space-y-8">
                  {/* Category toggles */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(selectedCategories).map(([category, isSelected]) => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category as keyof typeof selectedCategories)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          isSelected 
                            ? 'bg-purple-600/70 text-white' 
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                  
                  {/* Stat rows */}
                  {selectedCategories.pace && (
                    <div className="" style={{ 
                      display: 'grid', 
                      gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                      gap: '1rem',
                      alignItems: 'center'
                    }}>
                      <div className="">
                        <span className="text-gray-400 font-medium">Pace</span>
                      </div>
                      {comparisonList.map(artist => (
                        <div key={`${artist.id}-pace`}>
                          <div className="flex items-center mb-1">
                            <span className={`font-bold mr-2 ${getStatColor(artist.pace)}`}>{artist.pace}</span>
                            {artist.pace === getHighestStat('pace') && comparisonList.length > 1 && (
                              <span className="text-xs bg-yellow-600/50 text-yellow-300 px-1.5 py-0.5 rounded">Highest</span>
                            )}
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2.5">
                            <div 
                              className={`${getProgressColor(artist.pace)} h-2.5 rounded-full`} 
                              style={{ width: `${artist.pace}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedCategories.shooting && (
                    <div className="" style={{ 
                      display: 'grid', 
                      gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                      gap: '1rem',
                      alignItems: 'center'
                    }}>
                      <div className="">
                        <span className="text-gray-400 font-medium">Shooting</span>
                      </div>
                      {comparisonList.map(artist => (
                        <div key={`${artist.id}-shooting`}>
                          <div className="flex items-center mb-1">
                            <span className={`font-bold mr-2 ${getStatColor(artist.shooting)}`}>{artist.shooting}</span>
                            {artist.shooting === getHighestStat('shooting') && comparisonList.length > 1 && (
                              <span className="text-xs bg-yellow-600/50 text-yellow-300 px-1.5 py-0.5 rounded">Highest</span>
                            )}
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2.5">
                            <div 
                              className={`${getProgressColor(artist.shooting)} h-2.5 rounded-full`} 
                              style={{ width: `${artist.shooting}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Repeat the same pattern for other stats */}
                  {selectedCategories.passing && (
                    <div className="" style={{ 
                      display: 'grid', 
                      gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                      gap: '1rem',
                      alignItems: 'center'
                    }}>
                      <div className="">
                        <span className="text-gray-400 font-medium">Passing</span>
                      </div>
                      {comparisonList.map(artist => (
                        <div key={`${artist.id}-passing`}>
                          <div className="flex items-center mb-1">
                            <span className={`font-bold mr-2 ${getStatColor(artist.passing)}`}>{artist.passing}</span>
                            {artist.passing === getHighestStat('passing') && comparisonList.length > 1 && (
                              <span className="text-xs bg-yellow-600/50 text-yellow-300 px-1.5 py-0.5 rounded">Highest</span>
                            )}
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2.5">
                            <div 
                              className={`${getProgressColor(artist.passing)} h-2.5 rounded-full`} 
                              style={{ width: `${artist.passing}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedCategories.dribbling && (
                    <div className="" style={{ 
                      display: 'grid', 
                      gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                      gap: '1rem',
                      alignItems: 'center'
                    }}>
                      <div className="">
                        <span className="text-gray-400 font-medium">Dribbling</span>
                      </div>
                      {comparisonList.map(artist => (
                        <div key={`${artist.id}-dribbling`}>
                          <div className="flex items-center mb-1">
                            <span className={`font-bold mr-2 ${getStatColor(artist.dribbling)}`}>{artist.dribbling}</span>
                            {artist.dribbling === getHighestStat('dribbling') && comparisonList.length > 1 && (
                              <span className="text-xs bg-yellow-600/50 text-yellow-300 px-1.5 py-0.5 rounded">Highest</span>
                            )}
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2.5">
                            <div 
                              className={`${getProgressColor(artist.dribbling)} h-2.5 rounded-full`} 
                              style={{ width: `${artist.dribbling}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedCategories.defense && (
                    <div className="" style={{ 
                      display: 'grid', 
                      gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                      gap: '1rem',
                      alignItems: 'center'
                    }}>
                      <div className="">
                        <span className="text-gray-400 font-medium">Defense</span>
                      </div>
                      {comparisonList.map(artist => (
                        <div key={`${artist.id}-defense`}>
                          <div className="flex items-center mb-1">
                            <span className={`font-bold mr-2 ${getStatColor(artist.defense)}`}>{artist.defense}</span>
                            {artist.defense === getHighestStat('defense') && comparisonList.length > 1 && (
                              <span className="text-xs bg-yellow-600/50 text-yellow-300 px-1.5 py-0.5 rounded">Highest</span>
                            )}
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2.5">
                            <div 
                              className={`${getProgressColor(artist.defense)} h-2.5 rounded-full`} 
                              style={{ width: `${artist.defense}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedCategories.physical && (
                    <div className="" style={{ 
                      display: 'grid', 
                      gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                      gap: '1rem',
                      alignItems: 'center'
                    }}>
                      <div className="">
                        <span className="text-gray-400 font-medium">Physical</span>
                      </div>
                      {comparisonList.map(artist => (
                        <div key={`${artist.id}-physical`}>
                          <div className="flex items-center mb-1">
                            <span className={`font-bold mr-2 ${getStatColor(artist.physical)}`}>{artist.physical}</span>
                            {artist.physical === getHighestStat('physical') && comparisonList.length > 1 && (
                              <span className="text-xs bg-yellow-600/50 text-yellow-300 px-1.5 py-0.5 rounded">Highest</span>
                            )}
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2.5">
                            <div 
                              className={`${getProgressColor(artist.physical)} h-2.5 rounded-full`} 
                              style={{ width: `${artist.physical}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
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