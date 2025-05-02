import { createContext, useState, useContext, ReactNode } from 'react';
import { Artist, FilterOptions } from '../types';
import { artists as artistsData } from '../data/artists';

interface ArtistContextType {
  artists: Artist[];
  filteredArtists: Artist[];
  comparisonList: Artist[];
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  addToComparison: (artist: Artist) => void;
  removeFromComparison: (artistId: string) => void;
  clearComparison: () => void;
  getArtistById: (id: string) => Artist | undefined;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export const ArtistProvider = ({ children }: { children: ReactNode }) => {
  const [artists] = useState<Artist[]>(artistsData);
  const [comparisonList, setComparisonList] = useState<Artist[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    genre: 'All',
    minRating: 0,
    maxPrice: 2000,
    searchQuery: '',
  });

  const filteredArtists = artists.filter((artist) => {
    // Filter by genre
    if (filterOptions.genre && filterOptions.genre !== 'All' && artist.genre !== filterOptions.genre) {
      return false;
    }

    // Filter by location
    if (filterOptions.location && !artist.location.toLowerCase().includes(filterOptions.location.toLowerCase())) {
      return false;
    }

    // Filter by rating
    if (filterOptions.minRating && artist.rating < filterOptions.minRating) {
      return false;
    }

    // Filter by price
    if (filterOptions.maxPrice && artist.price > filterOptions.maxPrice) {
      return false;
    }

    // Filter by search query
    if (
      filterOptions.searchQuery &&
      !artist.name.toLowerCase().includes(filterOptions.searchQuery.toLowerCase()) &&
      !artist.genre.toLowerCase().includes(filterOptions.searchQuery.toLowerCase()) &&
      !artist.description.toLowerCase().includes(filterOptions.searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const addToComparison = (artist: Artist) => {
    // Check if artist is already in comparison
    const isAlreadyInComparison = comparisonList.some(a => a.id === artist.id);
    
    if (!isAlreadyInComparison) {
      setComparisonList([...comparisonList, artist]);
    }
  };

  const removeFromComparison = (artistId: string) => {
    setComparisonList(comparisonList.filter(artist => artist.id !== artistId));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const getArtistById = (id: string) => {
    return artists.find(artist => artist.id === id);
  };

  return (
    <ArtistContext.Provider value={{
      artists,
      filteredArtists,
      comparisonList,
      filterOptions,
      setFilterOptions,
      addToComparison,
      removeFromComparison,
      clearComparison,
      getArtistById,
    }}>
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtists = () => {
  const context = useContext(ArtistContext);
  if (context === undefined) {
    throw new Error('useArtists must be used within an ArtistProvider');
  }
  return context;
};