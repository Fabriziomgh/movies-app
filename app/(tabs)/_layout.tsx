import { TabIcon } from '@/components/TabIcon';
import { icons } from '@/constants/icons';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
   return (
      <Tabs
         screenOptions={{
            sceneStyle: { backgroundColor: '#0f0d23' },
            animation: 'none',
            headerShown: false,
            tabBarShowLabel: false,
            tabBarItemStyle: {
               width: '100%',
               height: '100%',
               justifyContent: 'center',
               alignContent: 'center',
            },
            tabBarStyle: {
               backgroundColor: '#0f0d23',
               borderRadius: 100,
               marginHorizontal: 7,
               marginBottom: 18,
               height: 52,
               position: 'absolute',
               overflow: 'hidden',
               elevation: 3,
               shadowOpacity: 3,
               borderWidth: 1,
               borderColor: '#0f0d23',
            },
         }}
      >
         <Tabs.Screen
            name="index"
            options={{
               title: 'Inicio',
               tabBarIcon: ({ focused }) => (
                  <TabIcon title="Inicio" focused={focused} icon={icons.home} />
               ),
            }}
         />
         <Tabs.Screen
            name="search"
            options={{
               title: 'Buscar',
               tabBarIcon: ({ focused }) => (
                  <TabIcon
                     title="Buscar"
                     focused={focused}
                     icon={icons.search}
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="saved"
            options={{
               title: 'Guardados',
               tabBarIcon: ({ focused }) => (
                  <TabIcon
                     title="Guardados"
                     focused={focused}
                     icon={icons.save}
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="profile"
            options={{
               title: 'Perfil',
               tabBarIcon: ({ focused }) => (
                  <TabIcon
                     title="Perfil"
                     focused={focused}
                     icon={icons.person}
                  />
               ),
            }}
         />
      </Tabs>
   );
};

export default TabsLayout;
