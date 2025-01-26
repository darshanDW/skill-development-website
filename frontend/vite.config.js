import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Adjust if your files are in a subdirectory
  build: {
    rollupOptions: {
      input: './index.html', // Explicitly specify the HTML file
    },
  },
});
