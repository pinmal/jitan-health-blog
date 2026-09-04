import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    category: z.enum(['comparison', 'review', 'health-column', 'howto', 'mental-health']),
    tags: z.array(z.string()),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    evidenceLevel: z.enum(['high', 'medium', 'low', 'opinion', 'clinical-opinion']).default('medium'),
    affiliateLinks: z.array(z.object({
      platform: z.enum(['amazon', 'rakuten']),
      url: z.string(),
      productName: z.string(),
      anchor: z.string(),
    })).optional(),
    targetKeyword: z.string().optional(),
    searchIntent: z.enum(['informational', 'commercial', 'navigational']).default('informational'),
    // 編集確認が済んでいるか（下書き制御）。false = noindex + AdSense非配信
    humanReviewed: z.boolean().default(false),
    // 個別記事の意図的な noindex
    noindex: z.boolean().default(false),
    // AdSense審査などで一時的に検索から外したいとき専用のスイッチ（2026-08-09 追加）
    // humanReviewed を「下書き制御」と「審査用の一括noindex」に兼用した結果、
    // 2026-05-29〜07-13 にドラマ記事70本が45日間 noindex のまま放置され、
    // 解除後もGoogleが再クロールせず35本が索引から外れたままになった。
    // 用途を分けることで「下書きではないが一時的に検索から外す」を明示できる。
    adsenseHold: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    character: z.enum(['yuka', 'naoko', 'kenji']).optional(),
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).optional(),
    // Phase 4 (2026-05-23): cross_site_check.py 用の参照書籍指定
    // CSO/kindle-publishing/frozen_facts/book##.yaml の forbidden_in_web を限定的に適用
    references_books: z.array(z.string()).optional(),
  }),
});

export const collections = { articles };
