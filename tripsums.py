
import pandas as pd


df1 = pd.read_csv(r'/Users/nadiadomnina/Downloads/2017-capitalbikeshare-tripdata/2017q1.csv')
df2 = pd.read_csv(r'/Users/nadiadomnina/Downloads/2017-capitalbikeshare-tripdata/2017q2.csv')
df3 = pd.read_csv(r'/Users/nadiadomnina/Downloads/2017-capitalbikeshare-tripdata/2017q3.csv')
df4 = pd.read_csv(r'/Users/nadiadomnina/Downloads/2017-capitalbikeshare-tripdata/2017q4.csv')

frames = [df1,df2,df2,df4]

df = pd.concat(frames)

df = df[["Start station number", "End station number","Duration", "Start station", "End station"]]
df["Duration"] = df["Duration"] / 60
##print(df.head)

df2 = df.groupby(['Start station number','End station number', "Start station", "End station"]).size().reset_index(name='count')
df3 = df.groupby(['Start station number','End station number', "Start station", "End station"])["Duration"].mean().reset_index(name='avg_mins')

df_inner = pd.merge(df2, df3, on=['Start station number', "End station number", "Start station", "End station"], how='inner')

df_inner.sort_values(by=['count'], inplace=True, ascending=False)

stats = df_inner[["count", "avg_mins"]].describe()
#stats.to_csv("bike_stats.csv")

#filter



#most pupular routes
most_popular = pd.merge(df_inner, df, on=['Start station number', "End station number", "Start station", "End station"], how='left')
most_popular = most_popular.drop("Duration", axis =1)
most_popular = most_popular.drop_duplicates()
most_popular = most_popular.nlargest(1000,'count')
most_popular['avg_mins'] = most_popular['avg_mins'].apply(lambda x: round(x, 0))
most_popular.to_csv("1000_routes_2017.csv")

##print(df_inner)