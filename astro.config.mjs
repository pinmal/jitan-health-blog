import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://jitan-kenko.blog',
  integrations: [mdx(), sitemap()],
  output: "hybrid",
  adapter: cloudflare()
});