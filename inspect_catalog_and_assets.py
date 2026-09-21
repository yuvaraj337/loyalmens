import os
import sys
import re
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

print("--- INSPECTING SHOP CATEGORIES ---")
with open('src/data/shop-categories.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_cat = None
products = []
for line in lines:
    cat_match = re.search(r"'([a-z\-]+)':\s*\{", line)
    if cat_match:
        current_cat = cat_match.group(1)
    
    id_match = re.search(r"id:\s*'([^']+)'", line)
    name_match = re.search(r"name:\s*'([^']+)'", line)
    size_match = re.search(r"size:\s*'([^']*)'", line)
    price_match = re.search(r"price:\s*'([^']+)'", line)
    img_match = re.search(r"image:\s*'([^']+)'", line)
    
    if id_match and 'products:' not in line and '{' in line:
        pass

# Better approach: parse products blocks
content = open('src/data/shop-categories.ts', 'r', encoding='utf-8').read()

cat_blocks = re.findall(r"'([a-z\-]+)':\s*\{\s*id:\s*'([^']+)',\s*route:\s*'([^']+)',\s*title:\s*'([^']+)',.*?products:\s*\[(.*?)\]\s*\}", content, re.DOTALL)

all_shop_products = []
for cat_id, _, _, cat_title, prod_block in cat_blocks:
    # find each { ... } in prod_block
    prod_items = re.findall(r"\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*size:\s*'([^']*)',\s*price:\s*'([^']+)',\s*image:\s*'([^']+)'(?:,\s*category:\s*'([^']+)')?(?:,\s*description:\s*'([^']*)')?", prod_block)
    print(f"\nCategory: {cat_id} ({len(prod_items)} products)")
    for p in prod_items:
        pid, name, size, price, img = p[0], p[1], p[2], p[3], p[4]
        all_shop_products.append({'cat': cat_id, 'id': pid, 'name': name, 'size': size, 'price': price, 'image': img})
        print(f"  [{pid}] {name} ({size}) - {price} -> {img}")

print(f"\nTotal products in shop-categories.ts: {len(all_shop_products)}")

# Services catalog
print("\n--- INSPECTING SERVICES CATALOG ---")
svc_content = open('src/data/services-catalog.ts', 'r', encoding='utf-8').read()
services = re.findall(r"\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'([^']+)',\s*duration:\s*'([^']+)',\s*price:\s*'([^']+)',\s*description:\s*'([^']*)',\s*image:\s*'([^']+)'", svc_content)
print(f"Total services found: {len(services)}")
for s in services:
    print(f"  [{s[0]}] {s[1]} ({s[2]}) -> {s[6]}")

# Extracted assets
print("\n--- INSPECTING EXTRACTED ASSETS (78 files) ---")
extract_dir = r'C:\Users\rayal\Downloads\1saloon\extracted_assets'
files = sorted(os.listdir(extract_dir))
asset_details = []
for f in files:
    full_p = os.path.join(extract_dir, f)
    size_kb = round(os.path.getsize(full_p) / 1024, 1)
    try:
        with Image.open(full_p) as im:
            dims = f"{im.width}x{im.height}"
    except Exception:
        dims = "unknown"
    asset_details.append({'filename': f, 'size_kb': size_kb, 'dims': dims})

for idx, a in enumerate(asset_details, 1):
    print(f"{idx:2d}. {a['filename']} ({a['dims']}, {a['size_kb']} KB)")
