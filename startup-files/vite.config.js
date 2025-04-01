import { defineConfig } from 'vite';


//allows fetch requests to connect to the backend (somehow????)
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      'ws': {
        target: 'ws://localhost:4000',
        ws: true,
      },
    },
  },
});