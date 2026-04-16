import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useSanityData } from '../hooks/useSanityData';
import { FiHeart, FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { doc, setDoc, getDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import TestimonialsSection from '../components/TestimonialsSection';
import { trackCTAClick } from '../utils/metaPixel';
// Check if program has ended
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
export default function Decode() {
  // Form state for pricing section
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);
  const user = auth.currentUser;
  // Load user's favorites
  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        try {
          const favoritesRef = collection(db, 'users', user.uid, 'favorites');
          const querySnapshot = await getDocs(favoritesRef);
          const favoritesData = {};
          querySnapshot.forEach((doc) => {
            favoritesData[doc.id] = true;
          });
          setFavorites(favoritesData);
        } catch (error) {
          console.error('Error loading favorites:', error);
        }
      }
    };
   
    loadFavorites();
  }, [user]);
  // Toggle favorite status
  const toggleFavorite = async (programId, e) => {
    e.preventDefault();
    e.stopPropagation();
  
    if (!user) {
      return;
    }
    try {
      const isFavorite = favorites[programId];
     
      if (isFavorite) {
        // Remove from favorites
        await deleteDoc(doc(db, 'users', user.uid, 'favorites', programId));
      } else {
        // Add to favorites
        const program = data?.find(p => p._id === programId);
        if (program) {
          await setDoc(doc(db, 'users', user.uid, 'favorites', programId), {
            ...program,
            addedAt: new Date().toISOString()
          });
        }
      }
     
      // Update local state
      setFavorites(prev => ({
        ...prev,
        [programId]: !isFavorite
      }));
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
  };
  // Handle pricing form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
   
    // Create email content
    const subject = 'New Diabetes Reversal Consultation Request';
    const body = `Phone Number: ${phoneNumber}\nTimestamp: ${new Date().toISOString()}\nPage: Decode Diabetes Page`;
   
    // Show email content to user and provide manual option
    const emailContent = `To: connect@svasam.com\nSubject: ${subject}\n\n${body}`;
    
    // Copy to clipboard first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailContent).then(() => {
        alert('Email content copied to clipboard!\n\nPlease send this email to connect@svasam.com\n\nOr click the button below to open your email client.');
      }).catch(() => {
        alert('Please copy and send this email to connect@svasam.com:\n\n' + emailContent);
      });
    } else {
      alert('Please send this email to connect@svasam.com:\n\n' + emailContent);
    }
   
    // Try to open email client with a small delay
    setTimeout(() => {
      try {
        const mailtoLink = `mailto:connect@svasam.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const newWindow = window.open(mailtoLink, '_blank', 'width=600,height=400');
       
        if (newWindow) {
          // Focus on the new window after a short delay
          setTimeout(() => {
            newWindow.focus();
          }, 100);
        }
      } catch (error) {
        console.log('Email client could not be opened:', error);
      }
     
      setPhoneNumber('');
      setIsSubmitting(false);
    }, 500);
  };
  // Query to get all programs - we'll filter for Decode Diabetes in the component
  const { loading, error, data } = useSanityData(`*[_type == "program"]{
    _id,
    title,
    description,
    "bannerImage": image.asset->url,
    "image": image.asset->url,
    price,
    discountPrice,
    duration,
    strip,
    slug,
    features,
    process,
    benefits,
    targetAudience,
    programDate,
    programTime
  }`);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#936af7] via-[#936af7] to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#936af7] via-[#936af7] to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Error loading content. Please try again later.</div>
      </div>
    );
  }
  // Find the Decode Diabetes program from Sanity data
  const decodeProgram = data?.find(program => 
    program?.title?.toLowerCase().includes('decode') && 
    program?.title?.toLowerCase().includes('diabetes')
  );
  // Use fallback data if no Sanity program exists - this ensures content always displays
  const fallbackProgram = {
    bannerImage: { asset: { url: "/assets/Diabetes.webp" } },
    process: [
      {
        icon: "🧬",
        title: "Root Cause Analysis",
        description: "Deep metabolic and genetic assessment"
      },
      {
        icon: "📊",
        title: "Continuous Monitoring",
        description: "Real-time glucose and metabolic tracking"
      },
      {
        icon: "🎯",
        title: "Precision Protocols",
        description: "Personalized treatment interventions"
      },
      {
        icon: "🔄",
        title: "Adaptive Learning",
        description: "AI-driven plan optimization"
      }
    ],
    benefits: [
      "Stable glucose levels without medication dependency",
      "Improved insulin sensitivity and metabolic flexibility", 
      "Reduced inflammation and gut healing",
      "Enhanced energy, mental clarity, and vitality",
      "Sustainable long-term health transformation",
      "Whole-system metabolic reprogramming"
    ],
    targetAudience: [
      "Individuals with prediabetes or type 2 diabetes seeking reversal",
      "Those wanting to reduce or eliminate medication dependency",
      "People committed to holistic metabolic transformation",
      "Anyone ready for precision, personalized diabetes care"
    ]
  };
  // Use Sanity data if available, otherwise use fallback
  const program = decodeProgram || fallbackProgram;
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }
      `}</style>
      <SEO 
        title="Decode Diabetes Program - Eterno"
        description="Doctor-led, AI-guided diabetes reversal program using advanced diagnostics, precision medicine, and metabolic optimization for sustainable glucose management."
        keywords="decode diabetes, diabetes reversal, metabolic health, precision medicine, AI-guided treatment"
        image={program?.bannerImage?.asset?.url || "/assets/Diabetes.png"}
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Decode Diabetes Program - Eterno',
          description: 'Doctor-led, AI-guided approach identifies dysfunction early, improves insulin sensitivity, and stabilizes glucose sustainably.',
          url: 'https://eterno.fit/decode',
          mainEntity: {
            '@type': 'Organization',
            name: 'Eterno',
            description: 'Precision health and wellness programs'
          }
        }}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="hidden sm:block relative w-screen min-h-[80vh] sm:min-h-[70vh] md:min-h-[70vh] overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 pb-12 sm:pb-16 md:pb-20">
          {/* Banner Image Background with reduced opacity */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={program?.bannerImage?.asset?.url || "/assets/Diabetes.webp"}
              alt="Decode Diabetes Program Banner"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'right' }}
            />
           
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/40 to-black/40"></div>
          </div>
        
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 h-full flex flex-col sm:items-start items-center justify-center text-center sm:text-left">
           
            <div className="max-w-5xl sm:max-w-4xl mx-auto px-2 sm:px-4 sm:ml-0">
              {/* Mobile Heading */}
              <div className="sm:hidden">
                <h1 className="text-h1 text-white mb-4 leading-tight break-words">
                  <span className="text-white bg-clip-text bg-gradient-to-r from-purple-200 to-purple-100 block">
                    Decode
                  </span>
                  <span className="text-white bg-clip-text bg-gradient-to-r from-purple-200 to-purple-100 block">
                    Diabetes
                  </span>
                </h1>
              </div>
              
              {/* Desktop/Tablet Heading */}
              <div className="hidden sm:block">
                <h1 className="text-h1 text-white mb-4 sm:mb-6 md:mb-8 leading-tight break-words">
                  <span className="text-white bg-clip-text bg-gradient-to-r from-purple-200 to-purple-100">
                    Decode Diabetes
                  </span>
                </h1>
              </div>
              
              <div className="mb-6 sm:mb-8 md:mb-10">
                {/* Mobile Subheadings */}
                <div className="sm:hidden space-y-3 px-4">
                  <h3 className="text-h3 text-white/90 leading-relaxed font-medium">
                    India's First, Doctor-Led, AI-Powered 
                  </h3>
                  <h3 className="text-h3 text-white/90 leading-relaxed font-medium">
                    Diabetes Reversal through Gene & Gut Intelligence
                  </h3>
                  <h3 className="text-h3 text-white/80 leading-relaxed mt-3">
                    Holistic Mind–Body Metabolic Reversal Backed by Genomics
                  </h3>
                </div>
                
                {/* Desktop/Tablet Subheadings */}
                <div className="hidden sm:block">
                  <h3 className="text-h3 text-white/90 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
                    India's First, Doctor-Led, AI-Powered <br/>Diabetes Reversal through Gene & Gut Intelligence
                  </h3>
                  <h3 className="text-h3 text-white/80 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed mt-2 px-4 sm:px-0">
                    Holistic Mind–Body Metabolic Reversal Backed by Genomics
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mobile Content Section - Above Banner */}
        <section className="sm:hidden relative w-full py-8 bg-gradient-to-br from-black/50 via-black/30 to-black/50">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-h1 text-purple-300 mb-6 leading-tight break-words">
              <span className="text-white bg-clip-text bg-gradient-to-r from-purple-200 to-purple-100 block">
                Decode
              </span>
              <span className="text-white bg-clip-text bg-gradient-to-r from-purple-200 to-purple-100 block">
                Diabetes
              </span>
            </h1>
            
            <div className="space-y-3 mb-8">
              <h3 className="text-h3 text-white/80 leading-relaxed font-medium">
                India's First, Doctor-Led, AI-Powered
              </h3>
              <h3 className="text-h3 text-white/80 leading-relaxed font-medium">
                Diabetes Reversal through Gene & Gut Intelligence
              </h3>
              <h3 className="text-h3 text-white/80 leading-relaxed mt-3">
                Holistic Mind-Body Metabolic Reversal Backed by Genomics
              </h3>
            </div>
            
            
          </div>
        </section>

        {/* Mobile Banner Section - Below Content */}
        <section className="sm:hidden relative w-full py-40 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
          {/* Banner Image Background with reduced opacity */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/assets/Diabetes-mobile-view.webp"
              alt="Decode Diabetes Program Banner"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'right' }}
            />
          </div>
        </section>
                

        {/* Floating App Image - Between Hero and Our Philosophy */}
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[24rem] pointer-events-none">
          <div className="absolute inset-0 flex items-start justify-center md:items-center md:pt-8">
            <img 
              src="/assets/eva app 2.webp"
              alt="Eterno App"
              className="w-96 h-96 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain"
              style={{
                animation: 'float 6s ease-in-out infinite',
                filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))'
              }}
            />
          </div>
        </div>
{/* Our Philosophy */}
      <section className="relative py-20 pt-36 text-white overflow-hidden bg-transparent">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-h2 text-center text-white font-bold py-2 px-2">
              Our Philosophy:
            </h2>
            <h3 className="text-h2 text-center text-white/90 py-4 sm:py-6 px-2 leading-relaxed font-medium">
              <span className="block sm:inline">Prediction</span> <span className="text-purple-300">→</span> <span className="block sm:inline">Prevention</span> <span className="text-purple-300">→</span> <span className="block sm:inline">Reversal</span>
            </h3>
            <div className="max-w-2xl mx-auto px-4 sm:px-4">
              <p className="text-h3 text-white/80 text-center leading-relaxed">
                At eterno, we believe diabetes is largely preventable and often reversible when addressed at right stage.
              </p>
            </div>
     
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 md:gap-6 lg:gap-8 px-4 sm:px-0 pt-8 sm:pt-10 md:pt-12">
              {[
                {
                  title: "Prediction",
                  description: "To detect metabolic risk early",
                  icon: "🔮"
                },
                {
                  title: "Prevention", 
                  description: "To stop progression",
                  icon: "🛡️"
                },
                {
                  title: "Reversal",
                  description: "To restore insulin sensitivity where clinically possible",
                  icon: "🔄"
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 sm:p-4 md:p-6 rounded-2xl shadow-xl flex flex-col h-full relative overflow-hidden border border-purple-300 backdrop-blur-md bg-blue-200">
                  {/* Icon Section */}
                  <div className="h-16 w-16 sm:h-16 sm:w-16 md:h-20 md:w-20 mx-auto mb-4 flex-shrink-0 relative flex items-center justify-center">
                    <span className="text-4xl sm:text-4xl md:text-5xl font-bold">{item.icon}</span>
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-center text-center">
                    <h3 className="text-h2 text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-h3 text-gray-600 leading-relaxed px-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          
            <div className="mt-6 sm:mt-6 bg-gradient-to-r from-purple-100/50 to-indigo-100/50 rounded-2xl p-4 sm:p-4 border border-purple-300/50 shadow-inner">
              <h3 className="text-center text-gray-800 text-h3 sm:text-lg md:text-2xl  leading-relaxed px-4">
                All guided by doctor-led care, AI intelligence, and holistic science.
              </h3>
            </div>
          </div>
        </div>
        </section>
        {/* Our Curated Programs */}
        <section id="curated-programs" className="py-0 pb-14 relative text-white bg-transparent">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-h2 font-bold text-white mb-4 sm:mb-6 px-4">
                Join Our Decode Diabetes - Reversal Program
              </h2>
              <div className="max-w-lg mx-auto px-4 sm:px-4">
                <p className="text-h3 text-white/80 text-center leading-relaxed">
                  Discover our specialized programs designed for your metabolic journey
                </p>
              </div>
            </div>
         
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#936af7]"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-white/80">Unable to load programs at the moment. Please try again later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
                {data?.filter(program => 
                  !program?.title?.toLowerCase().includes('decode') || 
                  !program?.title?.toLowerCase().includes('diabetes')
                ).filter(program => !isProgramEnded(program)).map((program) => (
                  <div key={program._id} className="h-full">
                    <Link to={`/programs/${program.slug?.current || program.slug}`} className="block h-full">
                      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full min-h-[380px] sm:min-h-[420px] mx-0 sm:mx-2 group">
                      
                        {/* Program Image */}
                        {program.image && (
                          <div className="relative">
                            <img 
                              src={program.image} 
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
                  </div>
                ))}
              </div>
            )}
           
            {!loading && !error && (!data || data.filter(program => 
              !program?.title?.toLowerCase().includes('decode') || 
              !program?.title?.toLowerCase().includes('diabetes')
            ).length === 0) && (
              <div className="text-center py-12">
                <p className="text-white/80">More programs coming soon. Check back later!</p>
              </div>
            )}
          </div>
        </section>
   
     
        {/* Decode Diabetes Framework */}
        <section className="relative py-16 text-white overflow-hidden bg-transparent">
         
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-center mb-4 leading-tight text-white px-4">
                Decode Diabetes Framework
              </h2>
              <p className="text-h3 text-white/80 font-semibold px-4">
                Our precision approach to metabolic transformation
              </p>
            </div>
          
            {/* Compact Framework Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 px-2 sm:px-0">
              {[
                {
                  number: "01",
                  title: "Root Cause Analysis",
                  description: "Deep metabolic and genetic assessment to identify your unique diabetes signature",
                  details: ["Blood glucose trends", "Insulin resistance markers", "Metabolic flexibility", "Inflammation signals"],
                  icon: "🧬",
                  gradient: "from-purple-500 to-indigo-600"
                },
                {
                  number: "02", 
                  title: "Epigenetic Mapping",
                  description: "Gene expression analysis and lifestyle trigger identification",
                  details: ["Epigenetic stressors", "Lifestyle triggers", "Gene expression patterns", "Metabolic decline factors"],
                  icon: "🔬",
                  gradient: "from-indigo-500 to-purple-600"
                },
                {
                  number: "03",
                  title: "Gut Microbiome Analysis",
                  description: "Advanced gut health assessment for metabolic optimization",
                  details: ["Microbiome balance", "Gut permeability", "Inflammation markers", "Nutrient absorption"],
                  icon: "�",
                  gradient: "from-purple-500 to-indigo-600"
                },
                {
                  number: "04",
                  title: "Metabolic Profiling",
                  description: "Comprehensive metabolic function testing and analysis",
                  details: ["Mitochondrial function", "Oxidative stress", "Cellular energy production", "Hormonal balance"],
                  icon: "⚡",
                  gradient: "from-indigo-500 to-purple-600"
                },
                {
                  number: "05",
                  title: "AI Integration",
                  description: "Machine learning algorithms for personalized treatment protocols",
                  details: ["Pattern recognition", "Predictive analytics", "Treatment optimization", "Progress tracking"],
                  icon: "�",
                  gradient: "from-purple-500 to-indigo-600"
                },
                {
                  number: "06",
                  title: "Precision Protocols",
                  description: "Evidence-based interventions tailored to your metabolic profile",
                  details: ["Targeted nutrition", "Exercise prescription", "Stress management", "Sleep optimization"],
                  icon: "🎯",
                  gradient: "from-purple-500 to-indigo-600"
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className="text-center p-4 sm:p-5 md:p-6 rounded-2xl shadow-xl flex flex-col h-full relative overflow-hidden border border-purple-300 backdrop-blur-md bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100"
                >
                  <div className="flex-1 flex flex-col justify-center text-center">
                    {/* Step Number and Icon */}
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-lg`}>
                        {step.number}
                      </div>
                     <div className="text-xl sm:text-2xl">{step.icon}</div>
                    </div>
                  
                    {/* Content */}
                    <h3 className="text-h3 font-bold text-gray-800 mb-2 leading-tight px-2">
                      {step.title}
                    </h3>
                    <p className="text-h4 text-gray-600 leading-relaxed mb-3 px-2">
                      {step.description}
                    </p>
                    
                    {/* Key Points */}
                    <div className="grid grid-cols-1 gap-2 px-2">
                      {step.details.slice(0, 4).map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start text-left">
                          <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#936af7] to-indigo-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                          <span className="text-gray-700 text-h4 leading-tight">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary Section */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#936af7]/20 to-indigo-600/20 rounded-2xl p-4 sm:p-6 border border-[#936af7]/30 backdrop-blur-sm mx-4 sm:mx-0">
                <p className="text-base sm:text-lg md:text-xl text-white font-bold leading-relaxed mb-4 px-2">
                  All guided by <span className="text-[#936af7]">doctor-led care</span>, <span className="text-indigo-300">AI intelligence</span>, and <span className="text-blue-300">holistic science</span>.
                </p>
                <p className="text-body font-bold md:text-lg text-white/90 px-2">
                  Transform your metabolic health with our comprehensive 6-step framework.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Doctor Led AI Powered Section */}
        <section className="relative w-full py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-6 border border-purple-400 max-w-4xl mx-auto" >
              <div className="text-center">
                {/* Title and Description Above */}
                <div className="mb-6">
                  <h2 className="text-h2 text-white mb-4">
                    Doctor led, <br/>AI powered metabolic health program
                  </h2>
                  <p className="text-body text-white/90 max-w-3xl leading-relaxed mx-auto">
                    Personalised doctors and coaches recommendation, Food Analytics, AI-Diet recommendations, Health Tracking & more
                  </p>
                </div>
             
               {/* Image Below */}
                <div className="w-full flex justify-center relative">
                  <img 
                    src="/assets/Banner 3.webp"
                    alt="Eterno Metabolic Health Program"
                    className="w-full h-auto max-w-md mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
       
       {/* What Makes Program Different */}
        <section className="px-4 py-12 bg-transparent">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-h2 font-extrabold text-white mb-6 text-center py-4">
             What Makes the Program Different?
           </h2>
            <h3 className="text-h3 text-white text-center mb-8 mx-auto">
              Doctor-Led, Ai Powered, <br/> Diabetes Reversal Program through Gene Intelligence
            </h3>
            <h3 className="text-h3 text-white text-center mb-8 mx-auto">
              A Holistic, <br/>Medicine-Free Approach to Metabolic Healing
            </h3>
          </div>
        </section>

       {/* Section Cards */}
        <section className="px-4 py-12 bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
              {/* Core Medical & Precision Metabolic Foundation */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-indigo-900/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 group overflow-hidden">
                {/* Subtle animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
                </div>
               <div className="relative z-10 flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">🏥</span>
                  </div>
                  <div>
                    <h3 className="text-h3 font-bold text-white mb-2">
                      Core Medical & Precision Metabolic Foundation
                    </h3>
                    <p className="text-blue-300 text-body font-medium">Science-Backed Medical Excellence</p>
                  </div>
                </div>
               <div className="relative z-10 space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">👨‍⚕️</span>
                    <div>
                      <h4 className="text-h4 font-bold text-white mb-1">Doctor-Led Reversal Protocol</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Supervised by experienced medical professionals using a root-cause approach.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">🧬</span>
                    <div>
                      <h4 className="text-h4 font-bold text-white mb-1">Gene-Based Testing for Personalised Care</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Understand your genetic predisposition to insulin resistance, inflammation, fat storage, and nutrient metabolism to design highly targeted interventions.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">🦠</span>
                   <div>
                      <h4 className="text-h4 font-bold text-white mb-1">Microbiome (Gut) Testing for Metabolic Optimization</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Decode your metabolic intelligence to improve insulin sensitivity, reduce inflammation, and enhance metabolic flexibility.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">⚖️</span>
                    <div>
                      <h4 className="text-h4 font-bold text-white mb-1">Integrated Weight Balance Program</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Sustainable fat loss while preserving muscle mass and metabolic strength.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personalised Care & Expert Support */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-emerald-900/80 to-green-900/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 group overflow-hidden">
                {/* Subtle animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl"></div>
                </div>
                <div className="relative z-10 flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">👥</span>
                  </div>
                  <div>
                    <h3 className="text-h3 font-bold text-white mb-2">
                      Personalised Care & Expert Support
                    </h3>
                    <p className="text-green-300 text-body font-medium">Dedicated Human Guidance</p>
                  </div>
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">🍽️</span>
                    <div>
                      <h4 className="text-h4 font-bold text-white mb-1">Personalised Meal Plans</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Tailored to your genetics, microbiome profile, lifestyle, and glucose response.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">👥</span>
                    <div>
                      <h4 className="text-h4 font-bold text-white mb-1">Dedicated Diabetes Expert Support</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Continuous one-on-one guidance from trained metabolic health specialists.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">📅</span>
                    <div>
                      <h4 className="text-h4 font-bold text-white mb-1">Daily Coaching & Lifestyle Accountability</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Structured support for nutrition, activity, stress management, and habits.</p>
                    </div>
                  </div>
               </div>
              </div>

              {/* Technology & AI Integration */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-pink-900/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 group overflow-hidden">
                {/* Subtle animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
                </div>
                <div className="relative z-10 flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-h3 font-bold text-white mb-2">
                      Technology & AI Integration
                    </h3>
                    <p className="text-purple-300 text-body font-medium">Smart Digital Ecosystem</p>
                  </div>
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">🤖</span>
                    <div>
                      <h4 className="text-h4 font-bold text-white mb-1">AI Assistant – 24/7 Intelligent Assistance</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Round-the-clock assistance for food decisions, sugar spikes, stress management, and lifestyle queries.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">📱</span>
                    <div>
                      <h4 className="text-h4 font-bold text-white mb-1">Comprehensive Mobile App Ecosystem</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Integrated tracking for glucose, weight, stress, nutrition, activity, and progress analytics.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">👨‍👩‍👧‍👦</span>
                    <div>
                      <h4 className="text-h4 font-bold text-white mb-1">Wellness App Subscription for Self and 3 Family members</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Extend metabolic health and preventive care benefits to your loved ones or team members.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Holistic Lifestyle Optimization */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-orange-900/80 to-red-900/90 backdrop-blur-xl rounded-3xl p-8 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 group overflow-hidden">
                {/* Subtle animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl"></div>
                </div>
                <div className="relative z-10 flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">🧘‍♂️</span>
                  </div>
                  <div>
                    <h3 className="text-h3 font-bold text-white mb-2">
                      Holistic Lifestyle Optimization
                    </h3>
                    <p className="text-orange-300 text-body font-medium">Mind-Body Wellness</p>
                  </div>
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start">
                   <span className="text-green-400 mr-3 mt-1">🧘‍♂️</span>
                    <div>
                      <h4 className="text-h4 font-bold text-white mb-1">Exclusive Therapeutic Yoga Postures for Diabetes</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Structured movement practices to enhance insulin sensitivity and metabolic function.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">🧘‍♀️</span>
                    <div>
                      <h4 className="text-h4 font-bold text-white mb-1">Certified Meditation Coaching</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Nervous system regulation to reduce cortisol and improve glucose balance.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">😴</span>
                    <div>
                      <h4 className="text-h4 font-bold text-white mb-1">Stress-Free Sleep Coaching</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Optimize recovery, hormonal balance, and cellular repair.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>
        {/* Ask Eva AI Assistant Section */}
        <section className="relative w-full py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-6 border border-purple-400 max-w-4xl mx-auto" >
              <div className="text-center">
                {/* Title and Description Above */}
                <div className="mb-6">
                  <h2 className="text-h2 text-white mb-4">
                    Ask anything to <br/>Eva <br />Your Ai Assistant
                  </h2>
                  <h3 className="text-h3 text-white/90 max-w-3xl leading-relaxed mx-auto">
                    Receive real-time answers, insights, and support for all your Health-related questions.
                  </h3>
                </div>
              
                {/* Image Below */}
                <div className="w-full flex justify-center relative">
                  <img 
                    src="/assets/eva app 2.webp"
                    alt="Eva AI Assistant"
                    className="w-40 h-auto md:w-48 lg:w-56 mx-auto"
                  />
                </div>
             
             
              </div>
            </div>
          </div>
        </section>
      
        {/* Personalized Diet Plans Made Simple */}
        <section className="relative w-full py-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="text-center mb-16">
              <h2 className="text-h2 text-white mb-6">Personalized Diet Plans Made Simple</h2>
            </div>
           
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Image */}
              <div className="flex justify-center">
               
                  <img 
                    src="/assets/App_2.webp"
                    alt="Eterno App Progress Reports"
                    className="w-full h-auto max-w-lg rounded-xl"
                  />
                </div>
             
              {/* Right side - Text content */}
              <div className="text-white">
                <h3 className="text-h3 md:text-xl leading-relaxed mb-6">
                  Take control of your nutrition needs with Eterno app
                </h3>
               
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#936af7] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Personalised Diet Plans</h3>
                      <p className="text-white/80">Tailor meal plans to fit your unique goals and preferences in seconds.</p>
                    </div>
                  </div>
                 
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#936af7] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Verified Nutrition Plans</h3>
                      <p className="text-white/80">Access 2000+ verified diet plans in the app with detailed macronutrient & micronutrient breakdowns.</p>
                    </div>
                  </div>
                 
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#936af7] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Automate meal reminders</h3>
                      <p className="text-white/80">Keep track with timely notifications to have their next meal on time.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Why Program Works */}
        <section className="px-4 py-12 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mx-auto">
              <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-6 border border-purple-400">
                {/* Title and Description Inside Card */}
                <div className="text-center mb-6">
                  <h2 className="text-h2 font-extrabold text-white mb-6">
                    Why the Program Works?
                  </h2>
                  <h3 className="text-h3 text-white/90 text-center mb-8">
                    A Precision, <br/>Doctor-Led <br/>Mind–Body Metabolic Reversal System
                  </h3>
                </div>
               
                <ul className="space-y-6">
                  {[
                    {
                      icon: "👨‍⚕️",
                      title: "Doctor-Led, Holistic Reversal Protocol",
                    },
                    {
                      icon: "🧬",
                      title: "Gene & Gut-Based Personalisation",
                    },
                    {
                      icon: "📚",
                      title: "Science-Backed Education on Diabetes Reversal",
                    },
                    {
                      icon: "💊",
                      title: "Reduce & Potentially Eliminate Medicines Safely",
                    },
                    {
                      icon: "🥗",
                      title: "Sustainable Nutrition — No Fad Diets",
                    },
                    {
                      icon: "⚖️",
                      title: "Integrated Weight Balance Program",
                    },
                    {
                      icon: "🎮",
                      title: "AI-Powered & Goal-Driven Gamification Experience",
                    }
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-2xl mr-4 flex-shrink-0">{item.icon}</span>
                      <span className="text-white font-medium text-h3">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* What's Included*/ }
        <section className="px-4 py-12 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mx-auto">
              <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 rounded-2xl shadow-xl p-6 border border-purple-300 backdrop-blur-md">
                {/* Title Inside Card */}
                <div className="text-center mb-6">
                  <h2 className="text-h2 font-bold text-gray-800 mb-6">
                    What's Included in the Plan
                  </h2>
                </div>
              
                <ul className="space-y-6">
                  {[
                    { icon: "👨‍⚕️", text: "On-Demand Doctor Supervision" },
                    { icon: "👥", text: "Dedicated Diabetes & Metabolic Expert Support" }, 
                    { icon: "🏥", text: "In-Depth & Regular Clinical Consultations" },
                    { icon: "🥗", text: "Personalized Nutrition, Stress & Sleep Protocols" },
                    { icon: "📱", text: "Comprehensive Mobile App Tracking" },
                    { icon: "🔬", text: "Longevity Biohacks & Guided Coaching" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-2xl mr-4 flex-shrink-0">{item.icon}</span>
                      <span className="text-gray-800 font-medium text-h3">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Book Session Button */}
        <div className="px-4 py-8 bg-transparent text-center">
          <button 
            onClick={() => document.getElementById('curated-programs').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Book Session Now
          </button>
        </div>
{/* New Section - Join 2-Hour Program }
          <section className="relative w-full py-8 bg-transparent" style={{ zIndex: 0 }}>
              
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="relative bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-pink-900/90 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 group overflow-hidden max-w-lg mx-auto">
                    {/* Subtle animated background pattern }
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
                    </div>
                   
                    <div className="relative z-10">
                      <div className="text-center mb-4">
                        <h3 className="text-h3 font-extrabold text-white mb-6">
                          To know more about <br/>Decode Diabetes program <br/>Join our 2 Hours Webinar on <br/>Unlock Diabetes 
                        </h3>
                        <div className="mt-3 space-y-6">
                          <p className="text-lg font-semibold text-red-600 py-5 px-6 bg-yellow-300 rounded-lg inline-block">
                            You are getting all this for Just - ₹199/-
                          </p>
                          <ul className="text-sm text-white space-y-4 text-left max-w-2xl mx-auto">
                            <li className="flex items-center">
                              <span className="text-2xl mr-3">🎥</span>
                              <span className="font-bold text-lg text-white">2-Hour Live Diabetes Reversal Workshop</span>
                            </li>
                            <li className="flex items-center">
                              <span className="text-2xl mr-3">📱</span>
                              <span className="font-bold text-lg text-white">3 Month Free Subscription to the Eterno Wellness App</span>
                            </li>
                            <li className="flex items-center">
                              <span className="text-2xl mr-3">🥗</span>
                              <span className="font-bold text-lg text-white">7 Day Diabetes Reversal Diet Plan</span>
                            </li>
                            <li className="flex items-center">
                              <span className="text-2xl mr-3">📖</span>
                              <span className="font-bold text-lg text-white">Home Workout Guide</span>
                            </li>
                          
                            <li className="flex items-center">
                              <span className="text-2xl mr-3">🤖</span>
                              <span className="font-bold text-lg text-white">AI-Powered Health Tracking</span>
                            </li>
                            <li className="flex items-center">
                              <span className="text-2xl mr-3">💻</span>
                              <span className="font-bold text-lg text-white">Workshop Recording Access</span>
                            </li>
                           
                           
                          </ul>
                          <p className="text-lg font-semibold text-red-600 py-3 px-4 bg-yellow-300 rounded-lg inline-block">
                            2 Hours program worth <span className="line-through text-black">₹3000/-</span> for <br/><span className="text-2xl font-black text-black">Just ₹199/-</span>
                          </p>
                          <div className="text-center mt-6 py-3 px-4">
              <h3 className="text-white mb-3 font-bold text-h3">
                Book your Session now <br/>And start your diabetes reversal journey
              </h3>
                <button onClick={() => setShowBookingForm(true)} className="px-6 py-3 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg">
                  Book Session Now
                </button>
            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            
            </section>
          
        {/* Download App Section */}
        <section className="relative w-full py-20 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-indigo-900/20" style={{ zIndex: 0 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-0 items-center">
              {/* Image - Above the card for all screen sizes */}
              <div className="flex justify-center">
                <img 
                  src="/assets/Download now final.webp"
                  alt="Eterno App on Mobile"
                  className="w-full h-auto max-w-sm rounded-xl"
                />
              </div>
             
              {/* Text content card - Below the image for all screen sizes */}
              <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl p-6 sm:p-8 lg:p-10 border border-purple-400 shadow-2xl max-w-2xl mx-auto" >
                <div className="text-white text-center">
                  <h2 className="text-h2 text-white mb-4 sm:mb-6">Start Your Health Journey Today</h2>
                 
                  <p className="text-body leading-relaxed mb-4 sm:mb-6">
                    Download now Eterno Health App & a free Expert Consultation
                  </p>
                
                  <p className="text-body text-white/90 mb-6">
                    Available on Android & IOS for seamless access on the go.
                  </p>
                
                  {/* App Store Buttons */}
                  <div className="flex gap-4 sm:gap-6 mt-6 sm:mt-8 justify-center">
                    {/* Apple App Store */}
                    <a href="https://apps.apple.com/in/app/eterno/id6759284060" target="_blank" rel="noopener noreferrer" className="block">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                      </div>
                    </a>
                  
                    {/* Google Play Store */}
                    <a href="https://play.google.com/store/apps/details?id=com.wellnessz.eterno" target="_blank" rel="noopener noreferrer" className="block">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg p-1">
                        <img 
                          src="/assets/playstore.webp"
                          alt="Google Play Store"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </a>
                  </div>
             
                 </div>
              </div>
            </div>
          </div>
        </section>
   
   
        {/* Pricing Section */}
        {/*
        <section className="px-4 py-12 bg-transparent">
          <div className="max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300 rounded-2xl p-8 border border-purple-400 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-h2 font-bold text-gray-800 mb-4">
                  Transform Your Health Today
                </h2>
                <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold inline-block mb-6 animate-pulse">
                  Offer valid only till 30th March 2026
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-purple-300 shadow-lg">
                <div className="text-center mb-4">
                  <div className="mb-2">
                    <span className="text-gray-800 text-lg font-bold ">Rs 29,990/-</span>
                  
                  </div>
                   </div>
                <div className="border-t border-purple-200 pt-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">
                    12 Month Plan Includes:
                  </h3>
                
                  <div className="space-y-4 mb-4">
                    {[
                      "12 Direct 1:1 Consultations with Senior Doctor",
                      "12 One-on-One Holistic Wellness Sessions",
                      "12-Month Wellness App Access for Self & 3 Family Members",
                      "Unlimited Access to Diabetes & Metabolic Experts",
                      "Personalized Daily Meal Plan",
                      "Yoga, Strength Training & Meditation Coaching",
                      "Gamified Goal Tracking on the Wellness App",
                      "Holistic Weight Balance Program",
                      "Advanced Gut Health Program"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-purple-600 text-lg mr-2 flex-shrink-0">✓</span>
                        <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                    >
                      {isSubmitting ? 'Booking...' : 'Book Now'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        <TestimonialsSection />
        {/* Decode Diabetes FAQ Section */}
        <section className="w-full py-20 relative overflow-hidden">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 border border-purple-400">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-h2 text-white mb-4 sm:mb-6">Frequently Asked Questions</h2>
                <div className="max-w-2xl mx-auto px-2 sm:px-4">
                  <h3 className="text-h3 text-white/70 leading-relaxed mb-3 sm:mb-4">
                    Find answers to common questions about our diabetes reversal program
                  </h3>
                </div>
              </div>
             
              <div className="space-y-4">
              {[
                {
                  question: 'What is Decode Diabetes - Diabetes Management Program?',
                  answer: 'Eterno - Decode Diabetes is a comprehensive diabetes management program built on an integrated health approach. It combines expert doctor guidance, advanced gene and gut testing, AI-powered technology, and holistic lifestyle practices.\nThe program focuses on identifying and addressing the root causes of diabetes, helping you manage and potentially reverse the condition while also slowing biological aging—so you can live a healthier, stronger life over the long term.'
                },
                {
                  question: 'How is this program different from other diabetes management solutions?',
                  answer: 'Unlike typical solutions, it combines doctor-led care, advanced gene and gut testing to understand your body deeply, AI-driven insights for personalized guidance, and holistic lifestyle changes.\nThis integrated approach not only helps improve diabetes outcomes but also works to slow biological aging, helping you become healthier and stronger over the long term.'
                },
                {
                  question: 'What is the Approach to Reverse Diabetes?',
                  answer: 'We follow an Integrated health approach - guided by doctors, powered by advanced gene and gut testing, supported by AI technology, and strengthened through holistic lifestyle practices.\nWe focus on treating diabetes at its root, slowing your biological aging, and helping you live a healthier, stronger life for the long run.\nWe are on a mission to make diabetes reversal affordable—at just Approx ₹160 per month—so that everyone can access expert care, advanced diagnostics, and personalized guidance without financial barriers.'
                },
                {
                  question: 'What You Get in the 12 Months Program?',
                  answer: '1. Ai Powered Health App for 12 Months\n2. Daily Personalized Diet Plan for Diabetes\n3. Daily Workout Plans\n4. Breath Work & Meditation Coaching\n5. Sound Therapy for Stress Release\n6. Holistic Wellness Coaching\n7. On Demand Doctor & Nutritionist Consultation\n8. Master Class on Diabetes Reversal'
                },
                {
                  question: 'How do I enroll to the Program?',
                  answer: '1. Download the Eterno App\nGet the Eterno App on iOS or Android and create your account.\n\n2. Complete Your Health Profile\nShare your health history, lifestyle, food preferences, and goals so our AI and medical experts can understand your metabolic health.\n\n3. Get Your Personalized Plan\nUpload your Blood Report to fix up a consultation with In house doctor with AI-powered program including personalized nutrition, exercise guidance, and metabolic optimization strategies.\n\n4. Track Progress & Transform Your Health\nTrack your meals, glucose levels, and lifestyle habits inside the app — and watch your HbA1c, energy levels, and metabolic health improve over time.\nOur nutritionist will reach you for One on One Assistance and Fix up Appointment with Doctor'
                }
              ].map((faq, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/40 hover:bg-white">
                    <button
                      className="w-full flex justify-between items-center text-left transition-colors group"
                      onClick={() => {
                        const currentState = faqOpenIndex === index;
                        setFaqOpenIndex(currentState ? null : index);
                      }}
                      aria-expanded={faqOpenIndex === index}
                    >
                      <span className="text-h3 font-semibold text-gray-800 group-hover:text-purple-600">{faq.question}</span>
                      {faqOpenIndex === index ? (
                        <FiChevronUp className="text-purple-600 text-xl flex-shrink-0 ml-4" />
                      ) : (
                        <FiChevronDown className="text-gray-500 text-xl group-hover:text-purple-600 flex-shrink-0 ml-4" />
                      )}
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${faqOpenIndex === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                      aria-hidden={!faqOpenIndex === index}
                    >
                      <div className="text-body text-gray-600 leading-relaxed whitespace-pre-line">{faq.answer}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-body text-white/70 mb-4">Still have questions?</p>
              <a 
                href="/contact" 
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors text-button"
                onClick={() => trackCTAClick('Contact Us', 'Decode Page Footer')}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
        </section>
     
      </div>
    </>
  );
}