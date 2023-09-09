import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../Components';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import customFetch from '../utils/customFetch';
import { useGlobalContext } from '../UserContext';

const Address = () => {
  const { userId } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const { data } = await customFetch(`user/addresses/${userId}`);
      setAddresses(data.addresses);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Your Addresses
          </Text>

          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingVertical: 7,
              paddingHorizontal: 5,
            }}
            onPress={() => router.push('addAddress')}
          >
            <Text>Add a new Address </Text>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={24}
              color='black'
            />
          </Pressable>

          {/* all added addresses */}
          {isLoading ? (
            <ActivityIndicator size='large' style={{ marginTop: 20 }} />
          ) : (
            <Pressable>
              {addresses.map((address, index) => {
                return (
                  <Pressable
                    key={index}
                    style={{
                      borderWidth: 1,
                      borderColor: '#D0D0D0',
                      padding: 10,
                      gap: 5,
                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 3,
                      }}
                    >
                      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        {address.name}
                      </Text>
                      <Entypo name='location-pin' size={24} color='red' />
                    </View>

                    <Text style={{ fontSize: 15, color: '#181818' }}>
                      {address.houseNo}, {address.landmark}
                    </Text>

                    <Text style={{ fontSize: 15, color: '#181818' }}>
                      {address.street}
                    </Text>

                    <Text style={{ fontSize: 15, color: '#181818' }}>
                      India, Pune
                    </Text>

                    <Text style={{ fontSize: 15, color: '#181818' }}>
                      phone no. {address.mobileNo}
                    </Text>

                    <Text style={{ fontSize: 15, color: '#181818' }}>
                      pin code: {address.postalCode}
                    </Text>

                    <View
                      style={{ flexDirection: 'row', gap: 10, marginTop: 7 }}
                    >
                      <Pressable
                        style={[styles.btn, { backgroundColor: '#80ff00' }]}
                      >
                        <Text style={{ padding: 2, fontSize: 15 }}>Edit</Text>
                      </Pressable>

                      <Pressable
                        style={[styles.btn, { backgroundColor: 'red' }]}
                      >
                        <Text style={{ padding: 2, fontSize: 15 }}>Remove</Text>
                      </Pressable>

                      <Pressable
                        style={[styles.btn, { backgroundColor: '#00CED1' }]}
                      >
                        <Text style={{ padding: 2, fontSize: 15 }}>
                          set as default
                        </Text>
                      </Pressable>
                    </View>
                  </Pressable>
                );
              })}
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    fontWeight: 'bold',
  },
});
export default Address;
