import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { FiShoppingBag, FiBookOpen, FiHeart, FiPlay, FiCheck, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import AddressForm from '../components/AddressForm';

export default function SimpleDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    if (!user?.uid) {
      setOrders([]);
      setPurchasedCourses([]);
      setFavorites([]);
      setAddress(null);
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch orders and extract purchased courses
        const ordersRef = collection(db, 'users', user.uid, 'orders');
        const ordersSnap = await getDocs(ordersRef);
        const ordersData = ordersSnap.docs.map(d => ({ 
          id: d.id, 
          ...d.data()
        }));
        setOrders(ordersData);

        // Extract courses from orders
        const coursesFromOrders = [];
        ordersData.forEach(order => {
          if (order.items && Array.isArray(order.items)) {
            order.items.forEach(item => {
              if (item.type === 'course' || item.category) {
                coursesFromOrders.push({
                  id: item.id || item._id,
                  ...item,
                  orderId: order.id,
                  purchaseDate: order.createdAt,
                  purchaseStatus: order.status
                });
              }
            });
          } else if (order.type === 'course' || order.category) {
            // Handle single course orders
            coursesFromOrders.push({
              id: order.id || order._id,
              ...order,
              orderId: order.id,
              purchaseDate: order.createdAt,
              purchaseStatus: order.status
            });
          }
        });
        setPurchasedCourses(coursesFromOrders);

        // Fetch favorites
        const favoritesRef = collection(db, 'users', user.uid, 'favorites');
        const favoritesSnap = await getDocs(favoritesRef);
        const favoritesData = favoritesSnap.docs
          .filter(doc => doc.id !== 'programs')
          .map(d => ({ id: d.id, ...d.data() }));
        setFavorites(favoritesData);

        // Fetch address
        const addressDoc = await getDoc(doc(db, 'users', user.uid, 'addresses', 'default'));
        if (addressDoc.exists()) {
          setAddress(addressDoc.data());
        }

      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const handleAddressSave = (addressData) => {
    setAddress(addressData);
    setIsEditingAddress(false);
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  const handleCancelEdit = () => {
    setIsEditingAddress(false);
  };

  const handleSelectCourse = (course) => {
    // Navigate to course detail or start learning
    navigate(`/programs/${course.slug || course._id || course.id}`);
  };

  const handleSelectFavorite = (item) => {
    // Navigate to program detail or add to favorites
    navigate(`/programs/${item.slug || item._id}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg max-w-md mx-auto">
          <h3 className="text-lg font-medium text-red-800">Please log in to view your dashboard</h3>
          <p className="text-sm text-red-600 mt-1">You need to be logged in to access your courses and favorites.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main mx-auto"></div>
        <p className="mt-4 text-white">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg max-w-md mx-auto">
          <h3 className="text-lg font-medium text-red-800">Error loading dashboard</h3>
          <p className="mt-2 text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
          <p className="text-white/80">Manage your courses and favorites</p>
        </div>

        <div className="mb-6">
          {isEditingAddress ? (
            <div className="relative">
              <button
                onClick={handleCancelEdit}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <FiX className="h-4 w-4 text-gray-600" />
              </button>
              <AddressForm onSave={handleAddressSave} initialData={address} />
            </div>
          ) : (
            <div className="svasam-card p-6 relative overflow-hidden bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Address</h2>
                <button 
                  onClick={handleEditAddress}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Edit
                </button>
              </div>
              <div className="text-gray-600 text-sm space-y-1">
                {address ? (
                  <>
                    <p>{address.fullName}</p>
                    <p>{address.address}</p>
                    <p>{address.city}, {address.state} - {address.pincode}</p>
                    <p>Phone: {address.phone}</p>
                    {address.landmark && <p>Landmark: {address.landmark}</p>}
                  </>
                ) : (
                  <p className="text-gray-400">No address saved yet</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Courses Section */}
          <div className="eterno-card p-6 relative overflow-hidden bg-white rounded-lg shadow-md flex flex-col justify-between">
            <div className="absolute top-6 right-6 text-purple-600">
              <FiBookOpen className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">My Courses</h2>
              <p className="text-sm text-gray-500 mb-4">Continue learning</p>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {purchasedCourses.length}
              </div>
              <p className="text-sm text-gray-500 mb-6">Purchased courses</p>
            </div>
            <Link 
              to="/dashboard/courses" 
              className="text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1 group text-sm"
            >
              View all courses <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Favorites Section */}
          <div className="eterno-card p-6 relative overflow-hidden bg-white rounded-lg shadow-md flex flex-col justify-between">
            <div className="absolute top-6 right-6 text-purple-600">
              <FiHeart className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">My Favorites</h2>
              <p className="text-sm text-gray-500 mb-4">Your saved items</p>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {favorites.length}
              </div>
              <p className="text-sm text-gray-500 mb-6">Saved items</p>
            </div>
            <Link 
              to="/dashboard/favorites" 
              className="text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1 group text-sm"
            >
              View favorites <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}