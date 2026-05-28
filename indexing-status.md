# Search Console インデックス申請管理 — jitan-kenko.blog
> このファイルの目的: 手動インデックス申請の重複防止・ステータス追跡（セッション横断）
> 申請方法: Google Search Console → URL検査 → 「インデックス登録をリクエスト」
> 1日の上限目安: 3〜5 URL
> ベースURL: https://jitan-kenko.blog/
> 最終更新: 2026-05-28（FAQ全89記事追加・関連記事アルゴリズム刷新・カテゴリ修正 → CF Pagesデプロイ完了。FAQ更新した全55記事は再申請推奨）

---

## ステータス凡例
| 値 | 意味 |
|---|---|
| `申請済み` | GSCでリクエストボタンを押した |
| `索引済み確認` | GSCで「インデックス済み」を確認した |
| `未索引（要リライト）` | 申請後6週間超でも未登録のまま |
| `代替ページ（301）` | 旧URLが301で転送（正常・申請不要） |

---

## 申請済み・確認済み URL一覧

> ※ 追跡開始前（2026-05-18以前）の記録なし。再申請は無害。

| URL | 申請日 | ステータス | 優先度 | メモ |
|---|---|---|---|---|
| https://jitan-kenko.blog/articles/mealkit-3-comparison-kenji-drama/ | 2026-05-20 | 申請済み | Tier1 | SEOタイトル変更後に申請。SC impressions最多(27件)・順位45.9位 |
| https://jitan-kenko.blog/articles/kitoisix-review-psychiatrist/ | 2026-05-20 | 索引済み確認 | Tier1 | GSC確認日: 2026-05-20。SC 8.6位・タイトル変更済み |
| https://jitan-kenko.blog/articles/muscledeli-review-psychiatrist/ | 2026-05-20 | 索引済み確認 | Tier1 | GSC確認日: 2026-05-20。SC 2.5位・タイトル変更済み |
| https://jitan-kenko.blog/articles/noshi-vs-mitsuboshi-vs-muscledeli/ | 2026-05-20 | 索引済み確認 | Tier1 | GSC確認日: 2026-05-20。比較記事・タイトル変更済み |
| https://jitan-kenko.blog/articles/yoshikei-family-kenji-drama/ | 2026-05-20 | 索引済み確認 | Tier1 | GSC確認日: 2026-05-20。タイトル変更済み |

---

## 申請済み URL一覧（Tier2）— 2026-05-25 申請

| URL | 申請日 | ステータス | 優先度 | メモ |
|---|---|---|---|---|
| https://jitan-kenko.blog/articles/base-food-drama/ | 2026-05-25 | 申請済み | Tier2 | |
| https://jitan-kenko.blog/articles/fishlle-kenji-drama/ | 2026-05-25 | 申請済み | Tier2 | |
| https://jitan-kenko.blog/articles/chef-muten-tsukurioki-drama/ | 2026-05-25 | 申請済み | Tier2 | |
| https://jitan-kenko.blog/articles/green-spoon-drama/ | 2026-05-25 | 申請済み | Tier2 | |
| https://jitan-kenko.blog/articles/nashi-review-drama/ | 2026-05-25 | 申請済み | Tier2 | |

## 申請済み URL一覧（Tier1-2）— 2026-05-26 申請

| URL | 申請日 | ステータス | 優先度 | メモ |
|---|---|---|---|---|
| https://jitan-kenko.blog/articles/pms-food-yuka-drama/ | 2026-05-26 | 申請済み | Tier1 | PMS×食事 情報需要高・新規カテゴリ |
| https://jitan-kenko.blog/articles/iron-deficiency-women-psychiatrist/ | 2026-05-26 | 申請済み | Tier1 | 鉄分不足×疲れ 女性向け・競合薄め |
| https://jitan-kenko.blog/articles/sleep-supplement-comparison-psychiatrist/ | 2026-05-26 | 申請済み | Tier1 | 睡眠サプリ比較 商業キーワード・sowaka連携 |
| https://jitan-kenko.blog/articles/low-carb-delivery-comparison-psychiatrist/ | 2026-05-26 | 申請済み | Tier1 | 低糖質宅食比較 商業キーワード・複数アフィリ |
| https://jitan-kenko.blog/articles/protein-bar-comparison-yuka-drama/ | 2026-05-26 | 申請済み | Tier2 | プロテインバー比較 女性向け・マイプロテイン連携 |
| https://jitan-kenko.blog/articles/nashi-tired-alternatives-yuka-drama/ | 2026-05-26 | 申請済み | Tier2 | ナッシュ飽きた 指名検索需要あり |
| https://jitan-kenko.blog/articles/night-overeating-psychiatrist/ | 2026-05-26 | 申請済み | Tier2 | 夜食べすぎ 既存ストレス食い記事と補完 |

