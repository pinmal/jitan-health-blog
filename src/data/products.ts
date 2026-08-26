// 商品データベース（TypeScript版）

export interface Product {
  id: string;
  brand: string;
  category: 'delivery-meal' | 'meal-kit' | 'frozen' | 'protein';
  pricePerMeal: number;
  calories: number;
  protein: number;
  fat: number;
  carb: number;
  cookTime: number;
  deliveryDays: number;
  rating: number;
  targetAudience: string;
  features: string[];
  officialUrl: string;
  affiliate: {
    platform: 'amazon' | 'rakuten';
    url: string;
    trialPrice: string | null;
  };
}

export const products: Product[] = [
  // === 宅配弁当 (収益化優先度1位 CPA: 2,000〜5,000円) ===
  {
    id: 'nosh',
    brand: 'ナッシュ (nosh)',
    category: 'delivery-meal',
    pricePerMeal: 499,
    calories: 499,
    protein: 28.4,
    fat: 28.6,
    carb: 24.2,
    cookTime: 5,
    deliveryDays: 3,
    rating: 4.5,
    targetAudience: '糖質制限中・ひとり暮らし',
    features: ['糖質30g以下', '塩分2.5g以下', '60品以上のメニュー'],
    officialUrl: 'https://nosh.jp/',
    affiliate: {
      platform: 'amazon',
      url: '',
      trialPrice: '初回300円OFF',
    },
  },
  {
    id: 'mitsuboshi',
    brand: '三ツ星ファーム',
    category: 'delivery-meal',
    pricePerMeal: 648,
    calories: 450,
    protein: 30.0,
    fat: 24.0,
    carb: 20.0,
    cookTime: 5,
    deliveryDays: 3,
    rating: 4.3,
    targetAudience: 'ダイエット中・健康意識が高い',
    features: ['管理栄養士監修', '低糖質・高タンパク', '定期便あり'],
    officialUrl: 'https://mitsuboshi-farm.com/',
    affiliate: {
      platform: 'amazon',
      url: '',
      trialPrice: null,
    },
  },
  {
    id: 'muscledeli',
    brand: 'マッスルデリ',
    category: 'delivery-meal',
    pricePerMeal: 800,
    calories: 400,
    protein: 40.0,
    fat: 15.0,
    carb: 25.0,
    cookTime: 3,
    deliveryDays: 3,
    rating: 4.4,
    targetAudience: '筋トレ・アスリート・体型改善',
    features: ['高タンパク質特化', '管理栄養士×シェフ監修', '体型別カスタム'],
    officialUrl: 'https://muscle-deli.com/',
    affiliate: {
      platform: 'amazon',
      url: 'https://www.amazon.co.jp/s?k=マッスルデリ+冷凍弁当&tag=jitankenko-22',
      trialPrice: null,
    },
  },
  // === ミールキット (収益化優先度2位) ===
  {
    id: 'oisix',
    brand: 'Oisix (ミールキット)',
    category: 'meal-kit',
    pricePerMeal: 750,
    calories: 520,
    protein: 22.0,
    fat: 18.0,
    carb: 65.0,
    cookTime: 20,
    deliveryDays: 7,
    rating: 4.2,
    targetAudience: '家族・有機食材重視・週1まとめ派',
    features: ['食材カット済み', '有機・特別栽培', '週1ボックス'],
    officialUrl: 'https://www.oisix.com/',
    affiliate: {
      platform: 'amazon',
      url: 'https://www.amazon.co.jp/s?k=オイシックス+ミールキット&tag=jitankenko-22',
      trialPrice: 'お試し50%OFF',
    },
  },
  {
    id: 'yoshikei',
    brand: 'ヨシケイ',
    category: 'meal-kit',
    pricePerMeal: 398,
    calories: 550,
    protein: 18.0,
    fat: 20.0,
    carb: 70.0,
    cookTime: 25,
    deliveryDays: 1,
    rating: 4.0,
    targetAudience: 'ファミリー・コスパ重視・毎日配達希望',
    features: ['毎日配達', '食材廃棄ゼロ', '初回半額キャンペーン'],
    officialUrl: 'https://yoshikei-dvlp.co.jp/',
    affiliate: {
      platform: 'amazon',
      url: 'https://www.amazon.co.jp/s?k=ヨシケイ+ミールキット&tag=jitankenko-22',
      trialPrice: '初回半額',
    },
  },
  // === プロテイン (収益化優先度3位) ===
  {
    id: 'myprotein',
    brand: 'Myprotein Impact ホエイ',
    category: 'protein',
    pricePerMeal: 85,
    calories: 103,
    protein: 21.1,
    fat: 1.9,
    carb: 1.0,
    cookTime: 1,
    deliveryDays: 5,
    rating: 4.3,
    targetAudience: '筋トレ・タンパク質補給・コスパ重視',
    features: ['50種類以上フレーバー', '1kgあたり最安水準'],
    officialUrl: 'https://www.myprotein.com/jp/',
    affiliate: {
      platform: 'amazon',
      url: 'https://www.amazon.co.jp/s?k=マイプロテイン+ホエイプロテイン&tag=jitankenko-22',
      trialPrice: '初回コードでOFF',
    },
  },
];

export const deliveryMeals = products.filter(p => p.category === 'delivery-meal');
export const mealKits = products.filter(p => p.category === 'meal-kit');
export const proteinProducts = products.filter(p => p.category === 'protein');
