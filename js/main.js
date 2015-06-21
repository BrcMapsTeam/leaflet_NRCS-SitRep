function init(){

    var base_osm1 = L.tileLayer(
    		'http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}',{
			minZoom: 2,
			maxZoom: 18}
    );
	var base_osm2 = L.tileLayer(
    		'http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}',{
			minZoom: 2,
			maxZoom: 18}
    );
    var base_osm3 = L.tileLayer(
    		'http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}',{
			minZoom: 2,
			maxZoom: 18,
			attribution: 'Basemap: <a href="http://giscience.uni-hd.de/">Heidelberg Uni.</a> & &copy; <a href="http://www.openstreetmap.org/copyright">OSM</a>'}
    );
	
	function getLayers(list,color_list){
		var temp_list = [];
		window.color = color_list;
		for(i in list){
			window.field = list[i];
			var temp = L.geoJson(worldData,{
				style: getStyle,
				onEachFeature: getOnEachFeature
			});
			temp_list.push(temp);
		}
		return temp_list;
    };
	
	var all_layers1 = getLayers(col_header1,color1);
	var all_layers2 = getLayers(col_header2,color2);
	var all_layers3 = getLayers(col_header3,color3);

    var map1 = L.map('map1', {
        center: [27.7, 85.3],
        zoom: 7,
        layers: [base_osm1,all_layers1[0]]
    });
	
	var map2 = L.map('map2', {
        center: [27.7, 85.3],
        zoom: 7,
        layers: [base_osm2,all_layers2[1]]
    });

	var map3 = L.map('map3', {
        center: [27.7, 85.3],
        zoom: 7,
        layers: [base_osm3,all_layers3[9]]
    });
		
	map1.sync(map2);
	map1.sync(map3);
	map2.sync(map1);
	map2.sync(map3);
	map3.sync(map1);
	map3.sync(map2);
	
	function getControl(list_names,list_layers){
		var temp =[];
		for(i in list_names){
		temp[list_names[i]] = list_layers[i];		
		};
		return temp;
	};
	
	var all_controls1 = getControl(col_header1,all_layers1);
	var all_controls2 = getControl(col_header2,all_layers2);
	var all_controls3 = getControl(col_header3,all_layers3);

    L.control.layers(all_controls1).addTo(map1);
	L.control.layers(all_controls2).addTo(map2); 	
	L.control.layers(all_controls3).addTo(map3); 
	    
    var legends1 = L.control({position: 'bottomleft'});
	var legends2 = L.control({position: 'bottomleft'});
	var legends3 = L.control({position: 'bottomleft'});

	legends1.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'legends1');
        this.update1();
        return this._div;
    };
	legends2.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'legends2');
        this.update2();
        return this._div;
    };
	legends3.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'legends3');
        this.update3();
        return this._div;
    };
	
	legends1.update1 = function (field){
		if(!(field)){field = init_field}
		var max = getMax(col_max,field);
		var labels = [max[1][4]+1 + " - " + max[0],max[1][3]+1 + " - " + max[1][4],max[1][2]+1 + " - " + max[1][3],max[1][1]+1 +" - " + max[1][2],"1 - " + max[1][1]];
		var html = "<p><b>"+ field +"</b></p>";
		var color = color1
		for(i=0;i<5;i++){
			html = html +'<p><i style="background-color:' + color[4-i]+'"></i> '+labels[i]+'</p>';}
		this._div.innerHTML = html;
	};
	legends2.update2 = function (field){
		if(!(field)){field = init_field}
		var max = getMax(col_max,field);
		var labels = [max[1][4]+1 + " - " + max[0],max[1][3]+1 + " - " + max[1][4],max[1][2]+1 + " - " + max[1][3],max[1][1]+1 +" - " + max[1][2],"1 - " + max[1][1]];
		var html = "<p><b>"+ field +"</b></p>";
		var color = color2
		for(i=0;i<5;i++){
			html = html +'<p><i style="background-color:' + color[4-i]+'"></i> '+labels[i]+'</p>';}
		this._div.innerHTML = html;
	};
	legends3.update3 = function (field){
		if(!(field)){field = init_field}
		var max = getMax(col_max,field);
		var labels = [max[1][4]+1 + " - " + max[0],max[1][3]+1 + " - " + max[1][4],max[1][2]+1 + " - " + max[1][3],max[1][1]+1 +" - " + max[1][2],"1 - " + max[1][1]];
		var html = "<p><b>"+ field +"</b></p>";
		var color = color3
		for(i=0;i<5;i++){
			html = html +'<p><i style="background-color:' + color[4-i]+'"></i> '+labels[i]+'</p>';}
		this._div.innerHTML = html;
	};	
	
    map1.on('baselayerchange', function (eventLayer) {
          legends1.update1(eventLayer.name);
    });
	map2.on('baselayerchange', function (eventLayer) {
          legends2.update2(eventLayer.name);
    });
	map3.on('baselayerchange', function (eventLayer) {
          legends3.update3(eventLayer.name);
    });
        
	var init_field = "Dead People";
    legends1.addTo(map1);
	var init_field = "Tarpaulin";
	legends2.addTo(map2);
	var init_field = "All";
	legends3.addTo(map3);
    
    return [map1,map2,map3];    
}


