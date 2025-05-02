import { Filters } from '../components/Filters';
import { ArtistGrid } from '../components/ArtistGrid';
import { Music } from 'lucide-react';

export const ArtistListPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-purple-900/60 flex items-center justify-center purple-glow-sm">
            <Music className="w-8 h-8 text-purple-300" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Gold Berry Artists</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Discover and book world-class artists for your next event</p>
      </div>
      
      <Filters />
      <ArtistGrid />
    </div>
  );
};