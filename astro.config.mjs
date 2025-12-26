// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  output: 'static', // SSG
  site: 'https://philomagi.dev',
  integrations: [tailwind(), mdx(), sitemap(), solidJs()],
});