function getOnEachFeature(feature, layer) {
	layer.bindPopup("<b>" + feature.properties.DISTRICT
				+ "</b><br/>"+ field +": " + getData(NRCS_data,feature.properties.OCHA_PCODE,field));
    layer.on({
        mouseover: onMouseOver,
		mouseout: onMouseOut,
		click: zoomToFeature
    });
}

function zoomToFeature(e) {
	var temp;
	if(e.target.feature.properties.OCHA_PCODE == window.zoomed){
		temp = bounds;
		window.zoomed = NaN;
		}else{
		temp = e.target.getBounds();
		window.zoomed = e.target.feature.properties.OCHA_PCODE;}
	map1.unsync(map2);
	map1.unsync(map3);
	map2.unsync(map1);
	map2.unsync(map3);
	map3.unsync(map1);
	map3.unsync(map2);
    map1.fitBounds(temp);
	map2.fitBounds(temp);
	map3.fitBounds(temp);
	map1.sync(map2);
	map1.sync(map3);
	map2.sync(map1);
	map2.sync(map3);
	map3.sync(map1);
	map3.sync(map2);
}		

function onMouseOver(e) {
	document.getElementById("dmg_dis").innerHTML = "<b>" + e.target.feature.properties.DISTRICT + "<b/>";
	document.getElementById("dmg_dis_1").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Dead People").toLocaleString();
	document.getElementById("dmg_dis_2").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Missing People").toLocaleString();
	document.getElementById("dmg_dis_3").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Injured People").toLocaleString();
	document.getElementById("dmg_dis_4").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Affected Families").toLocaleString();
	document.getElementById("dmg_dis_5").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Displaced Families").toLocaleString();
	document.getElementById("dmg_dis_6").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Fully Destroyed Houses").toLocaleString();
	document.getElementById("dmg_dis_7").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Partially Destroyed Houses").toLocaleString();
	document.getElementById("dist_dis_1").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"NFRI-Full-set").toLocaleString();
	document.getElementById("dist_dis").innerHTML = "<b>" + e.target.feature.properties.DISTRICT + "<b/>";	
	document.getElementById("dist_dis_2").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Tarpaulin").toLocaleString();
	document.getElementById("dist_dis_3").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Blankets").toLocaleString();
	document.getElementById("dist_dis_4").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"ORS").toLocaleString();
	document.getElementById("dist_dis_5").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Hygiene-kits").toLocaleString();
	document.getElementById("dist_dis_6").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Aqua-Tab").toLocaleString();
	document.getElementById("dist_dis_7").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Soap").toLocaleString();
	document.getElementById("vol_dis").innerHTML = "<b>" + e.target.feature.properties.DISTRICT + "<b/>";
	document.getElementById("vol_dis_1").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"FA").toLocaleString();
	document.getElementById("vol_dis_2").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"CADRE/Rescue Team").toLocaleString();
	document.getElementById("vol_dis_3").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"NDRT").toLocaleString();
	document.getElementById("vol_dis_4").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"PSS").toLocaleString();
	document.getElementById("vol_dis_5").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"RFL/DBM").toLocaleString();
	document.getElementById("vol_dis_6").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"WASH").toLocaleString();
	document.getElementById("vol_dis_7").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"DDRT").toLocaleString();
	document.getElementById("vol_dis_8").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"Other").toLocaleString();
	document.getElementById("vol_dis_9").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"International Delegates/Volunteers").toLocaleString();
	document.getElementById("vol_dis_10").innerHTML = getData(NRCS_data,e.target.feature.properties.OCHA_PCODE,"All").toLocaleString();
}

