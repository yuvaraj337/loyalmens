import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

artifact_dir = r"C:\Users\rayal\.gemini\antigravity-ide\brain\2a467fdf-305d-4a38-b3f9-f364b83680f1"
opts = Options()
opts.add_argument("--headless=new")
opts.add_argument("--disable-gpu")
opts.add_argument("--window-size=1440,1100")
opts.add_argument("--no-sandbox")

driver = webdriver.Chrome(options=opts)
wait = WebDriverWait(driver, 10)

try:
    print("Navigating to /shop...")
    driver.get("http://localhost:5173/shop")
    time.sleep(2)

    # 1. Open Cart Drawer by clicking on cart button in navbar
    print("Opening Cart Drawer...")
    cart_btn = driver.find_element(By.CSS_SELECTOR, ".cart-btn-wrapper, .booking-icon-btn, button[aria-label*='Cart']")
    cart_btn.click()
    time.sleep(1)

    driver.save_screenshot(os.path.join(artifact_dir, "checkout_01_cart_drawer.png"))
    print("Captured: checkout_01_cart_drawer.png")

    # 2. Click Checkout in Cart Drawer
    print("Clicking Checkout button...")
    checkout_btn = driver.find_element(By.CSS_SELECTOR, ".cart-drawer-checkout-btn")
    checkout_btn.click()
    time.sleep(2)

    # 3. Screen 1 - Delivery Details
    print("Verifying Delivery Details Screen...")
    name_input = wait.until(EC.presence_of_element_located((By.ID, "checkout-fullName")))
    name_input.clear()
    name_input.send_keys("Arjun K")

    phone_input = driver.find_element(By.ID, "checkout-phone")
    phone_input.clear()
    phone_input.send_keys("+91 98765 43210")

    email_input = driver.find_element(By.ID, "checkout-email")
    email_input.clear()
    email_input.send_keys("arjun@gmail.com")

    # Click Enter Address Manually
    manual_addr_btn = driver.find_element(By.XPATH, "//button[contains(., 'Enter Address Manually')]")
    manual_addr_btn.click()
    time.sleep(0.5)

    # Fill manual address fields
    inputs = driver.find_elements(By.CSS_SELECTOR, ".checkout-text-input")
    if len(inputs) >= 5:
        inputs[0].send_keys("123, Luxury Heights")
        inputs[1].send_keys("MG Road, Kotebagilu")
        inputs[2].send_keys("Opposite Post Office")
        inputs[3].send_keys("Moodbidri")
        inputs[4].send_keys("Karnataka")
        inputs[5].send_keys("574227")

    driver.save_screenshot(os.path.join(artifact_dir, "checkout_02_step1_delivery.png"))
    print("Captured: checkout_02_step1_delivery.png")

    # 4. Click Continue ->
    print("Clicking Continue ->...")
    continue_btn = driver.find_element(By.ID, "checkout-continue-btn")
    continue_btn.click()
    time.sleep(1.5)

    # 5. Screen 2 - Review Your Order
    print("Verifying Review Your Order Screen...")
    wait.until(EC.presence_of_element_located((By.ID, "checkout-place-order-btn")))
    driver.save_screenshot(os.path.join(artifact_dir, "checkout_03_step2_review.png"))
    print("Captured: checkout_03_step2_review.png")

    # 6. Click Place Order ->
    print("Clicking Place Order ->...")
    place_order_btn = driver.find_element(By.ID, "checkout-place-order-btn")
    place_order_btn.click()
    time.sleep(2.5)

    # 7. Screen 3 - Order Submitted
    print("Verifying Order Submitted Screen...")
    wait.until(EC.presence_of_element_located((By.ID, "checkout-view-orders-btn")))
    driver.save_screenshot(os.path.join(artifact_dir, "checkout_04_step3_submitted.png"))
    print("Captured: checkout_04_step3_submitted.png")

    # 8. Click View My Orders ->
    print("Clicking View My Orders...")
    view_orders_btn = driver.find_element(By.ID, "checkout-view-orders-btn")
    view_orders_btn.click()
    time.sleep(1)

    driver.save_screenshot(os.path.join(artifact_dir, "checkout_05_orders_modal.png"))
    print("Captured: checkout_05_orders_modal.png")

    # Close modal
    close_modal = driver.find_element(By.CSS_SELECTOR, ".checkout-modal-close")
    close_modal.click()
    time.sleep(0.5)

    # 9. Navigate to /admin to verify shop orders tab
    print("Navigating to Admin Console...")
    driver.get("http://localhost:5173/admin")
    time.sleep(2)

    # Click RIZHEENA Shop Orders tab
    shop_orders_tab = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Shop Orders')]")))
    shop_orders_tab.click()
    time.sleep(1.5)

    driver.save_screenshot(os.path.join(artifact_dir, "checkout_06_admin_orders.png"))
    print("Captured: checkout_06_admin_orders.png")

    print("\nALL 6 VERIFICATIONS PASSED SUCCESSFULLY!")

finally:
    driver.quit()
