# HANDOVER.md — jitan-kenko.blog（時短×健康ブログ）
> 最終更新: 2026-05-25
> 旧版: 2026-05-24

---

## ⚡ 直近セッション（2026-05-25）で完了した作業

### ✅ 1. 全変更のコミット＆デプロイ

前セッション（2026-05-24）で保留されていた修正を全てコミット・プッシュ完了。

- `muscledeli-review-psychiatrist.mdx` — マッスルデリ価格修正（888〜1,100円）
- `nashi-review-drama.mdx` — 同上
- `noshi-vs-mitsuboshi-vs-muscledeli.mdx` — 同上
- 81記事全件の `references_books` フィールド追加（auto_assign_references_books.py）
- `src/content/config.ts` — `references_books` スキーマ追加
- `CLAUDE.md` — Phase 5 デプロイ前自動ガードの説明追加
- `yoshikei-mealkit-psychiatrist.mdx` — ミールキットコース種別補足

pre-push hook（cross_site_check.py --scan-all）: 全件 **[OK]**

### ✅ 2. book79 出版前クロスチェック（2026-05-25発売）

```
consistency_check.py book79  → 全件クリア
cross_site_check.py --book book79 → [OK]
```

### ✅ 3. book17 / book19 クロスチェック（近刊）

```
cross_site_check.py --book book17 → [OK]
cross_site_check.py --book book19 → [OK]
```

### ✅ 4. yoshikei-mealkit-psychiatrist.mdx コース種別補足

記事冒頭に以下の注釈を追加・コミット・プッシュ済み：
```
> ※ 本記事はヨシケイの**ミールキットコース**についての記録です。「夕食ネット」など他のコースは扱っていません。
```

### ✅ 5. Search Console インデックス申請URL案内

以下5件をユーザーへ案内済み。ユーザーが手動でGSCに申請する。

```
https://jitan-kenko.blog/articles/base-food-drama/
https://jitan-kenko.blog/articles/fishlle-kenji-drama/
https://jitan-kenko.blog/articles/chef-muten-tsukurioki-drama/
https://jitan-kenko.blog/articles/green-spoon-drama/
https://jitan-kenko.blog/articles/nashi-review-drama/
```

申請後は `indexing-status.md` の該当行を `申請済み` に変更すること。

---

## 🔴 次セッション最優先タスク

### 1. Search Console インデックス申請ステータス更新（ユーザー申請後）

上記5件の申請完了後、`indexing-status.md` を更新する。

申請日と `申請済み` ステータスを記入:
```
| https://jitan-kenko.blog/articles/base-food-drama/ | 2026-05-25 | 申請済み | Tier2 | |
```

### 2. book20 発売後（5/31）の整合性確認

book20（宅食サービス7社比較）が5/31発売予定。
既に価格整合性修正は完了しているが、発売後に問題が出た場合は確認。

### 3. 追加インデックス申請（Tier2候補の残り）

現状の未申請記事のうち、次のTier2候補を確認してGSCに追加申請。

---

## サイト現状サマリー

| 項目 | 値 |
|---|---|
| 本番URL | https://jitan-kenko.blog/ |
| リポジトリ | https://github.com/pinmal/jitan-health-blog |
| ローカルパス | `C:\Users\yotsu\Desktop\claudecode1\CPO\jitan-health-blog` |
| 技術スタック | Astro 4.x SSG + Cloudflare Pages（mainブランチ = 本番） |
| 記事数 | 81本（.mdx） |
| インデックス申請済み | 5本（うち4本索引済み確認） |
| 案内済み申請待ち | 5本 |

### 索引済み確認記事（上位）
| URL | SC状況 |
|---|---|
| muscledeli-review-psychiatrist | **2.5位** ★高パフォーマンス |
| kitoisix-review-psychiatrist | **8.6位** |
| noshi-vs-mitsuboshi-vs-muscledeli | 索引済み |
| yoshikei-family-kenji-drama | 索引済み |
| mealkit-3-comparison-kenji-drama | 申請済み・impressions最多（順位45.9位・改善余地あり） |