## 申請済み URL一覧（Tier1）— 2026-05-27 申請

| URL | 申請日 | ステータス | 優先度 | メモ |
|---|---|---|---|---|
| https://jitan-kenko.blog/articles/fitfoodhome-review-psychiatrist/ | 2026-05-27 | 索引済み確認 | Tier1 | 申請前にすでにインデックス済みだった |
| https://jitan-kenko.blog/articles/base-food-review-psychiatrist/ | 2026-05-27 | 申請済み | Tier1 | FAQ追加済み・updatedAt: 2026-05-26 |
| https://jitan-kenko.blog/articles/delipicks-review-psychiatrist/ | 2026-05-27 | 申請済み | Tier1 | FAQ追加済み・updatedAt: 2026-05-26 |
| https://jitan-kenko.blog/articles/kenkonamakyubin-review-psychiatrist/ | 2026-05-27 | 申請済み | Tier1 | FAQ追加済み・updatedAt: 2026-05-26 |
| https://jitan-kenko.blog/articles/soelu-review-psychiatrist/ | — | 未申請（割り当て制限） | Tier1 | 2026-05-27に割り当て上限。翌日以降に申請 |

## 未申請の優先候補（残68本・1日3〜5本ずつ申請）

### Tier1（12本 — まずここから。商業価値・検索需要高）
※ 全記事FAQ追加済み・updatedAt: 2026-05-28 設定済み（2026-05-28デプロイ完了）

```
https://jitan-kenko.blog/articles/soelu-review-psychiatrist/
https://jitan-kenko.blog/articles/shokuzai-takuhai-3-comparison-psychiatrist/
https://jitan-kenko.blog/articles/fitness-3-comparison-yuka-drama/
https://jitan-kenko.blog/articles/yoshikei-mealkit-psychiatrist/
https://jitan-kenko.blog/articles/mental-health-meal-delivery-psychiatrist/
https://jitan-kenko.blog/articles/gut-brain-axis-psychiatrist/
https://jitan-kenko.blog/articles/protein-fatigue-psychiatrist/
https://jitan-kenko.blog/articles/exercise-mental-health-psychiatrist/
https://jitan-kenko.blog/articles/stress-eating-psychiatrist/
https://jitan-kenko.blog/articles/sugar-craving-psychiatrist/
https://jitan-kenko.blog/articles/sleep-quality-diet-psychiatrist/
https://jitan-kenko.blog/articles/sleep-and-nutrition-psychiatrist/
https://jitan-kenko.blog/articles/lunch-management-solo-living-psychiatrist/
```

### Tier2（20本 — Tier1 完了後）
※ FAQ追加済み（一部）

