import React, { useEffect, useState, useRef } from 'react';
import { useProgramsByCategory } from '../hooks/useProgramsByCategory';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Grid } from 'swiper/modules';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { FiHeart, FiCheck } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

const TestPrograms = () => {
  const [allPrograms, setAllPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [favorites, setFavorites] = useState({});
  const swiperRef = useRef(null);
  const user = auth.currentUser;
  const { addToCart } = useCart();

  // Fetch programs for each category
  const { programs: mindPrograms, loading: mindLoading } = useProgramsByCategory('mind');
  const { programs: bodyPrograms, loading: bodyLoading } = useProgramsByCategory('body');
  const { programs: soulPrograms, loading: soulLoading } = useProgramsByCategory('soul');

  // Filter programs based on date and time
  const filteredPrograms = allPrograms.filter(program => {
    // Always show programs without date/time fields
    if (!program.programDate || !program.programTime) {
      return true; // Show programs without date/time
    }
    
    try {
      // Parse the program date and time
      const programDateTime = new Date(program.programDate);
      const timeString = program.programTime;
      
      // Extract time from various formats (e.g., "10:00 AM", "2:00 PM - 4:00 PM")
      const timeMatch = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (timeMatch) {
        const [, hours, minutes, period] = timeMatch;
        let hour = parseInt(hours);
        const minute = parseInt(minutes);
        
        // Convert to 24-hour format
        if (period.toUpperCase() === 'PM' && hour !== 12) {
          hour += 12;
        }
        if (period.toUpperCase() === 'AM' && hour === 12) {
          hour = 0;
        }
        
        programDateTime.setHours(hour, minute, 0, 0);
      }
      
      // Check if program date/time has ended (hide if time is up)
      const now = new Date();
      return programDateTime > now; // Return true for programs to show, false for programs to hide
    } catch (error) {
      console.error('Error parsing program date/time:', error);
      return true; // Show program if there's an error parsing
    }
  });

  // Check if a specific program has ended
  const isProgramEnded = (program) => {
    if (!program.programDate || !program.programTime) {
      return false;
    }
    
    try {
      const programDateTime = new Date(program.programDate);
      const timeString = program.programTime;
      
      const timeMatch = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (timeMatch) {
        const [, hours, minutes, period] = timeMatch;
        let hour = parseInt(hours);
        const minute = parseInt(minutes);
        
        if (period.toUpperCase() === 'PM' && hour !== 12) {
          hour += 12;
        }
        if (period.toUpperCase() === 'AM' && hour === 12) {
          hour = 0;
        }
        
        programDateTime.setHours(hour, minute, 0, 0);
      }
      
      const now = new Date();
      return programDateTime <= now;
    } catch (error) {
      console.error('Error checking program end time:', error);
      return false;
    }
  };

  const filteredProgramsByCategory = filteredPrograms;

  // Load user's favorites
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) return;
      
      try {
        const favoritesRef = doc(db, 'users', user.uid, 'favorites', 'programs');
        const docSnap = await getDoc(favoritesRef);
        if (docSnap.exists()) {
          setFavorites(docSnap.data());
        }
      } catch (err) {
        console.error('Error loading favorites:', err);
      }
    };
    
    loadFavorites();
  }, [user]);

  // Combine programs and add favorite status
  useEffect(() => {
    if (!mindLoading && !bodyLoading && !soulLoading) {
      try {
        // Combine all programs and remove duplicates
        const combined = [
          ...(mindPrograms || []),
          ...(bodyPrograms || []),
          ...(soulPrograms || [])
        ];
        
        // Remove duplicates based on _id
        const uniquePrograms = combined.filter((program, index, self) =>
          index === self.findIndex((p) => p._id === program._id)
        );
        
        // Add favorite status to each program
        const programsWithFavorites = uniquePrograms.map(program => ({
          ...program,
          isFavorite: !!favorites[program._id]
        }));
        
        setAllPrograms(programsWithFavorites);
        setError(null);
      } catch (err) {
        console.error('Error combining programs:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  }, [mindLoading, bodyLoading, soulLoading, mindPrograms, bodyPrograms, soulPrograms, favorites]);
  
  // Toggle favorite status
  const toggleFavorite = async (programId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // Redirect to login or show login modal
      alert('Please log in to save favorites');
      return;
    }
    
    try {
      const favoritesRef = doc(db, 'users', user.uid, 'favorites', 'programs');
      const isFavorite = favorites[programId];
      
      if (isFavorite) {
        // Remove from favorites
        await deleteDoc(doc(db, 'users', user.uid, 'favorites', programId));
        setFavorites(prev => {
          const newFavorites = { ...prev };
          delete newFavorites[programId];
          return newFavorites;
        });
      } else {
        // Add to favorites
        const program = allPrograms.find(p => p._id === programId);
        if (program) {
          await setDoc(doc(db, 'users', user.uid, 'favorites', programId), {
            ...program,
            addedAt: new Date().toISOString()
          });
          setFavorites(prev => ({
            ...prev,
            [programId]: true
          }));
        }
      }
      
      // Update local state
      setAllPrograms(prev => 
        prev.map(p => 
          p._id === programId 
            ? { ...p, isFavorite: !p.isFavorite } 
            : p
        )
      );
      
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main mx-auto"></div>
        <p className="mt-4 text-text">Loading programs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-500">Error loading programs. Please try again later.</p>
      </div>
    );
  }

  if (allPrograms.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-8 shadow-lg">
            <svg className="w-16 h-16 text-purple-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-2xl font-bold text-purple-900 mb-2">No Programs Yet</h3>
            <p className="text-purple-700 mb-6">
              Programs will appear here once they're created in your Sanity studio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://eterno.sanity.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-purple-400 text-purple-700 font-semibold text-sm py-3 px-6 transition-colors hover:bg-purple-600 hover:text-white"
              >
                Create First Program
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Featured Sessions</h2>
        <p className="text-center text-white/70 mb-12 max-w-3xl mx-auto">
          Explore our carefully curated programs designed to nurture your mind, body, and soul
        </p>
        
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, Grid]}
            spaceBetween={30}
            slidesPerView={1}
            grid={{
              rows: 2,
              fill: 'row'
            }}
            breakpoints={{
              640: { 
                slidesPerView: 1,
                grid: {
                  rows: 2,
                  fill: 'row'
                }
              },
              768: { 
                slidesPerView: 2,
                grid: {
                  rows: 2,
                  fill: 'row'
                }
              },
              1024: { 
                slidesPerView: 3,
                grid: {
                  rows: 2,
                  fill: 'row'
                }
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.programs-pagination',
              bulletClass: 'w-2 h-2 bg-gray-300 rounded-full inline-block mx-1 cursor-pointer',
              bulletActiveClass: 'bg-white w-6',
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="pb-12"
          >
            {filteredPrograms.map((program) => (
              <SwiperSlide key={program._id} className="h-full">
                <Link to={`/programs/${program.slug}`} className="block h-full">
                  <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full min-h-[420px] mx-2 group">
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(program._id, e)}
                      className={`absolute top-4 right-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-accent`}
                      aria-label={program.isFavorite ? 'Remove from favourites' : 'Add to favourites'}
                    >
                      {program.isFavorite ? <FiCheck size={18} /> : <FiHeart size={18} />}
                    </button>
                    
                    {/* Program Image */}
                    {program.imageUrl && (
                      <div className="relative">
                        <img 
                          src={program.imageUrl} 
                          alt={program.title}
                          className="w-full h-48 object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    {/* Strip Field - Between Image and Description */}
                    {program.strip && (
                      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white px-3 py-2 text-sm font-semibold">
                        {program.strip}
                      </div>
                    )}
                    
                    {/* Program Content */}
                    <div className="p-6">
                      {/* Program Tag */}
                      {program.category && (
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-purple-100 text-purple-800">
                            {program.category}
                          </span>
                        </div>
                      )}
                      
                      <h2 className="text-xl font-bold text-gray-800 mb-3">{program.title}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {program.description}
                      </p>
                      
                      {/* Program Date and Time */}
                      <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        {program.programDate ? (
                          <div className="flex items-center text-sm text-purple-700 mb-1">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(program.programDate).toLocaleDateString('en-IN', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-purple-700 mb-1">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Available Now
                          </div>
                        )}
                        {program.programTime ? (
                          <div className="flex items-center text-sm text-purple-700">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {program.programTime}
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-purple-700">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Flexible Timing
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        {(() => {
                          const hasPrice = typeof program?.price === 'number' && !Number.isNaN(program.price);
                          const hasDiscount = typeof program?.discountPrice === 'number' && !Number.isNaN(program.discountPrice);
                          const showDiscount = hasPrice && hasDiscount && program.discountPrice < program.price;
                          const displayPrice = showDiscount ? program.discountPrice : program.price;

                          if (!hasPrice || program.price === 0) {
                            return (
                              <span className="text-lg font-semibold text-purple-700">
                                Free
                              </span>
                            );
                          }

                          return (
                            <span className="text-lg font-semibold text-purple-600">
                              ₹{displayPrice.toLocaleString('en-IN')}
                              {showDiscount ? (
                                <span className="ml-2 text-sm text-gray-500 line-through font-semibold">
                                  ₹{program.price.toLocaleString('en-IN')}
                                </span>
                              ) : null}
                            </span>
                          );
                        })()}
                        <button
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Pagination */}
          <div className="flex justify-center mt-8">
            <div className="programs-pagination flex space-x-2">
              {Array.from({ length: Math.ceil(filteredPrograms.length / 6) }).map((_, index) => (
                <span 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === Math.floor(activeIndex / 6) ? 'bg-white w-6' : 'bg-gray-300'
                  }`}
                  onClick={() => swiperRef.current?.swiper.slideTo(index * 6)}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/sessions" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
          >
            View All Sessions
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestPrograms;