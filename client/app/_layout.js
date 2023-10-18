import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, useRouter, useSegments } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ContextAPI from '../UserContext';
import { StatusBar } from 'expo-status-bar';

const InitialLayout = () => {
  const segment = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isTabGroup = segment[0] === '(auth)';

      try {
        const token = await AsyncStorage.getItem('token');
        if (token && !isTabGroup) {
          router.replace('/home');
        } else if (!token) {
          router.replace('/login');
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    checkLoginStatus();
  }, []);

  return <Slot />;
};

const Layout = () => {
  return (
    <Provider store={store}>
      <ContextAPI>
        <BottomSheetModalProvider>
          <StatusBar
            backgroundColor='#222' // Set the desired background color
            barStyle='light-content' // Set text and icon color (use 'default' for dark text)
          />
          <InitialLayout />
        </BottomSheetModalProvider>
      </ContextAPI>
    </Provider>
  );
};

export default Layout;
