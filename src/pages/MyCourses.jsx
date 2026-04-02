import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { FiX, FiShoppingBag, FiBookOpen, FiHeart, FiPlay } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function MyCourses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.uid) {
      setPurchasedCourses([]);
      setLoading(false);
      return;
    }

    const loadPurchasedCourses = async () => {
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

      } catch (err) {
        console.error('Error loading purchased courses:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadPurchasedCourses();
  }, [user]);

  const handleViewDetails = (course) => {
    navigate(`/programs/${course.slug || course._id || course.id}`);
  };

  const handleStartLearning = (course) => {
    navigate(`/programs/${course.slug || course._id || course.id}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-white mb-2">Please log in to view your courses</h3>
          <p className="text-white/80">You need to be logged in to access your purchased courses.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        <p className="mt-4 text-white">Loading your courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
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
                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">My Courses</h1>
              <p className="text-white/80">Continue your learning journey</p>
            </div>

            {/* Courses Grid */}
            {purchasedCourses.length === 0 ? (
              <div className="text-center py-16">
                <FiBookOpen className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No courses purchased yet</h3>
                <p className="text-white/70 mb-6">Start exploring our programs to begin your wellness journey</p>
                <Link
                  to="/programs"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Explore Programs
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Image */}
                    <div className="h-48 bg-gray-200 relative">
                      {course.imageUrl || course.image ? (
                        <img 
                          src={course.imageUrl || course.image} 
                          alt={course.title || course.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200" style={{display: (course.imageUrl || course.image) ? 'none' : 'flex'}}>
                        <FiBookOpen className="h-12 w-12 text-purple-400" />
                      </div>
                      
                      {/* Purchase Badge */}
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Purchased
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {course.category && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-purple-100 text-purple-800 mb-3">
                          {course.category}
                        </span>
                      )}
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {course.title || course.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {course.description || course.strip || 'No description available'}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        {course.duration && (
                          <span className="text-sm text-gray-500">
                            {course.duration}
                          </span>
                        )}
                        {course.price && (
                          <span className="text-lg font-bold text-green-600">
                            ✓ Purchased
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(course)}
                          className="flex-1 px-4 py-2 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleStartLearning(course)}
                          className="flex-1 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <FiPlay className="h-4 w-4" />
                          Start Learning
                        </button>
                      </div>
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
