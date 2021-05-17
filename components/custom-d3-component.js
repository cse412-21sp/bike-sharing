const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = Object.assign({}, require("d3"), require("d3-transition"), require("d3-selection"));

const size = 600;
var y = 0

class CustomD3Component extends D3Component {
  initialize(node, props) {
    const svg = (this.svg = d3.select(node).append('svg'));
    svg
      .attr('viewBox', `0 0 10 1000`)
      .style('width', '100%')
      .style('height', '100%')

    svg.append('line')
      .style("stroke", "black")
      .style("stroke-width", 1)
      .attr("x1", 5)
      .attr("y1", 0)
      .attr("x2", 5)
      .attr("y2", 1000); 

    svg
      .append('circle')
      .attr('r', 25)
      .attr('cx', 5)
      .attr('cy', 35)
      .style("fill", "black")
      .style("stroke-width", 3)
    
  }

  update(props, oldProps) {
    this.svg
      .selectAll('circle')
    .transition()
      .duration(1000)
      .attr('cx', 5)
      .attr('cy', ((props.state) * 200))
      .ease(d3.easeQuad)
    .transition()
      .attr('r', 35)
      .duration(300)
      .ease(d3.easeLinear)
    .transition()
      .attr('r', 25)
      .duration(300)
      .ease(d3.easeLinear)
  }
}

module.exports = CustomD3Component;
