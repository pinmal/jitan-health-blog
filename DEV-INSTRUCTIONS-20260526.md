# DEV-INSTRUCTIONS — jitan-kenko.blog（2026-05-26）
> 専用セッション起動時にこのファイルを最初に Read してから作業を開始すること。
> 必須参照: `CLAUDE.md` → `MARKETING.md` → `Knowledge/infra/sales-marketing-cheatsheet.md`

---

## このセッションの目標

jitan-kenko.blog は記事89本・質は高いが **アクセスがほぼゼロ**。
根本原因は「FAQリッチスニペット未取得」と「GSC未申請 72本」。
この2点を優先的に解消し、検索クリック率を引き上げる。

---

## 現状サマリー（2026-05-26時点）

| 項目 | 現状 | 目標 |
|---|---|---|
| 総記事数 | 89本（humanReviewed: true） | — |
| GSC申請済み | 17本 | 89本すべて申請済み |
| FAQリッチスニペット対応 | **4本のみ**（85本が未対応） | 上位30本に追加 |
| SC最高順位 | muscledeli 2.5位 / kitoisix 8.6位 | — |
| SC インプレッション最多 | mealkit-3-comparison 27件 | — |
| A8 主力 | KitOisix/マッスルデリ/ヨシケイ | — |

### FAQ構造化データの仕組み（理解してから作業すること）
- 記事フロントマターに `faqs:` を追加すると `generateArticleSchema()` が **自動で FAQPage JSON-LD** を出力する
- コンポーネント追加・レイアウト変更は不要。フロントマター編集のみ
- 4記事（muscledeli / fitfoodhome / mealkit-3-comparison / noshi-vs-mitsuboshi）は既に設定済み

---

## タスク一覧（優先順）

### ✅ Task A [CRITICAL] — 上位30記事に `faqs:` を追加する

**目的**: FAQリッチスニペットで検索CTRを2〜3倍にする

**FAQ記述ルール**（絶対守ること）:
- Q: 読者が実際に検索しそうな疑問（30字以内）
- A: 医師の診療観察視点 または キャラの実体験。80〜130字が最適
- 「効果があります」→「効果が期待できます」（薬機法断定禁止）
- 「必ず〜」→「〜傾向があります」に変換
- A8断定商品の効能は書かない（「詳細は公式サイトでご確認ください」と逃がす）
- 1記事あたり4〜5問が最適（多すぎると採用されにくい）

**Priority 1（比較・医師記事 — 検索意図が強い）**:

```
src/content/articles/shokuzai-takuhai-3-comparison-psychiatrist.mdx
src/content/articles/fitness-3-comparison-yuka-drama.mdx
src/content/articles/low-carb-delivery-comparison-psychiatrist.mdx   ← 申請済み
src/content/articles/sleep-supplement-comparison-psychiatrist.mdx     ← 申請済み
src/content/articles/base-food-review-psychiatrist.mdx
src/content/articles/delipicks-review-psychiatrist.mdx
src/content/articles/kenkonamakyubin-review-psychiatrist.mdx
src/content/articles/soelu-review-psychiatrist.mdx
src/content/articles/yoshikei-mealkit-psychiatrist.mdx
src/content/articles/mental-health-meal-delivery-psychiatrist.mdx
```

**Priority 2（メンタル健康コラム）**:

```
src/content/articles/gut-brain-axis-psychiatrist.mdx
src/content/articles/protein-fatigue-psychiatrist.mdx
src/content/articles/exercise-mental-health-psychiatrist.mdx
src/content/articles/stress-eating-psychiatrist.mdx
src/content/articles/sugar-craving-psychiatrist.mdx
src/content/articles/sleep-quality-diet-psychiatrist.mdx
src/content/articles/sleep-and-nutrition-psychiatrist.mdx
src/content/articles/lunch-management-solo-living-psychiatrist.mdx
src/content/articles/iron-deficiency-women-psychiatrist.mdx           ← 申請済み
src/content/articles/night-overeating-psychiatrist.mdx                ← 申請済み
```

