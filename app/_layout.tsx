import '../global.css';

import { Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform, StatusBar } from 'react-native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const isAndroid = Platform.OS === 'android';

if (isAndroid) {
   NavigationBar.setBackgroundColorAsync('#0f0d23');
}
export default function RootLayout() {
   return (
      <>
         <StatusBar hidden={true} />
         <QueryClientProvider client={queryClient}>
            <Stack
               screenOptions={{
                  animation: 'none',
                  headerShown: false,
               }}
            >
               <Stack.Screen
                  name="(tabs)"
                  options={{
                     headerShown: false,
                  }}
               />
            </Stack>
         </QueryClientProvider>
      </>
   );
}
