<?php
/**
 * WordPress 医療監修バッジ + JSON-LD (MedicalWebPage)
 * 対象テーマ: SWELL
 *
 * 導入手順:
 * 1. WordPress管理画面 → 外観 → テーマエディター
 *    → 子テーマの functions.php（または SWELL Child の functions.php）に以下を貼り付け
 * 2. または プラグイン「Code Snippets」を使って追加するのが安全
 *
 * ⚠️ 必ずバックアップを取ってから適用してください
 */

// 記事末尾に医療監修バッジを追加
add_filter( 'the_content', 'nagatomo_add_reviewer_badge' );

function nagatomo_add_reviewer_badge( $content ) {
    // 投稿タイプが post（ブログ記事）の場合のみ
    if ( ! is_single() || get_post_type() !== 'post' ) {
        return $content;
    }

    $portrait_url = get_site_url() . '/wp-content/themes/swell-child/images/nagatomo-portrait.jpg';

    $badge_html = '
<aside class="reviewer-badge-wrap" aria-label="医療監修者情報" style="border:1px solid #e2e8f0;border-left:4px solid #3b82f6;border-radius:8px;padding:1.25rem 1.5rem;margin-top:2.5rem;background:#f8fafc;font-size:0.9rem;">
  <div style="display:flex;gap:1.25rem;align-items:flex-start;">
    <div style="flex-shrink:0;">
      <img src="' . esc_url( $portrait_url ) . '"
           alt="長友恭平医師"
           width="80" height="80" loading="lazy"
           style="border-radius:50%;border:3px solid #3b82f6;object-fit:cover;"
           onerror="this.style.display=\'none\'" />
    </div>
    <div>
      <p style="font-size:0.7rem;color:#3b82f6;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin:0 0 .25rem;background:#dbeafe;display:inline-block;padding:.1rem .5rem;border-radius:3px;">医師監修</p>
      <h4 style="font-size:1rem;font-weight:700;margin:0 0 .5rem;color:#1e293b;">長友 恭平（ながとも きょうへい）</h4>
      <ul style="font-size:.85rem;color:#475569;padding-left:1.2rem;margin:0 0 .75rem;line-height:1.7;">
        <li>よつば加納クリニック 院長（宮崎県宮崎市清武町加納）</li>
        <li>精神保健指定医 / 産業医</li>
        <li>心療内科・精神科専門（EBM重視）</li>
        <li>宮崎大学医学部卒（2012年）</li>
      </ul>
      <p style="font-size:.75rem;color:#64748b;margin:0;line-height:1.7;border-top:1px solid #e2e8f0;padding-top:.5rem;">
        本記事は日本の保険適応・各学会ガイドラインに準拠し、薬機法・医療広告ガイドラインに
        配慮して作成しています。個別の医療相談はかかりつけ医にご相談ください。
      </p>
    </div>
  </div>
</aside>';

    return $content . $badge_html;
}

// JSON-LD 構造化データを head に追加 (MedicalWebPage + reviewedBy)
add_action( 'wp_head', 'nagatomo_add_medical_jsonld' );

function nagatomo_add_medical_jsonld() {
    if ( ! is_single() ) return;

    global $post;
    $url         = get_permalink( $post->ID );
    $title       = get_the_title( $post->ID );
    $description = get_the_excerpt( $post->ID );
    $published   = get_the_date( 'Y-m-d', $post->ID );
    $modified    = get_the_modified_date( 'Y-m-d', $post->ID );

    $author = array(
        '@type'           => 'Person',
        '@id'             => get_site_url() . '/#nagatomo',
        'name'            => '長友恭平',
        'honorificPrefix' => 'Dr.',
        'jobTitle'        => '精神保健指定医 / 産業医',
        'worksFor'        => array(
            '@type' => 'MedicalOrganization',
            'name'  => 'よつば加納クリニック',
        ),
        'knowsAbout'      => array( '心療内科', '精神科', '産業医学', '公衆衛生', '労働衛生' ),
    );

    $schema = array(
        '@context'      => 'https://schema.org',
        '@type'         => 'MedicalWebPage',
        '@id'           => $url,
        'url'           => $url,
        'name'          => $title,
        'description'   => $description,
        'inLanguage'    => 'ja',
        'datePublished' => $published,
        'dateModified'  => $modified,
        'author'        => $author,
        'reviewedBy'    => array(
            '@type' => 'Person',
            '@id'   => get_site_url() . '/#nagatomo',
            'name'  => '長友恭平',
        ),
        'medicalAudience' => 'Patient',
        'lastReviewed'    => $modified,
    );

    echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
