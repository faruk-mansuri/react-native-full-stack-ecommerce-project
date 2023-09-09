import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { View, TextInput, Pressable } from 'react-native';
import React from 'react';

const HomeHeader = () => {
  return (
    <View
      style={{
        backgroundColor: '#00CED1',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
          gap: 10,
          backgroundColor: '#fff',
          borderRadius: 3,
          height: 38,
          flex: 1,
        }}
      >
        <AntDesign
          name='search1'
          size={22}
          color='black'
          style={{ marginLeft: 10 }}
        />
        <TextInput
          style={{ width: '85%', paddingHorizontal: 10 }}
          placeholder='Search Amazon'
        />
      </Pressable>

      <Entypo name='mic' size={24} color='black' />
    </View>
  );
};

export default HomeHeader;
