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

/**
 * フロントマターブロックをパース（LF / CRLF / UTF-8 BOM 両対応）
 *
 * ⚠️ 解析失敗時は null を返さず throw する（fail-loud）。
 * 旧実装は BOM 付き mdx で /^---/ が外れて null を返し、その記事を
 * 黙って sitemap から除外していた（2026-08-09 監査で28本の脱落を検出）。
 * 「ビルドは常に成功するが出力が欠けている」状態を二度と作らないため、
 * 解析できないファイルはビルドを止める。
 */
function parseFrontmatter(content, file) {
  // UTF-8 BOM (U+FEFF) を除去してから、Windows CRLF (\r\n) と Unix LF (\n) を統一
  const normalized = content
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
  const m = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!m) {
    throw new Error(
      `フロントマターを解析できません: ${file}\n` +
      `  先頭が "---" で始まる YAML ブロックである必要があります。\n` +
      `  先頭バイト: ${JSON.stringify(content.slice(0, 8))}`
    );
  }
  const yaml = m[1];
  return {
    humanReviewed: getFrontmatterValue(yaml, 'humanReviewed') === 'true',
    noindex:       getFrontmatterValue(yaml, 'noindex') === 'true',
    adsenseHold:   getFrontmatterValue(yaml, 'adsenseHold') === 'true',
    publishedAt:   getFrontmatterValue(yaml, 'publishedAt'),
    updatedAt:     getFrontmatterValue(yaml, 'updatedAt') ?? null,
    category:      getFrontmatterValue(yaml, 'category'),
  };
}

/**
 * sitemap に載せてよいか。
 * ⚠️ src/layouts/ArticleLayout.astro の isNoindex と必ず同じ条件にすること。
 * 片方だけ変えると「noindex ページを sitemap で Google に送る」罠になる（I-159）。
 */
function isIndexable(fm) {
  return fm.humanReviewed && !fm.noindex && !fm.adsenseHold;
}

// ヘッダーナビと一致する indexable なカテゴリハブ（[category].astro が生成）
const CATEGORY_HUBS = ['comparison', 'review', 'health-column', 'howto', 'mental-health'];

async function main() {
  const files = (await readdir(SRC_DIR)).filter(
    f => f.endsWith('.mdx') && !f.startsWith('_')
  );

  const articles = [];
  let parsed = 0;
  let bomFound = 0;
  const excluded = [];
  for (const file of files) {
    const content = await readFile(join(SRC_DIR, file), 'utf-8');
    if (content.charCodeAt(0) === 0xFEFF) bomFound++;
    const fm = parseFrontmatter(content, file);   // 解析失敗は throw（fail-loud）
    parsed++;
    if (isIndexable(fm)) {
      articles.push({
        slug:        file.replace('.mdx', ''),
        publishedAt: fm.publishedAt,
        lastmod:     fm.updatedAt ?? fm.publishedAt,
        category:    fm.category,
      });
    } else {
      const why = !fm.humanReviewed ? 'humanReviewed:false'
                : fm.noindex        ? 'noindex:true'
                :                     'adsenseHold:true';
      excluded.push(`${file}(${why})`);
    }
  }

  // 検証ゲート: 「解析成功数 == 総ファイル数」を必ず表示する。
  // 常に成功する検証は検証にならない（I-168）ため、実数を突き合わせて出力する。
  console.log(`[sitemap] frontmatter 解析: ${parsed} / ${files.length} 件`);
  if (parsed !== files.length) {
    console.error(`[sitemap] ✗ 解析できなかった記事があります（${files.length - parsed}件）`);
    process.exit(1);
  }
  if (bomFound > 0) {
    console.error(
      `[sitemap] ✗ UTF-8 BOM 付きの mdx が ${bomFound} 件あります。\n` +
      `  BOM は Astro では読めても自作パーサ（本スクリプト / gsc_auto_indexing.py）を壊し、\n` +
      `  sitemap 脱落・インデックス申請漏れの原因になります。除去してください。`
    );
    process.exit(1);
  }
  console.log(`[sitemap] BOM 付きファイル: 0 件`);
  console.log(
    `[sitemap] indexable = ${articles.length} 件 / ` +
    `除外 = ${excluded.length} 件${excluded.length ? ` (${excluded.join(', ')})` : ''}`
  );

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

  // URL 総数の突合（トップ + /articles/ + カテゴリハブ + 記事）
  const expectedUrls = 2 + CATEGORY_HUBS.length + articles.length;
  if (urls.length !== expectedUrls) {
    console.error(`[sitemap] ✗ URL数が想定と不一致: ${urls.length} != ${expectedUrls}`);
    process.exit(1);
  }
  const missingLastmod = urls.filter(u => !u.lastmod || u.lastmod === '1970-01-01');
  if (missingLastmod.length > 0) {
    console.error(`[sitemap] ✗ lastmod 欠落 ${missingLastmod.length} 件: ${missingLastmod.map(u => u.loc).join(', ')}`);
    process.exit(1);
  }
  console.log(`[sitemap] lastmod 付与: ${urls.length} / ${urls.length} 件`);

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
  // 残っていてもクリーンな内容を返すよう、同一内容を sitemap-0.xml にも出力し、
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
