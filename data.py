import pandas as pd
from matplotlib import pyplot as plt

def emp_res_count():
    counts = df['empire_or_resistance'].value_counts()

    # Print the counts
    counts_df = counts.reset_index()
    counts_df.columns = ['empire_or_resistance', 'count']

    # Print the DataFrame
    print(counts_df)

def hw_count():
    homeworlds = (df['homeworld'].value_counts())
    # Print the counts
    homeworlds_df = homeworlds.reset_index()
    homeworlds_df.columns = ['homeworld', 'count']

    # Print the DataFrame
    print(homeworlds_df)

def ut_count():
    unit_types = (df['unit_type'].value_counts())
    # Print the counts
    unit_types_df = unit_types.reset_index()
    unit_types_df.columns = ['unit_type', 'count']

    # Print the DataFrame
    print(unit_types_df)

def res_tf():
    df['is_resistance'] = df['empire_or_resistance'].apply(lambda x: True if x == "resistance" else False)
    print(df)
    plt.bar(df['empire_or_resistance'].unique(), df['empire_or_resistance'].value_counts())
    plt.show()

df = pd.read_csv("troop_movements.csv")

print("========================")
emp_res_count()
print("========================")
hw_count()
print("========================")
ut_count()
print("========================")
res_tf()
print("========================")