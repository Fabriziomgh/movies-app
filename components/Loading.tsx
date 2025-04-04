import { View, ActivityIndicator } from 'react-native';

const Loading = () => {
   return (
      <View className="flex flex-1 items-center justify-center">
         <ActivityIndicator size="large" color="#0000ff" />
      </View>
   );
};

export default Loading;
