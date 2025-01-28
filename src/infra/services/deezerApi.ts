import axios from 'axios';
const baseURL = process.env?.VITE_API_BASE_URL;

console.log('baseURL', baseURL);
export const deezerApi = axios.create({
  baseURL,
  timeout: 5000,
});
