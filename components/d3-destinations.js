const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const d3scale = require('d3-scale-chromatic');

const margin = { top: 25, right: 25, bottom: 35, left: 200 };
const width = 800;
const height = 200;
const w = width - (margin.left + margin.right);
const h = height - (margin.top + margin.bottom);
const legendSpace = 130;
const barPadding = 1;

class D3Destinations extends D3Component {
  initialize(node, props) {

    //transform dataset
    const chart_data = props.data;

    console.log(chart_data)

    // Create our SVG element
    const svg = (this.svg = d3.select(node).append('svg'))
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    const xscale = d3.scaleLinear()
        .domain([0,d3.max(props.data, d => d.Count)])
        .range([0,w]);

    const xaxis = d3.axisBottom()
        .scale(xscale);

    const yscale = d3.scaleBand()
        .domain(props.data.map(d => d.destination_name))
        .rangeRound([margin.top, height - margin.bottom])
        .padding(0.1)

    const yaxis = d3.axisLeft()
        .scale(yscale);

    console.log(yscale('Eastern Market Metro'));
    svg.selectAll('rect')
        .data(props.data)
        .enter()
        .append('rect')
            .attr('x', margin.left)
            .attr('y', d => yscale(d.destination_name))
            .attr('width', d => xscale(d.Count))
            .attr('height', yscale.bandwidth())
            .attr('fill','#fab95b');

    svg.append('g')
        .attr('transform','translate('+margin.left+','+(height - margin.bottom)+')')
        .call(xaxis);

    svg.append('g')
        .attr('transform','translate('+margin.left+',0)')
        .call(yaxis);

      }


    update(props, oldProps) {
      // Use this function to update the visualization.
      // The initial SVG element can be accessed with: this.svg
        // Add the path using this helper function
      // this.svg.selectAll('path')
      //   .transition()
      //   .duration(750)
      //   .call(linear_yaxis);
      
    }
  }

  module.exports = D3Destinations;