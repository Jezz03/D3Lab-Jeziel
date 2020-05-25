/*
*    main.js
*/
//EXERCISE 7

var margin = {left:100, right: 10, top: 10, bottom: 100};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;
var flag = true;
var t = d3.transition().duration(750);
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
      d3.interval( ( )=>{
      var newData = flag ? data : data.slice(1);
      console.log(newData);
      update(newData);
      flag = !flag;
    }, 1000);
  }).catch((error)=>{console.log(error);
  });
function update(data){
  var value = flag ? "revenue" : "profit";
  var label = flag ? "Revenue" : "Profit";
  yLabel.text(label)
  x.domain(data.map((d)=>{ return d.month; }));
  y.domain([0, d3.max(data, (d) => { return d[value]; })]);
  var bottomAxis = d3.axisBottom(x);
  var leftAxis = d3.axisLeft(y).ticks(11).tickFormat(d3.format("$.2s"));
  xAxisGroup.transition(t).call(bottomAxis);
  yAxisGroup.transition(t).call(leftAxis);
  var months = data.map((d) => {return d.month;});
  var revenues = data.map((d) => {return d.revenue;});
  var max = Math.max.apply(null, revenues);

  var bars = g.selectAll("rect").data(data, (d) => { return d.month; });
  bars.exit().attr("fill", "yellow")
    .transition(t)
    .attr("y", y(0))
    .attr("height", 0)
    .remove();
  bars.transition(t)
    .attr("x", (d) => {return x(d.month);})
    .attr("y", (d)=>{return y(d[value]);})
    .attr("width", x.bandwidth())
    .attr("height", (d)=>{return height - y(d[value]);});
  bars.enter().append("rect")
    .attr("fill", "yellow")
    .attr("x", (d) => {return x(d.month);})
    .attr("y", y(0))
    .attr("width", x.bandwidth())
    .attr("height", 0)
    .merge(bars)
    .transition(t)
    .attr("y", (d)=>{return y(d[value]);})
    .attr("height", (d)=>{return height - y(d[value]);});
}
