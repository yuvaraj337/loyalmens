import urllib.request
import json
import websocket
import subprocess
import time

proc = subprocess.Popen([
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless=new",
    "--remote-debugging-port=9222",
    "--remote-allow-origins=*",
    "--user-data-dir=C:\\Users\\rayal\\AppData\\Local\\Temp\\chrome_cdp_profile_dbg",
    "about:blank"
])

try:
    time.sleep(2)
    with urllib.request.urlopen("http://localhost:9222/json") as r:
        ws_url = json.loads(r.read())[0]["webSocketDebuggerUrl"]
    ws = websocket.create_connection(ws_url, suppress_origin=True)

    msg_id = 0
    def cmd(method, params=None):
        global msg_id
        msg_id += 1
        payload = {"id": msg_id, "method": method}
        if params: payload["params"] = params
        ws.send(json.dumps(payload))
        while True:
            d = json.loads(ws.recv())
            if d.get("id") == msg_id:
                return d.get("result", {})

    cmd("Page.enable")
    cmd("Runtime.enable")
    cmd("Page.navigate", {"url": "http://localhost:5174/"})
    time.sleep(3)

    # 1. Inspect at scroll 0
    code0 = """
    (() => {
        const c = document.querySelector('canvas');
        return {
            scrollY: window.scrollY,
            cw: c ? c.width : null,
            ch: c ? c.height : null,
            canvasStyle: c ? c.getAttribute('style') : null
        };
    })()
    """
    res0 = cmd("Runtime.evaluate", {"expression": code0, "returnByValue": True})
    print("Scroll 0:", res0)

    # 2. Scroll to 800
    cmd("Runtime.evaluate", {"expression": "window.scrollTo(0, 800);"})
    time.sleep(1.5)

    code800 = """
    (() => {
        const c = document.querySelector('canvas');
        const track = document.querySelector('.cinematic-hero-track');
        const sticky = document.querySelector('.cinematic-hero-sticky');
        const rTrack = track.getBoundingClientRect();
        const rSticky = sticky.getBoundingClientRect();
        return {
            scrollY: window.scrollY,
            trackTop: rTrack.top,
            trackHeight: rTrack.height,
            stickyTop: rSticky.top,
            stickyHeight: rSticky.height,
            winH: window.innerHeight,
            cw: c ? c.width : null,
            ch: c ? c.height : null
        };
    })()
    """
    res800 = cmd("Runtime.evaluate", {"expression": code800, "returnByValue": True})
    print("Scroll 800:", res800)

    ws.close()
finally:
    proc.terminate()
