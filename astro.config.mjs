import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// 注: @astrojs/sitemap は使用しない。
// 理由: 全ビルドページ（noindexのドラマ記事含む）を sitemap-0.xml に出力してしまい、
//       robots.txt がそれを指すと noindex ページを Google に送信してしまう。
//       サイトマップは scripts/generate-sitemap.mjs（humanReviewed:true のみ収録）で生成し、
//       robots.txt は /sitemap.xml を指す。
export default defineConfig({
  site: 'https://jitan-kenko.blog',
  integrations: [mdx()],
  output: 'static',
});
