import network
import urequests
import time
import random

SSID = "Wokwi-GUEST"
PASSWORD = ""
WRITE_API_KEY = "K1NS94116VO6OWUV"

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(SSID, PASSWORD)
while not wlan.isconnected():
    print("Connecting...")
    time.sleep(1)
print("Connected!")

while True:
    motion = random.choice([0, 1])  # 1 = liike, 0 = ei liikettä
    print("Liike:", motion)
    url = f"https://api.thingspeak.com/update?api_key={WRITE_API_KEY}&field1={motion}"
    try:
        res = urequests.get(url)
        print("ThingSpeak response:", res.text)
        res.close()
    except Exception as e:
        print("Error:", e)
    time.sleep(20)



