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

class D3BikeByHour extends D3Component {
  initialize(node, props) {
  	alert("booba");

    // Create the x scale and axis
    const x = d3.scaleLinear()
      .domain(d3.extent(props.data, d => d.hr))
      .range([0, w]);
    const xAxis = d3.axisBottom(x)
      .tickFormat(d3.timeFormat('%b')); // %b: abbreviated Month format (Mon, Jun..)

    // Create the y scale and axis
    const y = d3.scaleLinear()
      .domain(d3.extent(props.data, d => parseFloat(d.cnt)))
      .range([h, 0]);
    const yAxis = d3.axisLeft(y);

    // Create our SVG element
    const svg = (this.svg = d3.select(node).append('svg'));
    const line_svg = svg.attr('id', 'line-chart')
      .attr('width', width + legendSpace)
      .attr('height', height)
      .style('border', '1px dashed #ccc')
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Append x axis to svg
    line_svg.append('g')
      .attr('transform', 'translate(0,' + h + ')')
      .attr('class', 'myXaxis')
      .call(xAxis);

    // Append y axis to svg
    line_svg.append('g')
      .attr('class', 'myYaxis')
      .call(yAxis);

    // Create a group to store lines for our line chart
    var path = line_svg.append('g')
      .attr('id', 'paths-group');

    var line = d3.line()
      .x(d => x(d3.timeParse('%b')(d.month)))
      .y(d => y(parseFloat(d.day)));  

  }

  update(props, oldProps) {
    // Use this function to update the visualization.
    // The initial SVG element can be accessed with: this.svg

    // this.svg.selectAll('line')
    //   .transition()
    //   .duration(750)
    //   .attr('color', '#ccc');
  }
}

module.exports = D3BikeByHour;