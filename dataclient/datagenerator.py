import json
import requests
from requests.api import head
import random

jsonstring = {
    "co2": {
        "value": str(random.randint(1000, 6000)),
        "unit": "ppm"
    },
    "humidity": {
        "value": str(random.uniform(0, 100)),
        "unit": "%"
    },
    "temperature": {
        "value": str(random.uniform(-20, 40)),
        "unit": "°C"
    }
}
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}


r = requests.post('http://localhost:3000/api/sensordata/' + '1', data=json.dumps(jsonstring), headers=headers)