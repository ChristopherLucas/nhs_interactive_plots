 /*
 
 D3.JS [v4] ETHNO SCATTER PLOT 3D based on CSV data
 based on Three.JS | D3.JS stack

 PLEASE DON'T USE DOTS AT HEADER NAMES
 
 song.function -> song_function or songFunction
 song.1 -> song_1 or song1
 song.2 -> song_2 or song2
 song.3 -> song_3 or song3
 
 @author  Vladimir V KUCHINOV
 @email   helloworld@vkuchinov.co.uk
 
 */
 */

 //you don't extract anything from "NHSEthnography_Reliability.csv"
 //so I skip it
 var CSV_PREFIX = "data/";
 var CSV_URL = "ethno_bpca_scores_20181228.csv";
 var DATASET_PREFIX = "data/dataset/";
 var DATASET_URLS = ["NHSEthnography_AnnotatePrim.csv", "NHSEthnography_AnnotateSec.csv", "NHSEthnography_FreeText.csv", "NHSEthnography_Scraping.csv", "NHSCultures_Metadata.csv", "NHSEthnography_Metadata.csv"];
 var ethno = {
     index: "indx",
     x: "score_1",
     y: "score_2",
     z: "score_3",
     indices: {
         NHSEthnography_AnnotatePrim: "indx",
         NHSEthnography_AnnotateSec: "indx",
         NHSEthnography_FreeText: "indx",
         NHSEthnography_Scraping: "indx",
         NHSCultures_Metadata: "id_nhs",
         NHSEthnography_Metadata: "NHSCultures_Metadata.id_hraf",
     },
     color: [{
         index: "song_function",
         dict: ["dance", "healing", "love", "lullaby", "other"],
         f: null
     }, {
         index: "NHSEthnography_AnnotateSec.audience_sex",
         dict: ["Male", "Female", "Both Sex"],
         f: null
     }, {
         index: "NHSEthnography_AnnotatePrim.singers_sex",
         dict: ["Male", "Female", "Both Sex"],
         f: null
     }, {
         index: "NHSEthnography_AnnotatePrim.instrument",
         dict: ["non-instrumental", "instrumental"],
         f: null
     }, {
         index: "NHSEthnography_AnnotatePrim.ceremony",
         dict: ["non-ceremonical", "ceremonical"],
         f: null
     }, {
         index: "NHSEthnography_AnnotatePrim.trance",
         dict: ["no trance", "trance"],
         f: null
     }, {
         index: "NHSEthnography_AnnotatePrim.child_for",
         dict: ["not for child", "ifor child"],
         f: null
     }, {
         index: "NHSEthnography_AnnotatePrim.audience_dance",
         dict: ["audience didn't dance", "audience danced"],
         f: null
     }, {
         index: "NHSEthnography_AnnotatePrim.singers_dance",
         dict: ["singer(s) didn't dance", "singer(s) danced"],
         f: null
     }, ],
     radius: [{
         index: "na",
         dict: [{
             l: "unified",
             r: 4.9
         }],
         f: null,
         f2: null
     }, {
         index: "NHSEthnography_AnnotateSec.recur",
         dict: [{
             l: "No recurrence",
             r: 2.0
         }, {
             l: "1-2 days",
             r: 5.0
         }, {
             l: "3-7 days",
             r: 10.0
         }, {
             l: ">7 days",
             r: 15.0
         }],
         f: null,
         f2: null
     }, {
         index: "NHSEthnography_AnnotateSec.time_start",
         dict: [{
             l: "Early morning (0400 to 0700) (includes daybreak, dawn)",
             r: 4.0
         }, {
             l: "Morning (0700 to 1000)",
             r: 6.0
         }, {
             l: "Midday (1000 to 1400)",
             r: 8.0
         }, {
             l: "Afternoon (1400 to 1700)",
             r: 10.0
         }, {
             l: "Early evening (1700 to 1900)",
             r: 12.0
         }, {
             l: "Evening (1900 to 2200)",
             r: 16.0
         }, {
             l: "Night (2200 to 0400)",
             r: 18.0
         }],
         f: null,
         f2: null
     }, {
         index: "NHSEthnography_AnnotateSec.duration",
         dict: [{
             l: "<10 min",
             r: 3.0
         }, {
             l: "10 min-1 hour",
             r: 6.0
         }, {
             l: "1-10 hours",
             r: 9.0
         }, {
             l: ">10 hours",
             r: 12.0
         }],
         f: null,
         f2: null
     }, {
         index: "NHSEthnography_AnnotateSec.audience_age2",
         dict: [{
             l: "Child",
             r: 2.0
         }, {
             l: "Adolescent/young adult",
             r: 4.0
         }, {
             l: "Adult",
             r: 6.0
         }, {
             l: "Elder",
             r: 8.0
         }, {
             l: "All ages",
             r: 10.0
         }],
         f: null,
         f2: null
     }, {
         index: "NHSEthnography_AnnotateSec.audience_n",
         dict: [{
             l: "Solo listener",
             r: 2.0
         }, {
             l: "2-5 listeners",
             r: 5.0
         }, {
             l: "6-10 listeners",
             r: 10.0
         }, {
             l: "11-20 listeners",
             r: 15.0
         }, {
             l: "21-30 listeners",
             r: 25.0
         }, {
             l: "21-30 listeners",
             r: 25.0
         }, {
             l: "30-60 listeners",
             r: 45.0
         }, {
             l: "60-100 listeners",
             r: 75.0
         }, {
             l: ">100 listeners",
             r: 100.0
         }, {
             l: "Multiple listeners (number unknown)",
             r: 50.0
         }],
         f: null,
         f2: null
     }, {
         index: "NHSEthnography_AnnotateSec.singers_age1",
         dict: [{
             l: "Child",
             r: 2.0
         }, {
             l: "Adolescent/young adult",
             r: 4.0
         }, {
             l: "Adult",
             r: 6.0
         }, {
             l: "Elder",
             r: 8.0
         }, {
             l: "All ages",
             r: 10.0
         }],
         f: null,
         f2: null
     }, {
         index: "NHSEthnography_AnnotateSec.singers_n",
         dict: [{
             l: "Solo singer",
             r: 2.0
         }, {
             l: "2-5 singers",
             r: 5.0
         }, {
             l: "6-10 singers",
             r: 10.0
         }, {
             l: "11-20 singers",
             r: 15.0
         }, {
             l: "21-30 singers",
             r: 25.0
         }, {
             l: "21-30 singers",
             r: 25.0
         }, {
             l: "30-60 singers",
             r: 45.0
         }, {
             l: "60-100 singers",
             r: 75.0
         }, {
             l: ">100 singers",
             r: 100.0
         }, {
             l: "Multiple singers (number unknown)",
             r: 50.0
         }],
         f: null,
         f2: null
     }],
     popup: [{
         index: "NHSCultures_Metadata.culture"
     }, {
         index: "NHSEthnography_FreeText.text"
     }, {
         index: "NHSEthnography_FreeText.lyric"
     }, {
         index: "NHSEthnography_Scraping.cite_text"
     }, {
         index: "NHSEthnography_Scraping.ocm"
     }],
     checkbox: {
         legend: ["culture by region"],
         dictionary: {
             "EmberÃ¡": "Emberá",
             "JavaÃ©": "Javaé"
         },
         cultures: [],
         regions: [],
         index: []
     }
 };
 ethno.color[0].f = function(n_) {
     var found = 0;
     ethno.color[0].dict.forEach(function(d_, i_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_);
         if (isEquel) {
             found = i_
         }
     });
     return found
 }
 ethno.color[1].f = function(n_) {
     var found = 0;
     ethno.color[1].dict.forEach(function(d_, i_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_);
         if (isEquel) {
             found = i_
         }
     });
     return found
 }
 ethno.color[2].f = function(n_) {
     var found = 0;
     ethno.color[1].dict.forEach(function(d_, i_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_);
         if (isEquel) {
             found = i_
         }
     });
     return found
 }
 for (var i = 3; i < 9; i++) {
     ethno.color[i].f = function(n_) {
         return n_
     }
 }
 ethno.radius[0].f2 = function(n_) {
     return 0
 }
 ethno.radius[1].f = function(n_) {
     var found = 0;
     ethno.radius[1].dict.forEach(function(d_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = d_.r
         }
     });
     return found
 }
 ethno.radius[1].f2 = function(n_) {
     var found = 0;
     ethno.radius[1].dict.forEach(function(d_, i_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = i_
         }
     });
     return found
 }
 ethno.radius[2].f = function(n_) {
     var found = 0;
     ethno.radius[2].dict.forEach(function(d_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = d_.r
         }
     });
     return found
 }
 ethno.radius[2].f2 = function(n_) {
     var found = 0;
     ethno.radius[2].dict.forEach(function(d_, i_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = i_
         }
     });
     return found
 }
 ethno.radius[3].f = function(n_) {
     var found = 0;
     ethno.radius[3].dict.forEach(function(d_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = d_.r
         }
     });
     return found
 }
 ethno.radius[3].f2 = function(n_) {
     var found = 0;
     ethno.radius[3].dict.forEach(function(d_, i_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = i_
         }
     });
     return found
 }
 ethno.radius[4].f = function(n_) {
     var found = 0;
     ethno.radius[4].dict.forEach(function(d_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = d_.r
         }
     });
     return found
 }
 ethno.radius[4].f2 = function(n_) {
     var found = 0;
     ethno.radius[4].dict.forEach(function(d_, i_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = i_
         }
     });
     return found
 }
 ethno.radius[5].f = function(n_) {
     var found = 0;
     ethno.radius[5].dict.forEach(function(d_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = d_.r
         }
     });
     return found
 }
 ethno.radius[5].f2 = function(n_) {
     var found = 0;
     ethno.radius[5].dict.forEach(function(d_, i_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = i_
         }
     });
     return found
 }
 ethno.radius[6].f = function(n_) {
     var found = 0;
     ethno.radius[6].dict.forEach(function(d_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = d_.r
         }
     });
     return found
 }
 ethno.radius[6].f2 = function(n_) {
     var found = 0;
     ethno.radius[6].dict.forEach(function(d_, i_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = i_
         }
     });
     return found
 }
 ethno.radius[7].f = function(n_) {
     var found = 0;
     ethno.radius[7].dict.forEach(function(d_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = d_.r
         }
     });
     return found
 }
 ethno.radius[7].f2 = function(n_) {
     var found = 0;
     ethno.radius[7].dict.forEach(function(d_, i_) {
         var isEquel = JSON.stringify(n_) === JSON.stringify(d_.l);
         if (isEquel) {
             found = i_
         }
     });
     return found
 }
 var parameters = {
     color: ethno.color[0],
     radius: ethno.radius[0],
     radiusGauge: 2.5E-2,
     dynamicGauge: 2.5E-2,
     ratio: 32.0,
     zoomLimits: {
         min: 64,
         max: 1024
     },
     spacePanning: !1,
     dimensions: {
         x: {
             min: Number.POSITIVE_INFINITY,
             max: Number.NEGATIVE_INFINITY
         },
         y: {
             min: Number.POSITIVE_INFINITY,
             max: Number.NEGATIVE_INFINITY
         },
         z: {
             min: Number.POSITIVE_INFINITY,
             max: Number.NEGATIVE_INFINITY
         },
     },
     gridColor: "#DEDEDE",
     gridSize: 147.0,
     gridMarkup: 16,
     axisValuesFontSize: "10px",
     radiusScale: d3.scalePow().domain([1, 10]).exponent(0.1).range([4.9, 12]),
     radiusRange: {
         1: {
             min: Number.POSITIVE_INFINITY,
             max: Number.NEGATIVE_INFINITY
         },
         2: {
             min: Number.POSITIVE_INFINITY,
             max: Number.NEGATIVE_INFINITY
         }
     },
     scalable: !0,
     mousemode: "pan",
     active: !1,
     shift: !1,
     centroid: !1,
     statsOn: !1
 };
 makeEvenRadiuses(ethno.radius);
 var stats, scene, renderer, controls, dragControls, lastCamera, lastPosition;
 var camera, cameraControl;
 var pointCloud, points = [],
     sorted = [],
     axes = [],
     values = [],
     labels = [],
     grids = [],
     guide;
 var offset = new THREE.Vector3();
 var limits = {
     x: {
         min: -10,
         max: 10
     },
     y: {
         min: -10,
         max: 10
     },
     z: {
         min: -10,
         max: 10
     }
 }
 var svg, div, legendBox, legendParameters, w, h;
 var colors = d3.scaleOrdinal(d3.schemeCategory10);
 var radiusRatio = 2.5E-2;
 var w = window.innerWidth,
     h = window.innerHeight;
 var xAxis, yAxis, zAxis, xScale, yScale, zScale, xPath, yPath, zPath;
 var scalable = !1;
 var gridVisible = !1;
 var db = [];
 var rendering = !0;
 d3.csv(CSV_PREFIX + CSV_URL, function(error_, data_) {
     if (error_) throw error_;
     setSelectors();
     data_.forEach(function(d_) {
         points[d_[ethno.index]] = d_
     });
     loadAndProcessDataset()
 });

 function setSelectors() {
     var selector1 = document.getElementById("colorSelector");
     ethno.color.forEach(function(d_) {
         var option = document.createElement("option");
         option.text = d_.index;
         selector1.add(option)
     });
     var selector2 = document.getElementById("radiusSelector");
     ethno.radius.forEach(function(d_) {
         var option = document.createElement("option");
         option.text = d_.index;
         selector2.add(option)
     })
 }

 function loadAndProcessDataset() {
     var queue = d3.queue();
     DATASET_URLS.forEach(function(url_) {
         queue.defer(d3.csv, DATASET_PREFIX + url_)
     });
     queue.awaitAll(function(error_, dataset_) {
         if (error_) throw error_;
         dataset_.forEach(function(d_, i_) {
             var name = DATASET_URLS[i_].replace(".csv", "").trim();
             db[name] = [];
             d_.forEach(function(e_) {
                 db[name][e_[Object.keys(e_)[0]]] = e_
             })
         });
         setCulturesPopup(db);
         restructurePoints(points, db);
         svg = d3.select("#scatter3D").append("svg").attr("width", w).attr("height", h);
         div = d3.select("#tooltip");
         var defs = svg.append("defs").append("pattern").attr("id", "cross").attr("patternUnits", "userSpaceOnUse").attr("x", 3).attr("y", 2).attr("width", 12).attr("height", 12).append("svg:path").attr("d", "M 4 4 L 10 10 M 4 10 L 10 4").attr("stroke", "#000000");
         var defs = svg.append("defs").append("pattern").attr("id", "mark").attr("patternUnits", "userSpaceOnUse").attr("x", 4).attr("y", 3).attr("width", 12).attr("height", 12).append("svg:path").attr("d", "M 0 6 L 12 6 M 6 0 L 6 12").attr("stroke", "#000000")
         var xPath = svg.append("defs").append("path").attr("id", "xPath");
         var yPath = svg.append("defs").append("path").attr("id", "yPath");
         var zPath = svg.append("defs").append("path").attr("id", "zPath");
         var xLabel = svg.append("text").append("textPath").attr("class", "xLabel").attr("xlink:href", "#xPath").attr("text-anchor", "end").attr("font-family", "sans-serif").attr("font-size", "12px").attr("startOffset", "100%").attr("dominant-baseline", "ideographic").text(ethno.x);
         var yLabel = svg.append("text").append("textPath").attr("class", "yLabel").attr("xlink:href", "#yPath").attr("text-anchor", "end").attr("font-family", "sans-serif").attr("font-size", "12px").attr("startOffset", "100%").attr("dominant-baseline", "ideographic").text(ethno.y);
         var zLabel = svg.append("text").append("textPath").attr("class", "zLabel").attr("xlink:href", "#zPath").attr("text-anchor", "end").attr("font-family", "sans-serif").attr("font-size", "12px").attr("startOffset", "100%").attr("dominant-baseline", "ideographic").text(ethno.z);
         renderLegend();
         guide = svg.append("path").attr("d", "M-999 -999 L 0 -999").attr("class", "guide");
         document.addEventListener("keydown", function(event_) {
             if (event_.shiftKey) {
                 parameters.shift = !0;
                 switchControls("shiftDown")
             }
         });
         document.addEventListener("keyup", function(event_) {
             switchControls()
         });
         window.addEventListener('resize', onWindowResize, !1);
         init()
     })
 }

 function renderLegend() {
     d3.selectAll(".legend").remove();
     legendParameters = {
         x: 32,
         y: 32,
         width: 160,
         height: 176,
         header1: {
             x: 16,
             y: 24
         },
         header2: {
             x: 16,
             y: 64
         },
         header3: {
             x: 16,
             y: 104
         },
         carriage: 0
     }
     var maxLength = 14;
     parameters.color.dict.forEach(function(d_, i_) {
         legendParameters.height += 10;
         legendParameters.header2.y += 16;
         legendParameters.header3.y += 16;
         maxLength = Math.max(maxLength, d_.length)
     });
     parameters.radius.dict.forEach(function(d_, i_) {
         legendParameters.height += d_.r * 2.2;
         legendParameters.header3.y += d_.r * 2.2;
         maxLength = Math.max(maxLength, d_.l.length)
     });
     legendParameters.width = 80 + maxLength * 5;
     legendBox = svg.append("g").attr("id", "legendBox").attr("transform", function() {
         return "translate(" + (w - legendParameters.width - legendParameters.x) + ", " + legendParameters.y + ")"
     })
     var legendBackground = legendBox.append("rect").attr("class", "legendBox legend").attr("x", 0).attr("y", 0).attr("width", legendParameters.width).attr("height", legendParameters.height)
     var cLabel = legendBox.append("text").attr("class", "legend").attr("dx", legendParameters.header1.x).attr("dy", legendParameters.header1.y).style("font-family", "sans-serif").attr("font-size", 12).attr("font-weight", "bold").text(function(d_) {
         if (parameters.color.index.includes(".")) {
             return parameters.color.index.split(".")[1]
         } else {
             return parameters.color.index
         }
     });
     var legendList = legendBox.selectAll(".legendList").data(parameters.color.dict).enter().append("g").attr("transform", function(d_, i_) {
         return "translate(38," + (48 + i_ * 18) + ")"
     }).attr("class", "legendList legend")
     legendList.append("rect").attr("class", "legend").attr("id", function(d_, i_) {
         return "blob_" + i_
     }, !0).attr("x", -20).attr("y", -11).attr("rx", 6).attr("ry", 6).attr("width", 12).attr("height", 12).attr("stroke-width", 2.5).attr("opacity", 0.69).attr("fill", function(d_, i_) {
         return colors(i_)
     })
     legendList.append("text").attr("class", function(d_, i_) {
         return "legend colorLabel_" + i_
     }).attr("baseline", "central").style("font-family", "sans-serif").style("font-size", 12).text(function(d_) {
         return d_
     });
     legendList.append("rect").attr("class", "legend").attr("x", -26).attr("y", -14).attr("width", legendParameters.width - 16).attr("height", 18).attr("fill", "transparent").on("mouseover", function(d_, i_) {
         d3.select(".colorLabel_" + i_).attr("font-weight", "bolder")
     }).on("mouseout", function(d_, i_) {
         d3.select(".colorLabel_" + i_).attr("font-weight", "normal")
     }).on("click", function(d_, i_) {
         var r = d3.select("#blob_" + i_);
         if (r.attr("fill") == "#DEDEDE") {
             r.attr("fill", colors(i_))
         } else {
             r.attr("fill", "#DEDEDE")
         }
     });
     var rLabel = legendBox.append("text").attr("class", "legend").attr("dx", legendParameters.header2.x).attr("dy", legendParameters.header2.y).style("font-family", "sans-serif").attr("font-size", 12).attr("font-weight", "bold").text(function(d_) {
         if (parameters.radius.index.includes(".")) {
             return parameters.radius.index.split(".")[1]
         } else {
             return parameters.radius.index
         }
     });
     legendParameters.carriage = legendParameters.header2.y + 8;
     var legendList2 = legendBox.selectAll(".legendList2").data(parameters.radius.dict).enter().append("g").attr("transform", function(d_) {
         legendParameters.carriage += d_.r * 2.2;
         return "translate(56," + (legendParameters.carriage) + ")"
     }).attr("class", "legendList2 legend")
     legendList2.append("rect").attr("class", "legend").attr("id", function(d_, i_) {
         return "rad_" + i_
     }).attr("x", function(d_) {
         return -20 - opticalCompensation(d_.r)
     }).attr("y", function(d_) {
         return -d_.r
     }).attr("rx", function(d_) {
         return d_.r
     }).attr("ry", function(d_) {
         return d_.r
     }).attr("width", function(d_) {
         return d_.r * 2
     }).attr("height", function(d_) {
         return d_.r * 2
     }).attr("fill", "#FFFFFF").attr("stroke", "#000000");
     legendList2.append("text").attr("class", function(d_, i_) {
         return "legend radiusLabel_" + i_
     }).attr("id", function(d_, i_) {
         return "scale_" + i_
     }).attr("baseline", "central").attr("dx", -16).attr("dy", 3).style("font-family", "sans-serif").style("font-size", 12).text(function(d_) {
         return d_.l
     });
     legendList2.append("rect").attr("class", "legend").attr("x", -48).attr("y", function(d_) {
         return -d_.r * 1.1
     }).attr("width", legendParameters.width - 16).attr("height", function(d_) {
         return d_.r * 2.2
     }).attr("fill", "transparent").on("mouseover", function(d_, i_) {
         d3.select(".radiusLabel_" + i_).attr("font-weight", "bolder")
     }).on("mouseout", function(d_, i_) {
         d3.select(".radiusLabel_" + i_).attr("font-weight", "normal")
     }).on("click", function(d_, i_) {
         var r = d3.select("#rad_" + i_);
         if (r.attr("fill") == "transparent") {
             r.attr("fill", "#FFFFFF");
             r.attr("stroke", "#000000")
         } else {
             r.attr("fill", "transparent");
             r.attr("stroke", "#DEDEDE")
         }
     });
     var bLabel = legendBox.append("text").attr("class", "legend").attr("dx", legendParameters.header3.x).attr("dy", legendParameters.header3.y).style("font-family", "sans-serif").attr("font-size", 12).attr("font-weight", "bold").text("options");
     var legendList3 = legendBox.selectAll(".legendList3").data(ethno.checkbox.legend).enter().append("g").attr("transform", function(d_, i_) {
         return "translate(38," + (legendParameters.header3.y + 24 + i_ * 18) + ")"
     }).attr("class", "legendList3 legend")
     legendList3.append("rect").attr("class", "legend").attr("id", function(d_, i_) {
         return "blob_" + i_
     }, !0).attr("x", -20).attr("y", -9).attr("rx", 6).attr("ry", 6).attr("width", 12).attr("height", 12).attr("stroke-width", 2.5).attr("opacity", 0.69).attr("fill", "url(#cross)").attr("stroke", "#000000").attr("stroke-width", 1.2)
     legendList3.append("text").attr("class", "legend checkLabel").attr("baseline", "central").style("font-family", "sans-serif").style("font-size", 12).text(function(d_) {
         return d_
     });
     legendList3.append("rect").attr("class", "legend").attr("x", -26).attr("y", -15).attr("width", 128).attr("height", 24).attr("fill", "transparent").on("mouseover", function(d_) {
         d3.select(".checkLabel").attr("font-weight", "bolder")
     }).on("mouseout", function(d_) {
         d3.select(".checkLabel").attr("font-weight", "normal")
     }).on("click", function(d_) {
         rendering = !1;
         var p = document.getElementById("culturesPopup");
         p.style.display = "block"
     })
 }

 function init() {
     xScale = d3.scaleLinear().range([0, w * 0.25]).domain([limits.x.min, limits.x.max]);
     renderer = new THREE.WebGLRenderer();
     renderer.setSize(w, h);
     if (parameters.statsOn) {
         stats = new Stats();
         stats.domElement.style.position = "absolute";
         stats.domElement.style.bottom = "0px";
         document.body.appendChild(stats.domElement)
     }
     scene = new THREE.Scene();
     camera = new THREE.PerspectiveCamera(35, w / h, 1, 10000);
     camera.position.set(256, 512, 512);
     camera.lookAt(0, 0, 0)
     scene.add(camera);
     var cloud = new THREE.Geometry();
     points.forEach(function(d_) {
         var p = new THREE.Vector4(d_[ethno.x] * parameters.ratio, d_[ethno.y] * parameters.ratio, d_[ethno.z] * parameters.ratio, d_.indx);
         cloud.vertices.push(p);
         parameters.dimensions.x.min = Math.min(d_[ethno.x] * parameters.ratio, parameters.dimensions.x.min);
         parameters.dimensions.x.max = Math.max(d_[ethno.x] * parameters.ratio, parameters.dimensions.x.max);
         parameters.dimensions.y.min = Math.min(d_[ethno.y] * parameters.ratio, parameters.dimensions.y.min);
         parameters.dimensions.y.max = Math.max(d_[ethno.y] * parameters.ratio, parameters.dimensions.y.max);
         parameters.dimensions.z.min = Math.min(d_[ethno.z] * parameters.ratio, parameters.dimensions.z.min);
         parameters.dimensions.z.max = Math.max(d_[ethno.z] * parameters.ratio, parameters.dimensions.z.max)
     });
     var cloudmaterial = new THREE.PointsMaterial({
         color: 0xFFFFFF
     });
     pointCloud = new THREE.Points(cloud, cloudmaterial);
     scene.add(pointCloud);
     if (parameters.centroid) {
         remapValues()
     }
     controls = new THREE.OrbitControls(camera, document.getElementById("scatter3D"));
     controls.enableDamping = !0;
     controls.enablePan = !0;
     controls.dampingFactor = 0.25;
     controls.screenSpacePanning = parameters.spacePanning;
     controls.minDistance = parameters.zoomLimits.min;
     controls.maxDistance = parameters.zoomLimits.max;
     controls.mouseButtons = {
         LEFT: THREE.MOUSE.LEFT,
         MIDDLE: THREE.MOUSE.MIDDLE,
         RIGHT: THREE.MOUSE.RIGHT
     };
     animate()
 }

 function animate() {
     var scale = 1.0;
     if (!parameters.scalable && !parameters.centroid) {
         scale = 768.0 / new THREE.Vector3(0, 0, 0).subVectors(new THREE.Vector3(0, 0, 0), camera.position).length()
     }
     axes = [
         [new THREE.Vector3(-196.0 / scale, 1E-5, 1E-5), new THREE.Vector3(196.0 / scale, 1E-5, 1E-5)],
         [new THREE.Vector3(1E-5, -196.0 / scale, 1E-5), new THREE.Vector3(1E-5, 196.0 / scale, 1E-5)],
         [new THREE.Vector3(1E-5, 1E-5, -196.0 / scale), new THREE.Vector3(1E-5, 1E-5, 196.0 / scale)]
     ];
     values = [new THREE.Vector3(-212.0 / scale, 1E-5, 1E-5), new THREE.Vector3(212.0 / scale, 1E-5, 1E-5), new THREE.Vector3(1E-5, -212.0 / scale, 1E-5), new THREE.Vector3(1E-5, 212.0 / scale, 1E-5), new THREE.Vector3(1E-5, 1E-5, -222.0 / scale), new THREE.Vector3(1E-5, 1E-5, 222.0 / scale)];
     grids = [];
     for (var xz = 0; xz <= parameters.gridSize; xz += parameters.gridSize / parameters.gridMarkup) {
         grids.push([new THREE.Vector3(xz / scale, 1E-5, 1E-5), new THREE.Vector3(xz / scale, 1E-5, parameters.gridSize / scale)]);
         grids.push([new THREE.Vector3(1E-5, 1E-5, xz / scale), new THREE.Vector3(parameters.gridSize / scale, 1E-5, xz / scale)])
     }
     if (parameters.centroid) {
         axes = offsetXYZ(axes);
         values = offsetXYZ(values);
         grids = offsetXYZ(grids)
     };
     if (rendering) {
         renderSVG(pointCloud.position);
         legendBox.moveToFront()
     }
     controls.update();
     requestAnimationFrame(animate);
     if (parameters.statsOn) {
         stats.update()
     }
     renderer.render(scene, camera)
 }

 function renderSVG(p_) {
     limits = {
         x: {
             min: Number.POSITIVE_INFINITY,
             max: Number.NEGATIVE_INFINITY
         },
         y: {
             min: Number.POSITIVE_INFINITY,
             max: Number.NEGATIVE_INFINITY
         },
         z: {
             min: Number.POSITIVE_INFINITY,
             max: Number.NEGATIVE_INFINITY
         }
     };
     pointCloud.geometry.vertices.forEach(function(v_) {
         if (isPointOnScreen(v_, p_) && parameters.mousemode == "drag") {
             limits.x.min = Math.min((v_.x + p_.x) / parameters.ratio, limits.x.min);
             limits.x.max = Math.max((v_.x + p_.x) / parameters.ratio, limits.x.max);
             limits.y.min = Math.min((v_.y + p_.y) / parameters.ratio, limits.y.min);
             limits.y.max = Math.max((v_.y + p_.y) / parameters.ratio, limits.y.max);
             limits.z.min = Math.min((v_.z + p_.z) / parameters.ratio, limits.z.min);
             limits.z.max = Math.max((v_.z + p_.z) / parameters.ratio, limits.z.max)
         } else {
             limits.x.min = Math.min((v_.x) / parameters.ratio, limits.x.min);
             limits.x.max = Math.max((v_.x) / parameters.ratio, limits.x.max);
             limits.y.min = Math.min((v_.y) / parameters.ratio, limits.y.min);
             limits.y.max = Math.max((v_.y) / parameters.ratio, limits.y.max);
             limits.z.min = Math.min((v_.z) / parameters.ratio, limits.z.min);
             limits.z.max = Math.max((v_.z) / parameters.ratio, limits.z.max)
         }
     });
     var projectedGrids = svg.selectAll("line.Grids").data(grids);
     projectedGrids.enter().append("line").attr("class", "3d_ Grids").merge(projectedGrids).attr("x1", function(d_) {
         return valueValidation(toScreenXY(d_[0].x, d_[0].y, d_[0].z, camera, p_).x)
     }).attr("y1", function(d_) {
         return valueValidation(toScreenXY(d_[0].x, d_[0].y, d_[0].z, camera, p_).y)
     }).attr("x2", function(d_) {
         return valueValidation(toScreenXY(d_[1].x, d_[1].y, d_[1].z, camera, p_).x)
     }).attr("y2", function(d_, ) {
         return valueValidation(toScreenXY(d_[1].x, d_[1].y, d_[1].z, camera, p_).y)
     }).attr("stroke", parameters.gridColor).attr("stroke-width", 0.25);
     projectedGrids.exit().remove()
     var projectedAxes = svg.selectAll("line.Axes3").data(axes);
     projectedAxes.enter().append("line").attr("class", "3d_ Axes3").merge(projectedAxes).attr("x1", function(d_) {
         return valueValidation(toScreenXY(d_[0].x, d_[0].y, d_[0].z, camera, p_).x)
     }).attr("y1", function(d_) {
         return valueValidation(toScreenXY(d_[0].x, d_[0].y, d_[0].z, camera, p_).y)
     }).attr("x2", function(d_) {
         return valueValidation(toScreenXY(d_[1].x, d_[1].y, d_[1].z, camera, p_).x)
     }).attr("y2", function(d_, ) {
         return valueValidation(toScreenXY(d_[1].x, d_[1].y, d_[1].z, camera, p_).y)
     }).attr("stroke", "#000000");
     projectedAxes.exit().remove();
     var projectedValues = svg.selectAll("text.Values").data(values);
     projectedValues.enter().append("text").attr("class", "Values").merge(projectedValues).attr("dx", function(d_) {
         var dx = valueValidation(toScreenXY(d_.x, d_.y, d_.z, camera, p_).x);
         return dx
     }).attr("dy", function(d_) {
         var dy = valueValidation(toScreenXY(d_.x, d_.y, d_.z, camera, p_).y);
         return dy
     }).attr("font-family", "sans-serif").attr("font-size", parameters.axisValuesFontSize).text(function(d_, i_) {
         var l = [limits.x.min.toFixed(2), limits.x.max.toFixed(2), limits.y.min.toFixed(2), limits.y.max.toFixed(2), limits.z.min.toFixed(2), limits.z.max.toFixed(2)];
         return l[i_]
     });
     projectedValues.exit().remove();
     d3.select("#xPath").attr("d", setPath(axes[0], "x", p_));
     d3.select("#yPath").attr("d", setPath(axes[1], "y", p_));
     d3.select("#zPath").attr("d", setPath(axes[2], "z", p_));
     var projectedPoints = svg.selectAll("circle").data(pointCloud.geometry.vertices);
     projectedPoints.enter().append("circle").attr("class", function(d_) {
         var cls = "point_" + d_.w + " ";
         if (parameters.radius.index == "na") {
             cls += "radius_0 "
         } else {
             cls += "radius_" + parameters.radius.f(points[d_.w][indices[0]][indices[1]]) + " "
         }
         if (!parameters.color.index.includes('.')) {
             cls += "color_" + parameters.color.f(points[d_.w][parameters.color.index]) + " "
         } else {
             var indices = parameters.color.index.split(".");
             cls += "color_" + parameters.color.f(points[d_.w][indices[0]][indices[1]]) + " "
         }
         return cls
     }).merge(projectedPoints).attr("cx", function(d_) {
         return valueValidation(toScreenXY(d_.x + p_.x, d_.y + p_.y, d_.z + p_.z, camera, null).x)
     }).attr("cy", function(d_) {
         return valueValidation(toScreenXY(d_.x + p_.x, d_.y + p_.y, d_.z + p_.z, camera, null).y)
     }).attr("r", function(d_) {
         if (parameters.radius.index == "na") {
             return parameters.radius.dict[0].r
         } else {
             var indices = parameters.radius.index.split(".");
             return parameters.radius.f(points[d_.w][indices[0]][indices[1]])
         }
     }).attr("fill", function(d_) {
         if (!parameters.color.index.includes('.')) {
             return colors(parameters.color.f(points[d_.w][parameters.color.index]))
         } else {
             var indices = parameters.color.index.split(".");
             return colors(parameters.color.f(points[d_.w][indices[0]][indices[1]]))
         }
     }).attr("opacity", 0.69).attr("visibility", function(d_, i_) {
         var rad = "#rad_0"
         if (parameters.radius.index != "na") {
             var indices = parameters.radius.index.split(".");
             if (points[d_.w][indices[0]][indices[1]] != ".") {
                 rad = "#rad_" + parameters.radius.f2(points[d_.w][indices[0]][indices[1]])
             } else {
                 rad = "#rad_0"
             }
         }
         if (d3.select(rad).attr("fill") == "transparent") {
             return "hidden"
         }
         var col = "#blob_0"
         if (!parameters.color.index.includes('.')) {
             col = "#blob_" + parameters.color.f(points[d_.w][parameters.color.index])
         } else {
             var indices = parameters.color.index.split(".");
             col = "#blob_" + parameters.color.f(points[d_.w][indices[0]][indices[1]])
         }
         if (d3.select(col).attr("fill") == "#DEDEDE") {
             return "hidden"
         }
         var culture = ethno.checkbox.cultures[points[d_.w].id_nhs];
         if (culture.region == "undefined" || culture.sub == "undefined") {
             if (document.getElementsByName("check_undefined")[0].value == -1) {
                 return "hidden"
             }
         } else {
             if (document.getElementsByName("check_" + culture.sub.replace(" ", "_"))[0].value == -1) {
                 return "hidden"
             }
         }
         return "visible"
     }).on("mouseover", function(d_) {
         d3.select(this).attr("stroke-width", 5).attr("stroke", "#DEDEDE")
     }).on("mouseout", function(d_) {
         d3.select(this).attr("stroke", "none")
     }).on("click", function(d_) {
         ethno.popup.forEach(function(p_) {
             var point = points[d_.w];
             var indices = p_.index.split(".");
             document.getElementById(indices[1]).innerHTML = indices[1] + ": " + point[indices[0]][indices[1]]
         });
         div.style("left", function() {
             return window.innerWidth / 2 - 200
         }).style("top", function() {
             return window.innerHeight / 2 - 150
         }).style("pointer-events", "all");
         div.transition().duration(500).style("opacity", 0.95)
     });
     projectedPoints.exit().remove()
 }

 function setCulturesPopup(db_) {
     for (var key in db_.NHSEthnography_Metadata) {
         ethno.checkbox.regions[db_.NHSEthnography_Metadata[key].id_hraf] = {
             region: db_.NHSEthnography_Metadata[key].hraf_region,
             sub: db_.NHSEthnography_Metadata[key].hraf_subregion
         }
     };
     for (var key in db_.NHSCultures_Metadata) {
         var d_ = db_.NHSCultures_Metadata[key];
         ethno.checkbox.cultures[d_.id_nhs] = {
             culture: checkDictionary(d_.culture),
             id_hraf: ifDefined(d_.id_hraf),
             region: "undefined",
             sub: "undefined"
         };
         if (ethno.checkbox.regions[ethno.checkbox.cultures[d_.id_nhs].id_hraf] != undefined) {
             ethno.checkbox.cultures[d_.id_nhs].region = ethno.checkbox.regions[ethno.checkbox.cultures[d_.id_nhs].id_hraf].region;
             ethno.checkbox.cultures[d_.id_nhs].sub = ethno.checkbox.regions[ethno.checkbox.cultures[d_.id_nhs].id_hraf].sub;
             if (ethno.checkbox.index[ethno.checkbox.cultures[d_.id_nhs].region] != undefined) {
                 if (ethno.checkbox.index[ethno.checkbox.cultures[d_.id_nhs].region][ethno.checkbox.cultures[d_.id_nhs].sub] != undefined) {
                     ethno.checkbox.index[ethno.checkbox.cultures[d_.id_nhs].region][ethno.checkbox.cultures[d_.id_nhs].sub].push(ethno.checkbox.cultures[d_.id_nhs])
                 } else {
                     ethno.checkbox.index[ethno.checkbox.cultures[d_.id_nhs].region][ethno.checkbox.cultures[d_.id_nhs].sub] = [];
                     ethno.checkbox.index[ethno.checkbox.cultures[d_.id_nhs].region][ethno.checkbox.cultures[d_.id_nhs].sub].push(ethno.checkbox.cultures[d_.id_nhs])
                 }
             } else {
                 ethno.checkbox.index[ethno.checkbox.cultures[d_.id_nhs].region] = [];
                 ethno.checkbox.index[ethno.checkbox.cultures[d_.id_nhs].region][ethno.checkbox.cultures[d_.id_nhs].sub] = [];
                 ethno.checkbox.index[ethno.checkbox.cultures[d_.id_nhs].region][ethno.checkbox.cultures[d_.id_nhs].sub].push(ethno.checkbox.cultures[d_.id_nhs])
             }
         } else {
             if (ethno.checkbox.index.undefined != undefined) {
                 ethno.checkbox.index.undefined.push(ethno.checkbox.cultures[d_.id_nhs])
             } else {
                 ethno.checkbox.index.undefined = [];
                 ethno.checkbox.index.undefined.push(ethno.checkbox.cultures[d_.id_nhs])
             }
         }
     }
     buildCultuesPopup()
 }

 function buildCultuesPopup() {
     var btn = document.createElement("BUTTON");
     var t = document.createTextNode("select all");
     btn.appendChild(t);
     btn.setAttribute("onClick", "javascript: selectAll();");
     document.getElementById("culturesPopup").appendChild(btn);
     document.getElementById("culturesPopup").innerHTML += "<br>";
     var str = "";
     var und = "";
     str += "<ul>";
     for (var key in ethno.checkbox.index) {
         if (key != "undefined") {
             var el0 = [];
             for (var key2 in ethno.checkbox.index[key]) {
                 el0 += "check_" + key2.replace(" ", "_") + ",";
                 ethno.checkbox.index[key][key2].forEach(function(tmp_) {
                     el0 += "check_" + tmp_.culture.replace(" ", "_") + ","
                 })
             }
             el0 = el0.replace(/.$/, "");
             str += "<li><h3><input type=\"checkbox\" class=\"checkbox\" id=\"" + el0 + "\"name=\"check_" + key.replace(" ", "_") + "\" value=\"1\" onclick=\"toggleCheckbox(this)\" checked>" + key + "</h3><ul>";
             for (var key2 in ethno.checkbox.index[key]) {
                 var el1 = "";
                 ethno.checkbox.index[key][key2].forEach(function(tmp_) {
                     el1 += "check_" + tmp_.culture.replace(" ", "_") + ","
                 })
                 el1 = el1.replace(/.$/, "");
                 str += "<li><h4><input class=\"checkbox\" type=\"checkbox\" name=\"check_" + key2.replace(" ", "_") + "\" value=\"1\" onclick=\"toggleCheckbox(this)\" id=\"" + el1 + "\" checked>" + key2 + "</h4><ul>";
                 ethno.checkbox.index[key][key2].forEach(function(c_) {
                     str += "<li><input class=\"checkbox\" type=\"checkbox\" name=\"check_" + c_.culture.replace(" ", "_") + "\" value=\"1\" onclick=\"toggleCheckbox(this)\" checked>" + c_.culture + " (<i>" + c_.id_hraf + "</i>)" + "</li>"
                 })
                 str += "</ul></li>"
             }
             str += "</ul></li>"
         } else {
             und += "<li><h3><input type=\"checkbox\" class=\"checkbox\" name=\"check_" + key.replace(" ", "_") + "\" value=\"1\" checked>" + key + "</h3><ul>";
             und += "</ul></li>"
         }
     }
     str += und;
     str += "</ul>";
     document.getElementById("culturesPopup").innerHTML += str
 }

 function toggleCheckbox(e_) {
     e_.value *= -1;
     if (e_.id != undefined) {
         var nm = e_.id;
         var children = nm.split(",");
         for (var i = 0; i < children.length; i++) {
             document.getElementsByName(children[i])[0].value = e_.value;
             document.getElementsByName(children[i])[0].checked = e_.checked
         }
     }
 }

 function selectAll() {
     var cb = document.getElementsByClassName("checkbox");
     for (var i = 0, n = cb.length; i < n; i++) {
         cb[i].checked = !0
     }
 }

 function closePopup() {
     document.getElementById("culturesPopup").style.display = "none";
     rendering = !0
 }

 function restructurePoints(points_, db_) {
     points_.forEach(function(p_) {
         Object.keys(ethno.indices).forEach(function(i_) {
             if (!ethno.indices[i_].includes('.')) {
                 p_[i_] = db_[i_.toString()][p_[ethno.indices[i_.toString()]]]
             } else {
                 var indices = ethno.indices[i_].split(".");
                 p_[i_] = db_[i_.toString()][p_[indices[0]][indices[1]]]
             }
         })
     })
 }

 function makeEvenRadiuses(obj_) {
     obj_.forEach(function(d_) {
         d_.dict.forEach(function(k_, i_) {
             k_.r = parameters.radiusScale(i_ + 1)
         })
     })
 }

 function changeColors() {
     parameters.color = getElementByName(ethno.color, document.getElementById("colorSelector").value);
     renderLegend()
 }

 function changeRadiuses() {
     parameters.radius = getElementByName(ethno.radius, document.getElementById("radiusSelector").value);
     renderLegend()
 }

 function setPath(v_, axis_, p_) {
     var v0 = valueValidation(toScreenXY(v_[0].x, v_[0].y, v_[0].z, camera, null));
     var v1 = valueValidation(toScreenXY(v_[1].x, v_[1].y, v_[1].z, camera, null));
     if (parameters.mousemode == "pan") {
         var v0 = valueValidation(toScreenXY(v_[0].x, v_[0].y, v_[0].z, camera, p_));
         var v1 = valueValidation(toScreenXY(v_[1].x, v_[1].y, v_[1].z, camera, p_))
     }
     return "M" + v0.x + "," + v0.y + " L" + v1.x + "," + v1.y
 }

 function offsetXYZ(vertices_) {
     vertices_.forEach(function(v_) {
         if (v_.constructor != Array) {
             v_.x -= 98;
             v_.z -= 98
         } else {
             offsetXYZ(v_)
         }
     });
     return vertices_
 }

 function toScreenXY(x_, y_, z_, camera_, offset_) {
     var p = new THREE.Vector3(x_, y_, z_);
     if (offset_ != null && parameters.mousemode == "pan") {
         p.add(offset_)
     }
     var vector = p.project(camera_);
     vector.x = (vector.x + 1) / 2 * w;
     vector.y = -(vector.y - 1) / 2 * h;
     return {
         x: vector.x,
         y: vector.y
     }
 }

 function isPointOnScreen(d_, p_) {
     var tmp = new THREE.Vector3(d_.x + p_.x, d_.y + p_.y, d_.z + p_.z);
     var xy = toScreenXY(tmp.x, tmp.y, tmp.z, camera);
     if (!xy.x.between([0, w])) {
         return !1
     }
     if (!xy.y.between([0, h])) {
         return !1
     }
     return !0
 }

 function valueValidation(v_) {
     if (v_ == Infinity || v_ == -Infinity) {
         return 1E-5
     }
     return v_ || 1E-5
 };

 function onWindowResize() {
     w = window.innerWidth, h = window.innerHeight;
     camera.aspect = w / h;
     camera.updateProjectionMatrix();
     renderer.setSize(w / h);
     svg.attr("width", w).attr("height", h);
     legendBox.attr("transform", function() {
         return "translate(" + (w - legendParameters.width - legendParameters.x) + "," + legendParameters.y + ")"
     })
 }

 function switchControls(key_) {
     var cntrl = document.getElementById("cntrl");
     if (key_ == "ui") {
         if (cntrl.value == "rotate") {
             cntrl.value = parameters.mousemode;
             parameters.drag = !0;
             controls.mouseButtons = {
                 LEFT: THREE.MOUSE.RIGHT,
                 MIDDLE: THREE.MOUSE.MIDDLE,
                 RIGHT: THREE.MOUSE.LEFT
             }
         } else {
             cntrl.value = "rotate";
             parameters.drag = !1;
             controls.mouseButtons = {
                 LEFT: THREE.MOUSE.LEFT,
                 MIDDLE: THREE.MOUSE.MIDDLE,
                 RIGHT: THREE.MOUSE.RIGHT
             }
         }
     } else {
         if (key_ == "shiftDown") {
             cntrl.value = parameters.mousemode;
             controls.mouseButtons = {
                 LEFT: THREE.MOUSE.RIGHT,
                 MIDDLE: THREE.MOUSE.MIDDLE,
                 RIGHT: THREE.MOUSE.LEFT
             };
             parameters.drag = !0;
             parameters.shift = !0
         } else {
             cntrl.value = "rotate";
             controls.mouseButtons = {
                 LEFT: THREE.MOUSE.LEFT,
                 MIDDLE: THREE.MOUSE.MIDDLE,
                 RIGHT: THREE.MOUSE.RIGHT
             };
             parameters.drag = !1;
             parameters.shift = !1
         }
     }
 }

 function getElementByName(array_, name_) {
     if (array_.filter(e_ => e_.index === name_).length > 0) {
         return array_.filter(e_ => e_.index === name_)[0]
     }
 }

 function getIndexByNHS(index_) {
     if (points.filter(e_ => e_.id_nhs === index_).length > 0) {
         return points.filter(e_ => e_.id_nhs === index_)[0].indx
     }
     console.log("data broken");
     return !1
 }

 function setOffset(d_) {
     out = 0;
     for (var i = 0; i < d_; i++) {
         out += (15 + i * 5) * 1.2
     }
     return out
 }

 function opticalCompensation(d_) {
     return (15 + d_ * 5) * 0.35
 }

 function backToOrigin() {
     pointCloud.position.set(0, 0, 0);
     camera.position.set(256, 512, 512)
 }

 function closeTooltip() {
     div.transition().duration(500).style("opacity", 0.0);
     div.style("pointer-events", "none")
 }

 function nhsExists(index_) {
     if (points.filter(e_ => e_.id_nhs === index_).length > 0) {
         return !0
     }
     return !1
 }

 function getSongFunction(n_) {
     return 0
 }

 function exists(index_) {
     if (points[index_] != undefined) return !0;
     return !1
 }

 function map(value_, min1_, max1_, min2_, max2_) {
     return min2_ + (value_ - min1_) / (max1_ - min1_) * (max2_ - min2_)
 }

 function checkDictionary(name_) {
     if (ethno.checkbox.dictionary[name_] != undefined) {
         return ethno.checkbox.dictionary[name_]
     } else {
         return name_
     }
 }

 function ifDefined(hraf_) {
     if (hraf_ != '.') {
         return hraf_
     } else {
         return "none"
     }
 }
 Number.prototype.between = function(domain_) {
     var min = Math.min.apply(Math, domain_);
     var max = Math.max.apply(Math, domain_);
     return this >= min && this <= max
 };
 d3.selection.prototype.moveToFront = function() {
     return this.each(function() {
         this.parentNode.appendChild(this)
     })
 }
