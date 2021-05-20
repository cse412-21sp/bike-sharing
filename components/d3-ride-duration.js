const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const d3scale = require('d3-scale-chromatic');

const margin = { top: 25, right: 25, bottom: 35, left: 50 };
const width = 450;
const height = 300;
const w = width - (margin.left + margin.right);
const h = height - (margin.top + margin.bottom);
const legendSpace = 130;

class D3RideDuration extends D3Component {
  initialize(node, props) {

    d3.csv('https://github.com/cse412-21sp/bike-sharing/blob/main/data/2010-2021_ride_duration_density.csv', function(data) {
      console.log(data);
    });

    const bucket_size = 60
    const number_hours = 50

    //transform dataset
    const rollup_values = Array.from(
      d3.group(
        props.data, 
        d => Math.round(d.Duration/bucket_size)), 
      ([key, value]) => ({key, value})
    )
    console.log(rollup_values)

    // const buckets = d3.sort(Array.from(d3.rollup(
    //   rollup_values, 
    //   values => {
    //     const counts = values[0].value;
    //     return d3.sum(counts.values(0), d=>d.Count)},
    //   d => d.key
    //   ),([key, value]) => ({key, value})), d => d.key)
    //   .slice(0, number_hours)


    // const ride_lengths = d3.extent(buckets, d => d.key)
    // const bikers = d3.extent(buckets, d=> d.value)

    // // Create the x scale and axis
    // const xscale = d3.scaleLinear()
    //     .domain(ride_lengths)
    //     .range([margin.left, width - margin.right]);
    // const xaxis = d3.axisBottom()
    //     .scale(xscale)
    //     .tickValues(d3.range(0, 50, 6));

    // // Create the y scale and axis
    // const yscale = d3.scaleLog()
    //     .domain(bikers)
    //     .range([height - margin.bottom, margin.top]);
    // const yaxis = d3.axisLeft()
    //     .scale(yscale)
    //     .ticks(4, '~s');

    // // Create our SVG element
    // const svg = (this.svg = d3.select(node).append('svg'))
    //     .attr('width', width + margin.left + margin.right)
    //     .attr('height', height + margin.top + margin.bottom)
    //     .append('g')
    //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // // Add x-axis
    // svg.append("g")
    //   .attr("transform", 'translate(0,' + height-margin.bottom + ')')
    //   .call(xaxis)
    //    .append('text')
    //       .attr('text-anchor','end')
    //       .attr('fill','black')
    //       .attr('font-size','12px')
    //       .attr('font-weight','bold')
    //       .attr('x',width-margin.right)
    //       .attr('y',margin.bottom - 10)
    //       .text('Rental Duration (hours)');


    // //Add y-axis
    // const y = svg.append("g")
    // .attr("transform", 'translate(' + margin.left + ',0)')
    // .call(yaxis)
    // .append('text')
    //   .attr('transform','translate(50, 10)')
    //   .attr('text-anchor','end')
    //   .attr('fill','black')
    //   .attr('font-size','12px')
    //   .attr('font-weight','bold')
    //   .attr('x',0)
    //   .attr('y',0)
    //   .text('Bike Trips');


    // // Curve helper function
    // const curveFunc = d3.area()
    //   .curve(d3.curveBasis)
    //   .x(d => xscale(d.key) )      // Position of both line breaks on the X axis
    //   .y1(height - margin.bottom)     // Y position of top line breaks
    //   .y0(d => yscale(d.value) )

    // // Add the path using this helper function
    // const chart = svg.append('path')
    //   .datum(buckets)
    //   .attr('d', curveFunc)
    //   .attr('stroke', 'black')
    //   .attr('fill', '#854e6f')
  }}

  module.exports = D3RideDuration;