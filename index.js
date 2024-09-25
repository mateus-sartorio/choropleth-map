"use strict	";

const usEducationalDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const usCountryDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const plotWidth = 960;
const plotHeight = 600;
const padding = 60;

const barColor = "#607EAA"; 
const barWidth = 100;
const selectionColor = "#1C3879";

function plotGraph(usEducationalData, usCountryData) {
  const counties = topojson.feature(usCountryData, usCountryData.objects.counties).features;

  console.log(counties, usEducationalData);
  
  const svg = d3
    .select("#container")
    .append("svg")
    .attr("width", plotWidth)
    .attr("height", plotHeight);

  const path = d3.geoPath();
  
    svg
      .selectAll("path")
      .data(counties)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "county")
      .style("fill", "lightblue")
      .style("stroke", "#333")
      .style("stroke-width", 0.5);
    //   .attr("r", 6)
    //   .attr("class", "dot")
    //   .style("stroke", "#555")
    //   .style("stroke-width", "1")
    //   .style("opacity", "90%")
    //   .attr("data-xvalue", (d) => d.Year)
    //   .attr("data-yvalue", (d) => new Date(d.Seconds * 1000))
    //   .attr("fill", (d) => (d.Doping === "" ? "#3d348b" : "#f35b04"))
    //   .on("mouseover", (event, d) => {
    //     tooltip
    //       .attr("data-year", event.target.dataset.xvalue)
    //       .style("visibility", "visible")
    //       .html(`${d.Name}: ${d.Nationality}<br>Year: ${d.Year}, Time: ${d.Time}`)
    //       .style("font-family", "sans-serif")
    //       .style("font-size", "12px")
    //       .style("left", event.pageX + 20 + "px")
    //       .style("top", event.pageY - 30 + "px");
    //   })
    //   .on("mouseout", (d) => {
    //     tooltip.style("visibility", "hidden");
    //   });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  // const tooltip = d3.select("#tooltip");

  // const xScale = d3
  //   .scaleLinear()
  //   .domain([d3.min(data, (d) => d.Year) - 1, d3.max(data, (d) => d.Year) + 1])
  //   .range([padding, plotWidth - padding]);

  // const yScale = d3
  //   .scaleLinear()
  //   .domain([
  //     d3.min(data, (d) => new Date(d.Seconds * 1000)),
  //     d3.max(data, (d) => new Date(d.Seconds * 1000)),
  //   ])
  //   .range([padding, plotHeight - padding]);





  // const projection = d3.geoAlbersUsa()
  //   .scale(1000)
  //   .translate([plotWidth / 2, plotHeight / 2]);

  // const path = d3.geoPath().projection(projection);



  // svg.selectAll(".county")
  //       .data(counties.features)
  //       .enter()
  //       .append("path")
  //       .attr("class", "county")
  //       .attr("d", path);


  // const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

  // const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

  // svg
  //   .append("g")
  //   .attr("id", "x-axis")
  //   .attr("transform", `translate(0, ${plotHeight - padding})`)
  //   .call(xAxis);

  // svg
  //   .append("g")
  //   .attr("id", "y-axis")
  //   .attr("transform", `translate(${padding}, 0)`)
  //   .call(yAxis);

  // svg
  //   .append("text")
  //   .attr("text-anchor", "middle")
  //   .attr(
  //     "transform",
  //     `translate(${padding + 25}, ${plotHeight / 2}) rotate(-90)`
  //   )
  //   .text("Time in Minutes")
  //   .style("font-family", "sans-serif")
  //   .style("font-size", "12px");
};

async function init() {
  const usEducationalResponse = await fetch(usEducationalDataUrl);
  const usEducationalData = await usEducationalResponse.json();

  const usCountryResponse = await fetch(usCountryDataUrl);
  const usCountryData = await usCountryResponse.json();

  plotGraph(usEducationalData, usCountryData);
}

init();