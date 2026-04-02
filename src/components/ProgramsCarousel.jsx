import { Link } from 'react-router-dom';
import { useProgramsByCategory } from '../hooks/useProgramsByCategory';
import { useTranslation } from '../i18n';
import { useEffect, useState } from 'react';

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

const ProgramsCarousel = () => {
  const { t } = useTranslation();
  const [allPrograms, setAllPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch programs for each category and combine them
  const { programs: mindPrograms, loading: mindLoading } = useProgramsByCategory('mind');
  const { programs: bodyPrograms, loading: bodyLoading } = useProgramsByCategory('body');
  const { programs: soulPrograms, loading: soulLoading } = useProgramsByCategory('soul');

  useEffect(() => {
    console.log('Loading states:', { mindLoading, bodyLoading, soulLoading });
    console.log('Programs data:', { mindPrograms, bodyPrograms, soulPrograms });
    
    if (!mindLoading && !bodyLoading && !soulLoading) {
      // Combine all programs from different categories
      const combined = [...(mindPrograms || []), ...(bodyPrograms || []), ...(soulPrograms || [])];
      console.log('Combined programs:', combined);
      
      // Filter out ended programs
      const filteredPrograms = combined.filter(program => !isProgramEnded(program));
      console.log('Filtered programs:', filteredPrograms);
      
      setAllPrograms(filteredPrograms);
      setLoading(false);
    }
  }, [mindLoading, bodyLoading, soulLoading, mindPrograms, bodyPrograms, soulPrograms]);

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
    console.log('No programs to display');
    return (
      <div className="py-8 text-center">
        <p>No programs available at the moment.</p>
        <p className="text-gray-500 text-sm mt-2">(Check browser console for debugging info)</p>
      </div>
    );
  }

  return (
    <section className="py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-main">Our Programs</h2>
        </div>

        <div className="relative">
          <div className="flex overflow-x-auto pb-4 -mx-2">
            <div className="flex space-x-4 px-2">
              {allPrograms.map((program) => (
                <Link 
                  key={program._id}
                  to={`/programs/${program.slug}`}
                  className="flex-shrink-0 w-48 group block"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                    {program.imageUrl ? (
                      <img 
                        src={program.imageUrl} 
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        <span>No image</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Program Date and Time */}
                  {!!(program.programDate || program.programTime) && (
                    <div className="mb-2 p-2 bg-purple-50 rounded border border-purple-200">
                      {program.programDate && (
                        <div className="flex items-center text-xs text-purple-700 mb-1">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(program.programDate).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short'
                          })}
                        </div>
                      )}
                      {program.programTime && (
                        <div className="flex items-center text-xs text-purple-700">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {program.programTime}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <h3 className="text-sm font-medium text-main text-center line-clamp-2 px-1">
                    {program.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsCarousel;
