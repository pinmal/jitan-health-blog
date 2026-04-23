import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 独自ドメイン取得後に変更: 'https://jitan-kenko.com'
  site: 'https://jitan-kenko.pages.dev',
  integrations: [mdx(), sitemap()],
  output: 'static',
});
