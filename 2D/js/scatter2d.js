 /*
 
 D3.JS [v4] SCATTER PLOT 2D based on CSV data

 @author  Vladimir V KUCHINOV
 @email   helloworld@vkuchinov.co.uk
 
 */

var CSV_URL = "data/data.csv";

var parameters = {
    
    x: "dim4",
    y: "dim2",
    z: "dim1",
    colcode: "colcode1",
    circlesize: "circlesize1",
    radiusGauge: 2.5E-2,
    dimensions: { x: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
                  y: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
                  z: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
                },
    radiusLegend : { circlesize1: ["100", "200", "300", "400"], circlesize2: ["50", "100", "150", "200"] },
    radiusRange : { 1: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY } , 2: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY } },
    margin: 64
    
};

var svg, div, legendBox, w, h, gX, gY, gridsX, gridsY; 
var zoom = d3.zoom().on("zoom", zoomed);

var colors = d3.scaleOrdinal(d3.schemeCategory10);

var w =  window.innerWidth, h =  window.innerHeight;

var pointCloud, points = [], sorted = [], axes = [], values =[], labels = [], grids = [], guide;


var xScale = d3.scaleLinear().range([parameters.margin, w - parameters.margin]);
var yScale = d3.scaleLinear().range([h - parameters.margin, parameters.margin]);
var xAxis = d3.axisBottom(xScale).tickSize(-(h - parameters.margin * 2));
var yAxis = d3.axisLeft(yScale).tickSize(-(w - parameters.margin * 2 ));

