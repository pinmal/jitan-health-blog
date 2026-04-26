<?php
/**
 * drnagatomo2026.com → jitan-kenko.blog 相互リンクバナー
 * 対象テーマ: SWELL
 *
 * 導入手順:
 * 1. WordPress管理画面 → プラグイン → Code Snippets → 新規追加
 * 2. 以下のコードを貼り付けて有効化
 * 3. 「全記事で実行」に設定
 *
 * 効果:
 * - drnagatomo2026.com の全記事末尾に jitan-kenko.blog へのリンクバナーを追加
 * - 「監修医の合理的食生活ブログ」として自然な文脈でリンク
 * - 外部リンクなので rel="noopener" を付与（nofollow は付けない: 同一著者サイト）
 */

add_filter( 'the_content', 'nagatomo_add_jitan_kenko_link' );

function nagatomo_add_jitan_kenko_link( $content ) {
    // 投稿タイプが post（ブログ記事）の場合のみ
    if ( ! is_single() || get_post_type() !== 'post' ) {
        return $content;
    }

    $banner_html = '
<aside aria-label="関連ブログ紹介" style="
    border: 1px solid #dde8f5;
    border-left: 4px solid #1b3f6e;
    border-radius: 8px;
    padding: 1.1rem 1.4rem;
    margin-top: 2rem;
    background: #f4f7fc;
    font-size: 0.9rem;
    line-height: 1.7;
">
  <p style="margin:0 0 .35rem; font-size:.72rem; font-weight:700; color:#1b3f6e; text-transform:uppercase; letter-spacing:.07em;">
    監修医の関連ブログ
  </p>
  <p style="margin:0 0 .5rem; font-size:1rem; font-weight:700;">
    <a href="https://jitan-kenko.blog" target="_blank" rel="noopener noreferrer"
       style="color:#1b3f6e; text-decoration:none;">
      時短 × 健康ブログ ↗
    </a>
  </p>
  <p style="margin:0; font-size:.84rem; color:#475569;">
    精神保健指定医の立場から、宅配食・栄養補助食品の実際を解説するブログです。
    忙しい方が「食事をゼロから一にする」ための情報をまとめています。
  </p>
</aside>';

    return $content . $banner_html;
}
