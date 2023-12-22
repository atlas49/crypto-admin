import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@database': path.resolve(__dirname, 'src/database'),
      '@state': path.resolve(__dirname, 'src/state'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
});
