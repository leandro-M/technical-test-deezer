import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const deezerApi = axios.create({
  baseURL,
  timeout: 5000,
});
