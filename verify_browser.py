import os
import sys
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

sys.stdout.reconfigure(encoding='utf-8')

def run_browser_verification():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--window-size=1440,1080")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=chrome_options)
    
    routes = [
        ('/shop', 'shop_home'),
        ('/shop/hair-care', 'cat_hair_care'),
        ('/shop/face-care', 'cat_face_care'),
        ('/shop/beard-care', 'cat_beard_care'),
        ('/shop/professional-kits', 'cat_pro_kits'),
        ('/shop/special-care', 'cat_special_care'),
        ('/shop/gift-sets', 'cat_gift_sets'),
        ('/shop/all-products', 'cat_all_products'),
        ('/booking', 'services_booking'),
    ]

    os.makedirs('verification_screenshots', exist_ok=True)
    all_ok = True

    for route, label in routes:
        url = f'http://localhost:5173{route}'
        print(f'Checking: {url} ...')
        driver.get(url)
        time.sleep(1.5)

        # Check for broken images (naturalWidth == 0)
        broken_imgs = driver.execute_script('''
            var imgs = document.getElementsByTagName("img");
            var broken = [];
            for (var i = 0; i < imgs.length; i++) {
                if (!imgs[i].complete || imgs[i].naturalWidth === 0) {
                    broken.push(imgs[i].src);
                }
            }
            return broken;
        ''')

        if broken_imgs:
            print(f'  FAILED! Broken images on {route}:', broken_imgs)
            all_ok = False
        else:
            print(f'  OK - All images rendered properly on {route}')

        screenshot_path = f'verification_screenshots/{label}.png'
        driver.save_screenshot(screenshot_path)

    driver.quit()
    if all_ok:
        print('\nSUCCESS: All routes verified with 0 broken images!')
    else:
        print('\nFAILED: Some images are broken.')
        sys.exit(1)

if __name__ == '__main__':
    run_browser_verification()
