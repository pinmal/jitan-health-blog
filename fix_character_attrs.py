#!/usr/bin/env python3
"""
CharacterComment に character= 属性がない場合、ファイル名から推定して一括追加するスクリプト
"""
import os, re, sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

ARTICLES_DIR = 'src/content/articles'

def infer_character(fname: str, content: str) -> str:
    """ファイル名とコンテンツからキャラクターを推定"""
    name = fname.lower()
    if 'naoko' in name:
        return 'naoko'
    if 'kenji' in name:
        return 'kenji'
    # yuka が明示的に含まれている場合
    if 'yuka' in name:
        return 'yuka'
    # 医師コラム系（キャラクターなし → 念のためyuka）
    # tags フィールドを見てケンジ/ナオコを判定
    if 'ケンジ' in content[:500] or '"ケンジ"' in content[:500]:
        return 'kenji'
    if 'ナオコ' in content[:500] or '"ナオコ"' in content[:500]:
        return 'naoko'
    return 'yuka'

fixed_files = []
skipped_files = []

for fname in sorted(os.listdir(ARTICLES_DIR)):
    if not fname.endswith('.mdx') or fname.startswith('_'):
        continue

    path = os.path.join(ARTICLES_DIR, fname)
    with open(path, 'r', encoding='utf-8-sig') as f:
        content = f.read()

    # CharacterComment で character= がないものを検出
    # <CharacterComment ...> に character= が含まれていない opening tag を検出
    # ただし self-closing (<CharacterComment ... />) は対象外

    pattern = r'(<CharacterComment)((?:[^/>]|/(?!>))*?)(\s*>)'

    def needs_fix(m):
        attrs = m.group(2)
        return 'character=' not in attrs

    # 修正が必要なタグがあるか確認
    tags_without_char = [m for m in re.finditer(pattern, content) if 'character=' not in m.group(2)]

    if not tags_without_char:
        skipped_files.append(fname)
        continue

    character = infer_character(fname, content)

    def add_character(m):
        tag_start = m.group(1)
        attrs = m.group(2)
        tag_end = m.group(3)
        if 'character=' in attrs:
            return m.group(0)  # 既存のものはそのまま
        return f'{tag_start}{attrs} character="{character}"{tag_end}'

    new_content = re.sub(pattern, add_character, content)

    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        fixed_files.append((fname, character, len(tags_without_char)))

print(f'=== CharacterComment character= 一括修正 ===')
print(f'修正済み: {len(fixed_files)}ファイル')
for fname, char, count in fixed_files:
    print(f'  {fname} → character="{char}" を {count}箇所に追加')
print()
print(f'スキップ（修正不要）: {len(skipped_files)}ファイル')
