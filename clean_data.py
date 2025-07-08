import pyarrow as pa
import pandas as pd
import fastparquet as fp
import pickle as pkl

df_1m = pd.read_csv("troop_movements_1m.csv")

print(df_1m.head(10))


#Clean data

df_1m.loc[df_1m["unit_type"] == "invalid_unit", "unit_type"] = "unknown"

df_1m['location_x'] = df_1m['location_x'].bfill()
df_1m['location_y'] = df_1m['location_y'].bfill()
    
#check after cleaning data
has_invalid = (df_1m["unit_type"] == "invalid_unit").any()

if has_invalid:
    sample_invalid = df_1m[df_1m["unit_type"] == "invalid_unit"].sample(min(5, len(df_1m[df_1m["unit_type"] == "invalid_unit"])))
    print("Sample of rows with invalid units:")
    print(sample_invalid)
else:
    print("No invalid units found in the DataFrame.")

missing_count = df_1m["location_x"].isna().sum()
total_rows = len(df_1m)
missing_percentage = (missing_count / total_rows) * 100

print(f"Missing location_x values: {missing_count} out of {total_rows} rows ({missing_percentage:.2f}%)")

fp.write('troop_movements_1m.parquet', df_1m)

with open('trained_model.pkl', 'rb') as f:
    dt = pkl.load(f)

parquet_file = fp.ParquetFile('troop_movements_1m.parquet')
cleaned_df = parquet_file.to_pandas()


X = pd.get_dummies(cleaned_df[['homeworld', 'unit_type']])
predictions = dt.predict(X)

print(cleaned_df.head(10))
print(predictions[0 : 10])

# Add predictions to your DataFrame
cleaned_df['predictions'] = predictions

print(cleaned_df.head(15))