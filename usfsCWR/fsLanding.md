
## Crop Wild Relative on US Forest Service lands

*Updated* : 2024-09-11 

This work aims to develop a national inventory of crop wild relatives and wild utilized species on USFS lands based on previously published data.

This activity area will apply the occurrence information and species distribution models developed for approximately 600 taxa native crop wild relatives and wild utilized species, which were published in Khoury and Carver et al. (2020), to USFS lands, to develop inventories for USFS lands based on existing knowledge. 

### General Method 

PAD-US dataset was used as a spatial reference for all USFS lands. These were selected based on the `Mang_Name` == "USFS". All records sharing the same `Unit_Nm` were aggregated into a single spatial feature. This was done to reduce the overall processing time, as spatail relationships were test per each USFS area. 


### Evaluation of Occurrence Datasets

**Method Brief** : Occurrence data was transformed to match the CRS of the PAD-US dataset. For each unique USFS area, an intersect with the occurrence data was performed. The result provided all observations present within the designated area. Once define the unique number of species, total observations, and observations per area was calculate for each management area.  

**Reference datasets**
- [original observation data](https://drive.google.com/file/d/1PrcgwY7kHP22kei-iSZHj6duTltg7ald/view?usp=sharing)
- [spatial join observation data and between USFS lands](https://drive.google.com/file/d/1rlXn9ADJIeEbIk0JBv5PlrpmGkVNJ0WC/view?usp=sharing) (Wilderness and National Forest only)


#### [Map of all Occurrences in US Service Lands](https://geospatialcentroid.github.io/fsLanding/fsPointWildernessNF.html)


### Evaluation of Species Distribution Models 
**Method Brief** : Distributions models were transformed to match the CRS of the PAD-US dataset. For each species distribution, the USFS sites that intersected with the area of extent of the distribution model were selected. With this subset of locations, a count of the number of pixels within each protected area was generated. Once completed for all species, the total number of uniqu species, and the average area that each species was found within the protected area was recorded.  

**Reference datasets**
- [spatial join between distribution models and USFS lands](https://drive.google.com/file/d/12In8I6C8KqNIf91W8LHnGws12pIiS28k/view?usp=sharing) (Wilderness and National Forest only)

#### [Map of all Occurrences in US Service Lands](https://geospatialcentroid.github.io/fsLanding/fsrastersWildernessNF.