d3.csv(CSV_URL, function(error_, data_) {

    if (error_) throw error_;

    data_.forEach(function(d_) {
    
    parameters.radiusRange[1].min = Math.min(parameters.radiusRange[1].min, d_.circlesize1);
    parameters.radiusRange[1].max = Math.max(parameters.radiusRange[1].max, d_.circlesize1);
                                
    parameters.radiusRange[2].min = Math.min(parameters.radiusRange[2].min, d_.circlesize2);
    parameters.radiusRange[2].max = Math.max(parameters.radiusRange[2].max, d_.circlesize2);

    parameters.dimensions.x.min = Math.min(parameters.dimensions.x.min, d_[parameters.x]);
    parameters.dimensions.x.max = Math.max(parameters.dimensions.x.max, d_[parameters.x]);
    parameters.dimensions.y.min = Math.min(parameters.dimensions.y.min, d_[parameters.y]);
    parameters.dimensions.y.max = Math.max(parameters.dimensions.y.max, d_[parameters.y]);
        
    points.push(d_)
                               
    });
    
    svg = d3.select("#scatter2D").append("svg").attr("width", w).attr("height", h).call(zoom);
    
    div = d3.select("#tooltip");
                                     
    xScale.domain([parameters.dimensions.x.min, parameters.dimensions.x.max]);
    yScale.domain([parameters.dimensions.y.min, parameters.dimensions.y.max]);
        
    //DRAW AXIS
    
    gX = svg.append('g').attr("class", "axis axis--x")
    .attr('transform', 'translate(' + 0 + ',' +  (h - parameters.margin) + ')')
    .call(xAxis);
    
    gY = svg.append('g').attr("class", "axis axis--y")
    .attr('transform', 'translate(' + parameters.margin + ',' + 0 + ')')
    .call(yAxis);

    d3.selectAll(".tick").attr("stroke", "#DEDEDE").attr("opacity", 0.25);
    //DRAW POINTS
    
    var RenderedPoints = svg.selectAll(".nodes").data(points);
    
RenderedPoints.enter()
                .append("circle")
                .attr("class", function(d_) { return "nodes " + "col_" + d_[parameters.colcode] + " radius_" + setRadius(d_[parameters.circlesize]); })
                .merge(RenderedPoints)
                .attr("cx", function(d_){ return xScale(d_[parameters.x]); })
                .attr("cy", function(d_){ return yScale(d_[parameters.y]); })
                .attr("r",  function(d_, i_) { return points[i_][parameters.circlesize] * parameters.radiusGauge; })
                .attr("fill", function(d_, i_) { return colors(d_[parameters.colcode]); })
                .attr("opacity", function(d_, i_) { return 0.69; })
                .attr("visibility", true)
                .on("mouseover", function(d_) {

                    d3.select(this).attr("stroke-width", 5).attr("stroke", "#DEDEDE");

                })
                .on("mouseout", function(d_) {
    
                    d3.select(this).attr("stroke", "none");
    
                })
                .on("click", function(d_, i_) {

                    document.getElementById("audio").src = points[i_].meta2;
                    document.getElementById("info").innerHTML = points[i_].meta1;

                    div.style("left", function() {
                        return window.innerWidth / 2 - 200;
                    })
                    .style("top", function() {
                        return window.innerHeight / 2 - 150
                    })
                    .style("pointer-events", "all");
                    div.transition()
                    .duration(500)
                    .style("opacity", 0.75);

                });

    RenderedPoints.exit().remove();
    
    legendBox = svg.append("g").attr("id", "legendBox").attr("transform", function() { return "translate(" + (w - 144) + ",64)"; })

    var legendBackground = legendBox.append("rect")
            .attr("class", "legendBox")
            .attr("x", -32)
            .attr("y", -32)
            .attr("width", 132)
            .attr("height", 408)

    var factor = legendBox.append("text").attr("dx", -10).style("font-family", "sans-serif").attr("font-weight", "bold").text("factor(gear)");
  
    var legendList = legendBox.selectAll(".legendList").data(Array.apply(null, {
        length: 10
        }).map(Number.call, Number))
        .enter()
        .append("g")
        .attr("transform", function(d_) { return "translate(16," + (32 + d_ * 18) + ")"; })
        .attr("class", "legendList")

    legendList.append("circle")
        .attr("id", function(d_){ return "blob_" + d_; }, true)
        .attr("cx", -20)
        .attr("cy", -5)
        .attr("r", 6)
        .attr("stroke-width", 2.5)
        .attr("opacity", 0.69)
        .attr("fill", function(d_) { return colors(d_); })
 
    legendList.append("text")
        .attr("baseline", "central")
        .style("font-family", "sans-serif")
        .text(function(d_) { return d_; });
    
    legendList.append("rect")
        .attr("class", "controls")
        .attr("x", -32)
        .attr("y", -14)
        .attr("width", 100)
        .attr("height", 18)
        .attr("fill", "transparent")
        .on("mouseover", function(d_){ d3.select("#blob_" + d_).attr("stroke", "#FEFEFE"); })
        .on("mouseout", function(d_){  d3.select("#blob_" + d_).attr("stroke", "transparent"); })
        .on("mousedown", function(d_){ 
    
            var b = d3.select("#blob_" + d_);
            if(b.attr("fill") == "#DEDEDE") { 
                
                d3.selectAll(".col_" + d_).attr("opacity", 0.69);
                b.attr("fill", colors(d_)); 
                b.attr("opacity", 0.69); 
            
            }
            else { 
                
                d3.selectAll(".col_" + d_).attr("opacity", 0.02);
                b.attr("fill", "#DEDEDE"); 
                b.attr("opacity", 0.02); 
            
            }
    
    });

    var mpg = legendBox.append("text").attr("dx", -10).attr("dy", 228).style("font-family", "sans-serif").attr("font-weight", "bold").text("mpg");
    
    var legendList2 = legendBox.selectAll(".legendList2").data(Array.apply(null, {
            length: 4
        }).map(Number.call, Number))
        .enter()
        .append("g")
        .attr("transform", function(d_) { return "translate(16," + (260 + setOffset(d_)) + ")"; })
        .attr("class", "legendList2")

    legendList2.append("rect")
        .attr("id", function(d_) { return "rad_" + d_; })
        .attr("x", function(d_) { return -20 - opticalCompensation(d_); })
        .attr("y", -11)
        .attr("rx", function(d_) { return (15 + d_ * 5) * 0.5; } )
        .attr("ry", function(d_) { return (15 + d_ * 5) * 0.5; }  )
        .attr("width", function(d_) { return (15 + d_ * 5) * 1.0;  } )
        .attr("height", function(d_) { return (15 + d_ * 5) * 1.0;  } )
        .attr("fill", "#FFFFFF")
        .attr("stroke", "#000000");

    legendList2.append("text")
        .attr("id", function(d_){ return "scale_" + d_; } ) 
        .attr("baseline", "central")
        .attr("dx", 16)
        .attr("dy", function(d_){ return ((d_ + 1) * 5) / 2; })
        .style("font-family", "sans-serif")
        .text(function(d_) { return parameters.radiusLegend[parameters.circlesize][d_]; });
    
    legendList2.append("rect")
        .attr("class", "controls")
        .attr("x", -32)
        .attr("y", -15)
        .attr("width", 100)
        .attr("height", function(d_) { return (15 + d_ * 5) * 1.2; })
        .attr("fill", "transparent")
        .on("mouseover", function(d_){ d3.select("#rad_" + d_).attr("stroke-width", 2.5); })
        .on("mouseout", function(d_){  d3.select("#rad_" + d_).attr("stroke-width", 1); })
        .on("mousedown", function(d_){ 
    
            var r = d3.select("#rad_" + d_);
        
            if(r.attr("fill") == "#FFFFFF") { 
                
                d3.selectAll(".radius_" + d_).attr("visibility", "hidden"); 
                r.attr("fill", "transparent");r.attr("stroke", "#DEDEDE");
            
            }
            else { 
                
                d3.selectAll(".radius_" + d_).attr("visibility", "true");
                r.attr("fill", "#FFFFFF"); r.attr("stroke", "#000000"); 
            
            }
    
        });
    
});

