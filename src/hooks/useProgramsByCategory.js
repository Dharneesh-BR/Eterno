import { useEffect, useState, useCallback } from 'react';
import { client } from '../sanityClient';

/**
 * Custom hook to fetch all programs from Sanity (category filtering removed)
 * @param {string} category - The category parameter (kept for compatibility but not used)
 * @returns {Object} - { programs, loading, error, refetch }
 */
export function useProgramsByCategory(category) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrograms = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Updated query without category filtering since category field was removed
      const query = `*[_type == "program"] {
        _id,
        title,
        description,
        strip,
        "imageUrl": image.asset->url,
        price,
        discountPrice,
        originalPrice,
        duration,
        programDate,
        programTime,
        "slug": select(slug.current != null => slug.current, _id) // Fallback to _id if no slug
      } | order(title asc)`;

      if (import.meta.env.DEV) {
        console.log('Fetching all programs (category filtering removed)');
      }

      const data = await client.fetch(query);
      
      if (import.meta.env.DEV) {
        console.log(`Fetched ${data?.length || 0} programs total`);
      }

      setPrograms(Array.isArray(data) ? data : []);
      setError(null);
      
      // Show helpful message if no programs exist
      if (import.meta.env.DEV && (!data || data.length === 0)) {
        console.log('ℹ️ No programs found in Sanity studio yet.');
        console.log('💡 Visit https://eterno.sanity.studio/ to create your first program.');
      }
    } catch (err) {
      console.error('Error fetching programs:', {
        error: err.message,
        timestamp: new Date().toISOString()
      });
      setError(err);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch programs when component mounts
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        await fetchPrograms();
      } catch (err) {
        if (isMounted) {
          console.error('Error in loadData:', err);
          setError(err);
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [fetchPrograms]);

  return { 
    programs, 
    loading, 
    error,
    refetch: fetchPrograms 
  };
}
