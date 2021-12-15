import RPi.GPIO as GPIO
import dht11
import mh_z19
import json
import requests
from requests.api import head

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.cleanup()

input = False


for x in range(10):
    print("Try: " + str(x))
    try:
        dht11Instance = dht11.DHT11(pin = 4)
        dht11Result = dht11Instance.read()
        mhz19data = mh_z19.read_all()
        if dht11Result.is_valid():
            print("Temperature: %-3.1f C" % dht11Result.temperature)
            print("Humidity: %-3.1f %%" % dht11Result.humidity)
            input = True
            break
        else:
            print("Error: %d" % dht11Result.error_code)

    except:
        pass


jsonstring = {
    "co2": {
        "value": str(mhz19data['co2']),
        "unit": "ppm"
    },
    "humidity": {
        "value": str(dht11Result.humidity),
        "unit": "%"
    },
    "temperature": {
        "value": str(dht11Result.temperature),
        "unit": "°C"
    }
}
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}


if input:
    for x in range(10):
        try:
            r = requests.post('http://10.10.2.196:3000/api/sensordata/' + '1', data=json.dumps(jsonstring), headers=headers)
            break
        except Exception as e:
            print(e)
            pass

    print(jsonstring)
else:
    print ("Error")