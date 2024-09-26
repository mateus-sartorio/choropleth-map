"use strict	";

const usEducationalDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const usCountryDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const plotWidth = 960;
const plotHeight = 600;
const padding = 60;

const barColor = "#607EAA"; 
const barWidth = 100;
const selectionColor = "#1C3879";

const legendWidth = 400;
const legendHeight = 50;
const legendPadding = 50;

const colors = [
  "#e5f5e0",
  "#c7e9c0",
  "#a1d99b",
  "#74c476",
  "#41ab5d",
  "#238b45",
  "#006d2c",
];

function plotGraph(usEducationalData, usCountryData) {
  const counties = topojson.feature(usCountryData, usCountryData.objects.counties).features;

  console.log(usEducationalData)

  const tooltip = d3.select("#tooltip");

  const educationPercentageScale = d3
    .scaleLinear()
    .domain([2,66])
    .range([0, colors.length - 1]);
  
  const legendScale1 = d3
    .scaleBand()
    .domain(colors.map((_c, i) => i))
    .range([legendPadding, legendWidth - legendPadding]);

  const legendScale2 = d3
    .scaleLinear()
    .domain([0, colors.length - 1])
    .range([legendPadding, legendWidth - legendPadding]);

  const legendScale3 = d3
    .scaleLinear()
    .domain([0, colors.length - 1])
    .range([2.8, 12.8]);
  
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
    .style("stroke", "white")
    .style("stroke-width", 0.5)
    .style("fill", (d, i) => {
      const data = usEducationalData.find(g => g.fips === d.id);
      const percentage = data.bachelorsOrHigher;
      return colors[Math.floor(educationPercentageScale(percentage))];
    })
    .attr("data-fips", d => d.id)
    .attr("data-education", d => {
      const data = usEducationalData.find(g => g.fips === d.id);
      return data.bachelorsOrHigher;

    })
    .on("mouseover", (event, d) => {
      const pathElement = event.target;

      const { area_name, state, bachelorsOrHigher } = usEducationalData.find(g => g.fips === d.id);

      tooltip
        .attr("data-education", bachelorsOrHigher)
        .style("visibility", "visible")
        .text(`${area_name} - ${state}: ${bachelorsOrHigher}%`)
        .style("font-family", "sans-serif")
        .style("font-size", "12px")
        .style("left", event.pageX + 20 + "px")
        .style("top", event.pageY - 30 + "px");
    })
    .on("mouseout", (event) => {
      const rectElement = event.target;
      tooltip.style("visibility", "hidden");
    });
 
  
  const legend = d3
    .select("#legend")
      .append("svg")
      .attr("width", legendWidth)
      .attr("height", legendHeight);

  legend
    .selectAll("rect")
    .data(colors)
    .enter()
    .append("rect")
    .attr("x", (_d, i) => legendScale1(i))
    .attr("y", 0)
    .attr("width", legendScale1.bandwidth())
    .attr("height", 30)
    .attr("fill", (d) => d);

  const legendAxis = d3
    .axisBottom(legendScale2)
    .tickValues(d3.range(0, colors.length))
    .tickFormat((d) => legendScale3(d).toFixed(1));

  legend
    .append("g")
    .attr("id", "legend-axis-axis")
    .attr("transform", `translate(0, ${30})`)
    .call(legendAxis);

  legend
    .append("text")
    .attr("text-anchor", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "12px")
    .text("Years");
};

async function init() {
  const usEducationalResponse = await fetch(usEducationalDataUrl);
  const usEducationalData = await usEducationalResponse.json();

  const usCountryResponse = await fetch(usCountryDataUrl);
  const usCountryData = await usCountryResponse.json();

  plotGraph(usEducationalData, usCountryData);
}

init();