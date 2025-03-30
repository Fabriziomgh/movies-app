interface Props {
   focused: boolean;
   title: string;
   icon: any;
}

import { images } from '@/constants/images';
import { Image, ImageBackground, Text, View } from 'react-native';

export const TabIcon = ({ focused, icon, title }: Props) => {
   if (focused) {
      return (
         <ImageBackground
            source={images.highlight}
            className="flex flex-row flex-1 w-full min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full  overflow-hidden "
         >
            <Image source={icon} tintColor="#151312" />

            <Text className="text-secondary text-base font-semibold ml-2">
               {title}
            </Text>
         </ImageBackground>
      );
   }

   return (
      <View className="size-full justify-center items-start mt-4 rounded-full">
         <Image source={icon} className="size-5" tintColor="#a8b5db" />
      </View>
   );
};
