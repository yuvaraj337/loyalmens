import os
import shutil
import sys

sys.stdout.reconfigure(encoding='utf-8')

src_dir = 'temp_inspect'

# Mappings: (source_filename_in_temp_inspect, destination_relative_path)
PRODUCT_MAPPINGS = [
    # Hair Care
    ("RIZHEENA_Hair_Shampoo_product_ph_20260921193313.jpeg", "public/images/catalogue/hair-care/hair-shampoo.jpg"),
    ("Hair_conditioner_product_photograph_20260921193314.jpeg", "public/images/catalogue/hair-care/hair-conditioner.jpg"),
    ("RIZHEENA_PROFESSIONAL_Hair_Oil_p_20260921193314.jpeg", "public/images/catalogue/hair-care/hair-oil.jpg"),
    ("Rizheena_professional_hair_gel_p_20260921193313.jpeg", "public/images/catalogue/hair-care/hair-gel.jpg"),
    ("RIZHEENA_hair_dye_product_photog_20260921193314.jpeg", "public/images/catalogue/hair-care/hair-dye.jpg"),
    ("RIZHEENA_hair_coloring_tube_phot_20260921193313.jpeg", "public/images/catalogue/hair-care/hair-coloring.jpg"),
    ("Rizheena_Professional_Hair_Mehen_20260921193314.jpeg", "public/images/catalogue/hair-care/hair-mehendi.jpg"),
    ("Hair_straightener_product_photog_20260921193314.jpeg", "public/images/catalogue/hair-care/hair-straightener.jpg"),
    ("Arranging_luxury_hair_care_products_20260921193315.jpeg", "public/images/catalogue/hair-care/hair-care-collection.jpg"),

    # Face Care
    ("Face_wash_product_photography_20260921193313.jpeg", "public/images/catalogue/face-care/face-wash.jpg"),
    ("Rizheena_professional_moisturize_20260921193313.jpeg", "public/images/catalogue/face-care/moisturizer.jpg"),
    ("Rizheena_professional_cold_cream_20260921193313.jpeg", "public/images/catalogue/face-care/cold-cream.jpg"),
    ("Black_and_gold_face_cream_20260921193313.jpeg", "public/images/catalogue/face-care/day-cream.jpg"),
    ("Night_cream_product_photograph_20260921193312.jpeg", "public/images/catalogue/face-care/night-cream.jpg"),
    ("Sunscreen_product_photograph_20260921193312.jpeg", "public/images/catalogue/face-care/sunscreen.jpg"),
    ("Creating_skincare_product_photog_20260921193314.jpeg", "public/images/catalogue/face-care/pimple-cream.jpg"),
    ("Creating_pimple_cream_product_ph_20260921193313.jpeg", "public/images/catalogue/face-care/pimple-cream-alt.jpg"),
    ("RIZHEENA_Professional_De-Tan_Cream_20260921193314.jpeg", "public/images/catalogue/face-care/detan-cream.jpg"),
    ("Skincare_products_arrangement_ph_20260921193315.jpeg", "public/images/catalogue/face-care/face-care-collection.jpg"),

    # Beard Care
    ("Beard_oil_product_photograph_20260921193313.jpeg", "public/images/catalogue/beard-care/beard-oil.jpg"),
    ("Product_photograph_of_beard_wash_20260921193313.jpeg", "public/images/catalogue/beard-care/beard-wash.jpg"),
    ("Rizheena_professional_shaving_cr_20260921193314.jpeg", "public/images/catalogue/beard-care/shaving-cream.jpg"),
    ("Beard_care_product_photography_a_20260921193314.jpeg", "public/images/catalogue/beard-care/beard-care-collection.jpg"),

    # Professional Kits
    ("RIZHEENA_PROFESSIONAL_keratin_ki_20260921193315.jpeg", "public/images/catalogue/professional-kits/keratin-kit-full.jpg"),
    ("Rizheena_professional_instant_gl_20260921193314.jpeg", "public/images/catalogue/professional-kits/instant-glow-kit.jpg"),
    ("Rizheena_professional_fruit_kit_20260921193315.jpeg", "public/images/catalogue/professional-kits/fruit-kit.jpg"),
    ("Rizheena_professional_diamond_ki_20260921193315.jpeg", "public/images/catalogue/professional-kits/diamond-kit.jpg"),
    ("Professional_salon_kit_display_20260921193315.jpeg", "public/images/catalogue/professional-kits/professional-salon-kit.jpg"),

    # Special Care
    ("Rizheena_anti_hair_fall_shampoo_20260921193313.jpeg", "public/images/catalogue/special-care/anti-hair-fall-shampoo.jpg"),
    ("RIZHEENA_PROFESSIONAL_hair_tonic_20260921193314.jpeg", "public/images/catalogue/special-care/hair-tonic.jpg"),
    ("Hair_mask_product_photography_20260921193313.jpeg", "public/images/catalogue/special-care/hair-mask.jpg"),
    ("Hair_serum_product_photograph_20260921193313.jpeg", "public/images/catalogue/special-care/hair-serum.jpg"),
    ("Hair-care_products_arranged_on_c_20260921193315.jpeg", "public/images/catalogue/special-care/special-care-collection.jpg"),

    # Gift Sets
    ("Men_grooming_kit_product_photograph_20260921193315.jpeg", "public/images/catalogue/gift-sets/essential-grooming-kit.jpg"),
    ("Men's_grooming_kit_product_photo_20260921193315.jpeg", "public/images/catalogue/gift-sets/premium-care-kit.jpg"),
    ("Luxury_men_grooming_kit_photograph_20260921193315.jpeg", "public/images/catalogue/gift-sets/luxury-grooming-kit.jpg"),
    ("RIZHEENA_PROFESSIONAL_gift_set_p_20260921193314.jpeg", "public/images/catalogue/gift-sets/signature-gift-set.jpg"),
    ("Gift_set_product_display_20260921193315.jpeg", "public/images/catalogue/gift-sets/gift-set-display.jpg"),
    ("Luxury_grooming_products_display_20260921193314.jpeg", "public/images/catalogue/gift-sets/luxury-vvip-kit.jpg"),
    ("RIZHEENA_VIP_membership_product_20260921193315.jpeg", "public/images/catalogue/gift-sets/vip-membership-set.jpg"),
    ("Grooming_products_display_design_20260921193314.jpeg", "public/images/catalogue/gift-sets/grooming-products-display.jpg"),
]

