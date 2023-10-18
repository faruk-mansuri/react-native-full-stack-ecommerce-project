import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import customFetch from '../../utils/customFetch.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const router = useRouter();
  const [formInput, setFormInput] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formInput;

  const handleChange = (name, value) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleLogin = async () => {
    const user = { email, password };
    setIsLoading(true);
    try {
      const { data } = await customFetch.post('/auth/login', user);
      if (!data.verified) {
        Alert.alert(
          'Confirm your registration by clicking on verify link sent on your email'
        );
        return;
      }
      const token = data.token;
      await AsyncStorage.setItem('token', token);
      router.push('/home');
      setFormInput({ name: '', email: '', password: '' });
    } catch (error) {
      Alert.alert('SignIn Error', error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <Image
        style={{ width: 150, height: 100 }}
        source={{
          uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
        }}
      />

      <KeyboardAvoidingView
        style={{
          marginTop: 10,
          width: '90%',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            marginTop: 15,
            color: '#041E42',
          }}
        >
          Login In to your account
        </Text>

        <View style={{ marginTop: 80, width: '90%', gap: 20 }}>
          <View style={style.row}>
            <FontAwesome
              name='envelope'
              size={20}
              color='black'
              style={{ width: '10%', color: 'grey' }}
            />
            <TextInput
              placeholder='enter your email'
              style={style.text}
              value={email}
              onChangeText={(value) => handleChange('email', value)}
            />
          </View>

          <View style={style.row}>
            <FontAwesome
              name='lock'
              size={24}
              color='black'
              style={{ width: '10%', color: 'grey' }}
            />

            <TextInput
              placeholder='enter your password'
              secureTextEntry
              style={style.text}
              value={password}
              onChangeText={(value) => handleChange('password', value)}
            />
          </View>
        </View>

        <View
          style={{
            width: '90%',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: 'grey' }}>Keep me logged In</Text>
          <Text style={{ color: '#007fff', fontWeight: '500' }}>
            Forgot password
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          {isLoading ? (
            <ActivityIndicator size='small' />
          ) : (
            <TouchableOpacity
              style={{
                width: 200,
                backgroundColor: '#FEBE10',
                borderRadius: 6,
                alignItems: 'center',
                padding: 13,
              }}
              onPress={handleLogin}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ color: 'grey', fontSize: 16, letterSpacing: 1 }}>
            Not a member yet?
            <Text
              style={{ color: '#007fff' }}
              onPress={() => router.push('/register')}
            >
              {' '}
              Register
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D0D0D0',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  text: {
    color: 'grey',
    width: '90%',
    letterSpacing: 1,
    paddingHorizontal: 5,
  },
});

export default Login;
