//create a filter manager to control the selection of items from a CSV file
var filter_manager;
var table_manager;
var usp={};// the url params object to be populated
var LANG;
var map_manager;
var layer_manager;
var analytics_manager;
var view_type='list'//'grid'//
var alias={
    "title":"Title","short_desc":"Description",	"year":"Year","image":"","github_url":"GitHub",	"project_url":"URL","Type":"Type"
}

var rects;// the layer group
var layer_rects=[]

if (typeof(params)=="undefined"){
    var params = {}
}
var last_params={}
var usp={};// the url params object to be populated

var browser_control=false; //flag for auto selecting to prevent repeat cals

$( function() {
   $.getJSON('i18n/en.json', function(data){
            LANG=data
            initialize_interface()
    });
});

function change_view(type){
    view_type=type
    // redraw the view
    filter_manager.show_sorted_results(filter_manager.showing_id)
}

function initialize_interface(){
    var sort_str=""
    if(!$.isEmptyObject(usp) && usp.get("sort")){
        sort_str=usp.get("sort")
    }

   setup_params()
   setup_map();
   setup_filters()

}

function setup_params(){
    if (window.location.search.substring(1)!="" && $.isEmptyObject(params)){
        usp = new URLSearchParams(window.location.search.substring(1).replaceAll("~", "'").replaceAll("+", " "))

        if (usp.get('f')!=null){
            params['f'] = rison.decode("!("+usp.get("f")+")")
        }
        if (usp.get('e')!=null){
            params['e'] =  rison.decode(usp.get('e'))
        }
        // debug mode
        if (usp.get('d')!=null){
           DEBUGMODE=true
        }
    }
}
function setup_map(){
    map_manager = new Map_Manager(
     {params:params['e'] ,
        lat:36.25408922222581,
        lng: -98.7485718727112,
        z:8,
        limit:100 // max results for identify
        })

     map_manager.init()
    layer_manager = new Layer_Manager({map:map_manager.map});
}
function setup_filters(){
    var colors=['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928',"#80b1d3","#fb8072","#bebada","#c7eae5","#8dd3c7","#fee091","#8dd3c7"]

    filter_manager = new Filter_Manager({
        csv:"https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9E5gx3mY77pB7MZl2nSg9N6BbjH2YSvFWOpbWATKOwD6TR02QDD-AVbvBbLks9YMb6Hv-BS8a7xxA/pub?gid=0&single=true&output=csv",
        omit_result_item:['id',"title","tags","geojson","CSU dept","Map extent?","CLASS","Project","Description","Contact","Department/Organization","File path","Staff"], // define which attributes not to show when a selection is made
        omit_filter_item:['id',"geojson","image","Map extent?","title","project_url","github_url","short_desc","CLASS","Project","Description","Contact","Department/Organization","File path","Staff"],
        path_col:"project_url",// the url to the dataset landing page
        popup_properties:["title","short_desc"],
        title_col:"title",
        //sub_title_col:"Institution",
        location:"geojson",
        date:["year"],
        params:params['f'],
        comma_separated_col:["tags"],
        color:colors,//["Hex Value for Category (CSV)"],
        category:["tags"],
        include_col:"show"
     })


     // initialize this filtering system

     filter_manager.init();
}
function after_filters(){

        analytics_manager = new Analytics_Manager();

}

 function save_params(){
    // access the managers and store the info URL sharing

    var p = "?f="+encodeURIComponent(rison.encode(filter_manager.filters))
    +"&e="+rison.encode(map_manager.params)


    if(layer_manager && typeof(layer_manager.layers_list)!="undefined"){
        p+="&l="+rison.encode(layer_manager.layers_list)
    }

    if(typeof(filter_manager.panel_name)!="undefined"){
        // add the panel if available
        p+="/"+filter_manager.panel_name;
    }
    if(typeof(filter_manager.display_resource_id)!="undefined"){
        // add the display_resource_id if available
        p+="/"+filter_manager.display_resource_id;
    }

    if (filter_manager.page_rows){
        p +="&rows="+(filter_manager.page_start+filter_manager.page_rows)
    }
    if (filter_manager.page_start){
        p +="&start=0"
    }
    if (filter_manager.sort_str){
        p +="&sort="+filter_manager.sort_str
    }
//    if (filter_manager.fq_str){
//        p +="&fq="+filter_manager.fq_str
//    }
    // retain debug mode
    if (DEBUGMODE){
        p +="&d=1"
    }

    // before saving the sate, let's make sure they are not the same
    if(JSON.stringify(p) != JSON.stringify(last_params) && !browser_control){
       window.history.pushState(p, null, window.location.pathname+p.replaceAll(" ", "+").replaceAll("'", "~"))
        last_params = p
    }

}
