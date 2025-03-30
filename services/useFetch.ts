import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchPopularMovies, fetchSearchMovies } from '@/services/api';
import { getTrendingTopMovies, updateSearchCount } from '@/services/appwrite';

export const useFetchMovies = (
   query: string = '',
   autoFetch: boolean = true
) => {
   const popularMovies = useQuery({
      queryKey: ['movies', 'popular'],
      queryFn: fetchPopularMovies,
      enabled: autoFetch,
   });

   const searchMovies = useQuery({
      queryKey: ['movies', 'search', query],
      queryFn: () => fetchSearchMovies({ query }),
      enabled: autoFetch,
   });

   const trendingMovies = useQuery({
      queryKey: ['movies', 'trending'],
      queryFn: getTrendingTopMovies,
      enabled: autoFetch,
   });

   const updateSearchCountMutation = useMutation({
      mutationFn: (movie: Movie) => updateSearchCount(query, movie),
   });

   return {
      popularMovies,
      searchMovies,
      trendingMovies,
      updateSearchCountMutation,
   };
};

export default useFetchMovies;
