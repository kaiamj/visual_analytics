const volunteers = [
    {
      age: '15 - 24 years',
      value: 505,
      avr: 20
    },
    {
      age: '25 - 34 years',
      value: 919,
      avr: 18
    },
    {
      age: '35 - 44 years',
      value: 1481,
      avr: 35
    },
    {
      age: '45 - 54 years',
      value: 1390,
      avr: 38
    },
    {
      age: '55 - 64 years',
      value: 1707,
      avr: 24
    },
    {
      age: '65 - 74 years',
      value: 1560,
      avr: 40
    },
    {
      age: '75+ years',
      value: 803,
      avr: 30
    }
  ];

  const donors = [
    {
      age: '15 - 24 years',
      value: 406,
      avr: 15
    },
    {
      age: '25 - 34 years',
      value: 1293,
      avr: 30
    },
    {
      age: '35 - 44 years',
      value: 1870,
      avr: 45
    },
    {
      age: '45 - 54 years',
      value: 1954,
      avr: 48
    },
    {
      age: '55 - 64 years',
      value: 2701,
      avr: 32
    },
    {
      age: '65 - 74 years',
      value: 2439,
      avr: 30
    },
    {
      age: '75+ years',
      value: 1491,
      avr: 50
    }
  ];

  const svg = d3.select('svg#main_st');
  const svgContainer = d3.select('#main_stats');
  
  const margin = 80; // margin of barchart
  const width = 1000 - 2 * margin;
  const height = 600 - 2 * margin;  

  const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);
   // .attr("viewBox", [margin, margin, width, height]);

  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(volunteers.map((s) => s.age)) // categories for x axis
    .padding(0.5)
  
  const max_val =  d3.max([d3.max(volunteers, s=>s.value), d3.max(donors, s=>s.value)]);
  const yScale_v = d3.scaleLinear() 
                    .range([height, 0])
                    .domain([0, d3.max(volunteers, s=>s.value)]);

  const yScale_d = [0, d3.max(donors, s=>s.value)];
  const yScale = d3.scaleLinear() 
    .range([height, 0])
    .domain([0, max_val+100]);// maximum of values for y axis + 100 extra
   

//horizontal grid lines 

  const makeYLines = () => d3.axisLeft() 
   .scale(yScale)

 chart.append('g')
   .attr('transform', `translate(0, ${height})`)
   .call(d3.axisBottom(xScale));

  chart.append('g')
   .call(d3.axisLeft(yScale));

 chart.append('g')
   .attr('class', 'grid')
   .call(makeYLines()
     .tickSize(-width, 0, 0)
     .tickFormat('')
   )

  const barGroups = chart.selectAll()
    .data(volunteers)
    .enter()
    .append('g')

  barGroups
    .append('rect')
    .attr('id', 'bar_v')
    .attr('x', (g) => xScale(g.age))
    .attr('y', (g) => yScale(g.value))
    .attr('height', (g) => height - yScale(g.value))
    .attr('width', xScale.bandwidth()/2+5)
    .on('mouseenter', function (actual,i) {
      d3.selectAll('.value_v')
        .attr('opacity', 0)

      chart.selectAll('#bar_d').attr('opacity', 0.3)

      chart.selectAll('.value_d').attr('opacity', 0)

      d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 0.9)
        .attr('x', (a) => xScale(a.age))
        .attr('width', xScale.bandwidth()/2+5)

      const y = yScale(actual.value);
     
     // line = chart.append('line') // yellow dotted line 
     //   .attr('id', 'limit')
     //   .attr('x1', 0)
      //  .attr('y1', y)
     //   .attr('x2', width)
     //   .attr('y2', y)
    
        barGroups.append('text')
        .attr('class', 'divergence_v')
        .attr('x', (a) => xScale(a.age) + xScale.bandwidth() /5 +5)
        .attr('y', (a) => yScale(a.value) + 30)
        .attr('text-anchor', 'middle')
        .text((a) => `${a.avr} h.`)
        })    
        
    .on('mouseleave', function () {
      d3.selectAll('.value_v')
        .attr('opacity', 1)
        d3.selectAll('#bar_d')
        .attr('opacity', 1)
  
        d3.selectAll('.value_d')
        .attr('opacity', 1)

      d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 1)
        .attr('x', (a) => xScale(a.age))
        .attr('width', xScale.bandwidth()/2+5)

   //   chart.selectAll('#limit').remove()
      chart.selectAll('.divergence_v').remove()
    })

    barGroups
    .append('text')
    .attr('class', 'value_v')
    .attr('x', (a) => xScale(a.age) + xScale.bandwidth() /5 +5)
    .attr('y', (a) => yScale(a.value) + 20)
    .attr('text-anchor', 'middle')
    .text((a) => `${a.value}`)
  
  svg
    .append('text')
    .attr('class', 'label')
    .attr('x', -(height / 2) - margin)
    .attr('y', margin / 2.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Respondednts')

  svg.append('text')
    .attr('class', 'label')
    .attr('x', width / 2 + margin)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'middle')
    .text('Age groups')

  svg.append('text')
    .attr('class', 'title')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('Charity in Canada accroding to Age groups')

  svg.append('text')
    .attr('class', 'source')
    .attr('x', width - margin / 2)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'start')
    .text('Source: General Social Survey')

