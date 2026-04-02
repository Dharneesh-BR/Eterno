import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useProgramsByCategory } from '../hooks/useProgramsByCategory';
import { trackCTAClick, trackViewContent } from '../utils/metaPixel';

export default function Body() {
  const navigate = useNavigate();
  const { programs, loading, error } = useProgramsByCategory('body');
  const [favourites, setFavourites] = useState(() => new Set());

  const toggleFavourite = (programKey) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(programKey)) next.delete(programKey);
      else next.add(programKey);
      return next;
    });
  };

  const getProgramKey = useMemo(
    () => (program) => program?._id || program?.slug?.current || program?.slug || program?.title,
    []
  );

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
          <h2 className="text-xl font-bold mb-2">Error Loading Programs</h2>
          <p>{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-main text-white rounded hover:brightness-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full">
      {/* Banner Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src="/assets/Body Banner.jpg"
          alt="Body Wellness Programs Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">Train the Body</h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl drop-shadow-lg">Extend Life</p>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto py-16 px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Body Wellness Programs</h2>
            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover our curated programs designed to enhance your physical well-being and vitality.
            </p>
          </div>
        
        {(!programs || programs.length === 0) ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No body programs available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              (() => {
                const programKey = getProgramKey(program);
                const isFavourite = favourites.has(programKey);

                return (
              <div
                key={program._id}
                className="relative bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <button
                  type="button"
                  aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                  className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavourite(programKey);
                  }}
                >
                  {isFavourite ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </button>
                {program.imageUrl && (
                  <div className="relative h-48">
                    <img 
                      src={program.imageUrl} 
                      alt={program.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-lg font-bold leading-tight line-clamp-2">
                        {program.title}
                      </h3>
                    </div>
                  </div>
                )}
                {/* Strip Field - Between Image and Description */}
                {program.strip && (
                  <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white px-3 py-2 text-sm font-semibold">
                    {program.strip}
                  </div>
                )}
                <div className="bg-white p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">{program.title}</h2>
                  <p className="text-gray-500 mb-4 line-clamp-3">
                    {program.description}
                  </p>
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
                        <span className="text-lg font-bold text-purple-900">
                          ₹{displayPrice.toLocaleString('en-IN')}
                          {showDiscount ? (
                            <span className="ml-2 text-sm text-gray-500 line-through font-semibold">
                              ₹{program.price.toLocaleString('en-IN')}
                            </span>
                          ) : null}
                        </span>
                      );
                    })()}
                    {program.duration && (
                      <span className="text-sm text-gray-500">{program.duration}</span>
                    )}
                  </div>
                    <button
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition"
                      onClick={() => {
                        trackCTAClick('Read More', 'Body Program Card');
                        trackViewContent({
                          content_name: program.title,
                          content_category: 'Body Program',
                          content_ids: [program.slug]
                        });
                        program.slug && navigate(`/programs/${program.slug}`);
                      }}
                    >
                      Read More
                    </button>
                </div>
              </div>
                );
              })()
            ))}
          </div>
        )}
        </div>
      </div>
    </main>
  );
}
