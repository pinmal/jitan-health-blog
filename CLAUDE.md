# CLAUDE.md — jitan-kenko.blog（時短×健康ブログ）

> このファイルは新規セッション起動時に自動読み込みされる。
> 親憲法: `C:/Users/yotsu/Desktop/claudecode1/CLAUDE.md` も自動継承される。

## このプロジェクトで作業する前の必須読み込み

@MARKETING.md
@C:/Users/yotsu/Desktop/claudecode1/Knowledge/infra/sales-marketing-cheatsheet.md

## プロジェクト概要
- 形式: 専門家（医師）× 架空キャラ（ユウカ・ナオコ・ケンジ）の掛け合いドラマ（D-056）
- 収益: A8（高単価優先）/ Amazon / 楽天 / もしも
- スタック: Astro 4.x + Cloudflare Pages
- ジャンル: 宅食・時短・健康（YMYL寄り・断定NG）

## 必須参照（マーケ判断時）
1. `MARKETING.md` — このサイト固有ルール（医師信用毀損ゼロ）
2. `Knowledge/infra/sales-marketing-cheatsheet.md`
3. `Knowledge/infra/jitan-health-blog-a8-program-list.md`

## 必須参照（実装判断時）
- `Knowledge/infra/affiliate-master-cross-site.md` (I-105)
- `Knowledge/infra/astro-affiliate-health-blog-pattern.md` (I-073)
- `CPO/jitan-health-blog/character-and-format-design.md` (D-056)
- `CPO/jitan-health-blog/writing-style-guide.md` (D-055)

---

## ⚠️ 記事作成時の必須チェック（2026-05-22 監査から確立）

### 【絶対ルール1】未来日付記事はpublishedAtを今日の日付にする
- 記事執筆時は `publishedAt` を **必ず当日の日付（YYYY-MM-DD）** に設定する
- 未来日付を入れてはならない（Astro SSGはpublishedAtに関わらず全記事を公開ビルドするため）
- 「後で公開したい」場合は `humanReviewed: false` にしてnoindexにする

```yaml
# ✅ 正しい（当日公開）
publishedAt: 2026-05-22
humanReviewed: true

# ✅ 正しい（下書き・noindex）
publishedAt: 2026-05-22
humanReviewed: false

# ❌ 禁止（未来日付は意味をなさない）
publishedAt: 2026-09-10
humanReviewed: true
```

### 【絶対ルール2】AffiliateCardにshopCommentを必ず入れる
- 全AffiliateCardに `shopComment` プロップを入れること（MARKETING.mdルール・CVR直結）
- 内容: 長友先生が「診療・産業医活動で観察した」視点の15〜40文字コメント
- 「私が使った」とは書かない。「〜な患者さんに多い」「〜という傾向がある」文体

```astro
{/* ✅ 正しい例 */}
<AffiliateCard
  brand="GREEN SPOON"
  catchcopy="..."
  shopComment="「固形物がつらい時期」に液体で栄養を取れる点は、外来でも重要だと感じます"
  ...
/>

{/* ❌ 禁止（shopCommentなし） */}
<AffiliateCard
  brand="GREEN SPOON"
  catchcopy="..."
  ...
/>
```

### 【絶対ルール3】薬機法断定表現禁止ワード
以下の断定表現は使用禁止。必ずヘッジ表現に変換すること。

| ❌ 禁止 | ✅ 置換後 |
|---|---|
| 〜効果があります | 〜効果が期待できます / 〜効果が報告されています |
| 〜に効きます | 〜に役立ちます / 〜に有用です |
| 総合的に | 全体として |
| 必ず〜（効能文脈） | 〜することが多い / 〜傾向があります |
| 確実に | 場合によっては / 傾向として |

### 【絶対ルール4】ファイル名ルール
- ファイル名はすべて小文字 kebab-case
- アンダースコア始まり（`_xxx.mdx`）は Astro でルーティング除外になるため使用禁止
- 公開予定の記事に `_` を付けてはならない

### 【絶対ルール5】記事末尾の開示文（掛け合い形式記事）
character フィールドがある記事は必ず以下の開示文を記事末尾に入れる（冒頭のみはNG）:

```
> ※ この記事の「〇〇（キャラ名）」は架空のキャラクターです。実在の個人ではありません。
> ※ 記事にはアフィリエイトリンクが含まれます。掲載製品は筆者（長友恭平）が内容を確認したもののみ掲載しています。
```

---

## デプロイ前 自動ガード (Phase 5・2026-05-23)

`git push` 時に `.git/hooks/pre-push` が自動起動し、
書籍 × Web 記事の齟齬 (cross_site_check.py --scan-all) を実行する。
宮本ユウカシリーズ(book06/13/74)の `forbidden_in_web` フレーズが本文に出現
していると CRITICAL となり push がブロックされる。

### 手動チェック
```cmd
cd C:\Users\yotsu\Desktop\claudecode1\CPO\jitan-health-blog
npm run check:books
```

### 緊急時バイパス（原則禁止）
```cmd
git push --no-verify
```

### 関連
- `CSO/kindle-publishing/WRITING-CONSTITUTION.md` 「Web記事 デプロイ前 書籍↔Web齟齬チェック必須」セクション

---

## 定期監査（月1回推奨）

以下のチェックを毎月1回実施する:
1. `publishedAt` が当日以降の記事がないか確認
2. shopCommentなしAffiliateCardの検出
3. 薬機法断定表現の検出（`validate-yakkiho.js` 実行）
4. A8/もしもリンクの断絶確認