SERVICE_MAPPINGS = [
    ("Hairstylist_cutting_client_hair_20260921193315.jpeg", "public/images/services/haircut-styling.jpg"),
    ("Barber_cutting_hair_of_man_20260921193315.jpeg", "public/images/services/hair-cutting.jpg"),
    ("Man_receiving_hair_oil_massage_20260921193315.jpeg", "public/images/services/head-massage.jpg"),
    ("Stylist_applying_hair_treatment_20260921193315.jpeg", "public/images/services/hair-spa-treatment.jpg"),
    ("Stylist_straightening_man's_hair_20260921193315.jpeg", "public/images/services/hair-smoothening.jpg"),
    ("Barber_grooming_man's_beard_20260921193315.jpeg", "public/images/services/beard-grooming.jpg"),
    ("Barber_trimming_man's_beard_20260921193315.jpeg", "public/images/services/beard-trimming.jpg"),
    ("Barber_styling_male_beard_20260921193315.jpeg", "public/images/services/beard-styling.jpg"),
    ("Stylist_applying_hair_conditioner_20260921193315.jpeg", "public/images/services/beard-spa.jpg"),
    ("Barber_shaping_beard_with_razor_20260921193315.jpeg", "public/images/services/beard-lining.jpg"),
    ("Man_receiving_facial_treatment_20260921193314.jpeg", "public/images/services/facial-skin-care.jpg"),
    ("Man_receiving_facial_treatment_20260921193315_2.jpeg", "public/images/services/de-tan-facial.jpg"),
    ("Man_receiving_facial_treatment_20260921193315_3.jpeg", "public/images/services/gold-facial.jpg"),
    ("Specialist_applying_facial_mask_20260921193314.jpeg", "public/images/services/charcoal-detox.jpg"),
    ("Stylist_applying_hair_color_20260921193315.jpeg", "public/images/services/hair-colour-treatment.jpg"),
    ("Stylist_applying_hair_dye_20260921193315.jpeg", "public/images/services/beard-colouring.jpg"),
    ("Stylist_coloring_man's_hair_20260921193315.jpeg", "public/images/services/hair-highlights.jpg"),
    ("Man_receiving_hair_color_treatment_20260921193315.jpeg", "public/images/services/keratin-treatment.jpg"),

    # Additional service images in the collection
    ("Barber_shaving_client_beard_20260921193315.jpeg", "public/images/services/barber-shaving.jpg"),
    ("Barber_trimming_man's_beard_20260921193315_2.jpeg", "public/images/services/barber-trimming-alt.jpg"),
    ("Hairstylist_cutting_client_hair_20260921193315_2.jpeg", "public/images/services/haircut-alt-1.jpg"),
    ("Hairstylist_cutting_man's_hair_20260921193315.jpeg", "public/images/services/haircut-alt-2.jpg"),
    ("Man_receiving_beard_shave_20260921193315.jpeg", "public/images/services/beard-shave-alt.jpg"),
    ("Man_receiving_facial_treatment_20260921193315.jpeg", "public/images/services/facial-alt-1.jpg"),
    ("Man_receiving_hair_styling_20260921193315.jpeg", "public/images/services/hair-styling-1.jpg"),
    ("Man_receiving_hair_styling_20260921193315_2.jpeg", "public/images/services/hair-styling-2.jpg"),
    ("Man_receiving_hair_styling_20260921193315_3.jpeg", "public/images/services/hair-styling-3.jpg"),
    ("Man_receiving_haircut_and_shave_20260921193315.jpeg", "public/images/services/haircut-and-shave.jpg"),
    ("Man_receiving_professional_facia_20260921193315.jpeg", "public/images/services/facial-pro.jpg"),
    ("Men's_facial_treatment_room_back_20260921193314.jpeg", "public/images/services/treatment-room.jpg"),
    ("Men_salon_interior_background_20260921193315.jpeg", "public/images/services/salon-interior.jpg"),
    ("Stylist_applying_hair_conditioner_20260921193315_2.jpeg", "public/images/services/hair-conditioning-alt.jpg"),
    ("Stylist_coloring_client_hair_20260921193315.jpeg", "public/images/services/hair-coloring-alt.jpg"),
    ("Stylist_cutting_client_hair_salon_20260921193315.jpeg", "public/images/services/salon-haircut-wide.jpg"),
    ("Stylist_washing_client_hair_20260921193315.jpeg", "public/images/services/hair-wash-client.jpg"),
    ("Stylist_washing_man_hair_20260921193315.jpeg", "public/images/services/hair-wash-man.jpg"),
]

