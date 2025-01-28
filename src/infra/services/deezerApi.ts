import axios from 'axios';

export const deezerApi = axios.create({
  baseURL: '/api/',
  timeout: 5000,
});
