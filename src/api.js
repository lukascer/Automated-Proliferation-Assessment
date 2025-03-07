import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // BE URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
