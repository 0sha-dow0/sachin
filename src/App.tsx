import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArtistProvider } from './context/ArtistContext';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { ArtistListPage } from './pages/ArtistListPage';
import { ArtistDetail } from './components/ArtistDetail';
import { ComparisonView } from './components/ComparisonView';
import { BookingCart } from './components/BookingCart';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <ArtistProvider>
      <BookingProvider>
        <Router>
          <div className="min-h-screen bg-black text-white">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<ArtistListPage />} />
                <Route path="/artist/:id" element={<ArtistDetail />} />
                <Route path="/compare" element={<ComparisonView />} />
                <Route path="/cart" element={<BookingCart />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </BookingProvider>
    </ArtistProvider>
  );
}

export default App;