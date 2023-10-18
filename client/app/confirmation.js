import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import customFetch from '../utils/customFetch';
import { useGlobalContext } from '../UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { clearCart } from '../features/cart/cartSlice';
import RazorpayCheckout from 'react-native-razorpay';
import { Toast } from '../Components';

const ConfirMation = () => {
  const { userId } = useGlobalContext();
  const { total, amount, cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const steps = [
    { title: 'Address', content: 'Address Form' },
    { title: 'Delivery', content: 'Delivery Options' },
    { title: 'Payment', content: 'Payment Details' },
    { title: 'Place Order', content: 'Order Summary' },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [deliveryOption, setDeliveryOption] = useState(false);
  const [selectedCashOPtion, setSelectedCashOPtion] = useState('');

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

  // cash on delivery
  const handleSubmit = async () => {
    try {
      const orderData = {
        userId,
        cartItems,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedCashOPtion,
      };

      const { data } = await customFetch.post('/order', orderData);
      router.push('order');
      dispatch(clearCart());
      // console.log(data.msg);
    } catch (error) {
      console.log(error.response.data.msg);
      Toast(error.response.data.msg);
    }
  };

  // UPI payment
  const pay = async () => {
    try {
      const options = {
        description: 'Adding To Wallet',
        currency: 'INR',
        name: 'Amazon',
        key: 'rzp_test_IjE0xudaXglHwA',
        amount: total * 100,
        prefill: {
          email: 'void@razorpay.com',
          contact: '9191919191',
          name: 'RazorPay Software',
        },
        theme: { color: '#F37254' },
      };

      const data = await RazorpayCheckout.open(options);
      const orderData = {
        userId,
        cartItems,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedCashOPtion,
      };

      const response = await customFetch.post('/order', orderData);
      router.push('order');
      dispatch(clearCart());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={{ paddingHorizontal: 20, marginTop: 40 }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              justifyContent: 'space-between',
            }}
          >
            {steps.map((step, index) => {
              return (
                <View key={index} style={{ alignItems: 'center' }}>
                  <View
                    style={[
                      {
                        width: 30,
                        height: 30,
                        borderRadius: 50,
                        backgroundColor: '#ccc',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      index < currentStep && { backgroundColor: 'green' },
                    ]}
                  >
                    {index < currentStep ? (
                      <Text style={styles.progressBtn}>&#10003;</Text>
                    ) : (
                      <Text style={styles.progressBtn}>{index + 1}</Text>
                    )}
                  </View>

                  <Text style={{ textAlign: 'center', marginTop: 8 }}>
                    {step.title}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {currentStep === 0 && (
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Select Delivery Address
            </Text>

            <Pressable>
              {addresses.length === 0 && (
                <Pressable onPress={() => router.push('addAddress')}>
                  <Text>Add Address</Text>
                </Pressable>
              )}
              {addresses.length > 0 &&
                addresses.map((address, index) => {
                  return (
                    <Pressable
                      key={index}
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#D0D0D0',
                        padding: 10,
                        marginBottom: 17,
                        marginVertical: 7,
                        borderRadius: 10,
                      }}
                    >
                      {selectedAddress &&
                      selectedAddress._id === address._id ? (
                        <FontAwesome5
                          name='dot-circle'
                          size={24}
                          color='#008E97'
                        />
                      ) : (
                        <Entypo
                          name='circle'
                          size={24}
                          color='black'
                          onPress={() => setSelectedAddress(address)}
                        />
                      )}

                      <View>
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
                          style={{
                            flexDirection: 'row',
                            gap: 10,
                            marginTop: 7,
                          }}
                        >
                          <Pressable
                            style={[styles.btn, { backgroundColor: '#80ff00' }]}
                          >
                            <Text style={{ fontSize: 15 }}>Edit</Text>
                          </Pressable>

                          <Pressable
                            style={[styles.btn, { backgroundColor: 'red' }]}
                          >
                            <Text style={{ padding: 1, fontSize: 15 }}>
                              Remove
                            </Text>
                          </Pressable>

                          <Pressable
                            style={[styles.btn, { backgroundColor: '#00CED1' }]}
                          >
                            <Text style={{ padding: 1, fontSize: 15 }}>
                              set as default
                            </Text>
                          </Pressable>
                        </View>
                        {selectedAddress &&
                          selectedAddress._id === address._id && (
                            <Pressable
                              style={{
                                backgroundColor: '#FFC72C',
                                padding: 10,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10,
                              }}
                              onPress={() => setCurrentStep(1)}
                            >
                              <Text
                                style={{
                                  fontWeight: '500',
                                  letterSpacing: 1,
                                }}
                              >
                                Deliver to this address
                              </Text>
                            </Pressable>
                          )}
                      </View>
                    </Pressable>
                  );
                })}
            </Pressable>
          </View>
        )}

        {currentStep === 1 && (
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Choose your delivery options
            </Text>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 20,
                padding: 5,
              }}
            >
              {deliveryOption ? (
                <FontAwesome5
                  name='dot-circle'
                  size={24}
                  color='#008E97'
                  onPress={() => setDeliveryOption(!deliveryOption)}
                />
              ) : (
                <Entypo
                  name='circle'
                  size={24}
                  color='black'
                  onPress={() => setDeliveryOption(!deliveryOption)}
                />
              )}

              <Text style={{ flex: 1 }}>
                <Text style={{ color: 'green', fontWeight: '500' }}>
                  Tomorrow by 10pm
                </Text>{' '}
                - FREE delivery with your Prime membership
              </Text>
            </View>

            <Pressable
              style={{
                backgroundColor: '#FFC72C',
                padding: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                opacity: deliveryOption ? 1 : 0.5,
              }}
              disabled={!deliveryOption}
              onPress={() => setCurrentStep(2)}
            >
              <Text>Continue</Text>
            </Pressable>
          </View>
        )}

        {currentStep === 2 && (
          <View
            style={{
              padding: 15,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Select your payment method
            </Text>

            <View style={styles.cashBtn}>
              {selectedCashOPtion === 'cash' ? (
                <FontAwesome5 name='dot-circle' size={24} color='#008E97' />
              ) : (
                <Entypo
                  name='circle'
                  size={24}
                  color='black'
                  onPress={() => setSelectedCashOPtion('cash')}
                />
              )}
              <Text style={{ fontSize: 17 }}>Cash on Delivery</Text>
            </View>

            <View style={styles.cashBtn}>
              {selectedCashOPtion === 'card' ? (
                <FontAwesome5 name='dot-circle' size={24} color='#008E97' />
              ) : (
                <Entypo
                  name='circle'
                  size={24}
                  color='black'
                  onPress={() => {
                    setSelectedCashOPtion('card');
                    Alert.alert('UPI/Debit card', 'Pay Online', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('cancel is pressed'),
                      },
                      {
                        text: 'Ok',
                        onPress: () => pay(),
                      },
                    ]);
                  }}
                />
              )}
              <Text style={{ fontSize: 17 }}>UPI / Credit or Debit Card</Text>
            </View>

            <Pressable
              style={{
                backgroundColor: '#FFC72C',
                padding: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                opacity: selectedCashOPtion ? 1 : 0.5,
              }}
              disabled={!deliveryOption}
              onPress={() => setCurrentStep(3)}
            >
              <Text>Continue</Text>
            </Pressable>
          </View>
        )}

        {currentStep === 3 && selectedCashOPtion === 'cash' && (
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Order Now</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                padding: 8,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <View>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Save 5% and never run out
                </Text>
                <Text style={{ fontSize: 15, color: 'gray', marginTop: 5 }}>
                  Turn on auto deliveries
                </Text>
              </View>

              <MaterialIcons
                name='keyboard-arrow-right'
                size={24}
                color='black'
              />
            </View>

            <View
              style={{
                padding: 8,
                borderColor: '#D0D0D0',
                marginTop: 8,
                borderWidth: 1,
                gap: 5,
              }}
            >
              <Text>Shipping to {selectedAddress.name}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: '500', color: 'grey' }}
                >
                  Items
                </Text>
                <Text style={{ fontSize: 16, color: 'grey' }}>$ {total}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: '500', color: 'grey' }}
                >
                  Delivery
                </Text>
                <Text style={{ fontSize: 16, color: 'grey' }}>$ 0</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Order Total
                </Text>
                <Text
                  style={{ fontSize: 16, color: '#C60C30', fontWeight: 'bold' }}
                >
                  $ {total}
                </Text>
              </View>
            </View>

            <View
              style={{
                padding: 8,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, color: 'grey' }}>Pay With</Text>
              <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 7 }}>
                Pay on delivery cash
              </Text>
            </View>

            <Pressable
              style={{
                backgroundColor: '#FFC72C',
                alignItems: 'center',
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={handleSubmit}
            >
              <Text>Place your order</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 7,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    fontWeight: 'bold',
  },
  progressBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cashBtn: {
    padding: 8,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default ConfirMation;
