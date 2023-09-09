import { View, Text, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const ProductItem = ({
  id,
  title,
  price,
  category,
  description,
  image,
  rating,
  product,
}) => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);

  const addToCartItems = () => {
    setAddedToCart(true);
    dispatch(addToCart(product));
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000 * 60);
  };
  return (
    <Pressable style={{ borderRadius: 3, padding: 5 }}>
      <Image
        source={{ uri: image }}
        style={{ width: 150, height: 150 }}
        resizeMode='contain'
      />
      <Text style={{ width: 150, marginTop: 10 }} numberOfLines={1}>
        {title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>${price}</Text>
        <Text style={{ color: '#FFC72C', fontWeight: '500' }}>
          {rating.rate} ratings
        </Text>
      </View>

      <Pressable
        style={{
          backgroundColor: '#FFC72C',
          padding: 10,
          borderRadius: 20,
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
        }}
        onPress={addToCartItems}
      >
        <Text>{addedToCart ? 'Added to cart' : 'Add to Cart'}</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;
