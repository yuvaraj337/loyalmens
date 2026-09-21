import subprocess
import time
import urllib.request
import json
import base64
import os
import websocket

artifact_dir = r"C:\Users\rayal\.gemini\antigravity-ide\brain\2a467fdf-305d-4a38-b3f9-f364b83680f1"
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
port = 9333
profile_dir = r"C:\Users\rayal\AppData\Local\Temp\chrome_cdp_profile_fresh"

def capture():
    print(f"Launching Chrome on port {port}...", flush=True)
    proc = subprocess.Popen([
        chrome_path,
        "--headless=new",
        f"--remote-debugging-port={port}",
        "--remote-allow-origins=*",
        f"--user-data-dir={profile_dir}",
        "--disable-gpu",
        "--window-size=1440,960",
        "about:blank"
    ])

    try:
        time.sleep(2.5)
        with urllib.request.urlopen(f"http://localhost:{port}/json") as r:
            targets = json.loads(r.read())
            ws_url = targets[0]["webSocketDebuggerUrl"]
            print(f"Connected to {ws_url}", flush=True)

        ws = websocket.create_connection(ws_url, suppress_origin=True)
        msg_id = 0

        def send_cmd(method, params=None):
            nonlocal msg_id
            msg_id += 1
            payload = {"id": msg_id, "method": method}
            if params:
                payload["params"] = params
            ws.send(json.dumps(payload))
            while True:
                resp = ws.recv()
                data = json.loads(resp)
                if data.get("id") == msg_id:
                    return data.get("result", {})

        send_cmd("Page.enable")
        send_cmd("Runtime.enable")
        send_cmd("Emulation.setDeviceMetricsOverride", {
            "width": 1440,
            "height": 960,
            "deviceScaleFactor": 1,
            "mobile": False
        })

        print("Navigating to http://localhost:5174/ ...", flush=True)
        send_cmd("Page.navigate", {"url": "http://localhost:5174/"})
        time.sleep(3.5)

        def take_screenshot(filename):
            res = send_cmd("Page.captureScreenshot", {"format": "png"})
            if "data" in res:
                raw = base64.b64decode(res["data"])
                path = os.path.join(artifact_dir, filename)
                with open(path, "wb") as f:
                    f.write(raw)
                print(f"Captured: {filename} ({len(raw)} bytes)", flush=True)
            else:
                print(f"Error capturing {filename}: {res}", flush=True)

        # 1. Hero start
        take_screenshot("screenshot_01_hero_start.png")

        # 2. Scroll 600px
        send_cmd("Runtime.evaluate", {"expression": "window.scrollTo(0, 600);"})
        time.sleep(1.2)
        take_screenshot("screenshot_02_hero_scroll_600.png")

        # 3. Scroll 1600px
        send_cmd("Runtime.evaluate", {"expression": "window.scrollTo(0, 1600);"})
        time.sleep(1.2)
        take_screenshot("screenshot_03_hero_scroll_1600.png")

        # 4. Scroll 2800px
        send_cmd("Runtime.evaluate", {"expression": "window.scrollTo(0, 2800);"})
        time.sleep(1.2)
        take_screenshot("screenshot_04_hero_scroll_2800.png")

        # 5. Scroll to Section 2 (Choose Your Experience)
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('experience-section').scrollIntoView({behavior: 'instant'});"})
        time.sleep(1.5)
        take_screenshot("screenshot_05_experience_section.png")

        # 6. Scroll down to show trust strip and lifestyle peek
        send_cmd("Runtime.evaluate", {"expression": "window.scrollBy(0, 480);"})
        time.sleep(1.2)
        take_screenshot("screenshot_06_trust_pillars.png")

        # 7. Reverse scroll back to top (0px)
        send_cmd("Runtime.evaluate", {"expression": "window.scrollTo(0, 0);"})
        time.sleep(1.2)
        take_screenshot("screenshot_07_hero_reverse_top.png")

        ws.close()
        print("All screenshots successfully captured!", flush=True)

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()

if __name__ == "__main__":
    capture()
