/*
*    main.js
*/
//EXERCISE 4
d3.json("data/buildings.json").then((data) => {data.forEach((d, i)=>{
        d.height = +d.height;
      });
    var names = data.map((d) => {return d.name;});
    var heights = data.map((d) => {return d.height;});
    var max = Math.max.apply(null, heights);

    var x = d3.scaleBand()
      .domain(names)
      .range([0,400])
      .paddingInner(0.3)
      .paddingOuter(0.3);
    var y = d3.scaleLinear()
      .domain([0,828])
      .range([0,400]);
    var colors = d3.scaleOrdinal()
      .domain(heights)
      .range(d3.schemeSet3);

    var svg = d3.select("#chart-area").append("svg").attr("width", 500).attr("height", 500);
    var rects = svg.selectAll("rect").data(data);
    rects.enter()
      .append("rect")
      .attr("x", (d) => {console.log(x(d.name));return x(d.name);})
      .attr("y", (d)=>{return (y(max) - y(d.height));})
      .attr("width", x.bandwidth())
      .attr("height", (d)=>{return y(d.height);})
      .attr("fill",(d)=>{return colors(d.height)});
  });
