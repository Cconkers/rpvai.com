// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://rpvai.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
