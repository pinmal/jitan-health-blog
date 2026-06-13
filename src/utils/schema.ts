// JSON-LD 構造化データ生成（Google E-E-A-T / MedicalWebPage 対応）
//
// 設計（2026-06-13 統合）:
//   記事ページは単一の <script> / 単一の @graph に
//   MedicalWebPage + BreadcrumbList + FAQPage + WebSite + Organization + Person
//   を収め、@id 相互参照でエンティティを1つに解決させる。
//   - 媒体（発行元）= Organization #organization
//   - 著者/監修    = Person #nagatomo
//   - サイト        = WebSite #website
//   これにより「誰が発行する媒体か」「誰が書いたか」が割れずに統合される。

const SITE_URL = 'https://jitan-kenko.blog';
const AUTHOR_ID = `${SITE_URL}/#nagatomo`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

const AUTHOR = {
  '@type': 'Person',
  '@id': AUTHOR_ID,
  'name': '長友恭平',
  'honorificPrefix': 'Dr.',
  'jobTitle': '精神保健指定医 / 産業医',
  'description': '宮崎県よつば加納クリニック院長。心療内科・精神科専門。EBM重視。',
  'alumniOf': {
    '@type': 'CollegeOrUniversity',
    'name': '宮崎大学医学部',
  },
  'worksFor': {
    '@type': 'MedicalOrganization',
    'name': 'よつば加納クリニック',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': '宮崎市清武町加納',
      'addressRegion': '宮崎県',
      'addressCountry': 'JP',
    },
  },
  'knowsAbout': ['心療内科', '精神科', '産業医学', '公衆衛生', '労働衛生', '食と健康'],
};

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': ORG_ID,
  'name': '時短×健康ブログ',
  'url': SITE_URL,
  'logo': {
    '@type': 'ImageObject',
    'url': DEFAULT_IMAGE,
  },
  'founder': { '@id': AUTHOR_ID },
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  'url': SITE_URL,
  'name': '時短×健康ブログ — 状態に合った自己管理としての食事',
  'description': '精神保健指定医・長友恭平が監修。体や心の調子が落ちているときでも食事を安定させるための、宅配食・栄養補助食品・献立の仕組み化について解説します。',
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
      '@type': 'MedicalWebPage',
      '@id': props.url,
      'url': props.url,
      'name': props.title,
      'description': props.description,
      'inLanguage': 'ja',
      'datePublished': published,
      'dateModified': modified,
      'image': props.image || DEFAULT_IMAGE,
      'isPartOf': { '@id': WEBSITE_ID },
      'mainEntityOfPage': props.url,
      'author': { '@id': AUTHOR_ID },
      'reviewedBy': { '@id': AUTHOR_ID },
      'publisher': { '@id': ORG_ID },
      'medicalAudience': 'Patient',
      'lastReviewed': modified,
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

  // サイト・発行元・著者エンティティを同一グラフに収め @id で解決させる
  graph.push(WEBSITE, ORGANIZATION, AUTHOR);

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

export function generateSiteSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [WEBSITE, ORGANIZATION, AUTHOR],
  });
}