function zoomed() {
    
  var new_xScale = d3.event.transform.rescaleX(xScale)
  var new_yScale = d3.event.transform.rescaleY(yScale)

  gX.call(xAxis.scale(new_xScale));
  gY.call(yAxis.scale(new_yScale));

  var dims = { x: { min: new_xScale.domain()[0] , max: new_xScale.domain()[1] }, y :    { min: new_yScale.domain()[0] , max: new_yScale.domain()[1] } };

    d3.selectAll(".nodes").attr("transform", d3.event.transform).attr("visibility", function(d_) { if(d_[parameters.x] < dims.x.min || d_[parameters.x] > dims.x.max ||  d_[parameters.y] < dims.y.min || d_[parameters.y] > dims.y.max || !checkRadiusVisibility(d_[parameters.circlesize]) ) { return "hidden"; } return true; }).attr("r", function(d_) { return d_[parameters.circlesize] * parameters.radiusGauge / d3.event.transform.k; }).style("stroke-width", 5 / d3.event.transform.k);
    
    d3.selectAll(".tick").attr("stroke", "#DEDEDE").attr("opacity", 0.25 /  d3.event.transform.k);
    
}

function setOffset(d_){
    
    out = 0;
    
    for(var i = 0; i < d_; i++){
        
        out += (15 + i * 5) * 1.2;
    }
    
    return out;
}

function opticalCompensation(d_){ return (15 + d_ * 5) * 0.35; }

function changeColors() { 
    
    parameters.colcode = document.getElementById("colorSelector").value; 
    
    d3.selectAll(".nodes").attr("fill", function(d_, i_){ return colors(d_[parameters.colcode]); })   
    d3.selectAll(".nodes").attr("class", function(d_, i_){ return "nodes " + "col_" + d_[parameters.colcode] + " radius_" + setRadius(d_[parameters.circlesize]); })   
 
 }

function changeRadiuses() { 
    
    parameters.circlesize = document.getElementById("radiusSelector").value;
    
    d3.selectAll(".nodes").attr("r", function(d_, i_){ return points[i_][parameters.circlesize] * parameters.radiusGauge;  })       
    d3.selectAll(".nodes").attr("class", function(d_, i_){ return "nodes " + "col_" + d_[parameters.colcode] + " radius_" + setRadius(d_[parameters.circlesize]); }) 
    
    for(var i = 0; i < parameters.radiusLegend.circlesize1.length; i++){
        
        d3.select("#scale_" + i).text( parameters.radiusLegend[parameters.circlesize][i]);
        
    }

}

function checkRadiusVisibility(value_){
    
    k = 0;
    
    if(parameters.circlesize = "circlesize1"){

        var k = Math.floor(value_ / 100);
        if(k > 3) { k = 3; }
 

    }else{

        var k = Math.floor(value_ / 50);
        if(k > 3) { k = 3; }

    }
    
    if(d3.select("#rad_" + k).attr("fill") == "transparent") { return false; }
    
    return true;
    
}


function setRadius(value_){
    
    if(parameters.circlesize = "circlesize1"){

        var k = Math.floor(value_ / 100);
        if(k > 3) { k = 3; }
        return k;

    }else{

        var k = Math.floor(value_ / 50);
        if(k > 3) { k = 3; }
        return k;

    }
    
}

function closeTooltip() { 

    div.transition()
    .duration(500)
    .style("opacity", 0.0);
    div.style("pointer-events", "none");

    document.getElementById("audio").pause();
    
}

function map(value_, min1_, max1_, min2_, max2_){ return min2_ + (value_ - min1_) / (max1_ - min1_) * (max2_ - min2_); }

Number.prototype.between = function(domain_) {
    
    var min = Math.min.apply(Math, domain_);
    var max = Math.max.apply(Math, domain_);
  
    return this >= min && this <= max;
    
};

function backToOrigin(){ this.svg.call(this.zoom.transform, d3.zoomIdentity.scale(1)); }

d3.selection.prototype.moveToFront = function() {  
    
    return this.each(function(){ this.parentNode.appendChild(this); });
    
};

