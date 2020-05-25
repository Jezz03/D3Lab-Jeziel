/*
*    main.js
*/
//EXERCISE 3
//I had to install the google chrome Web Server for Chrome extension for the data load to work properly,
//I saw this suggestion in the github forum https://github.com/processing/p5.js/issues/1975
d3.csv("data/ages.csv").then((data)=>{console.log(data);});
d3.tsv("data/ages.tsv").then((data)=>{console.log(data);});
d3.json("data/ages.json").then((data)=>{console.log(data);});
//d3.json("data/ages.json", (error, data) => {if (error) return console.warn(error);console.log(data);});

d3.json("data/ages.json").then((data) => {data.forEach((d, i)=>{
        d.age = +d.age;});
    var svg = d3.select("#chart-area").append("svg").attr("width", 400).attr("height", 400);
    var circles = svg.selectAll("circle").data(data);
    circles.enter()
      .append("circle")
      .attr("cx", (d, i) => {return i * 30 + d.age;})
      .attr("cy", 100)
      .attr("r", (d)=>{return d.age;})
      .attr("fill", "purple");
  });
