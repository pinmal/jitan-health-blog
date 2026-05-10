#!/usr/bin/env python3
# jitan-kenko.blog 包括的監査スクリプト
# 実行: python audit.py

import os, sys, re
from datetime import date

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

ARTICLES_DIR = 'src/content/articles'
TODAY = date.today().isoformat()  # 2026-05-09

VALID_CATEGORIES = {'comparison', 'review', 'health-column', 'howto', 'mental-health'}
VALID_EVIDENCE = {'high', 'medium', 'low', 'opinion', 'clinical-opinion'}
VALID_INTENT = {'informational', 'commercial', 'navigational'}
VALID_CHARACTERS = {'yuka', 'naoko', 'kenji'}

COMPONENTS = ['DoctorComment', 'CharacterComment', 'AffiliateCard']

PLACEHOLDERS = [
    'YOUR_A8', 'PLACEHOLDER', 'XXX', 'TBD', '未設定',
    'example.com/dummy', 'バナー画像URLを', 'リンクを差し替え',
    'a8mat=YOUR', 'a8mat=XXXX',
]

issues_by_level = {'CRITICAL': [], 'WARNING': [], 'INFO': []}

def add(level, fname, msg):
    issues_by_level[level].append(f'  [{fname}] {msg}')

files = sorted([f for f in os.listdir(ARTICLES_DIR) if f.endswith('.mdx')])
print(f'=== jitan-kenko.blog 監査 ({TODAY}) ===')
print(f'対象記事数: {len(files)}\n')

