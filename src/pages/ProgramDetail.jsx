import React, { useState, useEffect, useRef } from 'react';
import { StarIcon, CheckIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useParams, Link } from 'react-router-dom';
import { client, getProgramBySlug } from '../sanityClient';
import { useCart } from '../contexts/CartContext';
import { PortableText } from '@portabletext/react';
import SEO from '../components/SEO';
import { auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ProgramDetail = () => {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);
  const videoRef = useRef(null);
  const user = auth.currentUser;
  const { addToCart } = useCart();

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

  const programEnded = program ? isProgramEnded(program) : false;

  useEffect(() => {
    console.log('ProgramDetail mounted with slug:', slug);
    
    if (!slug) {
      const errorMsg = 'No program selected. Please select a program from the programs page.';
      console.error(errorMsg);
      setError(errorMsg);
      setLoading(false);
      return;
    }

    const fetchProgram = async () => {
      console.log('Starting to fetch program with slug:', slug);
      setLoading(true);
      setError(null);
      
      try {
        // First try to get by slug
        let result = await getProgramBySlug(slug);
        
        // If no result, try to get by _id (fallback for programs without slugs)
        if (!result && slug.length === 36) { // Check if it might be a UUID
          console.log('No program found with slug, trying to fetch by ID:', slug);
          result = await getProgramById(slug);
        }
        
        if (!result) {
          throw new Error('Program not found. It may have been moved or deleted.');
        }
        
        // Process the body content to ensure it's in the correct format
        let processedBody = [];
        if (result.body) {
          if (Array.isArray(result.body)) {
            // Filter out unwanted content from body array
            processedBody = result.body.filter(item => {
              if (item._type === 'block' && item.children) {
                const text = item.children.map(child => child.text || '').join('');
                return !text.includes('1000+') && !text.includes('transformed') && !text.includes('thousands') && !text.includes('people') && !text.includes('body');
              }
              return true;
            });
          } else if (typeof result.body === 'string') {
            // Filter string body content
            if (!result.body.includes('1000+') && !result.body.includes('transformed') && !result.body.includes('thousands') && !result.body.includes('people') && !result.body.includes('body')) {
              processedBody = [{ _type: 'block', children: [{ _type: 'span', text: result.body }] }];
            } else {
              processedBody = [];
            }
          } else {
            processedBody = [];
          }
        }

        // Filter description as well
        let filteredDescription = result.description;
        if (result.description) {
          filteredDescription = result.description
            .replace(/1000\+[^.!?]*/g, '')
            .replace(/thousands[^.!?]*/g, '')
            .replace(/transformed[^.!?]*/g, '')
            .replace(/people[^.!?]*/g, '')
            .replace(/body[^.!?]*/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        }

        // Filter strip field as well
        let filteredStrip = result.strip;
        if (result.strip) {
          filteredStrip = result.strip
            .replace(/1000\+[^.!?]*/g, '')
            .replace(/thousands[^.!?]*/g, '')
            .replace(/transformed[^.!?]*/g, '')
            .replace(/people[^.!?]*/g, '')
            .replace(/body[^.!?]*/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        }

        // Filter title as well (in case it contains unwanted terms)
        let filteredTitle = result.title;
        if (result.title) {
          filteredTitle = result.title
            .replace(/1000\+[^.!?]*/g, '')
            .replace(/thousands[^.!?]*/g, '')
            .replace(/transformed[^.!?]*/g, '')
            .replace(/people[^.!?]*/g, '')
            .replace(/body[^.!?]*/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        }

        const programData = {
          id: result._id,
          _id: result._id,
          title: filteredTitle || 'Untitled Program',
          description: filteredDescription,
          body: processedBody,
          hasImage: !!(result.image || result.imageUrl),
          imageUrl: result.image?.url || result.imageUrl,
          price: result.price,
          discountPrice: result.discountPrice,
          includes: Array.isArray(result.includes) ? result.includes : [],
          benefits: Array.isArray(result.benefits) ? result.benefits : [],
          requirements: Array.isArray(result.requirements) ? result.requirements : [],
          slug: result.slug || result._id,
          category: result.category || 'uncategorized',
          instructor: result.instructor,
          strip: filteredStrip,
          video: result.video,
          programDate: result.programDate,
          programTime: result.programTime
        };
        
        if (!programData.id) {
          throw new Error('Invalid program data: missing _id');
        }
        
        // Update slug if missing
        if (!result.slug && result._id) {
          window.history.replaceState({}, '', `/programs/${result._id}`);
        }
        
        console.log('Full program data:', result);
        setProgram(programData);
      } catch (err) {
        const errorMsg = `Failed to load program: ${err.message}`;
        console.error('Error in fetchProgram:', {
          error: err,
          message: err.message,
          stack: err.stack,
          slug
        });
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram().catch(err => {
      console.error('Error in fetchProgram:', err);
      setError('Failed to load program. Please try again later.');
      setLoading(false);
    });
  }, [slug]);

  // Additional safety check - filter any remaining unwanted content
  const safeProgram = program ? {
    ...program,
    title: program.title?.replace(/1000\+|thousands|transformed|people|body/gi, '').replace(/\s+/g, ' ').trim() || program.title,
    description: program.description?.replace(/1000\+|thousands|transformed|people|body/gi, '').replace(/\s+/g, ' ').trim() || program.description,
    strip: program.strip?.replace(/1000\+|thousands|transformed|people|body/gi, '').replace(/\s+/g, ' ').trim() || program.strip,
    // Also filter any nested properties that might contain unwanted text
    instructor: program.instructor ? {
      ...program.instructor,
      name: program.instructor.name?.replace(/1000\+|thousands|transformed|people|body/gi, '').replace(/\s+/g, ' ').trim() || program.instructor.name,
      bio: program.instructor.bio?.replace(/1000\+|thousands|transformed|people|body/gi, '').replace(/\s+/g, ' ').trim() || program.instructor.bio
    } : program.instructor
  } : null;

  // Final aggressive filter - remove any remaining unwanted content
  const finalFilter = (text) => {
    if (!text || typeof text !== 'string') return text;
    return text
      .replace(/1000\+[^\w]*]*/gi, '')
      .replace(/thousands[^\w]*]*/gi, '')
      .replace(/transformed[^\w]*]*/gi, '')
      .replace(/people[^\w]*]*/gi, '')
      .replace(/body[^\w]*]*/gi, '')
      .replace(/\s\s+/g, ' ')
      .trim();
  };

  const handleAddToCart = () => {
    if (!safeProgram) return;
    
    const cartItem = {
      id: safeProgram._id,
      title: safeProgram.title,
      price: safeProgram.price,
      discountPrice: safeProgram.discountPrice,
      imageUrl: safeProgram.imageUrl,
      slug: safeProgram.slug || safeProgram._id,
      category: safeProgram.category,
      quantity: quantity
    };
    
    addToCart(cartItem);
  };

  // If program has ended, show a message and redirect
  if (programEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-12 max-w-2xl text-center border border-white/20">
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Program Has Ended</h1>
            <p className="text-white/80 text-lg mb-8">
              This program has already concluded. Please check our other available programs or contact us for upcoming sessions.
            </p>
          </div>
          <Link 
            to="/programs" 
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-red-500 text-center p-4 max-w-md">
          <h2 className="text-xl font-bold mb-2">Error Loading Program</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Program not found</h2>
          <p className="text-gray-600 mb-4">The program you're looking for doesn't exist or has been removed.</p>
          <a
            href="/programs"
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Browse Programs
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {program && (
        <SEO 
          title={program.title}
          description={program.description || `Discover ${program.title} - a transformative spiritual program at Svasam. Connect with expert guides for your journey to inner peace and wellbeing.`}
          keywords={`${program.title}, spiritual program, mindfulness, meditation, personal growth, ${program.category?.title || 'wellness'}, emotional wellbeing, inner peace`}
          image={program.mainImage?.asset?.url || '/images/program-default.jpg'}
          type="service"
          structuredData={{
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: program.title,
            description: program.description || `Discover ${program.title} - a transformative spiritual program at Svasam.`,
            image: program.mainImage?.asset?.url || '/images/program-default.jpg',
            provider: {
              '@type': 'Organization',
              name: 'Svasam',
              url: 'https://svasam.com'
            },
            offers: {
              '@type': 'Offer',
              price: program.price || 0,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock'
            },
            category: program.category?.title || 'Spiritual Wellness'
          }}
        />
      )}
      <div className="min-h-screen">
      {/* Global content filter - catch any remaining unwanted text */}
      <div style={{ display: 'none' }}>
        {(() => {
          // This is a hidden div that catches any remaining unwanted text
          const allText = [
            safeProgram?.title,
            safeProgram?.description,
            safeProgram?.strip,
            safeProgram?.instructor?.name,
            safeProgram?.instructor?.bio
          ].join(' ').toLowerCase();
          
          if (allText.includes('1000+') || allText.includes('thousands') || 
              allText.includes('transformed') || allText.includes('people') || 
              allText.includes('body')) {
            console.warn('Still contains unwanted text:', allText);
          }
          return null;
        })()}
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Program Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src={safeProgram.imageUrl || '/placeholder-program.jpg'}
            alt={safeProgram.title}
            className="w-full h-auto max-h-[600px] object-cover"
            loading="lazy"
          />
        </div>

        {/* Program Description */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-16 mb-16 border border-white/20">
          <h2 className="text-4xl font-bold text-white mb-8" style={{
            animation: 'fadeIn 0.8s ease-in-out'
          }}>About This Program</h2>
          
          {safeProgram.body && safeProgram.body.length > 0 ? (
            <div className="prose max-w-none">
              <PortableText
                value={safeProgram.body}
                components={{
                  block: {
                    normal: ({ children }) => {
                      const text = typeof children === 'string' ? children : children.join('');
                      // Filter out unwanted text
                      if (text.includes('1000+') || text.includes('transformed') || text.includes('thousands') || text.includes('people') || text.includes('body')) {
                        return null;
                      }
                      return <p className="mb-6 text-white/90 text-lg leading-relaxed">{children}</p>;
                    },
                    h1: ({ children }) => {
                      const text = typeof children === 'string' ? children : children.join('');
                      if (text.includes('1000+') || text.includes('transformed') || text.includes('thousands') || text.includes('people') || text.includes('body')) {
                        return null;
                      }
                      return <h1 className="text-3xl font-bold my-6 text-white">{children}</h1>;
                    },
                    h2: ({ children }) => {
                      const text = typeof children === 'string' ? children : children.join('');
                      if (text.includes('1000+') || text.includes('transformed') || text.includes('thousands') || text.includes('people') || text.includes('body')) {
                        return null;
                      }
                      return <h2 className="text-2xl font-bold mt-8 mb-6 text-white">{children}</h2>;
                    },
                    h3: ({ children }) => {
                      const text = typeof children === 'string' ? children : children.join('');
                      if (text.includes('1000+') || text.includes('transformed') || text.includes('thousands') || text.includes('people') || text.includes('body')) {
                        return null;
                      }
                      return <h3 className="text-xl font-semibold mt-6 mb-4 text-white">{children}</h3>;
                    },
                  },
                  list: {
                    bullet: ({ children }) => {
                      const text = typeof children === 'string' ? children : children.join('');
                      if (text.includes('1000+') || text.includes('transformed') || text.includes('thousands') || text.includes('people') || text.includes('body')) {
                        return null;
                      }
                      return <ul className="list-disc list-inside mb-6 text-white/90 text-lg">{children}</ul>;
                    }
                  },
                  marks: {
                    link: ({ value, children }) => {
                      const href = value?.href || '';
                      const isExternal = href.startsWith('http');
                      return (
                        <a 
                          href={href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="text-purple-600 hover:underline"
                        >
                          {children}
                        </a>
                      );
                    },
                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    underline: ({ children }) => <u>{children}</u>,
                    code: ({ children }) => <code className="bg-gray-100 px-1 rounded">{children}</code>,
                  },
                  types: {
                    image: ({ value }) => (
                      <div className="my-4">
                        <img 
                          src={value.asset?.url} 
                          alt={value.alt || 'Image'} 
                          className="max-w-full h-auto rounded-lg"
                        />
                        {value.caption && (
                          <p className="text-sm text-white/70 mt-2 text-center">{value.caption}</p>
                        )}
                      </div>
                    ),
                  },
                }}
              />
            </div>
          ) : safeProgram.description ? (
            <div className="prose max-w-none">
              <p className="text-white/90">{finalFilter(safeProgram.description)}</p>
            </div>
          ) : (
            <div className="prose max-w-none">
              <p className="text-white/70">No description available for this program.</p>
            </div>
          )}
        </div>

        {/* Program Schedule */}
        {(safeProgram.programDate || safeProgram.programTime) && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-12 mb-16 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-8">Program Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {safeProgram.programDate && (
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Date</h3>
                      <p className="text-white/80 text-sm">Program Date</p>
                    </div>
                  </div>
                  <p className="text-white text-lg font-medium">
                    {new Date(safeProgram.programDate).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              )}
              
              {safeProgram.programTime && (
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Time</h3>
                      <p className="text-white/80 text-sm">Program Time</p>
                    </div>
                  </div>
                  <p className="text-white text-lg font-medium">{safeProgram.programTime}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Program Video - Optional */}
        {safeProgram.video && safeProgram.video.url && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Program Preview (Optional)</h2>
            <div className="bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/20">
              <video
                ref={videoRef}
                controls
                className="w-full h-auto rounded-xl"
                preload="metadata"
                poster={safeProgram.imageUrl || '/placeholder-program.jpg'}
                onError={(e) => {
                  console.error('Video error:', e);
                  console.log('Video error details:', {
                    error: e.target.error,
                    networkState: e.target.networkState,
                    currentSrc: e.target.currentSrc,
                    readyState: e.target.readyState
                  });
                }}
                onLoadStart={() => console.log('Video started loading')}
                onCanPlay={() => console.log('Video can play')}
                onLoadedData={(e) => console.log('Video loaded data:', e)}
                onLoadedMetadata={(e) => console.log('Video metadata loaded:', e)}
                onPlay={() => console.log('Video started playing')}
                onPause={() => console.log('Video paused')}
                onEnded={() => console.log('Video ended')}
              >
                {/* Try multiple source formats */}
                {safeProgram.video?.url && (
                  <source src={safeProgram.video.url} type="video/mp4" />
                )}
                {safeProgram.video?.url && safeProgram.video.url.includes('.mp4') && (
                  <source src={safeProgram.video.url.replace('.mp4', '.webm')} type="video/webm" />
                )}
                Video preview available for this program.
              </video>
            </div>
          </div>
        )}

        {/* Enrollment CTA Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-12 mb-16 border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <div className="flex items-baseline gap-4 mb-4">
                {(() => {
                  const hasPrice = typeof safeProgram?.price === 'number' && !Number.isNaN(safeProgram.price);
                  const hasDiscount = typeof safeProgram?.discountPrice === 'number' && !Number.isNaN(safeProgram.discountPrice);
                  const showDiscount = hasPrice && hasDiscount && safeProgram.discountPrice < safeProgram.price;
                  const displayPrice = showDiscount ? safeProgram.discountPrice : safeProgram.price;

                  if (!hasPrice || safeProgram.price === 0) {
                    return (
                      <span className="text-4xl font-bold">Free</span>
                    );
                  }

                  return (
                    <>
                      <span className="text-4xl font-bold">
                        ₹{displayPrice.toLocaleString('en-IN')}
                      </span>
                      {showDiscount ? (
                        <span className="text-xl text-white/70 line-through">
                          ₹{safeProgram.price.toLocaleString('en-IN')}
                        </span>
                      ) : null}
                    </>
                  );
                })()}
                <span className="text-white/80">• {safeProgram.duration || 'Lifetime access'}</span>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-white text-purple-600 hover:bg-gray-50 font-bold py-4 px-10 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* Related Programs */}
        {safeProgram.category && safeProgram._id && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-white mb-12">You Might Also Like</h2>
            <RelatedPrograms 
              category={safeProgram.category} 
              currentProgramId={safeProgram._id} 
            />
          </div>
        )}
      </div>
    </div>
    </>
  );
}

// Related Programs Component
function RelatedPrograms({ currentProgramId, category }) {
  const [relatedPrograms, setRelatedPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedPrograms = async () => {
      if (!currentProgramId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const query = `*[_type == "program" && _id != $currentProgramId][0...3]{
          _id,
          title,
          price,
          discountPrice,
          duration,
          "imageUrl": image.asset->url,
          "slug": slug.current
        }`;
        
        const result = await client.fetch(query, { 
          currentProgramId 
        });
        
        setRelatedPrograms(result || []);
      } catch (err) {
        console.error('Error fetching related programs:', err);
        setError('Failed to load related programs');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPrograms();
  }, [currentProgramId]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-300 mx-auto"></div>
        <p className="text-white mt-2">Loading related programs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (relatedPrograms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/70">No related programs found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedPrograms.map((relatedProgram) => (
        <Link 
          key={relatedProgram._id} 
          to={`/programs/${relatedProgram.slug}`}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="aspect-video bg-gray-200">
            <img 
              src={relatedProgram.imageUrl || '/placeholder-program.jpg'} 
              alt={relatedProgram.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{relatedProgram.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-purple-600 font-bold">
                {(() => {
                  const hasPrice = typeof relatedProgram?.price === 'number' && !Number.isNaN(relatedProgram.price);
                  const hasDiscount = typeof relatedProgram?.discountPrice === 'number' && !Number.isNaN(relatedProgram.discountPrice);
                  const showDiscount = hasPrice && hasDiscount && relatedProgram.discountPrice < relatedProgram.price;
                  const displayPrice = showDiscount ? relatedProgram.discountPrice : relatedProgram.price;

                  if (!hasPrice || relatedProgram.price === 0) {
                    return 'Free';
                  }

                  return `₹${displayPrice.toLocaleString('en-IN')}`;
                })()}
              </span>
              <span className="text-sm text-gray-600">{relatedProgram.duration}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

// Helper function to get program by ID
async function getProgramById(id) {
  console.log('getProgramById called with id:', id);
  
  if (!id) {
    console.error('No ID provided to getProgramById');
    return null;
  }
  
  try {
    const query = `*[_type == "program" && _id == $id][0]{
      _id,
      title,
      description,
      price,
      discountPrice,
      duration,
      category,
      strip,
      programDate,
      programTime,
      "video": video.asset->{
        url,
        originalFilename
      },
      "image": image.asset->{
        url,
        alt
      },
      "slug": slug.current,
      includes,
      benefits,
      requirements,
      body[]{
        ...select(
          _type == 'block' => @{
            ...@,
            children[]{
              ...@,
              marks[]
            },
            markDefs[]{
              ...@,
              _type == 'link' => @{
                _key,
                _type,
                href,
                blank
              }
            }
          },
          @
        )
      },
      "instructor": instructor->{
        name,
        title,
        bio,
        "image": image.asset->url
      }
    }`;
    
    console.log('Executing Sanity query with ID:', id);
    const result = await client.fetch(query, { id });
    console.log('Sanity query result for ID:', id, result);
    
    return result;
  } catch (error) {
    console.error('Error in getProgramById for ID:', id, {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
}

export default ProgramDetail;
