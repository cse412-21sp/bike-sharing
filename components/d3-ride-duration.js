const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const d3scale = require('d3-scale-chromatic');

const margin = { top: 25, right: 25, bottom: 35, left: 50 };
const width = 700;
const height = 500;
const w = width - (margin.left + margin.right);
const h = height - (margin.top + margin.bottom);
const legendSpace = 130;
const bucket_size = 60;
const number_hours = 50;

class D3RideDuration extends D3Component {
  initialize(node, props) {

    //transform dataset
    const chart_data = this.data_clean(props.data);

    const ride_lengths = [0,0];
    const bikers = [0,0];

    // Create our SVG element
    const svg = (this.svg = d3.select(node).append('svg'))
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        
    svg.append('rect')
      .attr('width','100%')
      .attr('height','100%')
      .attr('fill','WhiteSmoke');

    svg.append('text')
        .attr('transform','translate('+ ((width/2)-50)+','+(height/2)+')')
        .attr('fill','black')
        .attr('font-size','24px')
        .attr('font-weight','bold')
        .attr('x',0)
        .attr('y',0)
        .text('Loading Data...')
      }


    update(props, oldProps) {
      // Use this function to update the visualization.
      // The initial SVG element can be accessed with: this.svg
      if (oldProps.data.length === 0 && props.data.length !== 0){

        this.chart_data = this.data_clean(props.data);

        // Create the x scale and axis
        const xscale = d3.scaleLinear()
          .domain(this.ride_lengths)
          .range([margin.left, width - margin.right]);

        const xaxis = d3.axisBottom()
          .scale(xscale)
          .tickValues(d3.range(0, 50, 6));


        // Create the y scale and axis
        const yscale = d3.scaleLog()
          .domain(this.bikers)
          .range([height - margin.bottom, margin.top]);
        const yaxis = d3.axisLeft()
          .scale(yscale)
          .ticks(4, '~s');
        this.svg.select('rect').remove()
        this.svg.select('text').remove()
        // Add x-axis
        this.svg.append('g')
        .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
        .call(xaxis)
        .append('text')
          .attr('text-anchor','end')
          .attr('fill','black')
          .attr('font-size','12px')
          .attr('font-weight','bold')
          .attr('x',width-margin.right)
          .attr('y',margin.bottom - 5)
          .text('Rental Duration (hours)');

        // //Add y-axis
        const y = this.svg.append("g")
          .attr("transform", 'translate(' + margin.left + ',0)')
          .call(yaxis)
          .append('text')
            .attr('transform','translate(70, 10)')
            .attr('text-anchor','end')
            .attr('fill','black')
            .attr('font-size','12px')
            .attr('font-weight','bold')
            .attr('x',0)
            .attr('y',0)
            .text('Number of Bike Trips');

        // Curve helper function
        const curveFunc = d3.area()
          .curve(d3.curveBasis)
          .x(d => xscale(d.key) )      // Position of both line breaks on the X axis
          .y1(height - margin.bottom)     // Y position of top line breaks
          .y0(d => yscale(d.value) );


        // Add the path using this helper function
        const chart = this.svg.append('path')
          .datum(this.chart_data)
          .attr('d', curveFunc)
          .attr('stroke', 'black')
          .attr('fill', '#854e6f');

      }
      // this.svg.selectAll('path')
      //   .transition()
      //   .duration(750)
      //   .call(linear_yaxis);
      
      // const linear_yaxis = d3.axisLeft()
      //   .scale(linear_yscale)
      //   .ticks(10);


      // const linear_yscale = d3.scaleLinear()
      //   .domain(bikers)
      //   .range([height - margin.bottom, margin.top])
    }

    data_clean(new_data) {
      const rollup_values = Array.from(
        d3.group(
          new_data, 
          d => Math.round(d.Duration/bucket_size)), 
        ([key, value]) => ({key, value})
      )

      const buckets = d3.sort(Array.from(d3.rollup(
        rollup_values, 
        values => {
          const counts = values[0].value;
          return d3.sum(counts.values(0), d=>d.Count)},
        d => d.key
        ),([key, value]) => ({key, value})), d => d.key)
        .slice(0, number_hours)

      this.ride_lengths = d3.extent(buckets, d => d.key);
      this.bikers = d3.extent(buckets, d=> d.value);

      console.log(this.ride_lengths)
      console.log(this.bikers)

      return buckets

    }
  }

  module.exports = D3RideDuration;