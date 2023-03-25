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

DATA_PATH = "Training.csv"
data = pd.read_csv(DATA_PATH).dropna(axis = 1)

encoder = LabelEncoder()
data["prognosis"] = encoder.fit_transform(data["prognosis"])

X = data.iloc[:,:-1]
y = data.iloc[:, -1]

svm_model = SVC()
nb_model = GaussianNB()
rf_model = RandomForestClassifier(random_state = 18)
svm_model.fit(X, y)
nb_model.fit(X, y)
rf_model.fit(X, y)

test_data = pd.read_csv("Testing.csv").dropna(axis = 1)

test_X = test_data.iloc[:, :-1]
test_Y = encoder.transform(test_data.iloc[:, -1])

svm_preds = svm_model.predict(test_X)
nb_preds = nb_model.predict(test_X)
rf_preds = rf_model.predict(test_X)

pickle.dump(svm_model, open('svm_model.pkl', 'wb'))
pickle.dump(nb_model, open('nb_model.pkl', 'wb'))
pickle.dump(rf_model, open('rf_model.pkl', 'wb'))


symptoms = X.columns.values
 
symptom_index = {}
for index, value in enumerate(symptoms):
    symptom = " ".join([i.capitalize() for i in value.split("_")])
    symptom_index[symptom] = index
 
data_dict = {
    "symptom_index":symptom_index,
    "predictions_classes":encoder.classes_
}
 

def predictDisease(symptoms):
    symptoms = symptoms.split(",")
     
    input_data = [0] * len(data_dict["symptom_index"])
    for symptom in symptoms:
        index = data_dict["symptom_index"][symptom]
        input_data[index] = 1
         
    input_data = np.array(input_data).reshape(1,-1)
     
    rf_prediction = data_dict["predictions_classes"][rf_model.predict(input_data)[0]]
    nb_prediction = data_dict["predictions_classes"][nb_model.predict(input_data)[0]]
    svm_prediction = data_dict["predictions_classes"][svm_model.predict(input_data)[0]]
     
    # making final prediction by taking mode of all predictions
    final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])[0][0]
    
    return final_prediction
 
# Testing the function
print(predictDisease("Itching,Skin Rash,Nodal Skin Eruptions"))