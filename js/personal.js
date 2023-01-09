
var width_pie = 200
        height_pie = 200
        margin_pie = 20

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width_pie, height_pie) / 2 - margin_pie

// append the svg object to the div called 'my_dataviz'
var svg_pie = d3.select("#pie_ps")
  .append("svg")
	.attr("class", 'pers_pie')
    .attr("width", width_pie)
    .attr("height", height_pie)
  .append("g")
    .attr("transform", "translate(" + width_pie / 2 + "," + height_pie / 2 + ")");

// create 2 data_set
var data1_gender = {female: 7900, male:8700}
var data2_education = {a: 6, b: 16, c:20, d:14, e:19, f:12}
var data3_income = {}
var data4_age_group = {}

// set the color scale
var color_pie = d3.scaleOrdinal()
  .domain(["a", "b", "c", "d", "e", "f"])
  .range(d3.schemeDark2);

// A function that create / update the plot for a given variable:
function update(data) {

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data))

  var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)
  // map to data
  var u = svg_pie.selectAll("path")
    .data(data_ready)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  u
    .enter()
    .append('path')
    .merge(u)
    .transition()
    .duration(1500)
    .attr('d', arcGenerator    )
    .attr('fill', function(d){ return(color_pie(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)

	u
	.enter()
	.append('text')
	.text(function(d){ return d.data.key})
	.attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
	.style("text-anchor", "middle")
	.style("font-size", 17)

  // remove the group that is not present anymore
  u
    .exit()
    .remove()

}

// Initialize the plot with the first dataset
update(data1_gender)