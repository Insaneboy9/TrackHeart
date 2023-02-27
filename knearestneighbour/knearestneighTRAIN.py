import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix
import joblib

# load the dataset
data = pd.read_csv('heart.csv')

# preprocess the data
X = data.drop('output', axis=1)
y = data["output"]

# split the data into training and testing datasets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

# create a pipeline to chain the feature scaling and classifier steps
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', KNeighborsClassifier(n_neighbors=5))
])

# fit the pipeline to the training data
pipe.fit(X_train, y_train)

# evaluate the model
y_pred = pipe.predict(X_test)
print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))

# save the model to a file
joblib.dump(pipe, 'knn_pipeline.pkl')


# make predictions
# sample_data = np.array([60,1,0,145,282,0,0,142,1,2.8,1,2,3]).reshape(1,-1)
# feature_names = ['age','sex','cp','trtbps','chol','fbs','restecg','thalachh','exng','oldpeak','slp','caa','thall']
# sample_data_df = pd.DataFrame(sample_data, columns=feature_names)  # create DataFrame with feature names
# prediction = pipe.predict(sample_data_df)
# print(prediction)






