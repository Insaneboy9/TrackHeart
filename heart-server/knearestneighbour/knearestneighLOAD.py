import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import joblib
import sys
import json

#parse the json arg
sample_data = json.loads(sys.argv[1]) 

# load the sample data
sample_data = np.array(sample_data).reshape(1,-1)
feature_names = ['age','sex','cp','trtbps','chol','fbs','restecg','thalachh','exng','oldpeak','slp','caa','thall']
sample_data_df = pd.DataFrame(sample_data, columns=feature_names)

# # load the saved pipeline
pipeline = joblib.load('./knearestneighbour/knn_pipeline.pkl')

# make predictions using the loaded pipeline
prediction = pipeline.predict(sample_data_df)
prediction = prediction.tolist()
# Write the output data back to Node.js
sys.stdout.write(json.dumps(prediction))
sys.stdout.flush()