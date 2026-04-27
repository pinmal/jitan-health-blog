// Search Console 提出用サイトマップ
// humanReviewed: true の公開記事のみ収録（noindex 記事は除外）
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://jitan-kenko.blog';

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function toW3CDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const GET: APIRoute = async () => {
  // humanReviewed: true の記事のみ取得
  const articles = await getCollection('articles', ({ data }) =>
    data.humanReviewed === true
  );

  // 公開日の新しい順にソート
  const sorted = articles
    .filter(a => !a.id.startsWith('_'))
    .sort((a, b) =>
      new Date(b.data.publishedAt).valueOf() - new Date(a.data.publishedAt).valueOf()
    );

  // URL リスト（トップ + 各記事）
  const urls = [
    {
      loc: `${SITE}/`,
      lastmod: toW3CDate(new Date()),
      changefreq: 'weekly',
      priority: '1.0',
    },
    ...sorted.map(a => ({
      loc: escapeXml(`${SITE}/articles/${a.slug}/`),
      lastmod: toW3CDate(a.data.updatedAt ?? a.data.publishedAt),
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
