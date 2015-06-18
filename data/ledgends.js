watLegendContent = function(){
    var labels = ["80-100%","60-80%","40-60%","20-40%","0-20%"];
    var html = "<p><b>Water</b></p>";
    for(i=0;i<5;i++){
        html = html +'<p><i style="background-color:' + color[i]+'"></i> '+labels[i]+'</p>';
    }
    return html;
};

sanLegendContent = function(){
    var labels = ["80-100%","60-80%","40-60%","20-40%","0-20%"];
    var html = "<p><b>Sanitation</b></p>";
    for(i=0;i<5;i++){
        html = html +'<p><i style="background-color:' + color[i]+'"></i> '+labels[i]+'</p>';
    }
    return html;
};

hygLegendContent = function(){
    var labels = ["80-100%","60-80%","40-60%","20-40%","0-20%"];
    var html = "<p><b>Hygiene</b></p>";
    for(i=0;i<5;i++){
        html = html +'<p><i style="background-color:' + color[i]+'"></i> '+labels[i]+'</p>';
    }
    return html;
};
