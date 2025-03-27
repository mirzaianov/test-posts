import { useEffect, useState } from 'react';

const useFetch = <T>(
  url: string,
): { data: T | null; isLoading: boolean; error: Error | null } => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // ! Added intensionally to show Skeleton
        // TODO: Remove in production
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // !

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Server error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
        }
      } catch (e) {
        if (isMounted) {
          setError(e instanceof Error ? e : new Error('An unknown error!'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
