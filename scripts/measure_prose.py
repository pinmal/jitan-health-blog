#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
measure_prose.py — indexed記事(humanReviewed:true)の本文プローズ文字数を Python len() で測定。
W-3（薄い記事のYMYL増量）の進捗確認用。
  - フロントマター(--- ... ---)・import文・JSXコンポーネントタグ・Markdown記号・空白を除外
  - 表(| ... |)・見出し記号・箇条書き記号・リンク装飾を除いた「読める日本語本文」を概算
使い方:
  python scripts/measure_prose.py                  # 全indexed記事を薄い順に一覧
  python scripts/measure_prose.py <slug> [<slug>]  # 指定記事のみ
注: wc -m はバイト数で日本語を誤るため使用禁止（I-170）。必ず Python len() で測る。
"""
import os, re, sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

ART_DIR = os.path.join(os.path.dirname(__file__), '..', 'src', 'content', 'articles')

SELF_CLOSING = r'AffiliateCard|KindleBookCard|KondateGachaCTA|ComparisonTable|ReviewerCard'
PAIRED = r'DoctorComment|CharacterComment'

def prose_len(text):
    # フロントマター除去
    text = re.sub(r'^---\n.*?\n---\n', '', text, count=1, flags=re.S)
    # import 文除去
    text = re.sub(r'^import .*$', '', text, flags=re.M)
    # JSXコメント除去
    text = re.sub(r'\{/\*[\s\S]*?\*/\}', '', text)
    # 自己閉じコンポーネント（カード類）を名前指定でブロックごと除去
    text = re.sub(r'<(?:' + SELF_CLOSING + r')\b[\s\S]*?/>', '', text)
    # ペアコンポーネント（医師/キャラのコメント=本文）はタグのみ除去し中身は残す
    text = re.sub(r'</?(?:' + PAIRED + r')\b[^>]*>', '', text)
    # Markdownテーブル行除去（| を含む行）
    text = re.sub(r'^\s*\|.*$', '', text, flags=re.M)
    # 見出し/引用/箇条書き/水平線の行頭記号除去
    text = re.sub(r'^[#>\-\*\s]+', '', text, flags=re.M)
    # リンク [label](url) は label のみ残す
    text = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', text)
    # 強調記号・残りの記号
    text = text.replace('*', '').replace('`', '')
    # 空白・改行を除いた文字数
    return len(re.sub(r'\s', '', text))

def main():
    targets = sys.argv[1:]
    rows = []
    for fn in sorted(os.listdir(ART_DIR)):
        if not fn.endswith('.mdx') or fn.startswith('_'):
            continue
        slug = fn[:-4]
        with open(os.path.join(ART_DIR, fn), encoding='utf-8-sig') as f:
            content = f.read()
        if 'humanReviewed: true' not in content:
            continue
        if targets and slug not in targets:
            continue
        rows.append((prose_len(content), slug))
    rows.sort()
    print(f'{"prose字":>7}  slug')
    for n, slug in rows:
        flag = '  ← <2500 要増量' if n < 2500 else ''
        print(f'{n:>7}  {slug}{flag}')
    thin = [r for r in rows if r[0] < 2500]
    print(f'\n計 {len(rows)} 本中 <2500字 = {len(thin)} 本')

if __name__ == '__main__':
    main()
