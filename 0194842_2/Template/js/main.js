/*
*    main.js
*/
//EXERCISE 2
var svg = d3.select("#chart-area").append("svg").attr("width", 400).attr("height", 400);
var data = [25, 20, 15, 10, 5];
var max = Math.max.apply(null, data);
var rects = svg.selectAll("rect").data(data);
rects.enter().append("rect").attr("x", (d, i)=>{console.log("Item: " + d  +" height: " + (max - d)); return (i * 50);}).attr("y", (d)=>{return (max - d);})
      .attr("width", 40).attr("height", (d)=>{return d;}).attr("fill","purple");
