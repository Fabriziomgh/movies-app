import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useMovie } from '@/services/useMovie';
import Loading from '@/components/Loading';
import { icons } from '@/constants/icons';
import { numberFormat } from '@/lib/numberFormat';

interface MovieInfoProps {
   label: string;
   value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
   <View className="flex-col items-start justify-center mt-5 ">
      <Text className="text-light-200 text-sm font-normal">{label}</Text>
      <Text className="text-light-100 font-bold text-sm mt-2">
         {value ?? 'N/A'}
      </Text>
   </View>
);

const MovieDetails = () => {
   const { id } = useLocalSearchParams();
   const {
      movieDetails: { data: movie, isLoading, isError },
   } = useMovie(id as string);

   const releaseDate = movie?.release_date
      ? new Date(movie?.release_date)
      : new Date();

   return (
      <View className="bg-primary flex-1">
         {isLoading ? (
            <Loading />
         ) : (
            <ScrollView
               contentContainerStyle={{
                  paddingBottom: 80,
               }}
            >
               <View>
                  <Image
                     className="w-full h-[550px]"
                     resizeMode="stretch"
                     source={{
                        uri: movie?.poster_path
                           ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                           : 'https://st3.depositphotos.com/4320021/34714/v/450/depositphotos_347143742-stock-illustration-photo-coming-soon-picture-frame.jpg',
                     }}
                  />
               </View>

               <View className="flex-col items-start justify-center mt-5 px-5">
                  <Text className="font-bold text-white text-xl">
                     {movie?.title}
                  </Text>
                  <View className="flex-row items-center gap-x-1 mt-2">
                     <Text className="text-light-200 text-sm">
                        {releaseDate.getFullYear()},
                     </Text>

                     <Text className="text-light-200 text-sm">
                        {`Duración: ${movie?.runtime} minutos`}
                     </Text>
                  </View>

                  <View className="bg-dark-100 flex-row items-center px-2 py-1 rounded-md gap-x-1 mt-2">
                     <Image source={icons.star} />
                     <Text className="text-white font-bold text-sm">
                        {movie?.vote_average.toFixed(1) ?? 0}/10
                     </Text>
                     <Text className="text-light-200 text-sm">{`(${movie?.vote_count}) votos`}</Text>
                  </View>

                  <MovieInfo label="Sinopsis" value={movie?.overview} />
                  <MovieInfo
                     label="Género"
                     value={
                        movie?.genres.map((g) => g.name).join(' - ') || 'n/a'
                     }
                  />
                  <View className="flex flex-row justify-between w-[70%]">
                     <MovieInfo
                        label="Presupuesto"
                        value={numberFormat(movie?.budget ?? 0)}
                     />
                     <MovieInfo
                        label="Recaudado"
                        value={numberFormat(movie?.revenue ?? 0)}
                     />
                  </View>
                  <MovieInfo
                     label="Empresas de Producción"
                     value={
                        movie?.production_companies
                           .map((c) => c.name)
                           .join(' - ') || 'n/a'
                     }
                  />
               </View>
               <TouchableOpacity
                  onPress={router.back}
                  className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
               >
                  <Image
                     source={icons.arrow}
                     className="size-5 mr-1 mt-0.5 rotate-180 "
                     tintColor="#fff"
                  />
                  <Text className="font-semibold text-white text-base">
                     Regresar
                  </Text>
               </TouchableOpacity>
            </ScrollView>
         )}
      </View>
   );
};

export default MovieDetails;
