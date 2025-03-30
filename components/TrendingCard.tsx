import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { images } from '@/constants/images';

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
   const { movie_id, title, poster_url, searchTerm } = movie;
   return (
      <Link
         asChild
         href={{
            pathname: '/movies/[id]',
            params: { id: movie_id },
         }}
      >
         <TouchableOpacity className="w-32 relative ml-5">
            <Image
               source={{ uri: poster_url }}
               className="w-32 h-48 rounded-lg"
               resizeMode="cover"
            />

            <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
               <MaskedView
                  maskElement={
                     <Text className="font-bold text-white text-6xl">
                        {index + 1}
                     </Text>
                  }
               >
                  <Image
                     className="size-14"
                     source={images.rankingGradient}
                     resizeMode="cover"
                  />
               </MaskedView>
            </View>
            <Text
               className="text-sm font-bold mt-2 text-light-200"
               numberOfLines={2}
            >
               {title}
            </Text>
         </TouchableOpacity>
      </Link>
   );
};

export default TrendingCard;
