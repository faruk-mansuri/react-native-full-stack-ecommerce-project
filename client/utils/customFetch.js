import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://192.168.0.109:5000/api/v1',
});

export default customFetch;
