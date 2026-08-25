// JSON-LD 構造化データ生成
//
// 設計（2026-08-23 匿名運営対応・I-286修正）:
//   MedicalWebPage + 実在医師Person エンティティを廃止し、
//   BlogPosting + Organization のみで構成する。
//   実在人物の個人情報（氏名・クリニック・大学・住所）は一切含めない。
//   サイトは架空キャラクターによる匿名運営。

const SITE_URL = 'https://jitan-kenko.blog';
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': ORG_ID,
  'name': '時短×健康ブログ',
  'url': SITE_URL,
  'logo': {
    '@type': 'ImageObject',
    'url': DEFAULT_IMAGE,
  },
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  'url': SITE_URL,
  'name': '時短×健康ブログ — 忙しい大人のための合理的食生活',
  'description': '宅食・ミールキット・冷凍弁当・献立の仕組み化について、3人の架空キャラクターが体験談と比較で紹介する食事ブログ。',
  'inLanguage': 'ja',
  'publisher': { '@id': ORG_ID },
};

export interface FaqItem {
  q: string;
  a: string;
}

interface ArticleSchemaInput {
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  updatedAt?: Date;
  category: string;
  categoryLabel: string;
  faqs?: FaqItem[];
  image?: string;
}

export function generateArticleSchema(props: ArticleSchemaInput): string {
  const published = props.publishedAt.toISOString().split('T')[0];
  const modified = (props.updatedAt || props.publishedAt).toISOString().split('T')[0];

  const graph: object[] = [
    {
      '@type': 'BlogPosting',
      '@id': props.url,
      'url': props.url,
      'name': props.title,
      'headline': props.title,
      'description': props.description,
      'inLanguage': 'ja',
      'datePublished': published,
      'dateModified': modified,
      'image': props.image || DEFAULT_IMAGE,
      'isPartOf': { '@id': WEBSITE_ID },
      'mainEntityOfPage': props.url,
      'author': { '@id': ORG_ID },
      'publisher': { '@id': ORG_ID },
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'トップ', 'item': `${SITE_URL}/` },
        { '@type': 'ListItem', 'position': 2, 'name': props.categoryLabel, 'item': `${SITE_URL}/${props.category}/` },
        { '@type': 'ListItem', 'position': 3, 'name': props.title, 'item': props.url },
      ],
    },
  ];

  // FAQ が提供されていれば FAQPage を追加
  if (props.faqs && props.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      'mainEntity': props.faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.a,
        },
      })),
    });
  }

  // サイト・発行元エンティティを同一グラフに収め @id で解決させる
  graph.push(WEBSITE, ORGANIZATION);

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

export function generateSiteSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [WEBSITE, ORGANIZATION],
  });
}
