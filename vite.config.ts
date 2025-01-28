import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isGitHubPages = mode === 'github-pages';
  return {
    base: isGitHubPages ? process.env.VITE_APP_BASE_NAME : '/',
    plugins: [react()],
    define: {
      'process.env': {
        VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,
        VITE_APP_BASE_NAME: process.env.VITE_APP_BASE_NAME || '/',
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://api.deezer.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
