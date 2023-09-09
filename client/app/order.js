import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

const Order = () => {
  const router = useRouter();
  useEffect(() => {
    const id = setTimeout(() => {
      router.push('home');
    }, 1500);
    return () => clearInterval(id);
  });

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <LottieView
        source={require('../assets/thumbs.json')}
        // ref={animation}
        style={{
          height: 260,
          width: 300,
          alignSelf: 'center',
          marginTop: 40,
          justifyContent: 'center',
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        Your Order Has been Received
      </Text>
      <LottieView
        source={require('../assets/sparkle.json')}
        style={{
          height: 300,
          position: 'absolute',
          top: 100,
          width: 300,
          alignSelf: 'center',
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default Order;
