import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import { list, deals, offers, categoryItems } from '../../utils/data';
import {
  ImageSlideBox,
  ProductItem,
  HomeHeader,
  Address,
} from '../../Components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { useGlobalContext } from '../../UserContext';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const home = () => {
  const { setUserId } = useGlobalContext();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');

  // const [addresses, setAddresses] = useState([]);
  // const [selectedAddress, setSelectedAdress] = useState('');

  const { cartItems } = useSelector((store) => store.cart);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let url;
      if (category === 'all') {
        url = 'https://fakestoreapi.com/products';
      } else {
        url = `https://fakestoreapi.com/products/category/${category}`;
      }
      const { data } = await axios(url);

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem('token');
    setUserId(jwtDecode(token).userId);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />

        <Address />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item) => {
            const { id, image, name } = item;

            return (
              <Pressable
                key={id}
                style={{
                  padding: 10,
                  marginRight: 5,
                }}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width: 50, height: 50, resizeMode: 'contain' }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: '500',
                    marginTop: 5,
                  }}
                >
                  {name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <ImageSlideBox />

        <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>
          Treading Deals of the week
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {deals.map((deal) => {
            const { image, id } = deal;
            return (
              <Pressable
                key={id}
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => router.push(`singleOffer/${id}?label=deals`)}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width: 180, height: 180, resizeMode: 'contain' }}
                />
              </Pressable>
            );
          })}
        </View>

        <Text
          style={{
            height: 1,
            borderColor: '#D0D0D0',
            borderWidth: 1,
            marginTop: 15,
          }}
        />

        <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>
          Today's Deals
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((offerItem) => {
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
            } = offerItem;

            return (
              <Pressable
                key={id}
                style={{
                  marginVertical: 10,
                  marginRight: 5,
                }}
                onPress={() => router.push(`singleOffer/${id}?label=offers`)}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width: 150, height: 150 }}
                  resizeMode='contain'
                />
                <View
                  style={{
                    backgroundColor: '#e31837',
                    paddingVertical: 5,
                    alignItems: 'center',
                    marginHorizontal: 15,
                    marginTop: 10,
                    borderRadius: 3,
                  }}
                >
                  <Text
                    style={{ color: '#fff', fontSize: 13, fontWeight: 'bold' }}
                  >
                    Upto {offer}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text
          style={{
            height: 1,
            borderColor: '#D0D0D0',
            borderWidth: 1,
            marginTop: 15,
          }}
        />

        <Text
          style={{
            padding: 10,
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Categories
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 5 }}
        >
          {categoryItems.map((categoryItem, index) => {
            return (
              <Pressable
                key={index}
                style={{
                  backgroundColor:
                    categoryItem === category ? '#FFC72C' : '#FFE9AE',
                  marginRight: 10,
                  borderRadius: 10,
                }}
                onPress={() => setCategory(categoryItem)}
              >
                <Text
                  style={{
                    padding: 10,
                    paddingHorizontal: 15,
                    fontSize: 18,
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  {categoryItem}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {isLoading ? (
          <ActivityIndicator size={'large'} style={{ marginTop: 20 }} />
        ) : (
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'center',
            }}
          >
            {products.map((product) => {
              return (
                <ProductItem key={product.id} {...product} product={product} />
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
