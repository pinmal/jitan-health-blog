# HANDOVER.md — 時短×健康ブログ 引き継ぎ資料
> 作成: 2026-04-25

---

## プロジェクト概要

- **サイト名**: 時短 × 健康
- **本番URL**: https://jitan-kenko.blog/
- **プレビューURL**: https://dev.jitan-health-blog.pages.dev/
- **リポジトリ**: https://github.com/pinmal/jitan-health-blog
- **技術スタック**: Astro 4.x SSG + Cloudflare Pages（mainブランチ = 本番）
- **ローカルパス**: `C:\Users\yotsu\Desktop\claudecode1\CPO\jitan-health-blog`

---

## ブランチ運用ルール

| ブランチ | 役割 |
|---|---|
| `main` | 本番（jitan-kenko.blog）自動デプロイ |
| `dev` | 開発・プレビュー（dev.jitan-health-blog.pages.dev）|

作業は常に `dev` ブランチで行い、確認後に `main` にマージする。

---

## 現在の記事一覧

### 公開中（humanReviewed: true）— 7本

| ファイル | タイトル | アフィリ状況 |
|---|---|---|
| `kenkonamakyubin-review-psychiatrist.mdx` | 健康直球便レビュー | ✅ A8.net承認済み |
| `kitoisix-review-psychiatrist.mdx` | Kit Oisixレビュー | ✅ A8.net承認済み |
| `soelu-review-psychiatrist.mdx` | SOELUオンラインヨガレビュー | ✅ A8.net承認済み |
| `fitfoodhome-review-psychiatrist.mdx` | FIT FOOD HOMEレビュー | ✅ A8.net承認済み |
| `muscledeli-review-psychiatrist.mdx` | マッスルデリレビュー | ✅ A8.net承認済み |
| `delipicks-review-psychiatrist.mdx` | DELIPICKSレビュー | ✅ A8.net承認済み |
| `yoshikei-mealkit-psychiatrist.mdx` | ヨシケイミールキット | ✅ A8.net承認済み |

### 非公開（humanReviewed: false）— アフィリ待ち

| ファイル | タイトル | 理由 |
|---|---|---|
| `weekday-dinner-systemization.mdx` | 夕食の仕組み化3ステップ | ナッシュ A8.net申請中 |
| `sleep-and-nutrition-psychiatrist.mdx` | 睡眠と栄養の関係 | アフィリ未設定 |
| `mental-health-meal-delivery-psychiatrist.mdx` | 宅配食をすすめる理由 | 全カード直リンク（A8未参加） |
| `noshi-vs-mitsuboshi-vs-muscledeli.mdx` | 3社比較記事 | アフィリ未設定 |
| `_base-food-review-psychiatrist.mdx` | BASE FOODレビュー | ファイル名`_`でAstro除外 |

---

## 次にやること（優先順）

### 1. ナッシュ A8.net 承認待ち → 承認後の作業
`weekday-dinner-systemization.mdx` のコメントアウトを外してリンク差し替え：
```mdx
{/* ここのコメントを外す */}
<AffiliateCard
  href="← A8.netのpx.a8.net追跡URL"
  imageSrc="← A8.netのバナーURL（300×250推奨）"
  ...
/>
```
その後 `humanReviewed: true` に変更 → dev push → main マージ

### 2. 睡眠記事のアフィリ追加
`sleep-and-nutrition-psychiatrist.mdx` に合うA8.net参加サービスを探してAffiliateCardを追加。
候補：機能性食品・サプリ・ハーブティー系など。

### 3. A8.net 新規申請の検討サービス
以下が未参加の可能性があるため、A8.netで申請を検討：
- ナッシュ（申請中）
- GREEN SPOON
- ワタミの宅食ダイレクト
- パルシステム
- BASE FOOD

### 4. 記事追加の方向性
- 比較記事（`noshi-vs-mitsuboshi-vs-muscledeli.mdx`）にA8リンクを追加して公開
- 新カテゴリ「howto」「health-column」の記事を追加（現在はreviewが中心）

---

## A8.net リンク構造（参考）

```
追跡URL: https://px.a8.net/svt/ejp?a8mat=XXXXX+YYYYY+ZZZZZ+AAAAA
バナーURL: https://wwwXX.a8.net/svt/bgt?aid=XXXXXX&wid=001&eno=01&mid=XXXXXX&mc=1
```
バナーは300×250（正方形）を優先して使う。

---

## ⚠️ 新記事を書く前に必ず読むファイル

| ファイル | 内容 | タイミング |
|---|---|---|
| `yuka-character-bible.md` | ユウカの設定辞典（単一真実ソース） | **毎回・必須** |
| `character-and-format-design.md` | 掛け合いドラマ形式の設計書・記事テンプレート | 初回・フォーマット確認時 |
| `writing-style-guide.md` | 文章術10法則・冒頭フレーズ集 | 初回・文体に迷ったとき |

**記事を書いたら** → `yuka-character-bible.md` の「商品使用歴」セクションを更新する

---

## 記事フォーマット（2026-04-26〜）

### 新フォーマット：掛け合いドラマ形式

「精神科医の先生 × 架空キャラ・宮本ユウカ」の対話形式。
詳細は → `character-and-format-design.md` 参照

**ユウカのプロフィール（架空）**
- 34歳・IT系・プロジェクトマネージャー・東京一人暮らし
- 帰宅23時・コンビニ飯が週4日・健康意識あるが行動できない
- 口グセ: 「でも高くないですか?」「それ続きます?」「うーんどうだろ」

**記事末尾の開示テキスト（全記事必須）**
```
※ この記事の「宮本ユウカ」は架空のキャラクターです。体験談部分はフィクションですが、
  製品の価格・内容は公式情報と複数レビューを参照しています。
※ アフィリエイトリンクを含みます。
```

---

## 重要ルール（文体）

- 引用フレーズを `**「〇〇」**` で太字にしない（AI臭がするため禁止）
- DoctorComment コンポーネント: `type="experience"` / `"opinion"` / `"caution"` の3種
- AffiliateCard はバナー画像（imageSrc）必須。未承認の場合はコメントアウトして非表示
- **先生の発言に「私が使った」は書かない**（医師として「観察・研究・診療経験」として語る）
- **ユウカが「完全に解決した」と断言しない**（「まあ続けてみます」程度の温度感が自然）

---

## A8.net サイト登録用紹介文（承認申請時に使う）

> 精神保健指定医・産業医の長友恭平が運営する食事管理ブログ「時短 × 健康」。意欲・判断力が低下した状態でも食事を安定させる仕組みとして、宅配弁当・ミールキット・栄養補助食品を医師の視点で評価・紹介しています。忙しい社会人・体調の波がある方をメインターゲットとし、月間PV増加中です。

