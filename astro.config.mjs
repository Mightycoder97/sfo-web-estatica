// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sfoestudioweb.com', // Reemplazar con el dominio real
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()]
});