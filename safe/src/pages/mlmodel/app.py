from flask import Flask, render_template, request
from flask_cors import CORS
import json
import numpy as np
import pandas as pd
from scipy.stats import mode
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix    
import pickle

#no need to do this thing lmao
#

app = Flask(__name__)
cors = CORS(app)

DATA_PATH = "Training.csv"
data = pd.read_csv(DATA_PATH).dropna(axis = 1)

encoder = LabelEncoder()
data["prognosis"] = encoder.fit_transform(data["prognosis"])

X = data.iloc[:,:-1]

svm_model = pickle.load(open('svm_model.pkl', 'rb'))
nb_model = pickle.load(open('nb_model.pkl', 'rb'))
rf_model = pickle.load(open('rf_model.pkl', 'rb'))

symptoms = X.columns.values
 
symptom_index = {}
for index, value in enumerate(symptoms):
    symptom = " ".join([i.capitalize() for i in value.split("_")])
    symptom_index[symptom] = index
 
data_dict = {
    "symptom_index":symptom_index,
    "predictions_classes":encoder.classes_
}


# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/change', methods = ['POST'])
# def change():
#     #print(request.form)
#     symptoms = [str(x) for x in request.form.values()]
#     input_data = [0] * len(data_dict["symptom_index"])
#     print(input_data)
#     for symptom in symptoms:
#         index = data_dict["symptom_index"][symptom]
#         input_data[index] = 1
         
#     input_data = np.array(input_data).reshape(1,-1)


#     rf_prediction = data_dict["predictions_classes"][rf_model.predict(input_data)[0]]
#     nb_prediction = data_dict["predictions_classes"][nb_model.predict(input_data)[0]]
#     svm_prediction = data_dict["predictions_classes"][svm_model.predict(input_data)[0]]

#     a = list(set([rf_prediction, nb_prediction, svm_prediction]))
#     final_prediction = ', '.join(a)
#     return render_template('index1.html', dt1 = final_prediction)

# @app.route('/allergy/<name>')
# def allergy(name):
#     data = json.loads(name)
#     print(data)
#     return json.dumps('name')

@app.route('/<s>')
def predict(s):
    s = json.loads(s)
    symptoms = []
    for x in s.keys():
        if s[x]:
            symptoms.append(x)
    input_data = [0] * len(data_dict["symptom_index"])
    print(input_data)
    for symptom in symptoms:
        index = data_dict["symptom_index"][symptom]
        input_data[index] = 1
         
    input_data = np.array(input_data).reshape(1,-1)


    rf_prediction = data_dict["predictions_classes"][rf_model.predict(input_data)[0]]
    nb_prediction = data_dict["predictions_classes"][nb_model.predict(input_data)[0]]
    svm_prediction = data_dict["predictions_classes"][svm_model.predict(input_data)[0]]
    a = list(set([rf_prediction, nb_prediction, svm_prediction]))
    final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])[0][0]
    #print(s)
    return json.dumps(final_prediction)


if __name__ == '__main__':
    app.run(debug = True, port=5000)