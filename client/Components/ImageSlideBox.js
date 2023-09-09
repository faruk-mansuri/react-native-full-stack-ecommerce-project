import { View, Image, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { images } from '../utils/data';

const ImageSlideBox = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setImageIndex((imageIndex) => {
        let newImageIndex = imageIndex + 1;
        if (newImageIndex >= images.length) {
          newImageIndex = 0;
        }
        return newImageIndex;
      });
    }, 3000);

    return () => clearInterval(id);
  });
  return (
    <View
      style={{
        width: '100%',
        height: 200,
        position: 'relative',
      }}
    >
      <Image
        source={{ uri: images[imageIndex] }}
        style={{ width: '100%', height: '100%' }}
      />

      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          bottom: 30,
          justifyContent: 'center',
        }}
      >
        {images.map((_, index) => {
          return (
            <Pressable
              key={index}
              style={{
                width: 15,
                height: 15,
                borderRadius: 50,
                backgroundColor: imageIndex === index ? '#13274F' : '#90A4AE',
              }}
              onPress={() => setImageIndex(index)}
            ></Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default ImageSlideBox;
