var margin_cr = {top: 100, right: 0, bottom: 0, left: 0},
    width_cr = 500 - margin_cr.left - margin_cr.right,
    height_cr = 500 - margin_cr.top - margin_cr.bottom,
    innerRadius = 50,
    outerRadius = Math.min(width_cr, height_cr) / 2;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
var svg_cr = d3.select(".categories_stats")
  .append("svg")
    .attr("width", width_cr + margin_cr.left + margin_cr.right)
    .attr("height", height_cr + margin_cr.top + margin_cr.bottom)
  .append("g")
    .attr("transform", "translate(" + (width_cr / 2 + margin_cr.left) + "," + (height_cr / 2 + margin_cr.top) + ")");

d3.csv("data/OneCatOneNum.csv", function(data_cr) {

  // Scales
  var x = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing
      .domain(data_cr.map(function(d) { return d.Country; })); // The domain of the X axis is the list of states.
  var y = d3.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, 1]); // Domain of Y is from 0 to the max seen in the data

  // Add the bars
  svg_cr.append("g")
    .selectAll("path")
    .data(data_cr)
    .enter()
    .append("path")
      .attr("fill", "#69b3a2")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d['Value']); })
          .startAngle(function(d) { return x(d.Country); })
          .endAngle(function(d) { return x(d.Country) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))

  // Add the labels
  svg_cr.append("g")
      .selectAll("g")
      .data(data_cr)
      .enter()
      .append("g")
        .attr("text-anchor", function(d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.Country) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['Value'])+10) + ",0)"; })
      .append("text")
        .text(function(d){return(d.Country)})
        .attr("transform", function(d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")

});