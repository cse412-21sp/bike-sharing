[Template from https://data.research.cornell.edu/content/readme]


This readme.txt file was generated on 2021-05-17 by Olivia Hurd


SHARING/ACCESS INFORMATION

1. Licenses/restrictions placed on the data: 

	https://www.capitalbikeshare.com/data-license-agreement

2. Links to other publicly accessible locations of the data: 

	https://github.com/NABSA/gbfs/blob/master/gbfs.md


---------------------------------------------------------------------
DATA & FILE OVERVIEW

1. File List: 
2010-2021_total_counts_by_terminal.csv
	
	Count of bikers that started/ended at each terminal - total for years 2010-2021

2010-2017_total_counts_by_terminal.csv

	Count of bikers that started/ended at each terminal - total for years 2010-2017

2010-2017_start_counts_by_terminal.csv
	
	Count of bikers that started at each terminal - total for years 2010-2017


unused/2010-2021_total_counts_of_routes.csv
	
	Count of bikers that took a certain route (start & end point) - total for 2010-2021

unused/2019_total_counts_of_routes.csv
	
	Count of bikers that took a certain route (start & end point) - total for 2019

unused/2020_total_counts_of_routes.csv

	Count of bikers that took a certain route (start & end point) - total for 2020


2. Additional related data collected that was not included in the current data package: 

	https://s3.amazonaws.com/capitalbikeshare-data/index.html

---------------------------------------------------------------------
METHODOLOGICAL INFORMATION

<See https://www.capitalbikeshare.com/system-data>

----------------------------------------------------------------------
DATA-SPECIFIC INFORMATION FOR: 2010-2021_total_counts_by_terminal.csv

1. Number of variables: 5

2. Number of cases/rows: 640 (number of terminals/stations)

3. Variable List: 
	END TOTAL
	> Total count of bikers that ended their ride at the listed location, for the years 2010-2021 (ALL)
	LATITUDE
	> Latitude of terminal/station location
	LONGITUDE
	> Longitude of terminal/station location
	NAME
	> Name (street corner) of terminal/station
	START TOTAL BIKER COUNT
	> Total count of bikers that started their ride at the listed location, for the years 2010-2021 (ALL)

4. Missing data codes: 

-blank- rides listed in database, but not defined by a starting or ending location

---
DATA-SPECIFIC INFORMATION FOR: 2010-2017_total_counts_by_terminal.csv

1. Number of variables: 6

2. Number of cases/rows: 488 (number of terminals/stations)

3. Variable List: 
	TERMINAL
	> Identification number for terminal/station
	END TOTAL
	> Total count of bikers that ended their ride at the listed location, for the years 2010-2017
	LATITUDE
	> Latitude of terminal/station location
	LONGITUDE
	> Longitude of terminal/station location
	NAME
	> Name (street corner) of terminal/station
	START TOTAL BIKER COUNT
	> Total count of bikers that started their ride at the listed location, for the years 2010-2017

4. Missing data codes: 

-blank- location no longer exists and coordinates (lat & long) are not available

---
DATA-SPECIFIC INFORMATION FOR: 2010-2017_start_counts_by_terminal.csv

1. Number of variables: 4

2. Number of cases/rows: 184

3. Variable List: 
	TERMINAL
	> Identification number for terminal/station
	COUNT
	> Total count of bikers that started their ride at the listed location, for the years 2010-2017
	LATITUDE
	> Latitude of terminal/station location
	LONGITUDE
	> Longitude of terminal/station location

4. Missing data codes: 

-blank- location no longer exists and coordinates (lat & long) are not available

---
DATA-SPECIFIC INFORMATION FOR: unused

Folder to store processed data that hasn't been used in a visualization in project

1. Number of variables: N/A 

2. Number of cases/rows: N/A

---
DATA-SPECIFIC INFORMATION FOR: unused/2010-2021_total_counts_of_routes.csv

1. Number of variables: 7

2. Number of cases/rows: 543906

3. Variable List: 
	Start station
	> Name (street corner) of starting terminal/station
	End station
	> Name (street corner) of ending terminal/station	
	Biker Count
	> Number of bikers that took this route (start-to-end) during the years 2010-2021
	Start Latitude
	> Latitude of starting location
	Start Longitude	
	>Longitude of starting location
	End Latitude	
	>Latitude of ending location
	End Longitude
	>Longitude of ending location


4. Missing data codes: 

-blank- location no longer exists and coordinates (lat & long are not available)

---
DATA-SPECIFIC INFORMATION FOR: unused/2019_total_counts_of_routes.csv

1. Number of variables: 7

2. Number of cases/rows: 543906

3. Variable List: 
	Start station
	> Name (street corner) of starting terminal/station
	End station
	> Name (street corner) of ending terminal/station	
	Biker Count
	> Number of bikers that took this route (start-to-end) during the year 2019
	Start Latitude
	> Latitude of starting location
	Start Longitude	
	>Longitude of starting location
	End Latitude	
	>Latitude of ending location
	End Longitude
	>Longitude of ending location

4. Missing data codes: 

-blank- location no longer exists and coordinates (lat & long are not available)


---
DATA-SPECIFIC INFORMATION FOR: unused/2020_total_counts_of_routes.csv

1. Number of variables: 7

2. Number of cases/rows: 543906

3. Variable List: 
	Start station
	> Name (street corner) of starting terminal/station
	End station
	> Name (street corner) of ending terminal/station	
	Biker Count
	> Number of bikers that took this route (start-to-end) during the year 2020
	Start Latitude
	> Latitude of starting location
	Start Longitude	
	>Longitude of starting location
	End Latitude	
	>Latitude of ending location
	End Longitude
	>Longitude of ending location

4. Missing data codes: 

-blank- location no longer exists and coordinates (lat & long are not available)
