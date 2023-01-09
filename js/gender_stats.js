var colors = ['#FBB65B', '#513551'];

var data = [
  {age_group: '15-24 years', female: 120, male: 180},
  {age_group: '25-34 years', female: 60, male: 185},
  {age_group: '35-44 years', female: 100, male: 215},
  {age_group: '45-54 years', female: 80, male: 230},
  {age_group: '55-64 years', female: 120, male: 240},
  {age_group: '65-74 years', female:120,male:200},
  {age_group: '75+ years',   female:150, male:300}
];

var stack = d3.stack()
  .keys(['female', 'male']);

var stackedSeries = stack(data);

// Create a g element for each series
var g = d3.select('svg#gender_st')
	.selectAll('g.series')
	.data(stackedSeries)
	.enter()
	.append('g')
	.classed('series', true)
	.style('fill', function(d, i) {
		return colors[i];
	});

// For each series create a rect element for each day
g.selectAll('rect')
	.data(function(d) {
		return d;
	})
	.join('rect')
	.attr('width', function(d) {
		return d[1] - d[0];
	})
	.attr('x', function(d) {
		return d[0];
	})
	.attr('y', function(d, i) {
		return i * 20;
	})
	.attr('height', 19);