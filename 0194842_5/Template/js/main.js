/*
*    main.js
*/
//EXERCISE 5
d3.json("data/buildings.json").then((data) => {data.forEach((d, i)=>{
        d.height = +d.height;
      });
    var names = data.map((d) => {return d.name;});
    var heights = data.map((d) => {return d.height;});
    var max = Math.max.apply(null, heights);

    var x = d3.scaleBand()
      .domain(names)
      .range([0,600])
      .paddingInner(0.3)
      .paddingOuter(0.3);
    var y = d3.scaleLinear()
      .domain([828,0])
      .range([0,400]);
    var colors = d3.scaleOrdinal()
      .domain(heights)
      .range(d3.schemeSet3);

    var width = 600;
    var height = 400;
    var margin = {left:100, right: 10, top: 10, bottom: 150};
    var svg = d3.select("#canvas").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom);
    var g = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    var rects = g.selectAll("rect").data(data);
    var bottomAxis = d3.axisBottom(x);
    var leftAxis = d3.axisLeft(y).ticks(5).tickFormat((d) => { return d + "m"; });
    g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(bottomAxis)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", -5)
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)");
    // X Label
    g.append("text")
    .attr("class", "x axis-label")
    .attr("x", (width + margin.right + margin.left)/2)
    .attr("y", height + 140)
    .attr("font-size", "20px")
    .attr("text-anchor", "end")
    .text("The word's tallest buildings");

    g.append("g")
    .attr("class", "left axis")
    .call(leftAxis);
    // Y Label
    g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Height (m)");

    rects.enter()
      .append("rect")
      .attr("x", (d) => {return x(d.name);})
      .attr("y", (d)=>{return y(d.height);})
      .attr("width", x.bandwidth())
      .attr("height", (d)=>{return height - y(d.height);})
      .attr("fill",(d)=>{return colors(d.height)});

  });