svg.append('text')
    .attr('class', 'source')
    .attr('x', width - margin / 2)
    .attr('y', height + margin * 1.9)
    .attr('text-anchor', 'start')
    .text('Statistics Canada, 2018')


// second bars for donors
const barGroups_2 = chart.selectAll()
.data(donors)
.enter()
.append('g')


barGroups_2
    .append('rect')
    .attr('id', 'bar_d')
    .attr('x', (g) => xScale(g.age) + xScale.bandwidth()/2+10)
    .attr('y', (g) => yScale(g.value))
    .attr('height', (g) => height - yScale(g.value))
    .attr('width', xScale.bandwidth()/2+10)
    .on('mouseenter', function (actual,i) {
        d3.selectAll('.value_d').attr('opacity', 0)
  
        chart.selectAll('#bar_v').attr('opacity', 0.2)
  
        chart.selectAll('.value_v').attr('opacity', 0)
  
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.7)
          .attr('x', (a) => xScale(a.age)+xScale.bandwidth()/2+10)
          .attr('width', xScale.bandwidth()/2+5)
  
        const y = yScale(actual.value);
       
        // line_2 = chart.append('line') // yellow dotted line 
        //   .attr('id', 'limit_2')
        //   .attr('x1', 0)
        //   .attr('y1', y)
        //   .attr('x2', width)
        //   .attr('y2', y)
      
          barGroups_2.append('text')
          .attr('class', 'divergence_d')
          .attr('x', (a) => xScale(a.age) + xScale.bandwidth() /2 + 15 + xScale.bandwidth()/4)
          .attr('y', (a) => yScale(a.value) + 30)
          .attr('text-anchor', 'middle')
          .text((a) => `${a.avr} $`)
    })
          
      .on('mouseleave', function () {
        d3.selectAll('.value_d').attr('opacity', 1)
        d3.selectAll('#bar_v').attr('opacity', 1)
        d3.selectAll('.value_v').attr('opacity', 1)
  
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.age) + xScale.bandwidth()/2+10)
          .attr('width', xScale.bandwidth()/2+10)
  
        chart.selectAll('#limit_2').remove()
        chart.selectAll('.divergence_d').remove()
      })
    

barGroups_2 
    .append('text')
    .attr('class', 'value_d')
    .attr('x', (a) => xScale(a.age) + xScale.bandwidth() / 2 + 15 + xScale.bandwidth()/4)
    .attr('y', (a) => yScale(a.value) + 20)
    .attr('text-anchor', 'middle')
    .text((a) => `${a.value}`)
  
// Tool tip



    