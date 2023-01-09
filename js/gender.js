
var width_pie = 190
        height_pie = 190
        margin_pie = 10

var strokeWidth = 2
var strokeLinejoin = 'round'
// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width_pie, height_pie) / 2 - margin_pie

// append the svg object to the div called 'pie 1, 2, 3'
var svg_pie_g = d3.select(".pie1")
  .append("svg")
	  .attr("id", 'gender_pie')
    .attr("width", width_pie)
    .attr("height", height_pie)
  .append("g")
    .attr("transform", "translate(" + width_pie / 2 + "," + height_pie / 2 + ")")
    .attr("stroke-width", strokeWidth)
    .attr("stroke-linejoin", strokeLinejoin);

var svg_pie_e = d3.select(".pie2")
    .append("svg")
    .attr("id", 'education_pie')
      .attr("width", width_pie)
      .attr("height", height_pie)
    .append("g")
      .attr("transform", "translate(" + width_pie / 2 + "," + height_pie / 2 + ")")
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linejoin", strokeLinejoin);

var svg_pie_i = d3.select(".pie3")
      .append("svg")
      .attr("id", 'income_pie')
        .attr("width", width_pie)
        .attr("height", height_pie)
      .append("g")
        .attr("transform", "translate(" + width_pie / 2 + "," + height_pie / 2 + ")")
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linejoin", strokeLinejoin);

// create  data_sets

var data_gender_donation = {'female':58, 'male':42};
var data_education_donation = { 'University Diploma':35.5, 
                                  'Post-secondary diploma':31.3,
                                  'Graduated from High school':17.4,
                                  'Less than High School':6.6,
                                  'Skip':9.2};
var data_income_donation = {'125,000+':27.7,
                                '75,000-99,999':17.5,
                                '50,000-74,999':17.11,
                                '25,000-49,999':17.99,
                                '100,000-124,999':10.5,
                                '>25,000':9.07};
var data_gender_vol = {'female':50, 'male':50};
var data_education_vol = { 'University Diploma':31, 
                            'Post-secondary diploma':25,
                            'Graduated from High school':20,
                            'Less than High School':15,
                            'Skip':9};
var data_income_vol = {'125,000+':30.85,
                          '75,000-99,999':17.39,
                          '50,000-74,999':16.48,
                          '25,000-49,999':15.2,
                          '100,000-124,999':11.18,
                          '>25,000':8.88};


// set the color scale
var color_pie_g = d3.scaleOrdinal()
  .domain(["female", "male"])
  .range(d3.schemeDark2);

var color_pie_e = d3.scaleOrdinal()
.domain(['University Diploma', 'Post-secondary diploma','Graduated from High school','Less than High School','Skip'])
.range(d3.schemeDark2);

var color_pie_i = d3.scaleOrdinal()
.domain(['125,000+','100,000-124,999','75,000-99,999','50,000-74,999','25,000-49,999','>25,000'])
.range(d3.schemeDark2);

//['#E6F69D', '#AADEA7', '#64C2A6', '#2D87BB', '#007CC3', '#FDBB2F']

// A function that create / update the plot for a given variable:


// Function for transforming data

// Plotting data
function plot(data1, data2, data3)
{
  

  var pie = d3.pie()
  .value(function(d) {return d.value; })
  .sort(function(a, b) { console.log(a) ; return d3.ascending(a.value, b.value);} ) // This make sure that group order remains the same in the pie chart

var data_ready_1 = pie(d3.entries(data1));
var data_ready_2 = pie(d3.entries(data2));
var data_ready_3 = pie(d3.entries(data3));

var arcGenerator = d3.arc()
                  .innerRadius(5)
                  .outerRadius(radius);

// map to data
var pie1 = svg_pie_g.selectAll("path")
                    .data(data_ready_1);

var pie2 = svg_pie_e.selectAll("path")
                    .data(data_ready_2)

var pie3 = svg_pie_i.selectAll("path")
                    .data(data_ready_3)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
pie1
  .enter()
  .append('path')
  .merge(pie1)
  .transition()
  .duration(1500)
  .attr('d', arcGenerator)
  .attr('fill', function(d){ return(color_pie_g(d.data.key)) })
  .attr("stroke", "white")
  .style("opacity", 1)
  .each(function(d){this._current=d;})

pie1
.enter()
.append('text')
.text(function(d){ return d.data.value})
.attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
.style("text-anchor", "middle")
.style("font-size", 12)

// remove the group that is not present anymore
pie1
  .exit()
  .remove()


pie2
  .enter()
  .append('path')
  .merge(pie2)
  .transition()
  .duration(1500)
  .attr('d', arcGenerator)
  .attr('fill', function(d){ return(color_pie_e(d.data.key)) })
  .attr("stroke", "white")
  .style("opacity", 1)

pie2
.enter()
.append('text')
.text(function(d){ return d.data.value})
.attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
.style("text-anchor", "middle")
.style("font-size", 12)

// remove the group that is not present anymore
pie2
  .exit()
  .remove()

pie3
  .enter()
  .append('path')
  .merge(pie3)
  .transition()
  .duration(1500)
  .attr('d', arcGenerator)
  .attr('fill', function(d){ return(color_pie_i(d.data.key)) })
  .attr("stroke", "white")
  .style("opacity", 1)

pie3
.enter()
.append('text')
  .text(function(d){ return d.data.value})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 12)

// remove the group that is not present anymore
pie3
  .exit()
  .remove()
}

function update(x) 
{
  if(x == 1)  
    {
      plot(data_gender_donation, data_education_donation, data_income_donation)
      
    }  
  else if(x == 2)
  {
    plot(data_gender_vol, data_education_vol, data_income_vol )
  }
  
}

// Initialize the plot with the first dataset
update(1)