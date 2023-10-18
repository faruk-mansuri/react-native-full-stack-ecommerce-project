import axios from 'axios';
// https://react-native-amazon-clone-server.onrender.com
const customFetch = axios.create({
  // baseURL: 'http://192.168.0.109:5000/api/v1',
  baseURL: 'https://react-native-amazon-clone-server.onrender.com/api/v1',
});

export default customFetch;
