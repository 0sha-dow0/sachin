import { useState } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp, Sliders, MapPin, Star, DollarSign, Music } from 'lucide-react';
import { Genre, FilterOptions } from '../types';
import { useArtists } from '../context/ArtistContext';

export const Filters = () => {
  const { filterOptions, setFilterOptions } = useArtists();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const genres: (Genre | 'All')[] = [
    'All',
    'Hip Hop',
    'R&B',
    'Pop',
    'Rock',
    'Electronic',
    'Jazz',
    'Latin',
    'Reggae',
    'Afrobeats'
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({
      ...filterOptions,
      searchQuery: e.target.value,
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const resetFilters = () => {
    setFilterOptions({
      genre: 'All',
      minRating: 0,
      maxPrice: 2000,
      searchQuery: '',
      location: '',
    });
  };

  return (
    <div className="bg-gray-900/70 backdrop-blur-md rounded-lg border border-purple-900/40 shadow-lg purple-glow-sm mb-8">
      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-purple-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 bg-gray-800/80 border border-purple-900/50 rounded-lg leading-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Search artists, genres, locations..."
              value={filterOptions.searchQuery || ''}
              onChange={handleSearchChange}
            />
          </div>
          
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center justify-center px-4 py-3 bg-purple-900/70 border border-purple-700/50 rounded-lg text-purple-100 hover:bg-purple-800/70 transition-colors duration-200 min-w-[120px]"
          >
            <Sliders className="w-5 h-5 mr-2" />
            Filters
            {isFiltersOpen ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </button>
        </div>
      </div>
      
      {isFiltersOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-purple-900/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="filter-group">
              <label htmlFor="genre" className="block text-sm font-medium text-purple-300 mb-2 flex items-center">
                <Music className="w-4 h-4 mr-2 text-purple-400" />
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white rounded-lg"
                value={filterOptions.genre || 'All'}
                onChange={handleFilterChange}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="location" className="block text-sm font-medium text-purple-300 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="mt-1 block w-full pl-3 pr-3 py-2.5 bg-gray-800 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="City, Country"
                value={filterOptions.location || ''}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label htmlFor="minRating" className="block text-sm font-medium text-purple-300 mb-2 flex items-center">
                <Star className="w-4 h-4 mr-2 text-purple-400" />
                Min Rating
              </label>
              <div className="relative mt-1">
                <input
                  type="range"
                  id="minRating"
                  name="minRating"
                  min="0"
                  max="100"
                  step="1"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  value={filterOptions.minRating || 0}
                  onChange={handleFilterChange}
                />
                <div className="text-sm text-gray-300 mt-2 flex justify-between">
                  <span>0</span>
                  <span className="text-purple-400 font-medium">{filterOptions.minRating || 0}</span>
                  <span>100</span>
                </div>
              </div>
            </div>
            
            <div className="filter-group">
              <label htmlFor="maxPrice" className="block text-sm font-medium text-purple-300 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-purple-400" />
                Max Price
              </label>
              <div className="relative mt-1">
                <input
                  type="range"
                  id="maxPrice"
                  name="maxPrice"
                  min="0"
                  max="2000"
                  step="50"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  value={filterOptions.maxPrice || 2000}
                  onChange={handleFilterChange}
                />
                <div className="text-sm text-gray-300 mt-2 flex justify-between">
                  <span>$0</span>
                  <span className="text-purple-400 font-medium">${filterOptions.maxPrice || 2000}</span>
                  <span>$2000</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={resetFilters}
              className="flex items-center justify-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};