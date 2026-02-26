# Geospatial Centroid Project Page

This web app is linked to projects from a protected Google
Sheet. When a new project is added to the 'project' worksheet and marked for display (adding a 'y' in the show column), it will automatically appear on the website.

## Background

In an effort to share our completed projects more routinely, the following app has been created. 

The web interface was designed to flexibly to grow with the data it loads. 
It's powered by columns in a spreadsheet with the ability to easily support additional columns of information as added.
It should be noted that new columns will show immediately on the web interface.
To enable specific functionality like date and map capabilities, specific columns like 'year' and 'lat,lng' are needed.
The temporal component of submitted projects uses the YYYY format, so these submissions can be filtered by year.  

The majority of this project was ported over from the [Open Science Map](https://geospatialcentroid.github.io/open_science_map), developed for [HELIOS](https://www.heliosopen.org/).
This app consists of a Google spreadsheet published as a CSV file that is dynamically loaded into the app.
Project entries in the spreadsheet include both manual and semi-automated entries for completed projects (using the [QUERY](https://support.google.com/docs/answer/3093343?hl=en) function).

The semi-automated entries are partially managed by a Microsoft Power Automate Flow that's linked to a Teams Planner app. 
When a project is set to complete in Planner, an automatic notification is sent, prompting the manual update of the project's spreadsheet.

------------------------------------------------------------------------

# 📊 Project Data Source

All projects are stored in the following Google Spreadsheet:

https://docs.google.com/spreadsheets/d/1XwjAo3ZPTcUZLSXx3a_9WA0ZwWcgEXWuzt-ey9OvQwk/edit?usp=sharing

⚠️ This spreadsheet is access-controlled. Please request access to
edit it from the Head of the Geospatial Centroid.

------------------------------------------------------------------------

# 📑 Worksheets Overview

There are three worksheets in the spreadsheet:

## 1. `projects` (Main Web App Feed)

This worksheet powers the website directly. Any row marked with `y` in
the `show` column will appear in the web app.

## 2. `project_planner_raw`

This worksheet is generated from an export of the project planner in Teams.

Projects listed in `project_planner_raw` will automatically be added to
the `projects` worksheet by simply adding a **title** to in the "title" 
column in the `project_planner_raw` worksheet.

To preserve this automatic workflow:

-   DO NOT insert new rows below the query-generated section.
-   If manually adding new projects (not listed in
    `project_planner_raw`), insert rows **above** the query function
    cell.
-   The query function cell is located just below the thick black border
    in the `projects` worksheet.

## 3. `Original projects`

This worksheet contains earlier versions and legacy entries.

------------------------------------------------------------------------

# ➕ How to Add a New Project

## Option A: Add Through `project_planner_raw` (Preferred)

1.  Open the `project_planner_raw` worksheet.
2.  Add the project title in the appropriate column.
3.  The project will automatically populate in the `projects` worksheet.
4.  Complete any remaining required fields in the `project_planner_raw` worksheet.
5.  Set the `show` column to `y` for the project in the `projects` worksheet.

------------------------------------------------------------------------

## Option B: Manually Add Directly to `projects`

If the project does NOT exist in `project_planner_raw`:

1.  Go to the `projects` worksheet.
2.  Insert a new row **above** the query function section (above the
    thick black border).
3.  Fill in the required columns.
4.  Set `show` = `y`.

⚠️ Do NOT add rows below the query function cell.

------------------------------------------------------------------------

# 🧾 Required Columns in `projects`

  Column                    Description
  ------------------------- --------------------------------------
  title                     Project name
  short_desc                Brief 1--2 sentence summary
  year                      Year completed or launched
  image                     Image path (see image section below)
  github_url                GitHub repository URL
  project_url               Live project URL
  tags                      Keywords (e.g., JavaScript, GIS)
  geojson                   Map extent GeoJSON
  show                      Enter `y` to display
  Description               Longer description
  Contact                   Project contact
  Department/Organization   Affiliation

------------------------------------------------------------------------

# 🖼 Adding an Image

You have two options:

## Option 1: Use an External Image URL

Paste the full image URL into the `image` column.

Example: https://example.com/my-image.jpg

------------------------------------------------------------------------

## Option 2 (Recommended): Upload Image to Repository

Images should be stored in:

/images folder inside the repository

### Steps:

1.  Go to the GitHub repository.
2.  Open the `images` folder.
3.  Click **Add file → Upload files**
4.  Upload your image.
5.  Commit changes.

### Naming Guidelines

-   Use lowercase
-   No spaces (use underscores)
-   Example: images/colorado_groundwater.jpg

In the spreadsheet, enter: images/your_image_name.jpg

⚠️ Do NOT use the full GitHub URL. Use the relative path.

------------------------------------------------------------------------

# 🗺 Creating GeoJSON for Map Extent

You can create GeoJSON using: https://geojson.io/

Steps:

1.  Draw your project area.
2.  Export as GeoJSON.
3.  Copy the full FeatureCollection.
4.  Paste into the `geojson` column.

Ensure it is valid GeoJSON formatted as a FeatureCollection.

------------------------------------------------------------------------

# ✅ Final Checklist

-   Title entered
-   Description completed
-   Image path correct
-   GitHub URL added
-   Project URL added (if available)
-   GeoJSON pasted
-   `show` column set to `y`

The spreadsheet will automatically save, so best to add the `y` to the `show` column at the end, and be sure to test your changs at 
[GeospatialCentroid.github.io](
GeospatialCentroid.github.io).


# 🛠 Troubleshooting

### Project Not Appearing?

-   Confirm `show` column contains `y`
-   Ensure row was inserted above the query function
-   Check for accidental formatting issues

### Image Not Loading?

-   Confirm image is in `/images`
-   Verify spelling and capitalization
-   Use relative path format: images/filename.jpg

------------------------------------------------------------------------

# 💻 Running Locally (Optional)

Most users do NOT need to run the site locally.

If you are developing or testing:

1.  Clone the repository.
2.  Serve the site locally (for example using a simple HTTP server).
3.  Open in your browser.

Note python works well for this by running 
```
python -m http.server 8000
```
Then navigate to http://localhost:8000/ in your web browser

------------------------------------------------------------------------

# Future Work
The *js/index.js* file and *setup_filters* function controls how specific columns are to be handled. These settings could be exported to a settings.js file to make edits to this easier.

Currently the path to the CSV file is contained in the index.js file, having this path loaded in from a config file would make updates to this path easier.

# Acknowledgements
Kevin Worthington, MASc (He/Him), Map and (GIS) Data Specialist, Geospatial Centroid

Special thanks to Dan Carver who was the inspiration for the development of the base source code. 
[This earlier work can be seen here](https://dcarver1.github.io/cwrUSA_maps/).
