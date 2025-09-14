import pandas as pd

# Load your dataset
df = pd.read_csv("C:/Users/bouti/Downloads/wearable_sensor_data.csv")

# Keep only rows where activity_type is Running
df_running = df[df["activity_type"] == "Running"]

# Save the filtered data to a new CSV
df_running.to_csv("running_only.csv", index=False)

print("Filtered dataset saved as running_only.csv")
