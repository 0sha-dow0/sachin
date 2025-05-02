export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  genre: Genre;
  rating: number;
  price: number;
  location: string;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defense: number;
  physical: number;
  soundcloudUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  description: string;
  featured?: boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'special';
  position: string;
}

export type Genre = 
  | 'Hip Hop'
  | 'R&B'
  | 'Pop'
  | 'Rock'
  | 'Electronic'
  | 'Jazz'
  | 'Latin'
  | 'Reggae'
  | 'Afrobeats';

export interface BookingItem {
  artist: Artist;
  date: string;
  venue: string;
  duration: number;
  specialRequests?: string;
}

export interface Booking {
  id: string;
  items: BookingItem[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface FilterOptions {
  genre?: Genre | 'All';
  location?: string;
  minRating?: number;
  maxPrice?: number;
  searchQuery?: string;
}