# Search Console インデックス申請管理 — jitan-kenko.blog
> このファイルの目的: 手動インデックス申請の重複防止・ステータス追跡（セッション横断）
> 申請方法: Google Search Console → URL検査 → 「インデックス登録をリクエスト」
> 1日の上限目安: 3〜5 URL
> ベースURL: https://jitan-kenko.blog/
> 最終更新: 2026-05-26（新記事7本 Tier1-2 全件申請済み）

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

## 未申請の優先候補

現在なし。

---

## 更新ルール（Claudeへの指示）
- GSCの話題が出たら**このファイルを最初にRead**する
- 手動申請URLを案内したら**即座にこのファイルを更新**する
- 申請後6週間経過して未索引のURLはステータスを「未索引（要リライト）」に変更
