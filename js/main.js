function init(){
		
    var base_osm = L.tileLayer(
    		'http://openmapsurfer.uni-hd.de/tiles/roadsg/x={x}&y={y}&z={z}',{
			minZoom: 2,
			maxZoom: 18,
			attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
    );
	
	function getLayers(list){
		var temp_list = [];
		for(i in list){
			window.field = list[i];
			var temp = L.geoJson(worldData,{
				style: getStyle,
				onEachFeature: function (feature, layer) {
					layer.bindPopup("<b>" + feature.properties.DISTRICT
									+ "</b><br/>"+ field +": " + getData(NRCS_data,feature.properties.OCHA_PCODE,field));
				}
			});
			temp_list.push(temp);
		}
		return temp_list;
    };
	
	var all_layers = getLayers(col_header);
	console.log(all_layers);

    var map = L.map('map', {
        center: [28.2, 84.3],
        zoom: 7,
        layers: [base_osm,all_layers[0]]
    });

	function getControl(list_names,list_layers){
		var temp =[];
		for(i in list_names){
		temp[list_names[i]] = list_layers[i];		
		};
		return temp;
	};
	
	var all_controls = getControl(col_header,all_layers);
	console.log(all_controls);

	
    L.control.layers(all_controls
	//{
    //    'Water coverage':watLayer,
    //   'Sanitation coverage':sanLayer,
    //    'Hygiene coverage':hygLayer
    //}
	).addTo(map);   
    
    /*var watLegend = L.control({position: 'bottomleft'});
    var sanLegend = L.control({position: undefined});
    var hygLegend = L.control({position: undefined});

    watLegend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'infolegend');
            div.innerHTML +=watLegendContent();
        return div;
    };    

    sanLegend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'infolegend');
            div.innerHTML +=sanLegendContent();
        return div;
    };
    
    hygLegend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'infolegend');
            div.innerHTML +=hygLegendContent();
        return div;
    };    
           
    
    map.on('baselayerchange', function (eventLayer) {
        if(eventLayer.name=="Water coverage"){
        	if(hygLegend.getPosition()==undefined){
        		this.removeControl(sanLegend);
        		sanLegend.setPosition(undefined);
        	} else {
        		this.removeControl(hygLegend);
        		hygLegend.setPosition(undefined);
        	};
       		watLegend.setPosition('bottomleft');
            watLegend.addTo(map);
        };
        if(eventLayer.name=="Sanitation coverage"){
        	if(hygLegend.getPosition()==undefined){
        		this.removeControl(watLegend);
        		watLegend.setPosition(undefined);
        	} else {
        		this.removeControl(hygLegend);
        		hygLegend.setPosition(undefined);
        	}
       		sanLegend.setPosition('bottomleft');           
            sanLegend.addTo(map);
        };
        if(eventLayer.name=="Hygiene coverage"){
        	if(sanLegend.getPosition()==undefined){
        		this.removeControl(watLegend);
        		watLegend.setPosition(undefined);
        	} else {
        		this.removeControl(sanLegend);
        		sanLegend.setPosition(undefined); 
        	};
       		hygLegend.setPosition('bottomleft');
            hygLegend.addTo(map);
        };    
    });
    
    watLegend.addTo(map);*/
    
    return map;    
}


/*function resize(){
    $('#map').height($(window).height()-$('#header').height()-10);
    map.invalidateSize(false);
}*/

/*$(window).load(function(){
    resize();
});
$(window).resize(function(){
    resize();
});*/

    
var map = init();
