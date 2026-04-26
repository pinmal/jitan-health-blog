import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    category: z.enum(['comparison', 'review', 'health-column', 'howto', 'mental-health']),
    tags: z.array(z.string()),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    evidenceLevel: z.enum(['high', 'medium', 'low', 'opinion', 'clinical-opinion']).default('medium'),
    affiliateLinks: z.array(z.object({
      platform: z.enum(['a8', 'amazon', 'rakuten']),
      url: z.string(),
      productName: z.string(),
      anchor: z.string(),
    })).optional(),
    targetKeyword: z.string().optional(),
    searchIntent: z.enum(['informational', 'commercial', 'navigational']).default('informational'),
    humanReviewed: z.boolean().default(false),
    noindex: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    character: z.enum(['yuka', 'naoko', 'kenji']).optional(),
  }),
});

export const collections = { articles };
