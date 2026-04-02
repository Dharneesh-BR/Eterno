import { useEffect, useState, useCallback } from 'react';
import { client } from '../sanityClient';

export function useSanityData(query, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      console.log('Executing Sanity query:', query);
      console.log('With parameters:', params);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased from 10s to 30s

      const result = await client.fetch(query, params, { 
        signal: controller.signal,
        // Add cache busting for development
        cache: 'no-store'
      });

      clearTimeout(timeoutId);

      console.log('Sanity API response:', result);
      console.log('Result type:', typeof result);
      console.log('Result length:', result ? result.length : 'null');

      if (!result) {
        throw new Error('No data returned from Sanity');
      }

      setData(result);
      setError(null);
    } catch (err) {
      console.error('Error fetching data from Sanity:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        query,
        params,
        config: {
          projectId: client.config().projectId,
          dataset: client.config().dataset,
          apiVersion: client.config().apiVersion,
          useCdn: client.config().useCdn,
          withCredentials: client.config().withCredentials
        }
      });

      // Don't set error for timeout, let retry handle it
      if (err.name !== 'AbortError') {
        setError({
          message: err.message || 'Failed to fetch data from Sanity',
          details: {
            name: err.name,
            query,
            params,
            isNetworkError: err.name === 'AbortError' || !navigator.onLine
          }
        });
      }
    } finally {
      setLoading(false);
    }
  }, [query, JSON.stringify(params)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}
