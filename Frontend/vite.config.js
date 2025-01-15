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
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
});
