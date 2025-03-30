import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const MovieCard = ({
   id,
   poster_path,
   title,
   vote_average,
   release_date,
}: Movie) => {
   const yearDate = (fecha: Date) => {
      const newFecha = new Date(fecha);
      return newFecha.getFullYear();
   };
   return (
      <Link
         asChild
         href={{
            pathname: '/movies/[id]',
            params: { id },
         }}
      >
         <TouchableOpacity className="w-[30%]">
            <Image
               className="w-full h-52 rounded-lg"
               resizeMode="cover"
               source={{
                  uri: poster_path
                     ? `https://image.tmdb.org/t/p/w500${poster_path}`
                     : 'https://st3.depositphotos.com/4320021/34714/v/450/depositphotos_347143742-stock-illustration-photo-coming-soon-picture-frame.jpg',
               }}
            />

            <Text
               className="text-white text-sm font-bold mt-2 "
               numberOfLines={1}
            >
               {title}
            </Text>

            <View className="flex flex-row gap-x-1 items-center justify-start">
               <Image source={icons.star} />
               <Text className="text-white text-xs font-bold uppercase">
                  {vote_average.toFixed(1)}
               </Text>
            </View>

            <View className="flex flex-row items-center justify-between mt-1">
               <Text className="text-xs font-medium text-light-300">
                  {yearDate(release_date)}
               </Text>
               {/* <Text className="text-xs font-medium text-light-300 uppercase">
                  Movie
               </Text> */}
            </View>
         </TouchableOpacity>
      </Link>
   );
};

export default MovieCard;