for fname in files:
    # アンダースコア始まりは下書き扱い
    if fname.startswith('_'):
        add('INFO', fname, '先頭が _ (下書き) — 公開されていない')
        continue

    path = os.path.join(ARTICLES_DIR, fname)
    with open(path, 'r', encoding='utf-8-sig') as f:
        content = f.read()

    # コメント除去版（偽陽性回避）
    clean = re.sub(r'\{/\*[\s\S]*?\*/\}', '', content)

    # =====================
    # 1. フロントマター抽出
    # =====================
    fm_match = re.match(r'^---\n([\s\S]*?)\n---', content)
    if not fm_match:
        add('CRITICAL', fname, 'フロントマターが見つからない')
        continue
    fm = fm_match.group(1)

    # category
    m = re.search(r'^category:\s*["\']?([\w-]+)', fm, re.MULTILINE)
    if not m:
        add('CRITICAL', fname, 'category フィールドなし')
    elif m.group(1) not in VALID_CATEGORIES:
        add('CRITICAL', fname, f'invalid category: "{m.group(1)}" (valid: {", ".join(sorted(VALID_CATEGORIES))})')

    # evidenceLevel
    m = re.search(r'^evidenceLevel:\s*["\']?([\w-]+)', fm, re.MULTILINE)
    if not m:
        add('WARNING', fname, 'evidenceLevel フィールドなし')
    elif m.group(1) not in VALID_EVIDENCE:
        add('WARNING', fname, f'invalid evidenceLevel: "{m.group(1)}"')

    # searchIntent
    m = re.search(r'^searchIntent:\s*["\']?([\w-]+)', fm, re.MULTILINE)
    if not m:
        add('WARNING', fname, 'searchIntent フィールドなし')
    elif m.group(1) not in VALID_INTENT:
        add('WARNING', fname, f'invalid searchIntent: "{m.group(1)}"')

    # publishedAt（未来日付は記事予約なので INFO にダウングレード）
    m = re.search(r'^publishedAt:\s*(\d{4}-\d{2}-\d{2})', fm, re.MULTILINE)
    if not m:
        add('WARNING', fname, 'publishedAt フィールドなし')
    else:
        pub_date = m.group(1)
        if pub_date > TODAY:
            add('INFO', fname, f'publishedAt が未来日付（予約記事）: {pub_date}')

    # description 160文字制限
    m = re.search(r'^description:\s*["\']?(.*?)["\']?\s*$', fm, re.MULTILINE)
    if m and len(m.group(1)) > 160:
        add('WARNING', fname, f'description が160文字超: {len(m.group(1))}文字')

    # humanReviewed
    if 'humanReviewed:' not in fm:
        add('INFO', fname, 'humanReviewed フィールドなし')

    # =====================
    # 2. プレースホルダー検出
    # =====================
    for ph in PLACEHOLDERS:
        if ph in clean:
            add('CRITICAL', fname, f'プレースホルダー残存: "{ph}"')

    # =====================
    # 3. AffiliateCard 検証
    # =====================
    for card in re.findall(r'<AffiliateCard[\s\S]*?/>', clean):
        # href の確認
        href_m = re.search(r'href=["\']([^"\']+)["\']', card)
        if not href_m:
            add('WARNING', fname, 'AffiliateCard に href がない')
        else:
            href = href_m.group(1)
            # http:// リンク
            if href.startswith('http://'):
                add('WARNING', fname, f'AffiliateCard href が http://: {href[:60]}')
            # A8 URL かどうかのチェック
            is_a8 = 'a8mat=' in href or 'px.a8.net' in href

            # platform="A8.net" 宣言があるのにa8mat URLでない
            if 'platform="A8.net"' in card and not is_a8:
                add('CRITICAL', fname, 'platform="A8.net" 宣言だが href が a8mat URL でない')

        # brand または title の確認（どちらか一方があればOK）
        if 'title=' not in card and 'brand=' not in card:
            add('WARNING', fname, 'AffiliateCard に title/brand がない')

        # shopComment の確認
        if 'shopComment=' not in card:
            add('INFO', fname, 'AffiliateCard に shopComment がない')

    # =====================
    # 4. コンポーネントタグバランス
    # =====================
    for comp in COMPONENTS:
        opens = len(re.findall(f'<{comp}[\\s>]', clean))
        closes = len(re.findall(f'</{comp}>', clean))
        # self-closing (/>) の数を opens から差し引く
        selfclose = len(re.findall(f'<{comp}[^>]*/>', clean))
        opens_real = opens - selfclose
        if opens_real != closes:
            add('CRITICAL', fname, f'{comp} タグ不一致: open={opens_real} close={closes}')

    # =====================
    # 5. CharacterComment character属性
    # =====================
    for m in re.finditer(r'<CharacterComment([^>]*?)>', clean):
        attrs = m.group(1)
        char_m = re.search(r'character=["\'](\w+)["\']', attrs)
        if not char_m:
            add('CRITICAL', fname, 'CharacterComment に character 属性がない')
        elif char_m.group(1) not in VALID_CHARACTERS:
            add('WARNING', fname, f'CharacterComment の character 値が不明: "{char_m.group(1)}"')

    # =====================
    # 6. http:// リンク (アフィリ以外)
    # =====================
    http_links = re.findall(r'href=["\']http://(?!localhost)([^"\']+)', clean)
    for lnk in http_links:
        add('WARNING', fname, f'http:// リンク: {lnk[:80]}')

    # =====================
    # 7. インポート宣言とコンポーネント使用の一致
    # =====================
    imported = set(re.findall(r"import (\w+) from '", content))
    for comp in COMPONENTS:
        used = comp in clean
        imported_flag = comp in imported
        if used and not imported_flag:
            add('CRITICAL', fname, f'{comp} を使用しているが import がない')

    # =====================
    # 8. a8mat コードの疑わしいパターン
    # =====================
    for m in re.finditer(r'a8mat=([A-Z0-9+]+)', clean):
        code = m.group(1)
        # 短すぎる（正常は20文字以上）
        if len(code) < 15:
            add('WARNING', fname, f'a8mat コードが短すぎる可能性: {code}')

# =====================
# 結果出力
# =====================
total = sum(len(v) for v in issues_by_level.values())

for level in ['CRITICAL', 'WARNING', 'INFO']:
    items = issues_by_level[level]
    if items:
        print(f'【{level}】 {len(items)}件')
        for item in items:
            print(item)
        print()

print(f'--- 合計: {total}件 (CRITICAL:{len(issues_by_level["CRITICAL"])} / WARNING:{len(issues_by_level["WARNING"])} / INFO:{len(issues_by_level["INFO"])}) ---')