---

## プロジェクト絶対ルール（CLAUDE.mdより）

1. `publishedAt` は当日の日付のみ（未来日付禁止）
2. `AffiliateCard` に `shopComment` 必須（長友先生の「診療で観察した」視点・15〜40文字）
3. 薬機法断定表現禁止（「効果があります」→「効果が期待できます」）
4. ファイル名はすべて小文字 kebab-case（`_` 始まり禁止）
5. 記事末尾に「架空キャラクター」「アフィリエイトリンク含む」開示文必須
6. `git push` 前に `.git/hooks/pre-push` が自動で書籍×Web齟齬チェックを実行

---

## 参照必須ファイル一覧

| ファイル | 用途 |
|---|---|
| `CPO/jitan-health-blog/CLAUDE.md` | プロジェクト全体ルール（@MARKETING.mdも自動読込） |
| `CPO/jitan-health-blog/MARKETING.md` | 掛け合いドラマ形式・アフィリ配置ルール |
| `CPO/jitan-health-blog/indexing-status.md` | Search Console申請追跡 |
| `CSO/kindle-publishing/CONSISTENCY-CHECK.md` | 書籍×Web整合性台帳 |
| `CSO/kindle-publishing/FACTS-MASTER.md` | 商品・価格の正本 |
| `CSO/kindle-publishing/KDP-SCHEDULE.md` | 出版スケジュール（Phase2以降60冊計画） |
| `Knowledge/infra/jitan-health-blog-a8-program-list.md` | A8プログラムのa8matコード一覧 |

---

## 直近のKindle出版スケジュール（jitan-kenko.blogに関連するもの）

| 発売日 | book# | タイトル | Web記事との関係 |
|---|---|---|---|
| 5/25 ✅ | book79 | PMSをやわらげる食事の本 | cross-check済み・OK |
| 5/28 | book17 | 腸活レシピ入門 | cross-check済み・OK |
| 5/29 | book19 | コンビニ飯 罪悪感ゼロ | cross-check済み・OK |
| 5/31 | book20 | 宅食サービス7社比較 | 整合性修正済み |

---

## ブランチ運用ルール

| ブランチ | 役割 |
|---|---|
| `main` | 本番（jitan-kenko.blog）自動デプロイ |
| `dev` | 開発・プレビュー（dev.jitan-health-blog.pages.dev） |

作業は常に `dev` ブランチで行い、確認後に `main` にマージする。

---

## キャラクター設定（記事執筆時）

### 宮本ユウカ（メインキャラ）
- 34歳・IT系プロジェクトマネージャー・東京一人暮らし
- 帰宅23時・コンビニ飯が週4日・健康意識あるが行動できない
- 口グセ: 「でも高くないですか?」「それ続きます?」「うーんどうだろ」
- 担当Kindle著者としても同名で使用（宅食・食事管理系）

### 先生（精神保健指定医・長友恭平）
- 発言は常に「診療で観察した・患者さんに多い」視点
- 「私が使った」とは絶対に言わない
- `type="experience"` / `"opinion"` / `"caution"` の3種のDoctorCommentを使い分け

### その他キャラ
- 佐藤ケンジ（38歳・共働き・子あり）: ケンジ系記事で夫視点
- 山本ナオコ（40歳・在宅ワーク・有機食品こだわり派）: ナオコ系記事

---

## A8.net サイト登録用紹介文（申請時に使う）

> 精神保健指定医・産業医の長友恭平が運営する食事管理ブログ「時短 × 健康」。意欲・判断力が低下した状態でも食事を安定させる仕組みとして、宅配弁当・ミールキット・栄養補助食品を医師の視点で評価・紹介しています。忙しい社会人・体調の波がある方をメインターゲットとし、月間PV増加中です。
