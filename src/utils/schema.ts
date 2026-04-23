// JSON-LD 構造化データ生成（Google E-E-A-T / MedicalWebPage 対応）

const SITE_URL = 'https://jitan-kenko.pages.dev'; // 独自ドメイン取得後に変更
const AUTHOR_ID = `${SITE_URL}/#nagatomo`;

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

interface ArticleSchemaInput {
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  updatedAt?: Date;
  category: string;
  categoryLabel: string;
}

export function generateArticleSchema(props: ArticleSchemaInput): string {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': props.url,
        'url': props.url,
        'name': props.title,
        'description': props.description,
        'inLanguage': 'ja',
        'datePublished': props.publishedAt.toISOString().split('T')[0],
        'dateModified': (props.updatedAt || props.publishedAt).toISOString().split('T')[0],
        'author': AUTHOR,
        'reviewedBy': { '@type': 'Person', '@id': AUTHOR_ID, 'name': '長友恭平' },
        'publisher': {
          '@type': 'Organization',
          'name': '時短×健康ブログ',
          'url': SITE_URL,
        },
        'medicalAudience': 'Patient',
        'lastReviewed': (props.updatedAt || props.publishedAt).toISOString().split('T')[0],
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'トップ', 'item': `${SITE_URL}/` },
          { '@type': 'ListItem', 'position': 2, 'name': props.categoryLabel, 'item': `${SITE_URL}/${props.category}/` },
        ],
      },
    ],
  };
  return JSON.stringify(schema);
}

export function generateSiteSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        'url': SITE_URL,
        'name': '時短×健康ブログ — 状態に合った自己管理としての食事',
        'description': '精神保健指定医・長友恭平が監修。体や心の調子が落ちているときでも食事を安定させるための、宅配食・栄養補助食品・献立の仕組み化について解説します。',
        'inLanguage': 'ja',
        'publisher': { '@id': AUTHOR_ID },
      },
      AUTHOR,
    ],
  };
  return JSON.stringify(schema);
}
