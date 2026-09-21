import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

extract_dir = r'C:\Users\rayal\Downloads\1saloon\extracted_assets'
files = sorted(os.listdir(extract_dir))

products = []
services = []
others = []

for f in files:
    fl = f.lower()
    if any(k in fl for k in ['stylist', 'barber', 'man_receiving', 'specialist', 'hairstylist', 'salon_interior']):
        services.append(f)
    elif any(k in fl for k in [
        'shampoo', 'cream', 'oil', 'wash', 'serum', 'mask', 'kit', 'set',
        'straightener', 'dye', 'coloring', 'mehen', 'tonic', 'gel',
        'moisturize', 'sunscreen', 'pimple', 'de-tan', 'grooming_products',
        'skincare_products', 'hair-care_products', 'black_and_gold',
        'luxury_grooming', 'vip_membership', 'arranging_luxury'
    ]):
        products.append(f)
    else:
        others.append(f)

print(f"Total files: {len(files)}")
print(f"Product Candidates ({len(products)}):")
for i, p in enumerate(products, 1):
    print(f"  P{i:02d}: {p}")

print(f"\nService Candidates ({len(services)}):")
for i, s in enumerate(services, 1):
    print(f"  S{i:02d}: {s}")

print(f"\nOthers / Unclassified ({len(others)}):")
for i, o in enumerate(others, 1):
    print(f"  O{i:02d}: {o}")
