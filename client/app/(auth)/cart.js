import { AntDesign } from '@expo/vector-icons';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals } from '../../features/cart/cartSlice';
import { remove, increase, decrease } from '../../features/cart/cartSlice';
import { useRouter } from 'expo-router';

const cart = () => {
  const dispatch = useDispatch();
  const { cartItems, amount, total } = useSelector((store) => store.cart);

  const router = useRouter();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />

        <View
          style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 18, fontWeight: '400' }}>Subtotal : </Text>
          <Text style={{ fontSize: 20, fontWeight: '400' }}>
            $ {total.toFixed(2)}
          </Text>
        </View>

        <Text style={{ marginHorizontal: 10 }}>EMI details available</Text>

        {amount > 0 ? (
          <Pressable
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              marginHorizontal: 10,
              marginTop: 10,
            }}
            onPress={() => router.push('confirmation')}
          >
            <Text
              style={{
                fontWeight: 'bold',
                letterSpacing: 1,
                textTransform: 'capitalize',
              }}
            >
              Proceed to Buy {amount} product
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              marginHorizontal: 10,
              marginTop: 10,
            }}
            onPress={() => router.push('home')}
          >
            <Text
              style={{
                fontWeight: 'bold',
                letterSpacing: 1,
                textTransform: 'capitalize',
              }}
            >
              Continue Shopping
            </Text>
          </Pressable>
        )}

        <Text
          style={{
            height: 1,
            borderColor: '#D0D0D0',
            borderWidth: 1,
            marginTop: 16,
          }}
        />

        <View style={{ marginHorizontal: 10 }}>
          {cartItems.map((item, index) => {
            const { id, image, title, price, quantity } = item;
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#fff',
                  marginVertical: 10,
                  borderBottomColor: '#F0F0F0',
                  borderWidth: 2,
                  borderLeftWidth: 0,
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                }}
              >
                <Pressable
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    gap: 10,
                  }}
                >
                  <Image
                    source={{ uri: image }}
                    style={{ width: 140, height: 140, resizeMode: 'contain' }}
                  />

                  <View>
                    <Text
                      numberOfLines={3}
                      style={{ width: 150, marginTop: 10 }}
                    >
                      {title}
                    </Text>

                    <Text
                      style={{ fontSize: 17, fontWeight: 'bold', marginTop: 6 }}
                    >
                      $ {price}
                    </Text>

                    <Image
                      style={{ width: 30, height: 30, resizeMode: 'contain' }}
                      source={{
                        uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png',
                      }}
                    />
                    <Text style={{ color: 'green' }}>In Stock</Text>
                  </View>
                </Pressable>

                <Pressable
                  style={{
                    marginVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 7,
                    }}
                  >
                    <Pressable
                      style={styles.deleteBtn}
                      onPress={() => {
                        if (quantity === 1) {
                          dispatch(remove({ id }));
                        } else {
                          dispatch(decrease({ id }));
                        }
                      }}
                    >
                      <AntDesign name='minus' size={24} color='black' />
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 18,
                        paddingVertical: 6,
                      }}
                    >
                      <Text>{quantity}</Text>
                    </Pressable>

                    <Pressable
                      style={styles.editBtn}
                      onPress={() => dispatch(increase({ id }))}
                    >
                      <AntDesign name='plus' size={24} color='black' />
                    </Pressable>
                  </View>

                  <Pressable
                    style={{
                      backgroundColor: '#fff',
                      padding: 10,
                      borderRadius: 5,
                      backgroundColor: '#ff4d4d',
                    }}
                    onPress={() => dispatch(remove({ id }))}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      Delete
                    </Text>
                  </Pressable>
                </Pressable>

                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    marginBottom: 10,
                  }}
                >
                  <Pressable
                    style={{
                      padding: 10,
                      backgroundColor: '#FFD18B',
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: '500',
                        textTransform: 'capitalize',
                      }}
                    >
                      Save for later
                    </Text>
                  </Pressable>

                  <Pressable
                    style={{
                      padding: 10,
                      backgroundColor: '#FFD18B',
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: '500',
                        textTransform: 'capitalize',
                      }}
                    >
                      See more like this
                    </Text>
                  </Pressable>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  deleteBtn: {
    backgroundColor: '#D8D8D8',
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  editBtn: {
    backgroundColor: '#D8D8D8',
    padding: 7,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
});
export default cart;
