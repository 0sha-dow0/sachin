import { ArtistCard } from './ArtistCard';
import { useArtists } from '../context/ArtistContext';
import { motion } from 'framer-motion';

export const ArtistGrid = () => {
  const { filteredArtists } = useArtists();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-8">
      {filteredArtists.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold text-gray-700">No artists found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredArtists.map(artist => (
            <motion.div key={artist.id} variants={item}>
              <ArtistCard artist={artist} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};