**Priority 3（ドラマ記事のうちアフィリ価値が高いもの）**:

```
src/content/articles/muscledeli-yuka-second-drama.mdx
src/content/articles/green-spoon-yuka-drama.mdx
src/content/articles/yoshikei-simplemeal-yuka-drama.mdx
src/content/articles/radishboya-yuka-drama.mdx
src/content/articles/mogmo-drama.mdx
src/content/articles/kikubari-gozen-review-drama.mdx
src/content/articles/protein-bar-comparison-yuka-drama.mdx            ← 申請済み
src/content/articles/pms-food-yuka-drama.mdx                          ← 申請済み
src/content/articles/nashi-tired-alternatives-yuka-drama.mdx          ← 申請済み
src/content/articles/wanmile-kenkodinner-drama.mdx
```

**FAQ記述フォーマット（フロントマターにそのまま貼り付け）**:

```yaml
faqs:
  - q: "〇〇は一人暮らしでも続けられますか？"
    a: "続けられます。〇〇は電子レンジ調理で完結するため、調理時間がとれない一人暮らしの方にも対応できます。まず少量のプランから試して、自分のリズムに合うか確認してから定期便を検討するのが現実的です。"
  - q: "〇〇の価格は他と比べてどうですか？"
    a: "他の宅食と比べると価格帯は高めです。ただし週2〜3回だけ使う「バックアップ食」として組み込む方法が現実的で、毎食使う必要はありません。詳しい価格は公式サイトでご確認ください。"
```

**既存FAQのある記事（参照用・変更不要）**:
- `muscledeli-review-psychiatrist.mdx` — 5問、医師視点の丁寧なFAQ（手本として参照）
- `fitfoodhome-review-psychiatrist.mdx` — 4問
- `mealkit-3-comparison-kenji-drama.mdx` — FAQ付き
- `noshi-vs-mitsuboshi-vs-muscledeli.mdx` — FAQ付き

---

### ✅ Task B [CRITICAL] — GSC 手動インデックス申請（残り72本）

**申請ルール**: 1日3〜5本上限（Googleの非公式制限）。複数セッションに分ける。
**申請後に必ず `indexing-status.md` を更新すること**。

申請手順: Google Search Console → URL検査 → URL貼り付け → 「インデックス登録をリクエスト」

**申請済み（17本・再申請不要）**:
```
✅ mealkit-3-comparison-kenji-drama / kitoisix-review-psychiatrist
✅ muscledeli-review-psychiatrist / noshi-vs-mitsuboshi-vs-muscledeli
✅ yoshikei-family-kenji-drama / base-food-drama / fishlle-kenji-drama
✅ chef-muten-tsukurioki-drama / green-spoon-drama / nashi-review-drama
✅ pms-food-yuka-drama / iron-deficiency-women-psychiatrist
✅ sleep-supplement-comparison-psychiatrist / low-carb-delivery-comparison-psychiatrist
✅ protein-bar-comparison-yuka-drama / nashi-tired-alternatives-yuka-drama
✅ night-overeating-psychiatrist
```

