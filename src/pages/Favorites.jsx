import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { FiX, FiShoppingBag, FiBookOpen, FiHeart } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function Favorites() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.uid) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const loadFavorites = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load favorites as individual documents (how they're stored)
        const favoritesRef = collection(db, 'users', user.uid, 'favorites');
        const favoritesSnap = await getDocs(favoritesRef);
        const favoritesData = favoritesSnap.docs
          .filter(doc => doc.id !== 'programs') // Filter out the programs index document
          .map(d => ({ 
            id: d.id, 
            ...d.data() 
          }));
        setFavorites(favoritesData);
      } catch (err) {
        console.error('Error loading favorites:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'favorites', favoriteId));
      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
    } catch (err) {
      console.error('Error removing favorite:', err);
      setError(err);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      try {
        const deletePromises = favorites.map(fav => 
          deleteDoc(doc(db, 'users', user.uid, 'favorites', fav.id))
        );
        await Promise.all(deletePromises);
        setFavorites([]);
      } catch (err) {
        console.error('Error clearing favorites:', err);
        setError(err);
      }
    }
  };

  const handleViewDetails = (item) => {
    navigate(`/programs/${item.slug || item._id}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-white mb-2">Please log in to view your favorites</h3>
          <p className="text-white/80">You need to be logged in to access your favorites.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        <p className="mt-4 text-white">Loading your favorites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Account</h2>
            <nav className="space-y-2">
              <Link
                to="/dashboard/courses"
                className="flex items-center px-4 py-3 text-white bg-purple-600 rounded-lg"
              >
                <FiBookOpen className="h-5 w-5 mr-3" />
                My Courses
              </Link>
              <Link
                to="/dashboard/favorites"
                className="flex items-center px-4 py-3 text-white bg-purple-600 rounded-lg"
              >
                <FiHeart className="h-5 w-5 mr-3" />
                Favorites
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">My Favorites</h1>
              {favorites.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Favorites Grid */}
            {favorites.length === 0 ? (
              <div className="text-center py-16">
                <FiHeart className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No favorites yet</h3>
                <p className="text-white/70 mb-6">Start adding items to your favorites to see them here</p>
                <Link
                  to="/programs"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Explore Programs
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Image */}
                    <div className="h-48 bg-gray-200 relative">
                      {item.imageUrl || item.image ? (
                        <img 
                          src={item.imageUrl || item.image} 
                          alt={item.title || item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200" style={{display: (item.imageUrl || item.image) ? 'none' : 'flex'}}>
                        <FiHeart className="h-12 w-12 text-purple-400" />
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveFavorite(item.id)}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      >
                        <FiX className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {item.category && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-purple-100 text-purple-800 mb-3">
                          {item.category}
                        </span>
                      )}
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.title || item.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {item.description || item.strip || 'No description available'}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        {item.duration && (
                          <span className="text-sm text-gray-500">
                            {item.duration}
                          </span>
                        )}
                        {item.price && (
                          <span className="text-lg font-bold text-purple-600">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleViewDetails(item)}
                        className="w-full px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
