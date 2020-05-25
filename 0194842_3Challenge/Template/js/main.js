/*
*    main.js
*/
//EXERCISE 3 Challenge
d3.json("data/buildings.json").then((data) => {data.forEach((d, i)=>{
        d.height = +d.height;});
    var heights = data.map((d) => {return d.height;});
    var max = Math.max.apply(null,heights);
    console.log(max);
    var svg = d3.select("#chart-area").append("svg").attr("width", 400).attr("height", max);
    var rects = svg.selectAll("rect").data(heights);
    rects.enter()
      .append("rect")
      .attr("x", (d, i)=>{console.log("Item: " + i  +" height: " + d); return (i * 40);})
      .attr("y", (d)=>{return (max - d);})
      .attr("width", 30)
      .attr("height", (d)=>{return d;})
      .attr("fill","purple");
  });
