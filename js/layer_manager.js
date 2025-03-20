/**
 * Description. A layer object to control what is shown on the map
 *
 * @file   This files defines the Layer_Manager class.
 * @author Kevin Worthington
 *
 * @param {Object} properties     The properties passed as a json object specifying:


*/

class Layer_Manager {
  constructor(properties) {
    //store all the properties passed
    for (var p in properties){
        this[p]=properties[p]
    }
     this.layers=[]
     this.first_load=true;// to control the initial zooming while the map is initializing
  }
  create_geojson(subset,location_col,color_col,category_color,popup_properties){
    // the shapes on the map are controlled by the filter
    // They are to be colored by a gradient determined by their category
      var $this=this
      var  _resource_id=0
      // remove all first
      for (var i=0;i<layer_rects.length;i++){
        layer_rects[i].remove();
      }
      // reset the layer rect array
      layer_rects=[]
      var bounds
      //
     for (var i=0;i<subset.length;i++){
       if(subset[i][location_col]!=""){

            var rect = L.geoJson(JSON.parse(subset[i][location_col]), {
            color: category_color[subset[i][color_col][0]],
            })
            rect.addTo(map_manager.map);
            rect.title=subset[i][popup_properties[0]]

            var props={}

            // extract the properties for popup display
            for(var p in popup_properties){
                props[popup_properties[p]]=subset[i][popup_properties[p]]
            }
            props["_id"]=subset[i].id
            rect.properties=props
            layer_rects.push(rect)
            rect.on('click', function(e) { $this.layer_click(e,_resource_id) });
            // extend bounds
            if(!bounds){
                bounds= rect.getBounds()
            }else{
                 bounds=bounds.extend(rect.getBounds())
            }

        }

     }
     // set the map bounds to include all the geojson
     try{
        this.map.fitBounds(bounds);
        }catch(e){

        }
}
zoom_marker(_id){
    var coords = this.get_feature(_id)

    //var corner=L.latLng(Number(coords[1]), Number(coords[0]))//L.latLngBounds(coords, coords);
    map_manager.map_zoom_event(coords)
    //this.layer_click({latlng:corner},1)
}
get_feature(_id){
    //var f =this.layers[0].layer_obj.data.features
    var f = layer_rects
    for (var i =0;i<f.length;i++){
        var props=f[i].properties
        if(props._id==_id){
            return f[i].getBounds()
           // return f[i].geometry.coordinates
        }
    }
  }
layer_click(e,_resource_id){
        // show all the projects under the mouse click
        map_manager.layer_clicked=true
        map_manager.selected_layer_id=_resource_id

        map_manager.click_lat_lng = e.latlng
        map_manager.click_x_y=e.containerPoint
       var  turf_point=turf.point([e.latlng.lng,e.latlng.lat])

        map_manager.popup_show();
        var features=[]
        //
         for(var i =0;i<layer_rects.length;i++){

            layer_rects[i].eachLayer(function(child_layer) {
                  if (turf.booleanPointInPolygon(turf_point, child_layer.toGeoJSON())) {
                   features.push(layer_rects[i]);
                  }
            })
        }
        //
       // try{
//              map_manager.selected_feature_id=layer_manager.get_object_id(e.layer.feature);

              map_manager.show_popup_details(features)
        //}catch(error){
            // could be an artificial click
             console_log("error",e)
       // }
         //map_manager.layer_clicked=false
  }
  get_layer_obj(_resource_id){
      for(var i =0;i<this.layers.length;i++){
            var temp_layer = this.layers[i]
            if (temp_layer.id==_resource_id){
                return temp_layer

            }
      }
      // if no layer was returned - maybe we are controls
     if(_resource_id =="basemap"){
        return {"layer_obj":this.basemap_layer,"type":"basemap"}

     }

  }
  is_on_map(_resource_id){
    var layer = this.get_layer_obj(_resource_id)
    if (layer){
        return true;
    }else{
        return false;
    }
  }
  get_object_id(_feature){
        // as the objectid might not be consistent between layers, we'll to no consistently determine what it is
        if(!_feature?.id ){
            if( _feature?.properties && _feature.properties?.id){
                 return  _feature.properties.id
            }else{
                return  _feature.properties._id
            }
        }
        return _feature["id"]
  }

}

