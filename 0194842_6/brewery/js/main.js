/*
*    main.js
*/
//Project 1
d3.json("data/revenues.json").then((data) => {data.forEach((d, i)=>{
        d.revenue = +d.revenue;
      });
    var months = data.map((d) => {return d.month;});
    var revenues = data.map((d) => {return d.revenue;});
    var max = Math.max.apply(null, revenues);
    console.log(max);
    var x = d3.scaleBand()
      .domain(months)
      .range([0,600])
      .paddingInner(0.3)
      .paddingOuter(0.3);
    var y = d3.scaleLinear()
      .domain([max,0])
      .range([0,400]);

    var width = 600;
    var height = 400;
    var margin = {left:100, right: 10, top: 10, bottom: 100};
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
    var leftAxis = d3.axisLeft(y).ticks(11).tickFormat(d3.format("$.0s"));
    g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(bottomAxis)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 0)
    .attr("text-anchor", "middle");
    // X Label
    g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width/2)
    .attr("y", height + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");

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
    .text("Revenue (dlls.)");

    rects.enter()
      .append("rect")
      .attr("x", (d) => {return x(d.month);})
      .attr("y", (d)=>{return y(d.revenue);})
      .attr("width", x.bandwidth())
      .attr("height", (d)=>{return height - y(d.revenue);})
      .attr("fill","yellow");

  });
