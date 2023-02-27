import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import joblib

#LOAD THE MODEL CODE

# load the saved pipeline
pipeline = joblib.load('knn_pipeline.pkl')

# load the sample data
sample_data = np.array([60,1,0,145,282,0,0,142,1,2.8,1,2,3]).reshape(1,-1)
feature_names = ['age','sex','cp','trtbps','chol','fbs','restecg','thalachh','exng','oldpeak','slp','caa','thall']
sample_data_df = pd.DataFrame(sample_data, columns=feature_names)

# make predictions using the loaded pipeline
prediction = pipeline.predict(sample_data_df)
print(prediction)