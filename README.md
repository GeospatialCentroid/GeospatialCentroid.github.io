# Geospatial Centroid Portfolio

In an effort to share our completed projects more routinely, the following app has been created. 
The majority of this project was ported over from the [Open Science Map](https://geospatialcentroid.github.io/open_science_map), developed for [HELIOS](https://www.heliosopen.org/).
This app consists of a Google spreadsheet published as a CSV file that is dynamically loaded into the app.
Project entries in the spreadsheet include both manual and semi-automated entries for completed projects (using the [QUERY](https://support.google.com/docs/answer/3093343?hl=en) function).
The semi-automated entries are partially managed by a Microsoft Power Automate Flow that's linked to a Teams Planner app. 
When a project is set to complete in Planner, an automatic notification is sent, prompting the manual update of the project's spreadsheet.


# Future Work
The web interface was designed to flexibly to grow with the data it loads. 
The columns in the spreadsheet that power the app are preset, but additional columns of information could be added.
It should be noted that new columns will show immediately on the web interface.
To enable specific functionality like date and map capabilities, specific columns like 'year' and 'lat,lng' are needed.
The temporal component of submitted projects uses the YYYY format, so these submissions can be filtered by year.  

The *js/index.js* file and *setup_filters* function controls how specific columns are to be handled. These settings could be exported to a settings.js file to make edits to this easier.

Currently the path to the CSV file is contained in the index.js file, having this path loaded in from a config file would make updates to this path easier.


# Testing the website locally
To test the web interface locally a web server is required.
To run a local server from the Terminal on OSX or Linux, python can be used.  
With python installed along with the 'http' library, running the command below from the location of the project directory makes this possible.
```
python -m http.server 8000
```
Then navigate to http://localhost:8000/ from your web browser

# Acknowledgements
Kevin Worthington, MASc (He/Him), Map and (GIS) Data Specialist, Geospatial Centroid

Special thanks to Dan Carver who was the inspiration for the development of the source code this project was adapted from.
[This earlier work can be seen here](https://dcarver1.github.io/cwrUSA_maps/).
