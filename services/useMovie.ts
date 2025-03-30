import { useQuery } from '@tanstack/react-query';
import { fetchMovieById } from './api';

export const useMovie = (id: string | number) => {
   const movieDetails = useQuery({
      queryKey: ['movie', 'details', id],
      queryFn: () => fetchMovieById(id),
      staleTime: 60 * 60 * 24,
   });

   return {
      movieDetails,
   };
};
