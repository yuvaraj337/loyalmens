from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import os

artifact_dir = r"C:\Users\rayal\.gemini\antigravity-ide\brain\2a467fdf-305d-4a38-b3f9-f364b83680f1"

opts = Options()
opts.add_argument("--headless=new")
opts.add_argument("--disable-gpu")
opts.add_argument("--window-size=1440,960")
opts.add_argument("--no-sandbox")

print("Starting Chrome...", flush=True)
driver = webdriver.Chrome(options=opts)
try:
    print("Navigating to http://localhost:5174/ ...", flush=True)
    driver.get("http://localhost:5174/")
    time.sleep(3)

    # 1. Hero Start (scroll 0)
    driver.execute_script("window.scrollTo(0, 0);")
    time.sleep(1)
    p1 = os.path.join(artifact_dir, "verified_01_hero_storefront.png")
    driver.save_screenshot(p1)
    print("Saved verified_01_hero_storefront.png", flush=True)

    # 2. Scroll 1000px (entering parlour)
    driver.execute_script("window.scrollTo(0, 1000);")
    time.sleep(1.5)
    p2 = os.path.join(artifact_dir, "verified_02_hero_interior_walkthrough.png")
    driver.save_screenshot(p2)
    print("Saved verified_02_hero_interior_walkthrough.png", flush=True)

    # 3. Scroll 2000px (mid salon styling stations)
    driver.execute_script("window.scrollTo(0, 2000);")
    time.sleep(1.5)
    p3 = os.path.join(artifact_dir, "verified_03_hero_styling_stations.png")
    driver.save_screenshot(p3)
    print("Saved verified_03_hero_styling_stations.png", flush=True)

    # 4. Scroll 2800px (end of sequence: product vanity)
    driver.execute_script("window.scrollTo(0, 2800);")
    time.sleep(1.5)
    p4 = os.path.join(artifact_dir, "verified_04_hero_product_vanity.png")
    driver.save_screenshot(p4)
    print("Saved verified_04_hero_product_vanity.png", flush=True)

    # 5. Section 2 Header and 4 Cards
    driver.execute_script("document.getElementById('experience-section').scrollIntoView({behavior: 'instant', block: 'start'});")
    time.sleep(1.5)
    p5 = os.path.join(artifact_dir, "verified_05_experience_cards_section.png")
    driver.save_screenshot(p5)
    print("Saved verified_05_experience_cards_section.png", flush=True)

    # 6. Section 2 Trust Strip & Lifestyle Peek
    driver.execute_script("window.scrollBy(0, 480);")
    time.sleep(1.2)
    p6 = os.path.join(artifact_dir, "verified_06_trust_pillars_lifestyle.png")
    driver.save_screenshot(p6)
    print("Saved verified_06_trust_pillars_lifestyle.png", flush=True)

    # 7. Reverse scroll back to top (scroll 0)
    driver.execute_script("window.scrollTo(0, 0);")
    time.sleep(1.5)
    p7 = os.path.join(artifact_dir, "verified_07_reverse_scroll_to_top.png")
    driver.save_screenshot(p7)
    print("Saved verified_07_reverse_scroll_to_top.png", flush=True)

finally:
    driver.quit()
    print("All verified screenshots captured successfully!", flush=True)
