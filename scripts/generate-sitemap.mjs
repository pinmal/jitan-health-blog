/**
 * generate-sitemap.mjs
 * astro build 完了後に実行し、dist/sitemap.xml を静的ファイルとして生成する。
 * humanReviewed: true の記事のみ収録（noindex 記事を除外）。
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE      = 'https://jitan-kenko.blog';
const SRC_DIR   = join(__dirname, '../src/content/articles');
const DIST_DIR  = join(__dirname, '../dist');

/** YAMLフロントマターから指定キーの値を取得 */
function getFrontmatterValue(yaml, key) {
  const m = yaml.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}

/** フロントマターブロックをパース（LF / CRLF 両対応） */
function parseFrontmatter(content) {
  // Windows CRLF (\r\n) と Unix LF (\n) を統一
  const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const m = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const yaml = m[1];
  return {
    humanReviewed: getFrontmatterValue(yaml, 'humanReviewed') === 'true',
    publishedAt:   getFrontmatterValue(yaml, 'publishedAt'),
    updatedAt:     getFrontmatterValue(yaml, 'updatedAt') ?? null,
  };
}

async function main() {
  const files = (await readdir(SRC_DIR)).filter(
    f => f.endsWith('.mdx') && !f.startsWith('_')
  );

  const articles = [];
  for (const file of files) {
    const content = await readFile(join(SRC_DIR, file), 'utf-8');
    const fm = parseFrontmatter(content);
    if (fm && fm.humanReviewed) {
      articles.push({
        slug:        file.replace('.mdx', ''),
        publishedAt: fm.publishedAt,
        lastmod:     fm.updatedAt ?? fm.publishedAt,
      });
    }
  }

  // 公開日の新しい順
  articles.sort((a, b) =>
    new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
  );

  const today = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: `${SITE}/`, lastmod: today, changefreq: 'weekly',  priority: '1.0' },
    ...articles.map(a => ({
      loc:        `${SITE}/articles/${a.slug}/`,
      lastmod:    a.lastmod,
      changefreq: 'monthly',
      priority:   '0.8',
    })),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u =>
      `  <url>\n` +
      `    <loc>${u.loc}</loc>\n` +
      `    <lastmod>${u.lastmod}</lastmod>\n` +
      `    <changefreq>${u.changefreq}</changefreq>\n` +
      `    <priority>${u.priority}</priority>\n` +
      `  </url>`
    ).join('\n') +
    `\n</urlset>`;

  await writeFile(join(DIST_DIR, 'sitemap.xml'), xml, 'utf-8');
  console.log(`✅ sitemap.xml 生成完了（${urls.length} URL）`);
  urls.forEach(u => console.log(`   ${u.loc}`));
}

main().catch(err => { console.error(err); process.exit(1); });
