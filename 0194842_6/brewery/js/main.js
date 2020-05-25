/*
*    main.js
*/
//EXERCISE 6

var margin = {left:100, right: 10, top: 10, bottom: 100};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;
var flag = true;
var g = d3.select("#chart-area").append("svg")
.attr("width", width + margin.right + margin.left)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleBand().range([0,width]).padding(0.2);
var y = d3.scaleLinear().range([height,0]);

var xAxisGroup = g.append("g").attr("class", "x axis")
  .attr("transform", "translate(0, " + height + ")");
var yAxisGroup = g.append("g").attr("class", "y-axis");
// X Label
g.append("text")
.attr("class", "x axis-label")
.attr("x", width/2)
.attr("y", height + 50)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.text("Month");
// Y Label
var yLabel = g.append("text")
.attr("class", "y axis-label")
.attr("x", - (height / 2))
.attr("y", -60)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.text("Revenue (dlls.)");
d3.json("data/revenues.json").then((data) => {data.forEach((d, i)=>{
        d.revenue = +d.revenue;
        d.profit = +d.profit;
      });
      d3.interval( ( )=>{update(data)}, 1000);
      update(data);
      flag = !flag;
  }).catch((error)=>{console.log(error);
  });
function update(data){
  var value = flag ? "revenue" : "profit";
  var label = flag ? "Revenue" : "Profit";
  yLabel.text(label)
  x.domain(data.map((d)=>{ return d.month; }));
  y.domain([0, d3.max(data, (d) => { return d[value]; })]);
  var bottomAxis = d3.axisBottom(x);
  var leftAxis = d3.axisLeft(y).ticks(11).tickFormat(d3.format("$.0s"));
  xAxisGroup.call(bottomAxis);
  yAxisGroup.call(leftAxis);
  var months = data.map((d) => {return d.month;});
  var revenues = data.map((d) => {return d.revenue;});
  var max = Math.max.apply(null, revenues);

  var bars = g.selectAll("rect").data(data);
  bars.exit().remove();
  bars.attr("x", (d) => {return x(d.month);})
    .attr("y", (d)=>{return y(d[value]);})
    .attr("width", x.bandwidth())
    .attr("height", (d)=>{return height - y(d[value]);});
  bars.enter().append("rect")
    .attr("x", (d) => {return x(d.month);})
    .attr("y", (d)=>{return y(d[value]);})
    .attr("width", x.bandwidth())
    .attr("height", (d)=>{return height - y(d.revenue);})
    .attr("fill", "yellow");
}
