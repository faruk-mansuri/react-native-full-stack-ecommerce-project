import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import customFetch from '../../utils/customFetch';
import { useGlobalContext } from '../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const profile = () => {
  const { cartItems } = useSelector((store) => store.cart);
  const { userId } = useGlobalContext();
  const [user, setUser] = useState('');
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const { data } = await customFetch(`/user/profile/${userId}`);
      setUser(data.user);
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const { data } = await customFetch(`/order/${userId}`);
      setOrders(data.orders);
    } catch (error) {
      console.log('error', error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId, cartItems]);

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    router.push('login');
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        Welcome {user.name}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Your orders</Text>
        </Pressable>

        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Your Account</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Buy Again</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoading ? (
          <ActivityIndicator
            size='large'
            style={{ width: '100%', textAlign: 'center' }}
          />
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#d0d0d0',
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={order._id}
            >
              {order.products.slice(0, 1)?.map((product) => (
                <View style={{ marginVertical: 10 }} key={product._id}>
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 100, height: 100, resizeMode: 'contain' }}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default profile;
