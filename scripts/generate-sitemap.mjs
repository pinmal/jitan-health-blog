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
    category:      getFrontmatterValue(yaml, 'category'),
  };
}

// ヘッダーナビと一致する indexable なカテゴリハブ（[category].astro が生成）
const CATEGORY_HUBS = ['comparison', 'review', 'health-column', 'howto', 'mental-health'];

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
        category:    fm.category,
      });
    }
  }

  // 公開日の新しい順
  articles.sort((a, b) =>
    new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
  );

  const today = new Date().toISOString().split('T')[0];

  // 実コンテンツの最新日付（トップ・/articles/ 索引の lastmod に使う。
  // ビルド毎の today を使うとクロールシグナルにノイズが乗るため・S-5）
  const maxLastmod = articles.reduce(
    (mx, a) => (a.lastmod && a.lastmod > mx ? a.lastmod : mx),
    '1970-01-01'
  );
  // カテゴリ別の最新日付（カテゴリハブの lastmod に使う）
  const catLastmod = {};
  for (const a of articles) {
    if (!a.category) continue;
    if (!catLastmod[a.category] || a.lastmod > catLastmod[a.category]) {
      catLastmod[a.category] = a.lastmod;
    }
  }

  const urls = [
    { loc: `${SITE}/`, lastmod: maxLastmod, changefreq: 'weekly',  priority: '1.0' },
    // indexable なカテゴリハブ + 全記事索引（トピッククラスタのハブ・クロール発見経路）
    // ※ character/[name] は意図的 noindex のため収録しない
    { loc: `${SITE}/articles/`, lastmod: maxLastmod, changefreq: 'weekly', priority: '0.7' },
    ...CATEGORY_HUBS.map(c => ({
      loc:        `${SITE}/${c}/`,
      lastmod:    catLastmod[c] ?? maxLastmod,
      changefreq: 'weekly',
      priority:   '0.7',
    })),
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

  // robots.txt が指すメインのサイトマップ
  await writeFile(join(DIST_DIR, 'sitemap.xml'), xml, 'utf-8');

  // 過去に GSC へ登録された旧 @astrojs/sitemap 形式（sitemap-index.xml → sitemap-0.xml）が
  // 残っていても 28URL のクリーンな内容を返すよう、同一内容を sitemap-0.xml にも出力し、
  // sitemap-index.xml を整合させる（旧登録の自己修復・noindex記事の流出防止）。
  await writeFile(join(DIST_DIR, 'sitemap-0.xml'), xml, 'utf-8');
  const indexXml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <sitemap><loc>${SITE}/sitemap-0.xml</loc><lastmod>${today}</lastmod></sitemap>\n` +
    `</sitemapindex>`;
  await writeFile(join(DIST_DIR, 'sitemap-index.xml'), indexXml, 'utf-8');

  console.log(`✅ sitemap.xml / sitemap-0.xml / sitemap-index.xml 生成完了（${urls.length} URL）`);
  urls.forEach(u => console.log(`   ${u.loc}`));
}

main().catch(err => { console.error(err); process.exit(1); });
