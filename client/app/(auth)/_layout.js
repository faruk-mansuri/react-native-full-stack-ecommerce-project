import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Image, View } from 'react-native';

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='home'
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
          headerStyle: { backgroundColor: '#00CED1' },
          headerLeft: () => (
            <Image
              style={{ width: 140, height: 120, resizeMode: 'contain' }}
              source={{
                uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
              }}
            />
          ),

          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                marginRight: 12,
              }}
            >
              <Ionicons name='notifications-outline' size={24} color='black' />

              <AntDesign name='search1' size={24} color='black' />
            </View>
          ),
          headerTitle: '',
        }}
      />
      <Tabs.Screen
        name='cart'
        options={{
          tabBarLabel: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
