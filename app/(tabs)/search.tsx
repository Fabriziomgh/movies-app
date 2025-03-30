import { View, Text, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import Loading from '@/components/Loading';

import useFetchMovies from '@/services/useFetch';
import { updateSearchCount } from '@/services/appwrite';

const search = () => {
   const [searchQuery, setSearchQuery] = useState('');

   const {
      searchMovies: { data, isLoading, error, refetch },
      updateSearchCountMutation,
   } = useFetchMovies(searchQuery, false);

   useEffect(() => {
      const timeOutId = setTimeout(async () => {
         if (searchQuery.trim()) {
            const { data: refetchResult } = await refetch();

            if (refetchResult && refetchResult.results.length > 0) {
               updateSearchCountMutation.mutate(refetchResult.results[0]);
            }
         } else {
            return;
         }
      }, 500);

      return () => clearTimeout(timeOutId);
   }, [searchQuery]);

   return (
      <View className="flex-1 bg-primary">
         <Image
            source={images.bg}
            className="flex-1 absolute z-0"
            resizeMode="cover"
         />

         <FlatList
            data={data?.results ?? []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard {...item} />}
            className="px-5"
            numColumns={3}
            columnWrapperStyle={{
               gap: 16,
               marginVertical: 16,
            }}
            contentContainerStyle={{
               paddingBottom: 100,
            }}
            ListHeaderComponent={
               <>
                  <View className="w-full flex flex-row items-center mt-20 justify-center">
                     <Image source={icons.logo} className="w-12 h-10" />
                  </View>

                  <View className="my-5">
                     <SearchBar
                        placeholder="Buscar película..."
                        value={searchQuery}
                        onChangeText={(text) => {
                           setSearchQuery(text);
                        }}
                     />
                  </View>

                  {isLoading && <Loading />}
                  {error && (
                     <Text className="text-red-500">
                        Error: {error.message}
                     </Text>
                  )}
                  {!isLoading &&
                     !error &&
                     searchQuery.trim() &&
                     data?.results &&
                     data.results.length > 0 && (
                        <Text className="text-xl font-bold text-white">
                           Resultados de la búsqueda para{' '}
                           <Text className="text-accent">{searchQuery}</Text>
                        </Text>
                     )}
               </>
            }
            ListEmptyComponent={
               !isLoading && !error ? (
                  <View className="mt-10 px-5">
                     <Text className="text-center text-gray-500 font-bold">
                        {searchQuery.trim()
                           ? 'No se encontraron películas'
                           : 'Búsca una película '}
                     </Text>
                  </View>
               ) : null
            }
         />
      </View>
   );
};

export default search;
