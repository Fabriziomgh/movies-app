import axios from 'axios';

export const TMDB_API = axios.create({
   baseURL: 'https://api.themoviedb.org/3',
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
   },
   params: {
      language: 'es-US',
   },
});

export const fetchPopularMovies = async () => {
   try {
      const { data, status } = await TMDB_API.get<DBResponse>('/movie/popular');

      if (status !== 200) {
         throw new Error('Falló al hacer fetch a las películas populares');
      }

      return data;
   } catch (error) {
      console.log(error);
   }
};

export const fetchSearchMovies = async ({ query }: { query: string }) => {
   try {
      const { data, status } = await TMDB_API.get<DBResponse>(
         `/search/movie?query=${encodeURIComponent(query)}`
      );
      if (status !== 200) {
         throw new Error('Falló al hacer fetch al búscar películas');
      }
      return data;
   } catch (error) {
      console.log(error);
   }
};

export const fetchMovieById = async (movieId: string | number) => {
   try {
      const { data, status } = await TMDB_API.get<MovieDetails>(
         `/movie/${movieId}`
      );
      if (status !== 200) {
         throw new Error('Falló al hacer fetch al búscar películas');
      }
      return data;
   } catch (error) {
      console.log(error);
   }
};
