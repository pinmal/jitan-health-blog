"""
OG画像生成スクリプト — Option B: Navy × Beige 2カラム
出力: public/og-default.png (1200×630px)
"""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
OUT = os.path.join(os.path.dirname(__file__), "public", "og-default.png")

# カラー定義
NAVY       = (27,  63, 110)   # #1b3f6e
TERRACOTTA = (196, 112,  59)  # #c4703b
BEIGE      = (247, 245, 241)  # #f7f5f1
WHITE      = (255, 255, 255)
LIGHT_BLUE = (147, 197, 253)  # #93c5fd
TEXT_NAVY  = (27,  63, 110)   # #1b3f6e
TEXT_MID   = (83,  96, 112)   # #536070

# フォント読み込み（日本語対応フォントを優先）
def load_font(size):
    candidates = [
        r"C:\Windows\Fonts\YuGothB.ttc",
        r"C:\Windows\Fonts\yugothb.ttc",
        r"C:\Windows\Fonts\meiryo.ttc",
        r"C:\Windows\Fonts\YuGothM.ttc",
        r"C:\Windows\Fonts\msgothic.ttc",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            continue
    print(f"[警告] 日本語フォントが見つかりません。デフォルトフォントを使用します。")
    return ImageFont.load_default()

font_logo   = load_font(26)
font_huge   = load_font(108)
font_x      = load_font(88)
font_body   = load_font(31)
font_tag    = load_font(23)
font_cap    = load_font(19)

# ─── キャンバス ───
img  = Image.new("RGB", (W, H), BEIGE)
draw = ImageDraw.Draw(img)

# ─── 左パネル（ネイビー・斜めカット） ───
# 頂点: 左上(0,0) → 右上(595,0) → 右下(555,H) → 左下(0,H)
draw.polygon([(0, 0), (595, 0), (555, H), (0, H)], fill=NAVY)

# テキストヘルパー（bbox互換）
def text_width(font, text):
    try:
        bb = font.getbbox(text)
        return bb[2] - bb[0]
    except AttributeError:
        w, _ = font.getsize(text)
        return w

# ── 左パネルのコンテンツ ──
# ロゴ（小さく上部）
draw.text((72, 68), "時短 × 健康", fill=LIGHT_BLUE, font=font_logo)

# メインタイトル
draw.text((72, 132), "時短", fill=WHITE, font=font_huge)
draw.text((72, 258), "×",   fill=TERRACOTTA, font=font_x)
draw.text((72, 348), "健康", fill=WHITE, font=font_huge)

# アクセントバー（テラコッタ）
draw.rectangle([(72, 516), (148, 524)], fill=TERRACOTTA)

# ─── 右パネルのコンテンツ ───
RX = 648  # 右パネル左端X

# タグライン（2行）
draw.text((RX, 198), "忙しい大人のための",  fill=TEXT_NAVY, font=font_body)
draw.text((RX, 244), "合理的食生活",        fill=TEXT_NAVY, font=font_body)

# ── ピルタグを描画する関数 ──
def draw_pill(x, y, text, bg, fg, border=None):
    try:
        bb = font_tag.getbbox(text)
        tw, th = bb[2] - bb[0], bb[3] - bb[1]
    except AttributeError:
        tw, th = font_tag.getsize(text)
    px, py = 18, 10
    x2, y2 = x + tw + px * 2, y + th + py * 2
    draw.rounded_rectangle([(x, y), (x2, y2)], radius=22,
                            fill=bg, outline=border, width=2 if border else 0)
    draw.text((x + px, y + py), text, fill=fg, font=font_tag)
    return (x2 - x) + 13  # 幅＋ギャップ

# 1行目タグ
x_cur = RX
tag_y  = 330
x_cur += draw_pill(x_cur, tag_y, "医師監修",    NAVY,       WHITE)
x_cur += draw_pill(x_cur, tag_y, "宅配弁当",    WHITE,      TERRACOTTA, TERRACOTTA)
x_cur += draw_pill(x_cur, tag_y, "ミールキット", WHITE,      TERRACOTTA, TERRACOTTA)

# 2行目タグ
x_cur = RX
tag_y2 = tag_y + 62
x_cur += draw_pill(x_cur, tag_y2, "時短ごはん",   WHITE, TERRACOTTA, TERRACOTTA)
x_cur += draw_pill(x_cur, tag_y2, "高タンパク食", WHITE, TERRACOTTA, TERRACOTTA)

# キャプション（右下）
cap_text = "精神保健指定医・産業医 長友恭平 監修"
cw = text_width(font_cap, cap_text)
draw.text((W - 52 - cw, H - 52), cap_text, fill=TEXT_MID, font=font_cap)

# ─── 保存 ───
os.makedirs(os.path.dirname(OUT), exist_ok=True)
img.save(OUT, "PNG")
print(f"✅ 保存完了: {OUT}")
print(f"   サイズ: {W}×{H}px")
