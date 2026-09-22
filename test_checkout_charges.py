import os
import sys
import time
import json

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

def run_tests():
    opts = Options()
    opts.add_argument('--headless=new')
    opts.add_argument('--window-size=1400,1000')
    driver = webdriver.Chrome(options=opts)
    driver.set_page_load_timeout(30)
    
    os.makedirs('verification_screenshots', exist_ok=True)
    results = {}

    try:
        print("=== TEST 1: ONE PRODUCT CHECKOUT ===")
        # Navigate to all products page
        driver.get('http://localhost:5173/shop/all-products')
        time.sleep(2)
        driver.execute_script("localStorage.clear(); sessionStorage.clear();")
        driver.refresh()
        time.sleep(2)

        # Find .atc-btn buttons
        add_buttons = driver.find_elements(By.CSS_SELECTOR, 'button.atc-btn')
        print(f"Found {len(add_buttons)} add-to-cart (.atc-btn) buttons on all-products page")
        if not add_buttons:
            raise Exception("No .atc-btn buttons found on all-products page")
        
        # Click the first product's add button
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", add_buttons[0])
        time.sleep(0.5)
        add_buttons[0].click()
        time.sleep(2)

        # Check cart page
        driver.get('http://localhost:5173/shop/cart')
        time.sleep(2)
        driver.save_screenshot('verification_screenshots/1_single_product_cart.png')

        # Read summary on cart page
        cart_rows = driver.find_elements(By.CSS_SELECTOR, '.cart-page-summary-row')
        print(f"Cart page summary rows count: {len(cart_rows)}")
        cart_text = [row.text for row in cart_rows]
        print("Cart Summary Rows:", [t.replace('₹', 'Rs.') for t in cart_text])
        
        # Extract subtotal, gst, delivery, total from page
        subtotal_elem = driver.find_element(By.XPATH, "//span[contains(text(), 'Subtotal')]/following-sibling::span")
        gst_elem = driver.find_element(By.XPATH, "//span[contains(text(), 'GST (12%)')]/following-sibling::span")
        deliv_elem = driver.find_element(By.XPATH, "//span[contains(text(), 'Delivery Charges')]/following-sibling::span")
        total_elem = driver.find_element(By.CSS_SELECTOR, '.cart-page-summary-value--total')

        subtotal_val = int(subtotal_elem.text.replace('₹', '').replace(',', '').strip())
        gst_val = int(gst_elem.text.replace('₹', '').replace(',', '').strip())
        deliv_val = int(deliv_elem.text.replace('₹', '').replace(',', '').strip())
        total_val = int(total_elem.text.replace('₹', '').replace(',', '').strip())

        expected_gst = round(subtotal_val * 0.12)
        expected_total = subtotal_val + expected_gst + 50
        print(f"Single Product: Subtotal=Rs.{subtotal_val}, GST=Rs.{gst_val} (expected Rs.{expected_gst}), Delivery=Rs.{deliv_val}, Total=Rs.{total_val} (expected Rs.{expected_total})")

        assert deliv_val == 50, f"Delivery charge must be 50, got {deliv_val}"
        assert gst_val == expected_gst, f"GST must be {expected_gst}, got {gst_val}"
        assert total_val == expected_total, f"Total must be {expected_total}, got {total_val}"
        results['test_1_single_product'] = 'PASSED'

        print("\n=== TEST 2: MULTIPLE-PRODUCT CHECKOUT ===")
        # Go back to all products and add a second and third product
        driver.get('http://localhost:5173/shop/all-products')
        time.sleep(2)
        add_buttons = driver.find_elements(By.CSS_SELECTOR, 'button.atc-btn')
        if len(add_buttons) > 1:
            driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", add_buttons[1])
            time.sleep(0.5)
            add_buttons[1].click()
            time.sleep(2)
        
        if len(add_buttons) > 2:
            driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", add_buttons[2])
            time.sleep(0.5)
            add_buttons[2].click()
            time.sleep(2)

        driver.get('http://localhost:5173/shop/cart')
        time.sleep(2)
        driver.save_screenshot('verification_screenshots/2_multi_product_cart.png')

        subtotal_elem = driver.find_element(By.XPATH, "//span[contains(text(), 'Subtotal')]/following-sibling::span")
        gst_elem = driver.find_element(By.XPATH, "//span[contains(text(), 'GST (12%)')]/following-sibling::span")
        deliv_elem = driver.find_element(By.XPATH, "//span[contains(text(), 'Delivery Charges')]/following-sibling::span")
        total_elem = driver.find_element(By.CSS_SELECTOR, '.cart-page-summary-value--total')

        multi_subtotal = int(subtotal_elem.text.replace('₹', '').replace(',', '').strip())
        multi_gst = int(gst_elem.text.replace('₹', '').replace(',', '').strip())
        multi_deliv = int(deliv_elem.text.replace('₹', '').replace(',', '').strip())
        multi_total = int(total_elem.text.replace('₹', '').replace(',', '').strip())

        expected_multi_gst = round(multi_subtotal * 0.12)
        expected_multi_total = multi_subtotal + expected_multi_gst + 50
        print(f"Multi-Product: Subtotal=Rs.{multi_subtotal}, GST=Rs.{multi_gst} (expected Rs.{expected_multi_gst}), Delivery=Rs.{multi_deliv}, Total=Rs.{multi_total} (expected Rs.{expected_multi_total})")

        assert multi_deliv == 50, f"Delivery must be Rs.50 once for multiple products, got {multi_deliv}"
        assert multi_gst == expected_multi_gst, f"GST must be {expected_multi_gst}, got {multi_gst}"
        assert multi_total == expected_multi_total, f"Total must be {expected_multi_total}, got {multi_total}"
        results['test_2_multiple_products'] = 'PASSED'

        # Also check Checkout Page sidebar breakdown for multi-products
        driver.get('http://localhost:5173/shop/checkout')
        time.sleep(2)
        driver.save_screenshot('verification_screenshots/2b_multi_product_checkout.png')
        co_sidebar = driver.find_element(By.CSS_SELECTOR, '.checkout-summary-sidebar')
        print("Checkout Sidebar text:\n", co_sidebar.text.replace('₹', 'Rs.'))
        assert "Subtotal" in co_sidebar.text
        assert "GST (12%)" in co_sidebar.text
        assert "Delivery Charges" in co_sidebar.text
        assert "50" in co_sidebar.text
        assert str(multi_total) in co_sidebar.text.replace(',', '')

        print("\n=== TEST 3: QUANTITY CHANGE ===")
        driver.get('http://localhost:5173/shop/cart')
        time.sleep(2)

        # Click '+' button on first item
        plus_buttons = driver.find_elements(By.CSS_SELECTOR, '.cart-page-qty-btn')
        inc_btn = [b for b in plus_buttons if b.text.strip() == '+'][0]
        inc_btn.click()
        time.sleep(1)
        driver.save_screenshot('verification_screenshots/3_quantity_increase.png')

        subtotal_elem = driver.find_element(By.XPATH, "//span[contains(text(), 'Subtotal')]/following-sibling::span")
        gst_elem = driver.find_element(By.XPATH, "//span[contains(text(), 'GST (12%)')]/following-sibling::span")
        deliv_elem = driver.find_element(By.XPATH, "//span[contains(text(), 'Delivery Charges')]/following-sibling::span")
        total_elem = driver.find_element(By.CSS_SELECTOR, '.cart-page-summary-value--total')

        qty_subtotal = int(subtotal_elem.text.replace('₹', '').replace(',', '').strip())
        qty_gst = int(gst_elem.text.replace('₹', '').replace(',', '').strip())
        qty_deliv = int(deliv_elem.text.replace('₹', '').replace(',', '').strip())
        qty_total = int(total_elem.text.replace('₹', '').replace(',', '').strip())

        expected_qty_gst = round(qty_subtotal * 0.12)
        expected_qty_total = qty_subtotal + expected_qty_gst + 50
        print(f"After Qty Increase: Subtotal=Rs.{qty_subtotal}, GST=Rs.{qty_gst}, Delivery=Rs.{qty_deliv}, Total=Rs.{qty_total}")

        assert qty_deliv == 50, f"Delivery must be Rs.50, got {qty_deliv}"
        assert qty_gst == expected_qty_gst, f"GST recalculation failed: expected {expected_qty_gst}, got {qty_gst}"
        assert qty_total == expected_qty_total, f"Total recalculation failed: expected {expected_qty_total}, got {qty_total}"
        results['test_3_quantity_change'] = 'PASSED'

        print("\n=== TEST 4: PRODUCT REMOVAL ===")
        remove_buttons = driver.find_elements(By.CSS_SELECTOR, '.cart-page-remove')
        while remove_buttons:
            remove_buttons[0].click()
            time.sleep(1)
            remove_buttons = driver.find_elements(By.CSS_SELECTOR, '.cart-page-remove')
            if remove_buttons:
                # Check dynamic recalculation after partial removal
                subtotal_elem = driver.find_element(By.XPATH, "//span[contains(text(), 'Subtotal')]/following-sibling::span")
                gst_elem = driver.find_element(By.XPATH, "//span[contains(text(), 'GST (12%)')]/following-sibling::span")
                total_elem = driver.find_element(By.CSS_SELECTOR, '.cart-page-summary-value--total')
                rem_sub = int(subtotal_elem.text.replace('₹', '').replace(',', '').strip())
                rem_gst = int(gst_elem.text.replace('₹', '').replace(',', '').strip())
                rem_tot = int(total_elem.text.replace('₹', '').replace(',', '').strip())
                assert rem_gst == round(rem_sub * 0.12)
                assert rem_tot == rem_sub + rem_gst + 50
                print(f"Partial removal check passed: Subtotal=Rs.{rem_sub}, GST=Rs.{rem_gst}, Total=Rs.{rem_tot}")

        driver.save_screenshot('verification_screenshots/4_cart_empty.png')
        empty_msg = driver.find_element(By.CSS_SELECTOR, '.cart-page-empty-text')
        print("Empty cart message:", empty_msg.text)
        assert "haven't added" in empty_msg.text.lower() or "empty" in empty_msg.text.lower()
        results['test_4_product_removal'] = 'PASSED'

        print("\n=== TEST 5: SERVICE BOOKING CHECKOUT ===")
        # Navigate to service booking flow
        driver.get('http://localhost:5173/booking')
        time.sleep(2)

        # Step 1: Select Date & Continue
        step1_btns = [b for b in driver.find_elements(By.XPATH, "//button[contains(@class, 'booking-primary-btn') and contains(., 'Continue')]") if b.is_displayed()]
        driver.execute_script("arguments[0].click();", step1_btns[0] if step1_btns else driver.find_element(By.XPATH, "//button[contains(@class, 'booking-primary-btn') and contains(., 'Continue')]"))
        time.sleep(2)

        # Step 2: Select Time & Continue
        time_slots = [b for b in driver.find_elements(By.CSS_SELECTOR, '.time-slot-btn:not(.booked)') if b.is_displayed()]
        if time_slots:
            driver.execute_script("arguments[0].click();", time_slots[0])
            time.sleep(0.5)

        step2_btns = [b for b in driver.find_elements(By.XPATH, "//button[contains(@class, 'booking-primary-btn') and contains(., 'Continue')]") if b.is_displayed()]
        driver.execute_script("arguments[0].click();", step2_btns[0] if step2_btns else driver.find_element(By.XPATH, "//button[contains(@class, 'booking-primary-btn') and contains(., 'Continue')]"))
        time.sleep(2)

        # Step 3: Enter Customer Details
        name_input = driver.find_element(By.NAME, "fullName")
        name_input.clear()
        name_input.send_keys("Antigravity Test Customer")

        phone_input = driver.find_element(By.NAME, "phone")
        phone_input.clear()
        phone_input.send_keys("9876543210")

        step3_btns = [b for b in driver.find_elements(By.XPATH, "//button[contains(@class, 'booking-primary-btn') and contains(., 'Continue')]") if b.is_displayed()]
        driver.execute_script("arguments[0].click();", step3_btns[0] if step3_btns else driver.find_element(By.XPATH, "//button[contains(@class, 'booking-primary-btn') and contains(., 'Continue')]"))
        time.sleep(2.5)

        # Step 4: Review Booking Screen
        driver.save_screenshot('verification_screenshots/5a_service_step4_review.png')
        review_card = driver.find_element(By.CSS_SELECTOR, '.review-details-list')
        review_text = review_card.text
        print("Step 4 Review details text:\n", review_text.replace('₹', 'Rs.'))

        assert "Subtotal" in review_text, "Step 4 must show Subtotal"
        assert "GST (12%)" in review_text, "Step 4 must show GST (12%)"
        assert "Delivery Charges" in review_text, "Step 4 must show Delivery Charges"
        assert "Total" in review_text, "Step 4 must show Total"
        assert "50" in review_text, "Step 4 Delivery Charge must be 50"

        # Check values
        sub_row = driver.find_element(By.XPATH, "//span[contains(@class, 'review-detail-label') and text()='Subtotal']/following::span[contains(@class, 'review-detail-val')][1]")
        gst_row = driver.find_element(By.XPATH, "//span[contains(@class, 'review-detail-label') and text()='GST (12%)']/following::span[contains(@class, 'review-detail-val')][1]")
        deliv_row = driver.find_element(By.XPATH, "//span[contains(@class, 'review-detail-label') and text()='Delivery Charges']/following::span[contains(@class, 'review-detail-val')][1]")
        tot_row = driver.find_element(By.XPATH, "//span[contains(@class, 'review-detail-label') and text()='Total']/following::span[contains(@class, 'review-detail-val')][1]")

        svc_sub = int(sub_row.text.replace('₹', '').replace(',', '').strip())
        svc_gst = int(gst_row.text.replace('₹', '').replace(',', '').strip())
        svc_del = int(deliv_row.text.replace('₹', '').replace(',', '').strip())
        svc_tot = int(tot_row.text.replace('₹', '').replace(',', '').strip())

        exp_svc_gst = round(svc_sub * 0.12)
        exp_svc_tot = svc_sub + exp_svc_gst + 50

        print(f"Service Step 4: Subtotal=Rs.{svc_sub}, GST=Rs.{svc_gst} (expected Rs.{exp_svc_gst}), Delivery=Rs.{svc_del}, Total=Rs.{svc_tot} (expected Rs.{exp_svc_tot})")
        assert svc_del == 50
        assert svc_gst == exp_svc_gst
        assert svc_tot == exp_svc_tot

        # Confirm booking -> Step 5
        confirm_btn = driver.find_element(By.XPATH, "//button[contains(., 'Confirm Booking')]")
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", confirm_btn)
        time.sleep(0.5)
        confirm_btn.click()
        time.sleep(2.5)

        driver.save_screenshot('verification_screenshots/5b_service_step5_confirmed.png')
        conf_card = driver.find_element(By.CSS_SELECTOR, '.confirmation-details-list')
        conf_text = conf_card.text
        print("Step 5 Confirmed details text:\n", conf_text.replace('₹', 'Rs.'))

        assert "Subtotal" in conf_text
        assert "GST (12%)" in conf_text
        assert "Delivery Charges" in conf_text
        assert "Total Amount" in conf_text
        assert "50" in conf_text

        results['test_5_service_booking'] = 'PASSED'
        print("\n==========================================")
        print("ALL 5 TESTS PASSED SUCCESSFULLY!")
        print("==========================================")
        print(json.dumps(results, indent=2))

    except Exception as e:
        print(f"TEST FAILED: {e}")
        driver.save_screenshot('verification_screenshots/error.png')
        raise e
    finally:
        driver.quit()

if __name__ == '__main__':
    run_tests()