# Track copied files
used_files = set()

print('=== COPYING PRODUCT IMAGES ===')
for src_name, dst_rel in PRODUCT_MAPPINGS:
    src_p = os.path.join(src_dir, src_name)
    if not os.path.exists(src_p):
        print(f'ERROR: Missing src file {src_name}')
        continue
    os.makedirs(os.path.dirname(dst_rel), exist_ok=True)
    shutil.copy2(src_p, dst_rel)
    used_files.add(src_name)
    print(f'Copied: {src_name} -> {dst_rel}')

print('\n=== COPYING SERVICE IMAGES ===')
for src_name, dst_rel in SERVICE_MAPPINGS:
    src_p = os.path.join(src_dir, src_name)
    if not os.path.exists(src_p):
        print(f'ERROR: Missing src file {src_name}')
        continue
    os.makedirs(os.path.dirname(dst_rel), exist_ok=True)
    shutil.copy2(src_p, dst_rel)
    used_files.add(src_name)
    print(f'Copied: {src_name} -> {dst_rel}')

all_temp = set(os.listdir(src_dir))
unused = all_temp - used_files

print(f'\nTotal files in temp: {len(all_temp)}')
print(f'Product images mapped: {len(PRODUCT_MAPPINGS)}')
print(f'Service images mapped: {len(SERVICE_MAPPINGS)}')
print(f'Unused files count: {len(unused)}')
print('Unused files:')
for u in sorted(unused):
    print(f'  - {u}')
