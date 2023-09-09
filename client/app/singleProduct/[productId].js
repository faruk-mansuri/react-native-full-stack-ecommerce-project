import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { HomeHeader } from '../../Components';

const SingleProduct = () => {
  const { productId } = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(
        `https://fakestoreapi.com/products/${productId}`
      );
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <ActivityIndicator style={{ marginTop: 80 }} />;

  const { id, category, description, image, price, rating, title } = product;
  console.log(product);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <HomeHeader />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        ></ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleProduct;
