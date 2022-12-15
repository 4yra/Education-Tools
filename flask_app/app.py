from flask import Flask, jsonify, render_template, request
import urllib.request
from PIL import Image
import base64
import io
import numpy as np
import pickle
import cv2
import matplotlib.pyplot as plt

model = pickle.load(open('mnist_model.sav', 'rb'))

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict/', methods=['POST', 'GET'])
def predict():
    if request.method == 'POST':
       req = request.get_json()
    
    url = req['link']
    # print(url)

    def load_img(img_b64):
        decode_img = base64.b64decode(img_b64)
        image = Image.open(io.BytesIO(decode_img))
        image_np = np.array(image)
        gray = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
        img_resize = cv2.resize(gray, (28,28), interpolation=cv2.INTER_LINEAR)
        img_resize = cv2.bitwise_not(img_resize)
        return img_resize

    img = load_img(url)
    pred = int(model.predict(img.reshape(1, -1))[0])
    print(pred)


    return jsonify({'resp': pred}), 200

if __name__ == '__main__':
    app.run(debug=True)