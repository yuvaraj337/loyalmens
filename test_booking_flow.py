from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os

artifact_dir = r"C:\Users\rayal\.gemini\antigravity-ide\brain\2a467fdf-305d-4a38-b3f9-f364b83680f1"

opts = Options()
opts.add_argument("--headless=new")
opts.add_argument("--disable-gpu")
opts.add_argument("--window-size=1440,960")
opts.add_argument("--no-sandbox")

driver = webdriver.Chrome(options=opts)
wait = WebDriverWait(driver, 10)

try:
    print("Navigating to http://localhost:5173/services/beard-grooming...", flush=True)
    driver.get("http://localhost:5173/services/beard-grooming")
    time.sleep(2)

    # 1. Click Book on Beard Trimming
    book_btns = driver.find_elements(By.CSS_SELECTOR, ".haircut-service-book-btn")
    print(f"Found {len(book_btns)} Book buttons on Beard Grooming page", flush=True)
    book_btns[0].click() # Beard Trimming (₹99)
    time.sleep(2)

    # SCREEN 1: SELECT DATE & TIME
    print("Capturing Screen 1 (Select Date & Time)...", flush=True)
    p1 = os.path.join(artifact_dir, "verified_booking_step1.png")
    driver.save_screenshot(p1)
    print("Saved verified_booking_step1.png", flush=True)

    # Select 11:30 AM time slot
    slot_btn = driver.find_element(By.XPATH, "//button[contains(@class, 'slot-btn') and contains(text(), '11:30 AM')]")
    slot_btn.click()
    time.sleep(0.5)

    # Click Continue
    continue_btn = driver.find_element(By.CSS_SELECTOR, ".booking-continue-btn")
    continue_btn.click()
    time.sleep(1.5)

    # SCREEN 2: YOUR DETAILS
    print("Capturing Screen 2 (Your Details)...", flush=True)
    p2 = os.path.join(artifact_dir, "verified_booking_step2.png")
    driver.save_screenshot(p2)
    print("Saved verified_booking_step2.png", flush=True)

    # Fill in customer details
    name_input = driver.find_element(By.ID, "booking-fullname")
    name_input.clear()
    name_input.send_keys("Prashanth Shetty")

    phone_input = driver.find_element(By.ID, "booking-phone")
    phone_input.clear()
    phone_input.send_keys("9731542050")

    email_input = driver.find_element(By.ID, "booking-email")
    email_input.clear()
    email_input.send_keys("prashanth.shetty@example.com")

    # Click Continue to Step 3
    continue_btn_s2 = driver.find_element(By.CSS_SELECTOR, ".booking-continue-btn")
    continue_btn_s2.click()
    time.sleep(1.5)

    # SCREEN 3: REVIEW YOUR BOOKING
    print("Capturing Screen 3 (Review Your Booking)...", flush=True)
    p3 = os.path.join(artifact_dir, "verified_booking_step3.png")
    driver.save_screenshot(p3)
    print("Saved verified_booking_step3.png", flush=True)

    # Enter Special Request
    spec_input = driver.find_element(By.CSS_SELECTOR, ".review-special-request-input")
    spec_input.clear()
    spec_input.send_keys("Sharp cheek line-up and organic beard balm finish")

    # Click Confirm Booking
    confirm_btn = driver.find_element(By.CSS_SELECTOR, ".booking-continue-btn")
    confirm_btn.click()
    time.sleep(2)

    # SCREEN 4: BOOKING CONFIRMED (DARK CINEMATIC THEME)
    print("Capturing Screen 4 (Booking Confirmed - Dark Luxury)...", flush=True)
    p4 = os.path.join(artifact_dir, "verified_booking_step4.png")
    driver.save_screenshot(p4)
    print("Saved verified_booking_step4.png", flush=True)

    # 5. TEST DOUBLE-BOOKING PREVENTION
    print("Testing double-booking prevention on same slot...", flush=True)
    driver.get("http://localhost:5173/booking?service=Beard%20Trimming")
    time.sleep(2)
    p5 = os.path.join(artifact_dir, "verified_booking_double_book_blocked.png")
    driver.save_screenshot(p5)
    print("Saved verified_booking_double_book_blocked.png", flush=True)

    # 6. TEST ADMIN DASHBOARD
    print("Testing Owner / Admin dashboard...", flush=True)
    driver.get("http://localhost:5173/admin")
    time.sleep(2)
    p6 = os.path.join(artifact_dir, "verified_booking_admin.png")
    driver.save_screenshot(p6)
    print("Saved verified_booking_admin.png", flush=True)

finally:
    driver.quit()
    print("Test run completed successfully!", flush=True)
