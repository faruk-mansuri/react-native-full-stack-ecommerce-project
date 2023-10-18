import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import { HomeHeader } from '../../Components';
import { offers, deals } from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { useState } from 'react';

const SingleDeal = () => {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const { width } = Dimensions.get('window');
  const height = (width * 100) / 100;
  const { offerId, label } = useSearchParams();
  const router = useRouter();
  let product;
  if (label === 'offers') {
    product = offers.find((offer) => offer.id === offerId);
  }
  if (label === 'deals') {
    product = deals.find((offer) => offer.id === offerId);
  }

  const {
    id,
    title,
    offer,
    oldPrice,
    price,
    image,
    carouselImages,
    color,
    size,
  } = product;

  const addToCartItems = () => {
    setAddedToCart(true);
    dispatch(addToCart(product));
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000 * 60);
  };

  const handleByNow = async () => {
    setAddedToCart(true);
    dispatch(addToCart(product));
    router.push('cart');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <HomeHeader />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {carouselImages.map((image, index) => {
            return (
              <ImageBackground
                key={index}
                source={{ uri: image }}
                style={{ width, height, marginTop: 25 }}
                resizeMode='contain'
              >
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={styles.icons}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      {offer}
                    </Text>
                  </View>

                  <View style={[styles.icons, { backgroundColor: '#E0E0E0' }]}>
                    <MaterialCommunityIcons
                      name='share-variant'
                      size={24}
                      color='black'
                    />
                  </View>
                </View>

                <View
                  style={[
                    styles.icons,
                    {
                      marginTop: 'auto',
                      marginLeft: 20,
                      marginBottom: 20,
                    },
                  ]}
                >
                  <AntDesign name='heart' size={24} color='#FFDDDD' />
                </View>
              </ImageBackground>
            );
          })}
        </ScrollView>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: '500', letterSpacing: 1 }}>
            {title}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 6 }}>
            price: ₹{price}
          </Text>
        </View>

        <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }} />

        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text>Color: </Text>
          <Text style={styles.color}>{color} </Text>
        </View>

        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text>Size: </Text>
          <Text style={styles.color}>{size} </Text>
        </View>

        <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }} />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 5 }}>
            Total : ₹{price}
          </Text>
          <Text style={{ color: '#00CED1' }}>
            Free Delivery Tomorrow by 3 PM. Order within 10hrs
          </Text>
          {/* <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginVertical: 5,
              gap: 10,
            }}
          >
            <Ionicons name='location' size={24} color='black' />

            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              Deliver To Peter - Pune 40011
            </Text>
          </View> */}
        </View>

        <Text
          style={{ color: 'green', marginHorizontal: 10, fontWeight: '500' }}
        >
          IN Stock
        </Text>

        <Pressable style={styles.btn} onPress={addToCartItems}>
          <Text>{addedToCart ? 'Added to cart' : 'Add to Cart'}</Text>
        </Pressable>

        <Pressable
          style={[styles.btn, { backgroundColor: '#FFAC1C' }]}
          onPress={handleByNow}
        >
          <Text>Buy now</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icons: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#C60C30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color: { fontSize: 15, fontWeight: 'bold' },
  btn: {
    backgroundColor: '#FFC72C',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
export default SingleDeal;
