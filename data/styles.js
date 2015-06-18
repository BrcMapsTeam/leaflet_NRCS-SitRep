var color = ["#ecf4cb","#ffe082","#ffbd13","#ff8053","#ff493d"];

var col_header = ["Dead",
    "Missing",
    "Injured",
    "Affected Families",
    "Displaced Families",
    "Fully",
    "Partially",
    "NFRI-Full-set",
    "Tarpaulin",
    "Blankets",
    "ORS",
    "Hygiene-kits",
    "Aqua-Tab",
    "Soap"];

function listMax(header,data){
	var temp = [];
	header.forEach(function(entry) {
		temp.push({field: entry, 
				max: Math.max.apply(Math,data.map(function(o){
				return o[entry];}))});		
		});
	return temp;
};

function getMax(list,field){
	for(i in list){
		if(list[i]["field"]==field){
			return list[i]["max"];
		};}
};

function getData(list,pcode,field){
	for(i in list){
		if(list[i]["Pcode"]==pcode){
			return list[i][field];
		};}
};

var col_max = listMax(col_header,NRCS_data);

var getStyle = function(feature){
		var data = getData(NRCS_data,feature.properties.OCHA_PCODE,field);
		var max = getMax(col_max,field);
	    if(data>4*max/5){
	        return {color: color[4],fillColor: color[4],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(data>3*max/5){
	        return {color: color[3],fillColor: color[3],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(data>2*max/5){
	        return {color: color[2],fillColor: color[2],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(data>max/5){
	        return {color: color[1],fillColor: color[1],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(data>0){ 
	    	return {color: color[0],fillColor: color[0],fillOpacity:0.6,opacity:0.7,weight:2};
		} else {
	    	return {"color": "none","opacity":1};
		}
};


var watStyle = function(feature){
		var field = "Dead";
		var data = getData(NRCS_data,feature.properties.OCHA_PCODE,field);
		var max = getMax(col_max,field);
	    if(data>4*max/5){
	        return {color: color[4],fillColor: color[4],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(data>3*max/5){
	        return {color: color[3],fillColor: color[3],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(data>2*max/5){
	        return {color: color[2],fillColor: color[2],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(data>max/5){
	        return {color: color[1],fillColor: color[1],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(data>0){ 
	    	return {color: color[0],fillColor: color[0],fillOpacity:0.6,opacity:0.7,weight:2};
		} else {
	    	return {"color": "none","opacity":1};
		}
};

var sanStyle = function(feature){
	    if(feature.properties.san_cov>0.8){
	        return {color: color[0],fillColor: color[0],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(feature.properties.san_cov>0.6){
	        return {color: color[1],fillColor: color[1],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(feature.properties.san_cov>0.4){
	        return {color: color[2],fillColor: color[2],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(feature.properties.san_cov>0.2){
	        return {color: color[3],fillColor: color[3],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(feature.properties.san_cov>0){ 
	    	return {color: color[4],fillColor: color[4],fillOpacity:0.6,opacity:0.7,weight:2};
		} else {
	    	return {"color": "none","opacity":1};
		}
};

var hygStyle = function(feature){
	    if(feature.properties.hyg_cov>0.8){
	        return {color: color[0],fillColor: color[0],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(feature.properties.hyg_cov>0.6){
	        return {color: color[1],fillColor: color[1],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(feature.properties.hyg_cov>0.4){
	        return {color: color[2],fillColor: color[2],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(feature.properties.hyg_cov>0.2){
	        return {color: color[3],fillColor: color[3],fillOpacity:0.6,opacity:0.7,weight:2};
	    } else if(feature.properties.hyg_cov>0){ 
	    	return {color: color[4],fillColor: color[4],fillOpacity:0.6,opacity:0.7,weight:2};
		} else {
	    	return {"color": "none","opacity":1};
		}
};
