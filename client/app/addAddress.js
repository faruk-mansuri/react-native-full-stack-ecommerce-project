import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormRow } from '../Components';
import { useGlobalContext } from '../UserContext';
import customFetch from '../utils/customFetch';
import { useRouter } from 'expo-router';

const initialState = {
  name: '',
  mobileNo: '',
  houseNo: '',
  street: '',
  landmark: '',
  postalCode: '',
};

const addAddress = () => {
  const router = useRouter();
  const { userId } = useGlobalContext();

  const [formData, setFormData] = useState(initialState);

  const { name, mobileNo, houseNo, street, landmark, postalCode } = formData;

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };

    try {
      const { data } = await customFetch.post('/user/add-address', {
        userId,
        address,
      });
      Alert.alert(data.msg);
      setFormData(initialState);
      setTimeout(() => {
        router.back();
      }, 1000);
    } catch (error) {
      console.log(error.response.data.msg);
      Alert.alert(error.response.data.msg);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ height: 50, backgroundColor: '#00CED1' }} />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
            Add a new Address
          </Text>

          <TextInput
            placeholderTextColor='#222'
            placeholder='India'
            style={styles.inputText}
          />

          {/* Name */}
          <FormRow
            label='Enter Full Name (first and last name)'
            placeholder='Enter you name'
            name='name'
            value={name}
            handleChange={handleChange}
          />

          {/* Mobile number */}
          <FormRow
            label='Mobile number'
            placeholder='Mobile no'
            name='mobileNo'
            value={mobileNo}
            handleChange={handleChange}
          />

          {/* House Number */}
          <FormRow
            label='Flat, House No, Building, Company'
            placeholder=''
            name='houseNo'
            value={houseNo}
            handleChange={handleChange}
          />

          {/* Street */}
          <FormRow
            label='Area, Street, Sector, Village'
            placeholder=''
            name='street'
            value={street}
            handleChange={handleChange}
          />

          {/* Landmark */}
          <FormRow
            label='Landmark'
            placeholder='Eg. near apollo hospital'
            name='landmark'
            value={landmark}
            handleChange={handleChange}
          />

          {/* pin code */}
          <FormRow
            label='Pin Code'
            placeholder='Enter pin code'
            name='postalCode'
            value={postalCode}
            handleChange={handleChange}
          />

          <Pressable
            style={{
              marginTop: 20,
              backgroundColor: '#FFC72C',
              padding: 15,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleSubmit}
          >
            <Text style={{ fontWeight: 'bold' }}>Add Address</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputText: {
    padding: 10,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default addAddress;
