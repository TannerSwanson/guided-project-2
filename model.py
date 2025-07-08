from sklearn.tree import DecisionTreeClassifier
from matplotlib import pyplot as plt 
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd
import pickle as pkl


df = pd.read_csv("troop_movements.csv")
#X = df[['homeworld', 'unit_type']]
#print(df.columns)
y = df['empire_or_resistance'].apply(lambda x: True if x == "resistance" else False)

categorical_features = ['homeworld', 'unit_type']

X = pd.get_dummies(df[['homeworld', 'unit_type']])

dt = DecisionTreeClassifier()

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

dt.fit(X_train, y_train)
y_pred = dt.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

importances = dt.feature_importances_

feature_importances = pd.DataFrame({'Feature': X.columns, 'Importance': importances})

feature_importances = feature_importances.sort_values(by='Importance', ascending=False)

# Print the sorted feature importances
print(feature_importances)

# Plot the feature importances
feature_importances.plot(kind='bar', x='Feature', y='Importance', figsize=(8, 6), legend=False)
plt.title("Feature Importance from Decision Tree")
plt.ylabel("Importance Score")
plt.xlabel("Feature")
plt.xticks(rotation=90)
plt.show()

with open("trained_model.pkl", "wb") as f:
    pkl.dump(dt, f)