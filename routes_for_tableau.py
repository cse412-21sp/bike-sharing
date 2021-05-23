import pandas as pd

#routes
df = pd.read_csv(r'/Users/nadiadomnina/Desktop/CSE 163/CSE 412/bike-sharing/1000_routes_2017.csv')
#coordinates
cords = pd.read_csv(r'/Users/nadiadomnina/Desktop/CSE 163/CSE 412/bike-sharing/data/terminal_coordinates.csv')
cords = cords.rename(columns={"TERMINAL": "num", "LONGITUDE": "long", "LATITUDE": "lat"})

# column names
column_names = ["start_num", "end_num", "start_name", "end_name", "origin/destination", "name","num", "route", "count"]
# create blank df with column names
df2 = pd.DataFrame(index=range(0,10000),columns = column_names)

i = 0
for index, row in df.iterrows():

    # start num
    df2.at[i, 'start_num'] = row["Start station number"]
    df2.at[i+1, 'start_num'] = row["Start station number"]
    # start station
    df2.at[i, 'start_name'] = row["Start station"]
    df2.at[i+1, 'start_name'] = row["Start station"]
    # end num
    df2.at[i, 'end_num'] = row["End station number"]
    df2.at[i+1, 'end_num'] = row["End station number"]
    # end station
    df2.at[i, 'end_name'] = row["End station"]
    df2.at[i+1, 'end_name'] = row["End station"]
    # route
    df2.at[i, 'route'] = (str(row["Start station number"]) + "-" + str(row["End station number"]) )
    df2.at[i+1, 'route'] = (str(row["Start station number"]) + "-" + str(row["End station number"]) )
    # destination / origin
    df2.at[i, 'origin/destination'] = "origin"
    df2.at[i, 'name'] = row["Start station"]
    df2.at[i, 'num'] = row["Start station number"]
    df2.at[i+1, 'origin/destination'] = "destination"
    df2.at[i+1, 'name'] = row["End station"]
    df2.at[i+1, 'num'] = row["End station number"]
    # end station
    df2.at[i, 'count'] = row["count"]
    df2.at[i+1, 'count'] = row["count"]
    # update i
    i = i + 2


df3 = df2.merge(cords, on='num', how='left')

df3.to_csv("1000_routes_2017_tableau.csv")
print("done")