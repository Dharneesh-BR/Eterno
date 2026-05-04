import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from '../i18n';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import Programs from '../components/Programs';
import TestimonialsSection from '../components/TestimonialsSection';
import { useSanityData } from '../hooks/useSanityData';
import { FiHeart, FiCheck } from 'react-icons/fi';
import { doc, setDoc, getDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { trackCTAClick, trackViewContent } from '../utils/metaPixel';

// Carousel banner images
const bannerImages = [
  '/assets/banner.jpg',
  '/assets/MainPageBanner.jpg',
  '/assets/new-banner.jpg'
];

const MindImg = '/assets/Mind.png';
const SoulImg = '/assets/New soul.png';
const BodyImg = '/assets/Body.png';
const Logo = '/assets/Eterno vector 2 New.png';

// Import Chevron icons
const ChevronLeft = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const CategoryCard = ({ to, title, description, image, alt, subtitle }) => {
  return (
    <div className="h-full w-full">
      <Link 
        to={to} 
        className="w-full h-full group block"
        aria-label={t('categories.exploreAriaLabel', { title })}
      >
        {/* Mobile View - Compact Card */}
        <div className="md:hidden bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-4 w-full flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-purple-400" >
          <div className="h-16 w-16 mb-3 relative">
            <div className="absolute inset-0 bg-white/50 rounded-full"></div>
            <img 
              src={image} 
              alt={alt}
              className="w-full h-full object-contain relative z-10"
            />
          </div>
          <h3 className="text-h3 font-bold text-white mb-2 text-center">
            {title}
          </h3>
          <p className="text-white/90 text-small text-center mb-4 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Desktop View - Elegant Card */}
        <div className="hidden md:flex bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-3xl shadow-xl p-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full h-[320px] flex flex-col border border-purple-400 mx-auto max-w-md" >
          <div className="h-36 w-36 mx-auto mb-3 flex-shrink-0 relative">
            <div className="absolute inset-0 bg-white/50 rounded-2xl"></div>
            <img 
              src={image} 
              alt={alt}
              className="w-full h-full object-contain relative z-10"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between text-center">
            <div>
              <h3 className="text-h3 font-bold text-white mb-2">
                {title}
              </h3>
              <p className="text-white/90 text-small leading-relaxed">
                {description}
              </p>
            </div>
            {subtitle && (
              <div className="mt-auto pt-2">
                <p className="text-white/80 text-xs font-medium">
                  {subtitle}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function Categories() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState({});
  const user = auth.currentUser;

  // Add CSS reset to remove body margins
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
    };
  }, []);


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
      navigate('/login');
      return;
    }

    try {
      const isFavorite = favorites[programId];
      
      if (isFavorite) {
        // Remove from favorites
        await deleteDoc(doc(db, 'users', user.uid, 'favorites', programId));
      } else {
        // Add to favorites
        const program = programsData?.find(p => p._id === programId);
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
  

  // Fetch featured programs from Sanity
  const { loading: programsLoading, error: programsError, data: programsData } = useSanityData(`*[_type == "program"]{
    _id,
    title,
    description,
    "image": image.asset->url,
    price,
    discountPrice,
    duration,
    strip,
    programDate,
    programTime,
    slug
  }`);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel navigation functions
  const nextSlide = () => {
    if (!programsData) return;
    const maxSlide = Math.ceil(programsData.length / 3) - 1;
    setCurrentSlide(prev => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (!programsData) return;
    const maxSlide = Math.ceil(programsData.length / 3) - 1;
    setCurrentSlide(prev => (prev <= 0 ? maxSlide : prev - 1));
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  // Banner state (no carousel)
  const [bannerImage] = useState(bannerImages[0]); // Use only first image

  // Preload images
  useEffect(() => {
    // Preload banner images
    bannerImages.forEach(img => {
      const image = new Image();
      image.src = img;
    });
  }, []);

  const categories = [
    {
      id: 'mind',
      title: 'Holistic Diabetes Care',
      description: 'Comprehensive diabetes management through integrated care approaches',
      subtitle: 'Master your Mind. Elevate your Life',
      image: MindImg,
      alt: 'Holistic Diabetes Care program'
    },
    {
      id: 'body',
      title: 'Weight Balance Program',
      description: 'Sustainable weight management through personalized nutrition and fitness',
      subtitle: 'Train Body. Extend Life',
      image: BodyImg,
      alt: 'Weight Balance Program'
    },
    {
      id: 'soul',
      title: 'Gut & Metabolic Wellness',
      description: 'Optimize digestive health and metabolic function naturally',
      subtitle: 'Awaken Soul. Live Fully',
      image: SoulImg,
      alt: 'Gut & Metabolic Wellness program'
    },
    {
      id: 'cardio',
      title: 'Decode Diabetes',
      description: 'Our doctor-led, AI-guided approach identifies dysfunction early, improves insulin sensitivity, and stabilizes glucose sustainably',
      subtitle: 'Protect Your Heart. Power Your Life',
      image: MindImg,
      alt: 'Decode Diabetes program'
    },
    {
      id: 'stress',
      title: 'Balance Weight',
      description: 'Find balance and peace through proven stress reduction techniques',
      subtitle: 'Calm Your Mind. Restore Balance',
      image: BodyImg,
      alt: 'Balance Weight program'
    },
  ];

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
      `}</style>
      <SEO 
        title="Categories - Eterno"
        description="Explore Eterno's comprehensive health programs including diabetes reversal, weight optimization, gut health, and holistic wellness approaches."
        keywords="eterno categories, health programs, diabetes reversal, weight balance, holistic wellness"
        image="/images/eterno-categories.jpg"
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Eterno Categories',
          description: 'Explore health and wellness programs at Eterno.',
          url: 'https://eterno.fit/categories',
          mainEntity: {
            '@type': 'Organization',
            name: 'Eterno',
            description: 'Health and wellness programs'
          }
        }}
      />
      <main className="relative min-h-screen w-full">
        {/* Hero Section - Banner Background */}
        <section className="hidden sm:block relative w-screen min-h-[80vh] sm:min-h-[70vh] md:min-h-[70vh] overflow-hidden">
          {/* Banner Image Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img 
              src="/assets/Web view 2.webp"
              alt="Eterno Banner"
              className="absolute inset-0 w-[100.5%] h-[100.5%] object-cover object-center"
            />
            
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/30 to-black/30"></div>
          </div>
         
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24">
            {/* Hero Content */}
            <div className="text-left mb-6 sm:mb-8 md:mb-16">
              {/* Desktop/Tablet Content Only */}
              <div className="hidden sm:block">
                <h1 className="text-h1 text-white mb-4 sm:mb-6 md:mb-8 leading-tight break-words">
                  <span className="text-white/90 ">
                    Your Journey <br/>to Longevity Starts Here
                  </span>
                </h1>
                
                <div className="mb-6 sm:mb-8 md:mb-10">
                  <h3 className="text-h2 text-white/90 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl leading-relaxed font-medium px-4 sm:px-0">
                    A Doctor led, AI-Driven Platform <br/>to Slow Biological Aging
                  </h3>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-start">
                  <Link 
                  to="/research" 
                  className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600  text-white border border-[#936af7] rounded-lg font-semibold text-button hover:bg-[#7d5ce6] transition-all"
                  onClick={() => trackCTAClick('Explore Our Science', 'Hero Section')}
                >
                    Explore Our Science
                  </Link>
                  <button 
                    onClick={() => {
                      trackCTAClick('Book Session Now', 'Hero Section');
                      document.getElementById('featured-programs')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 text-white border border-[#936af7] rounded-lg font-semibold text-button hover:from-purple-700 hover:via-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Book Session Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Content Section - Above Banner */}
        <section className="sm:hidden relative w-full py-4 bg-gradient-to-br from-black/50 via-black/30 to-black/50">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-h1 text-purple-300 mb-6 leading-tight break-words">
              <span className="text-white bg-clip-text bg-transparent">
                Your Journey<br/>
              </span>
              <span className="text-white bg-clip-text bg-transparent">
                to Longevity Starts Here
              </span>
            </h1>
            
            <div className="space-y-4 mb-8">
              <h3 className="text-h3 text-white/80 leading-relaxed font-medium">
                A Doctor led, AI-Driven Platform to Slow Biological Aging
              </h3>
              <h3 className="text-h3 text-white/80 leading-relaxed mt-3">
                Designed to Prevent, Reverse, and Optimize Human Health at Root Level              </h3>
              
            </div>
            
            
          </div>
        </section>

        {/* Mobile Banner Section - Below Content */}
        <section className="sm:hidden relative w-full py-40 overflow-hidden">
          {/* Banner Image Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img 
              src="/assets/Mobile View.webp"
              alt="Eterno Banner"
              className="w-full max-w-4xl mx-auto h-auto object-contain rounded-lg shadow-xl"
            />
          </div>
        </section>
        <div className="flex flex-col gap-4 items-center mb-8 sm:hidden">
              <Link 
                  to="/research" 
                  className="px-2 py-2 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 text-white border border-[#936af7] rounded-lg font-semibold text-button hover:bg-[#7d5ce6] transition-all shadow-lg"
                  onClick={() => trackCTAClick('Explore Our Science', 'Mobile Hero')}
                >
                Explore Our Science
              </Link>
              <button 
                onClick={() => {
                  trackCTAClick('Book Session Now', 'Mobile Hero');
                  document.getElementById('featured-programs')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 text-white border border-[#936af7] rounded-lg font-semibold text-button hover:from-purple-700 hover:via-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Book Session Now
              </button>
            </div>

        {/* Floating App Image - Between Hero and Core Programs */}
        <div className="relative w-full h-48 sm:h-32 md:h-40 lg:h-48 xl:h-56 pointer-events-none">
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

        {/* Our Core Programs Section */}
        <section className="w-full pt-48 pb-15 sm:pt-40 sm:pb-15 relative overflow-hidden bg-transparent">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-h2 text-white mb-4 sm:mb-6">Our Core Programs <br/>Designed for Biological Longevity</h2>
              
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 max-w-4xl mx-auto">
              <div className="group text-center p-6 sm:p-6 md:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex flex-col h-full relative overflow-hidden border border-purple-400 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600" >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-300/30">
                  <svg className="w-8 h-8 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-h3 font-bold text-white mb-3 sm:mb-4">Decode Diabetes</h3>
                <p className="text-body text-white/90 leading-relaxed mb-3 sm:mb-4">
                  Built for long-term reversal, not temporary control
                </p>
                <p className="text-body text-white/80 leading-relaxed mb-4 sm:mb-4">
                  Our doctor-led, AI-guided approach identifies dysfunction early, improves insulin sensitivity, and stabilizes glucose sustainably
                </p>
                <div className="mt-auto pt-2 sm:pt-4">
                  <Link 
                    to="/decode" 
                    className="w-full px-4 sm:px-4 md:px-6 py-3 sm:py-3 bg-white/95 backdrop-blur-sm text-gray-800 rounded-xl font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-button"
                    onClick={() => trackCTAClick('Know more', 'Decode Program Card')}
                  >
                    Know more
                  </Link>
                </div>
              </div>

              <div className="group text-center p-6 sm:p-6 md:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex flex-col h-full relative overflow-hidden border border-purple-400 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600" >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-300/30">
                  <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-h3 font-bold text-white mb-3 sm:mb-4">Balance Weight</h3>
                <p className="text-body text-white/90 leading-relaxed mb-3 sm:mb-4">
                  Reprogram weight regulation. Not crash weight loss.
                </p>
                <p className="text-body text-white/80 leading-relaxed mb-4 sm:mb-4">
                  Restores systems that regulate fat, energy, and body composition for stable, long-term balance.
                </p>
                <div className="mt-auto pt-2 sm:pt-4">
                  <Link 
                    to="/balance" 
                    className="w-full px-4 sm:px-4 md:px-6 py-3 sm:py-3 bg-white/95 backdrop-blur-sm text-gray-800 rounded-xl font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-button"
                    onClick={() => trackCTAClick('Know more', 'Balance Program Card')}
                  >
                    Know more
                  </Link>
                </div>
              </div>

            </div>
          </div>
          
          
        </section>
   {/* Meet Our Team Section */}
        <section className="relative w-full py-16 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-indigo-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-h2 text-white mb-4 sm:mb-6">Meet Your Care Team</h2>
              <p className="text-body text-gray-300 max-w-2xl mx-auto">Meet the visionaries behind Eterno, dedicated to redefining human longevity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Founder 1: Dharneesh B R */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative w-40 h-40 mb-6">
                  <img 
                    src="/assets/Dharneesh BR.webp"
                    alt="Dharneesh B R"
                    className="rounded-full w-full h-full object-cover border-4 border-purple-500 shadow-lg object-top-center"
                  />
                </div>
                <h3 className="text-h3 font-bold text-white mb-2">Mr Dharneesh B R</h3>
                <p className="text-purple-300 text-small mb-4">Founder & Chief Executive Officer</p>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>IIM Lucknow</p>
                  <p>Health Tech Entrepreneur</p>
                  <p>Ex-Samsung | Philips | Unilever | GSK</p>
                </div>
              </div>

              {/* Founder 2: Abhishek */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative w-40 h-40 mb-6">
                  <img 
                    src="/assets/Dr Abhishek L Hiremath.webp"
                    alt="Abhishek"
                    className="rounded-full w-full h-full object-cover border-4 border-purple-500 shadow-lg object-top-center"
                  />
                </div>
                <h3 className="text-h3 font-bold text-white mb-2">Dr Abhishek L Hiremath</h3>
                <p className="text-purple-300 text-small mb-4">Co-Founder & Chief Medical Officer</p>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>MBBS, Diabetologist</p>
                  <p>Diabetes & Holistic Health Specialist</p>
                  <p>Mind-Body Wellness Coach</p>
                </div>
              </div>

              
            </div>
          </div>
        </section>

        {/* 4R Root-Cause Transformation System Section */}
        <section className="relative w-full py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-h2 text-white mb-4">Our 4R Root-Cause Transformation System</h2>
              <p className="text-body text-white/90 max-w-3xl mx-auto">
                At Eterno, we don't believe in temporary fixes or quick solutions.<br/> Our 4R Root-Cause Transformation System rewires your body from the inside — combining diagnostics, planning, rituals, and deep healing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group text-center p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex flex-col h-full relative overflow-hidden border border-purple-400 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600" >
                
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-purple-800 text-h3 font-bold">R1</span>
                </div>
                <h3 className="text-h3 font-bold text-white mb-3">Root Diagnosis</h3>
                <p className="text-white/90 leading-relaxed">Uncover true cause of your symptoms through deep assessments and advanced diagnostic testing to identify your unique wellness blueprint.</p>
              </div>

              <div className="group text-center p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex flex-col h-full relative overflow-hidden border border-purple-400 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600" >
                
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-purple-800 text-h3 font-bold">R2</span>
                </div>
                <h3 className="text-h3 font-bold text-white mb-3">Roadmap Design</h3>
                <p className="text-white/90 leading-relaxed">Based on your unique health profile, we create a customized healing roadmap with nutrition, stress, and hormone-balancing protocols.</p>
              </div>

              <div className="group text-center p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex flex-col h-full relative overflow-hidden border border-purple-400 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600" >
                
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-purple-800 text-h3 font-bold">R3</span>
                </div>
                <h3 className="text-h3 font-bold text-white mb-3">Ritual Integration</h3>
                <p className="text-white/90 leading-relaxed">Build sustainable transformation with daily rituals — from food, sleep, and stress to movement and mindset with expert guidance.</p>
              </div>

              <div className="group text-center p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex flex-col h-full relative overflow-hidden border border-purple-400 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600" >
                
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-purple-800 text-h3 font-bold">R4</span>
                </div>
                <h3 className="text-h3 font-bold text-white mb-3">Resilience Building</h3>
                <p className="text-white/90 leading-relaxed">Strengthen your metabolism, energy, and immune systems to lock in long-term health — without medications or supplements.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => document.getElementById('featured-programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 text-white border border-[#936af7] rounded-lg font-semibold text-base sm:text-lg hover:from-purple-700 hover:via-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Book Session Now
            </button>
          </div>
        </section> 
{/* Doctor Led AI Powered Section */}
        <section className="relative w-full py-12">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 border border-purple-400" >
              <div className="text-center">
                {/* Title and Description Above */}
                <div className="mb-8">
                  <h2 className="text-h2 text-white mb-6">
                    Doctor led, AI powered metabolic health program
                  </h2>
                  <p className="text-body text-white/90 max-w-5xl leading-relaxed mx-auto">
                    Personalised doctors and coaches recommendation, Food Analytics, AI-Diet recommendations, Health Tracking & more
                  </p>
                </div>
                
                {/* Image Below */}
                <div className="w-full flex justify-center relative">
                  <img 
                    src="/assets/Banner 3.webp"
                    alt="Eterno Metabolic Health Program"
                    className="w-full h-auto max-w-lg mx-auto "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        
        {/* Our Approach Section */}
        <section className="py-12 relative overflow-hidden">
          
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#936af7]/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-400/20 rounded-full blur-2xl opacity-25 animate-pulse delay-500"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-h2 text-white mb-6">Our Approach</h2>
              <h3 className="text-h3 font-semibold text-white/90 mb-8">
                Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#936af7] to-blue-300">Artificial Intelligence</span> Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Human Biology</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group text-center p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex flex-col h-full relative overflow-hidden border border-purple-400 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600" >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-300/30">
                  <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-h3 font-bold text-white mb-3">AI-Powered Personalization</h3>
                <p className="text-white/90 leading-relaxed">
                  Advanced machine learning algorithms analyze your health data for precise insights and predictions
                </p>
              </div>

              <div className="group text-center p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex flex-col h-full relative overflow-hidden border border-purple-400 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600" >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400/30 to-green-400/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-300/30">
                  <svg className="w-8 h-8 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-h3 font-bold text-white mb-3">Evidence-Based Science</h3>
                <p className="text-white/90 leading-relaxed">
                  All protocols validated through rigorous clinical research and peer-reviewed studies
                </p>
              </div>

              <div className="group text-center p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex flex-col h-full relative overflow-hidden border border-purple-400 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600" >
                <div className="w-16 h-16 bg-gradient-to-br from-red-400/30 to-pink-400/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-300/30">
                  <svg className="w-8 h-8 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-h3 font-bold text-white mb-3">Holistic Integration</h3>
                <p className="text-white/90 leading-relaxed">
                  Comprehensive approach combining mind, body, and metabolic wellness for optimal results
                </p>
              </div>

              <div className="group text-center p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex flex-col h-full relative overflow-hidden border border-purple-400 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600" >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400/30 to-blue-400/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-300/30">
                  <svg className="w-8 h-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-h3 font-bold text-white mb-3">Real-Time Monitoring</h3>
                <p className="text-white/90 leading-relaxed">
                  Continuous health tracking with adaptive protocols that evolve with your progress
                </p>
              </div>
            </div>
          </div>
          
          
        </section>

       


        {/* Real time Health progress reports Section */}
        <section className="relative w-full py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-h2 text-white mb-6">Real time Health progress reports</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div className="text-white">
                <p className="text-body md:text-xl leading-relaxed mb-6">
                  Stay on top of your success with powerful progress tracking & reporting tools!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#936af7] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-body font-semibold mb-2">Generate Progress Reports</h3>
                      <p className="text-white/80">Get detailed insights on nutrition, workouts, and goal achievements in one click and share with your customer.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#936af7] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-body font-semibold mb-2">Schedule Doctor & Nutrition Appointments</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#936af7] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-body font-semibold mb-2">Automate Meal Reminders</h3>
                      <p className="text-white/80">Keep on track with timely meal notifications to boost consistency and results.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Image */}
              <div className="flex justify-center">
                
                  <img 
                    src="/assets/Eterno app 1.webp"
                    alt="Eterno App Progress Reports"
                    className="w-full h-auto max-w-lg rounded-xl"
                  />
                </div>
              </div>
            </div>
          
        </section>

        {/* Ask Eva AI Assistant Section */}
        <section className="relative w-full py-12">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 border border-purple-400" >
              <div className="text-center">
                {/* Title and Description Above */}
                <div className="mb-8">
                  <h2 className="text-h2 text-white mb-6">
                    Ask anything to eva <br />Your Ai Assistant
                  </h2>
                  <h3 className="text-h3 text-white/90 max-w-5xl leading-relaxed mx-auto">
                    Receive real-time answers, insights, and support for all your Health-related questions.
                  </h3>
                </div>
                
                {/* Image Below */}
                <div className="w-full flex justify-center relative">
                  <img 
                    src="/assets/eva app 2.webp"
                    alt="Eva AI Assistant"
                    className="w-48 h-auto md:w-56 lg:w-64 mx-auto"
                  />
                </div>
                
                <div className="text-center mt-8">
                  <button 
                    onClick={() => document.getElementById('featured-programs')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 text-white border border-[#936af7] rounded-lg font-semibold text-base sm:text-lg hover:from-purple-700 hover:via-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Book Session Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        {/* Personalized Diet Plans Made Simple */}
        <section className="relative w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Meal Section */}
        <section className="relative w-full py-12">
          <div className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-4 border border-purple-400" >
              <div className="text-center">
                {/* Title and Description Above */}
                <div className="mb-8">
                  <h2 className="text-h2 text-white mb-6">
                    Snap to get Meal Insights
                  </h2>
                  <h3 className="text-h3 text-white/90 max-w-5xl leading-relaxed mx-auto">
                    Know what's on your plate—instant nutrition analysis with personalized advice.
                  </h3>
                </div>
                
                {/* Image Below */}
                <div className="w-full flex justify-center relative">
                  <img 
                    src="/assets/Meal scanner.webp"
                    alt="Meal Scanner"
                    className="w-96 h-auto md:w-[28rem] lg:w-[32rem] mx-auto rounded-2xl"
                  />
                </div>
                
                
              </div>
            </div>
          </div>
        </section>

        
        
        {/* Join Our Featured Programs Section */}
        <section id="featured-programs" className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-h2 text-white mb-6">
                Join Our Featured Programs
              </h2>
              <p className="text-xl text-white/80 font-semibold mb-4">
                Discover our specialized programs designed for your health journey
              </p>
            </div>
            
            {/* Programs Content - Single Conditional Rendering */}
            <div className="text-center">
              {programsLoading && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#936af7]"></div>
                </div>
              )}
              
              {programsError && (
                <div className="text-center py-12">
                  <p className="text-white/80">Unable to load programs at the moment. Please try again later.</p>
                </div>
              )}
              
              {!programsLoading && !programsError && programsData && programsData.length > 0 && (
                <div className="relative">
                  {/* Carousel Container */}
                  <div className="overflow-hidden">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {/* Carousel Slides */}
                      {Array.from({ length: Math.ceil(programsData.length / 3) }).map((_, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {programsData.slice(slideIndex * 3, slideIndex * 3 + 3).map((program) => (
                              <div key={program._id} className="h-full">
                                <Link to={`/programs/${program.slug?.current || program.slug}`} className="block h-full">
                                  <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full min-h-[420px] mx-2 group">
                                    {/* Favorite Button */}
                                    <button
                                      onClick={(e) => toggleFavorite(program._id, e)}
                                      className={`absolute top-4 right-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-accent`}
                                      aria-label={favorites[program._id] ? 'Remove from favourites' : 'Add to favourites'}
                                    >
                                      {favorites[program._id] ? <FiCheck size={18} /> : <FiHeart size={18} />}
                                    </button>
                                    
                                    {/* Program Image */}
                                    <div className="relative h-48 overflow-hidden">
                                      <img 
                                        src={program.image?.asset?.url || program.image || '/assets/placeholder.jpg'} 
                                        alt={program.title}
                                        className="w-full h-full object-cover"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    </div>
                                    
                                    {/* Program Content */}
                                    <div className="p-6">
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
                                              year: 'numeric',
                                              month: 'short',
                                              day: 'numeric'
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
                                              <span className="text-lg font-semibold text-purple-600">
                                                Free
                                              </span>
                                            );
                                          }
                                      
                                          return (
                                            <span className="text-lg font-semibold text-purple-600">
                                              ₹{displayPrice.toLocaleString('en-IN')}
                                              {showDiscount ? (
                                                <>
                                                  <span className="text-sm text-gray-500 line-through ml-2">
                                                    ₹{program.price.toLocaleString('en-IN')}
                                                  </span>
                                                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                    Save {Math.round(((program.price - program.discountPrice) / program.price) * 100)}%
                                                  </span>
                                                </>
                                              ) : null}
                                            </span>
                                          );
                                        })()}
                                        <button
                                          onClick={(e) => toggleFavorite(program._id, e)}
                                          className={`ml-4 p-2 rounded-full border ${
                                            favorites[program._id] 
                                              ? 'bg-purple-100 text-purple-600 border-purple-200' 
                                              : 'bg-white text-gray-600 border-gray-300'
                                          } hover:shadow-md transition-colors`}
                                          aria-label={favorites[program._id] ? 'Remove from favourites' : 'Add to favourites'}
                                        >
                                          {favorites[program._id] ? <FiCheck size={16} /> : <FiHeart size={16} />}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Navigation Buttons */}
                    {programsData.length > 3 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300 z-10"
                          aria-label="Previous slide"
                        >
                          <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-300 z-10"
                          aria-label="Next slide"
                        >
                          <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                      </>
                    )}

                    {/* Dots Indicator */}
                    {programsData.length > 3 && (
                      <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: Math.ceil(programsData.length / 3) }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              currentSlide === index 
                                ? 'bg-[#936af7] w-8' 
                                : 'bg-white/40 hover:bg-white/60'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {!programsLoading && !programsError && (!programsData || programsData.length === 0) && (
                <div className="text-center py-12">
                  <p className="text-white/80">Featured programs coming soon. Check back later!</p>
                </div>
              )}
            </div>
          </div>
        </section>


        

        {/* Spacer Section */}
        <div className="h-16 sm:h-20 md:h-24"></div>

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
                  
                  
                </div>
                  <p className="text-body text-white text-center leading-relaxed mb-4 sm:mb-6">
                    Download now Eterno Health App & get a free Expert Consultation
                  </p>
                  
                  <p className="text-body text-white/90 text-center mb-6">
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
          
        </section>
        
        

        {/* Spacer to prevent overlap */}
        <div className="h-16"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* FAQ Section */}
          <FAQSection />
        </div>
      </main>
    </>
  );
}