function onMouseOut() {
	document.getElementById("dmg_dis").innerHTML = "<b>District<b/>";
	document.getElementById("dmg_dis_1").innerHTML = "-";
	document.getElementById("dmg_dis_2").innerHTML = "-";
	document.getElementById("dmg_dis_3").innerHTML = "-";
	document.getElementById("dmg_dis_4").innerHTML = "-";
	document.getElementById("dmg_dis_5").innerHTML = "-";
	document.getElementById("dmg_dis_6").innerHTML = "-";
	document.getElementById("dmg_dis_7").innerHTML = "-";
	document.getElementById("dist_dis_1").innerHTML = "-";
	document.getElementById("dist_dis").innerHTML = "<b>District<b/>";	
	document.getElementById("dist_dis_2").innerHTML = "-";
	document.getElementById("dist_dis_3").innerHTML = "-";
	document.getElementById("dist_dis_4").innerHTML = "-";
	document.getElementById("dist_dis_5").innerHTML = "-";
	document.getElementById("dist_dis_6").innerHTML = "-";
	document.getElementById("dist_dis_7").innerHTML = "-";
	document.getElementById("vol_dis").innerHTML = "<b>District<b/>";
	document.getElementById("vol_dis_1").innerHTML = "-";
	document.getElementById("vol_dis_2").innerHTML = "-";
	document.getElementById("vol_dis_3").innerHTML = "-";
	document.getElementById("vol_dis_4").innerHTML = "-";
	document.getElementById("vol_dis_5").innerHTML = "-";
	document.getElementById("vol_dis_6").innerHTML = "-";
	document.getElementById("vol_dis_7").innerHTML = "-";
	document.getElementById("vol_dis_8").innerHTML = "-";
	document.getElementById("vol_dis_9").innerHTML = "-";
	document.getElementById("vol_dis_10").innerHTML = "-";
}

    
var maps = init();
var map1 = maps[0];
var map2 = maps[1];
var map3 = maps[2];
var bounds = map1.getBounds();
var zoomed = NaN;

document.getElementById("dmg_full_1").innerHTML = parseInt( col_max[0].sum ).toLocaleString();
document.getElementById("dmg_full_2").innerHTML = parseInt( col_max[1].sum ).toLocaleString();
document.getElementById("dmg_full_3").innerHTML = parseInt( col_max[2].sum ).toLocaleString();
document.getElementById("dmg_full_4").innerHTML = parseInt( col_max[3].sum ).toLocaleString();
document.getElementById("dmg_full_5").innerHTML = parseInt( col_max[4].sum ).toLocaleString();
document.getElementById("dmg_full_6").innerHTML = parseInt( col_max[5].sum ).toLocaleString();
document.getElementById("dmg_full_7").innerHTML = parseInt( col_max[6].sum ).toLocaleString();
document.getElementById("dist_full_1").innerHTML = parseInt( col_max[7].sum ).toLocaleString();
document.getElementById("dist_full_2").innerHTML = parseInt( col_max[8].sum ).toLocaleString();
document.getElementById("dist_full_3").innerHTML = parseInt( col_max[9].sum ).toLocaleString();
document.getElementById("dist_full_4").innerHTML = parseInt( col_max[10].sum ).toLocaleString();
document.getElementById("dist_full_5").innerHTML = parseInt( col_max[11].sum ).toLocaleString();
document.getElementById("dist_full_6").innerHTML = parseInt( col_max[12].sum ).toLocaleString();
document.getElementById("dist_full_7").innerHTML = parseInt( col_max[13].sum ).toLocaleString();
document.getElementById("vol_full_1").innerHTML = parseInt( col_max[14].sum ).toLocaleString();
document.getElementById("vol_full_2").innerHTML = parseInt( col_max[15].sum ).toLocaleString();
document.getElementById("vol_full_3").innerHTML = parseInt( col_max[16].sum ).toLocaleString();
document.getElementById("vol_full_4").innerHTML = parseInt( col_max[17].sum ).toLocaleString();
document.getElementById("vol_full_5").innerHTML = parseInt( col_max[18].sum ).toLocaleString();
document.getElementById("vol_full_6").innerHTML = parseInt( col_max[19].sum ).toLocaleString();
document.getElementById("vol_full_7").innerHTML = parseInt( col_max[20].sum ).toLocaleString();
document.getElementById("vol_full_8").innerHTML = parseInt( col_max[21].sum ).toLocaleString();
document.getElementById("vol_full_9").innerHTML = parseInt( col_max[22].sum ).toLocaleString();
document.getElementById("vol_full_10").innerHTML = parseInt( col_max[23].sum ).toLocaleString();
