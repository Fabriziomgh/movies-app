import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';

import { FlatList, Image, ScrollView, Text, View } from 'react-native';

import { useRouter } from 'expo-router';
import useFetchMovies from '@/services/useFetch';
import MovieCard from '@/components/MovieCard';
import Loading from '@/components/Loading';
import TrendingCard from '@/components/TrendingCard';

export default function Index() {
   const {
      popularMovies: {
         data: popularMoviesData,
         isLoading: popularMoviesisLoading,
         error: popularMoviesError,
      },
      trendingMovies: {
         data: trendingMoviesData,
         isLoading: trendingMoviesIsLoading,
         error: trendingMoviesError,
      },
   } = useFetchMovies();

   const router = useRouter();
   return (
      <View className="flex-1 bg-primary">
         <Image source={images.bg} className="absolute w-full" />

         <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
               minHeight: '100%',
            }}
         >
            <Image
               source={icons.logo}
               className="w-12 h-10 mt-20 mb-5 mx-auto"
            />

            {popularMoviesisLoading || trendingMoviesIsLoading ? (
               <Loading />
            ) : popularMoviesError || trendingMoviesError ? (
               <Text>
                  Error:{' '}
                  {popularMoviesError?.message || trendingMoviesError?.message}
               </Text>
            ) : (
               <View className="flex-1 mt-5">
                  <SearchBar
                     onPress={() => router.push('/search')}
                     placeholder="Buscar una película"
                  />

                  {trendingMoviesData && (
                     <View className="mt-10">
                        <Text className="text-lg text-white font-bold mb-3">
                           Más buscadas
                        </Text>
                     </View>
                  )}

                  <>
                     <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View className="w-4" />}
                        className="mb-4 mt-3"
                        data={trendingMoviesData}
                        keyExtractor={(item) => item.movie_id.toString()}
                        renderItem={({ item, index }) => (
                           <TrendingCard movie={item} index={index} />
                        )}
                     />

                     <Text className="text-lg text-white font-bold mt-5 mb-3">
                        En tendencia
                     </Text>

                     <FlatList
                        className="mt-2 pb-32"
                        data={popularMoviesData?.results ?? []}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={3}
                        columnWrapperStyle={{
                           justifyContent: 'flex-start',
                           gap: 20,
                           paddingRight: 5,
                           marginBottom: 5,
                        }}
                        scrollEnabled={false}
                        renderItem={({ item }) => <MovieCard {...item} />}
                     />
                  </>
               </View>
            )}
         </ScrollView>
      </View>
   );
}
