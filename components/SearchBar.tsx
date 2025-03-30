import { icons } from '@/constants/icons';
import { View, Text, Image, TextInput } from 'react-native';

interface Props {
   value?: string;
   placeholder: string;
   onPress?: () => void;
   onChangeText?: (text: string) => void;
}

const SearchBar = ({ onChangeText, onPress, value, placeholder }: Props) => {
   return (
      <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
         <Image
            source={icons.search}
            className="size-5"
            resizeMode="contain"
            tintColor="#ab8bff"
         />
         <TextInput
            className="flex-1 ml-1 text-white"
            onPress={onPress}
            placeholder={placeholder}
            placeholderTextColor="#a8b5db"
            value={value || ''}
            onChangeText={onChangeText || (() => {})}
         />
      </View>
   );
};

export default SearchBar;