**未申請 Tier1（まずここから — 商業価値・検索需要が高い）**:
```
https://jitan-kenko.blog/articles/base-food-review-psychiatrist/
https://jitan-kenko.blog/articles/fitfoodhome-review-psychiatrist/
https://jitan-kenko.blog/articles/delipicks-review-psychiatrist/
https://jitan-kenko.blog/articles/kenkonamakyubin-review-psychiatrist/
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

**未申請 Tier2（次の優先）**:
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

**未申請 Tier3（最後でよい — ライフスタイル/非宅食系）**:
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

### ✅ Task C [WARNING] — `updatedAt` フィールドを追加して新鮮さをアピール

**目的**: `dateModified` が `publishedAt` と同一だと「更新されていない古いコンテンツ」とGoogleに判断されやすい。
`updatedAt: 2026-05-26` を加えることで、本番日=今日として扱われる。

```bash
# faqs追加と同時に入れる（作業効率化）
# フロントマターに追加:
updatedAt: 2026-05-26
```

Priority 1・2のFAQ追加対象記事に合わせてセットで追加する。

---

### ✅ Task D [SUGGEST] — 新規記事追加（高需要キーワード・まだない）

現在の89記事にない、検索需要が高そうなキーワード（優先度順）:

| キーワード | 想定タイトル | キャラ |
|---|---|---|
| ナッシュ 口コミ 精神科医 | ナッシュ 口コミ【精神科医が評価】正直レビュー | psychiatrist |
| BASE FOOD 続かない | ベースフード 飽きた・続かないときの対処法 | yuka |
| 忙しい 食事 簡単 | 忙しい人の食事管理 精神科医が選ぶ仕組み化 | psychiatrist |
| ヨシケイ 一人暮らし | ヨシケイ 一人暮らし向けプラン正直評価 | yuka |

※ Task A・B が完了してから着手すること。

---

## デプロイ手順

```bash
# jitan-health-blogはGitHub連携でgit push → CF Pages自動デプロイ
cd C:\Users\yotsu\Desktop\claudecode1\CPO\jitan-health-blog
git add -p   # または git add src/content/articles/xxx.mdx
git commit -m "feat: add faqs to [article-name] for FAQ rich snippets"
git push origin main
# → Cloudflare Pages が自動でビルド・デプロイ
```

**デプロイ後は F12 Console でエラーがないか確認を案内すること（CLAUDE.md ルール）**

---

## 作業後の必須更新

1. `indexing-status.md` — 申請したURLをその場で追記
2. `Logs/index.md` — 作業ログを1行記録
3. `HANDOVER.md` — FAQ追加数・GSC申請数の更新

---

## キャラクター早見表（FAQ記述用）

| キャラ | プロフィール | 口調の特徴 |
|---|---|---|
| ユウカ（yuka） | 34歳IT系PM・一人暮らし・料理苦手 | 「〜なんですよ」「ぶっちゃけ」「めんどくさい」系 |
| ナオコ（naoko） | 38歳ITコンサル・コーヒー好き・几帳面 | 「費用対効果が」「〜で判断しました」分析系 |
| ケンジ（kenji） | 41歳共働き4人家族・お金に慎重 | 「で、コスパは？」「子どもが食べるか」実利系 |
| 先生（doctor） | 精神保健指定医・長友恭平 | 「診療で観察」「〜な傾向があります」断定しない |

**FAQ の A（回答）で先生が話者の場合**: 「〜した患者さんに多い」「外来で観察すると〜傾向があります」という文体で。「私が使った」とは書かない（MARKETING.md 絶対ルール）。

---

## 薬機法チェック（毎回確認）

```bash
cd C:\Users\yotsu\Desktop\claudecode1\CPO\jitan-health-blog
node validate-yakkiho.js
```

CRITICAL が出たらデプロイ前に修正すること。

---

## 参照ファイル一覧

| ファイル | 役割 |
|---|---|
| `CLAUDE.md` | プロジェクト固有ルール（絶対ルール1〜5） |
| `MARKETING.md` | CVR・shopComment・医師信用毀損ゼロ |
| `character-and-format-design.md` (D-056) | キャラ掛け合い形式の設計原則 |
| `writing-style-guide.md` (D-055) | 人間らしい文章術 |
| `indexing-status.md` | GSC申請追跡（更新必須） |
| `Knowledge/infra/jitan-health-blog-a8-program-list.md` | A8 a8matコード一覧 |
| `Knowledge/infra/affiliate-master-cross-site.md` (I-105) | 全サイト横断プログラムマスター |