```
https://jitan-kenko.blog/articles/muscledeli-yuka-second-drama/
https://jitan-kenko.blog/articles/green-spoon-yuka-drama/
https://jitan-kenko.blog/articles/yoshikei-simplemeal-yuka-drama/
https://jitan-kenko.blog/articles/radishboya-yuka-drama/
https://jitan-kenko.blog/articles/radishboya-kenji-drama/
https://jitan-kenko.blog/articles/fishlle-unused-fish-drama/
https://jitan-kenko.blog/articles/mogmo-drama/
https://jitan-kenko.blog/articles/mogmo-kenji-kids-drama/
https://jitan-kenko.blog/articles/ouchi-coop-kenji-drama/
https://jitan-kenko.blog/articles/ouchi-coop-yuka-drama/
https://jitan-kenko.blog/articles/parsystem-family-kenji-drama/
https://jitan-kenko.blog/articles/yasai-wo-motto-kenji-drama/
https://jitan-kenko.blog/articles/shokunbu-kenji-drama/
https://jitan-kenko.blog/articles/kenji-weekend-tsukurioki-drama/
https://jitan-kenko.blog/articles/morning-routine-coffee-protein-kenji-drama/
https://jitan-kenko.blog/articles/wanmile-kenkodinner-drama/
https://jitan-kenko.blog/articles/wanmile-yuka-drama/
https://jitan-kenko.blog/articles/kikubari-gozen-review-drama/
https://jitan-kenko.blog/articles/happy-tempe-gut-health-yuka-drama/
https://jitan-kenko.blog/articles/myprotein-drama/
```

### Tier3（35本 — 最後でよい）

```
https://jitan-kenko.blog/articles/allulose-sugar-control-yuka-drama/
https://jitan-kenko.blog/articles/anshinsoudan-senior-meal-psychiatrist/
https://jitan-kenko.blog/articles/arumeid-housekeeping-drama/
https://jitan-kenko.blog/articles/cathand-arumeid-housekeeping-yuka-drama/
https://jitan-kenko.blog/articles/coffee-sleep-concentration-drama/
https://jitan-kenko.blog/articles/coop-shizenha-yuka-drama/
https://jitan-kenko.blog/articles/deat-workout-personal-training-drama/
https://jitan-kenko.blog/articles/dr-tsurukame-drama/
https://jitan-kenko.blog/articles/dr-tsurukame-parent-care-yuka-drama/
https://jitan-kenko.blog/articles/element-gym-drama/
https://jitan-kenko.blog/articles/emoor-sleep-yuka-drama/
https://jitan-kenko.blog/articles/fit24-gym-yuka-drama/
https://jitan-kenko.blog/articles/fitdish-yuka-drama/
https://jitan-kenko.blog/articles/foodable-suihanki-yuka-drama/
https://jitan-kenko.blog/articles/fujizakura-water-naoko-drama/
https://jitan-kenko.blog/articles/kurasu-coffee-drama/
https://jitan-kenko.blog/articles/naoko-bluebottle-coffee-drama/
https://jitan-kenko.blog/articles/naoko-business-trip-meal-drama/
https://jitan-kenko.blog/articles/narwal-cleaning-naoko-drama/
https://jitan-kenko.blog/articles/onigo-drama/
https://jitan-kenko.blog/articles/panasonic-bistro-toaster-kenji-drama/
https://jitan-kenko.blog/articles/panasonic-coffee-maker-yuka-drama/
https://jitan-kenko.blog/articles/panasonic-suihanki-drama/
https://jitan-kenko.blog/articles/poke-marche-farm-direct-yuka-drama/
https://jitan-kenko.blog/articles/protein-lyft-hongo-kenji-drama/
https://jitan-kenko.blog/articles/sakanoto-organic-vegetables-drama/
https://jitan-kenko.blog/articles/solo-living-food-cost-drama/
https://jitan-kenko.blog/articles/sowaka-naoko-drama/
https://jitan-kenko.blog/articles/tabechoku-farm-direct-drama/
https://jitan-kenko.blog/articles/taihe-yuka-drama/
https://jitan-kenko.blog/articles/teryori-stock-drama/
https://jitan-kenko.blog/articles/tsukurio-drama/
https://jitan-kenko.blog/articles/weekday-dinner-drama/
https://jitan-kenko.blog/articles/weekday-dinner-systemization/
https://jitan-kenko.blog/articles/yourmystar-aircon-naoko-drama/
```

---

## 更新ルール（Claudeへの指示）
- GSCの話題が出たら**このファイルを最初にRead**する
- 手動申請URLを案内したら**即座にこのファイルを更新**する
- 申請後6週間経過して未索引のURLはステータスを「未索引（要リライト）」に変更
