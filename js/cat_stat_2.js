var margin_cr2 = {top: 100, right: 0, bottom: 0, left: 0},
    width_cr2 = 500 - margin_cr2.left - margin_cr2.right,
    height_cr2= 500 - margin_cr2.top - margin_cr2.bottom,
    innerRadius2 = 50,
    outerRadius2 = Math.min(width_cr2, height_cr2) / 2;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
var svg_cr2 = d3.select(".categories_stats_2")
  .append("svg")
    .attr("width", width_cr2 + margin_cr2.left + margin_cr2.right)
    .attr("height", height_cr2 + margin_cr2.top + margin_cr2.bottom)
  .append("g")
    .attr("transform", "translate(" + (width_cr2 / 2 + margin_cr2.left) + "," + (height_cr2 / 2 + margin_cr2.top) + ")");

d3.csv("data/Vol_cat.csv", function(data_cr2) {

  // Scales
  var x2 = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing
      .domain(data_cr2.map(function(d) { return d.Country; })); // The domain of the X axis is the list of states.
  var y2 = d3.scaleRadial()
      .range([innerRadius2, outerRadius2])   // Domain will be define later.
      .domain([0, 1]); // Domain of Y is from 0 to the max seen in the data

  // Add the bars
  svg_cr2.append("g")
    .selectAll("path")
    .data(data_cr2)
    .enter()
    .append("path")
      .attr("fill", "#69b3a2")
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius2)
          .outerRadius(function(d) { return y2(d['Value']); })
          .startAngle(function(d) { return x2(d.Country); })
          .endAngle(function(d) { return x2(d.Country) + x2.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius2))

  // Add the labels
  svg_cr2.append("g")
      .selectAll("g")
      .data(data_cr2)
      .enter()
      .append("g")
        .attr("text-anchor", function(d) { return (x2(d.Country) + x2.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x2(d.Country) + x2.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y2(d['Value'])+10) + ",0)"; })
      .append("text")
        .text(function(d){return(d.Country)})
        .attr("transform", function(d) { return (x2(d.Country) + x2.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")


    svg_cr2.append('text')
    .attr('class', 'text_circular_bars')
    .attr('x', width_cr2 / 2 + margin_cr2)
    .attr('y', -outerRadius2 )
    .attr('text-anchor', 'middle')
    .text('Volunteering for different organizations, average hours')
});
