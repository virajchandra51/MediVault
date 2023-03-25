from flask import Flask
from flask_cors import CORS
from cryptography.fernet import Fernet
import json

hashing = Flask(__name__)
cors = CORS(hashing)
fernet = Fernet(100)

@hashing.route('/hashing/<data>')
def hash(data):
    data = json.loads(data)
    encdata = fernet.encrypt(data.encode())
    
    return json.dumps(encdata)

@hashing.route('/unhashing/<data>')
def unhash(data):
    data = json.loads(data)
    
    decdata = fernet.decrypt(data).decode()
    return json.dumps(decdata)

if __name__ == '__main__':
    hashing.run(host = '172.22.137.252',debug = True, port=5001)
