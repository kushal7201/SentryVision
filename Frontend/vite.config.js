import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
      src: path.resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'esnext', // Use the latest JavaScript features
    sourcemap: true, // Optional: Generates source maps for debugging
  },
  server: {
    port: 3030,
    open: true,
  },
  preview: {
    port: 3030,
  },
});
