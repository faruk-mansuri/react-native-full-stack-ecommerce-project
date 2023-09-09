import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import customFetch from '../utils/customFetch';
import { useGlobalContext } from '../UserContext';

const Address = () => {
  const { userId } = useGlobalContext();
  const router = useRouter();
  const bottomSheetRef = useRef(null);
  const [selectedAddress, setSelectedAddress] = useState('');

  const snapPoints = ['60%'];
  const openModal = () => {
    bottomSheetRef.current.present();
  };

  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!userId) return;
    fetchAddresses();
  }, [userId]);

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        style={{ padding: 15 }}
      >
        <View style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>
            Choose your Location
          </Text>

          <Text style={{ marginTop: 5, fontSize: 16, color: 'grey' }}>
            Select a delivery location to see product availability and options
          </Text>
        </View>

        <BottomSheetScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {/* already added address */}
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            addresses.map((address, index) => {
              return (
                <Pressable
                  key={index}
                  style={[
                    styles.btn,
                    {
                      backgroundColor:
                        address === selectedAddress ? '#FBCEB1' : '#fff',
                    },
                  ]}
                  onPress={() => {
                    setSelectedAddress(address);
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.btnText, { color: '#222' }]}>
                      {address.name}
                    </Text>
                    <Entypo name='location-pin' size={24} color='red' />
                  </View>

                  <Text numberOfLines={1} style={{ textAlign: 'center' }}>
                    {address.houseNo},{address.landmark}
                  </Text>

                  <Text>{address.street}</Text>

                  <Text>India</Text>
                </Pressable>
              );
            })
          )}
          <Pressable
            style={styles.btn}
            onPress={() => {
              router.push('address');
              bottomSheetRef.current.close();
            }}
          >
            <Text style={styles.btnText}>Add an Address or pick-up point</Text>
          </Pressable>
        </BottomSheetScrollView>

        <View style={{ gap: 7, marginTop: 10, flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Entypo name='location-pin' size={24} color='#0066b2' />
            <Text style={{ color: '#0066b2', fontWeight: '400' }}>
              Enter an Indian pincode
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Ionicons name='locate-sharp' size={24} color='#0066b2' />
            <Text style={{ color: '#0066b2', fontWeight: '400' }}>
              Use my current location
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <AntDesign name='earth' size={24} color='#0066b2' />
            <Text style={{ color: '#0066b2', fontWeight: '400' }}>
              Deliver outside India
            </Text>
          </View>
        </View>
      </BottomSheetModal>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          padding: 10,
          backgroundColor: '#AFEEEE',
        }}
      >
        <Ionicons
          name='location-outline'
          size={24}
          color='black'
          onPress={openModal}
        />
        <Pressable onPress={openModal}>
          <Text style={{ fontSize: 14, fontWeight: 500 }}>
            {selectedAddress ? (
              <Text>
                Deliver to {selectedAddress.name} - {selectedAddress.street}
              </Text>
            ) : (
              <Text>Add Delivery Address</Text>
            )}
          </Text>
        </Pressable>

        <MaterialIcons
          name='keyboard-arrow-down'
          size={24}
          color='black'
          onPress={openModal}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 140,
    height: 140,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  btnText: {
    color: '#0066b2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Address;
