const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const d3scale = require('d3-scale-chromatic');

const margin = { top: 25, right: 100, bottom: 35, left: 250 };
const width = 900;
const height = 300;
const w = width - (margin.left + margin.right);
const h = height - (margin.top + margin.bottom);
const legendSpace = 130;
const barPadding = 1;
const labelPadding = 4;

class D3Destinations extends D3Component {
  initialize(node, props) {

    //transform dataset
    const chart_data = props.data;

    // Create our SVG element
    const svg = (this.svg = d3.select(node).append('svg'))
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    const xscale = d3.scaleLinear()
        .domain([0,d3.max(props.data, d => d.Count)])
        .rangeRound([0,w]);

    const xaxis = d3.axisBottom()
        .scale(xscale)
        .ticks(5,'~s');

    const yscale = d3.scaleBand()
        .domain(props.data.map(d => d.destination_name))
        .rangeRound([margin.top, height - margin.bottom])
        .padding(0.1)

    const yaxis = d3.axisLeft()
        .scale(yscale);
    
    const format = d3.format(',');

    const index = d3.local()

    svg.selectAll('text')
        .data(props.data)
        .enter()
        .append('text')
            .text(d => format(d.Count))
            .attr('x', d => xscale(d.Count))
            .attr('y', d => yscale(d.destination_name))
            .attr('font-family', 'sans-serif')
            .attr('font-size','11px')
            .attr('fill','black')
            .attr('transform','translate('+ (margin.left+ labelPadding) +','+(margin.top)/2+')');

    const dest = svg.selectAll('rect')
        .data(props.data)
        .enter()
        .append('rect')
            .attr('class',d => 'rect'+d.reference)
            .attr('x', margin.left)
            .attr('y', d => yscale(d.destination_name))
            .attr('width', d => xscale(d.Count))
            .attr('height', yscale.bandwidth())
            .attr('fill','#fab95b')
            .on('mouseover', function(d,i){highlight(i.reference);})
            .on('mouseout', function(d,i){clearHighlight(i.reference);})
            .on('click', function(d,i){fullSelect(i.reference);});


    svg.append('g')
        .attr('transform','translate('+margin.left+','+(height - margin.bottom)+')')
        .call(xaxis);

    svg.append('g')
        .attr('transform','translate('+margin.left+',0)')
        .call(yaxis)
        .call(g => g.selectAll('.tick text'))
            .attr('font-size','13px');

    
    function highlight(n){
        d3.select('.rect'+n).attr('stroke','#333').attr('stroke-width',2);
        d3.select('.marker'+n).style('opacity',1);
        d3.select('.tooltip'+n).style('opacity',1);

    }
    
    function clearHighlight(n){
        if(!isClicked[n]){
            d3.select('.rect'+n).attr('stroke',null);
            d3.select('.marker'+n).style('opacity',0);
            d3.select('.tooltip'+n).style('opacity',0)
        }
        if(latest_clicked !== n){
            d3.select('.tooltip'+n).style('opacity',0)
        }
            
        }

    var isClicked = Array(10).fill(false);

    isClicked[0] = true;
    d3.select('.rect0').attr('stroke','#333').attr('stroke-width',2);
    d3.select('.marker0').style('opacity',1);
    d3.select('.tooltip0').style('opacity',1);

    var latest_clicked = 0;

    function fullSelect(n){
        isClicked[n] = !isClicked[n];
        d3.select('.tooltip0').style('opacity',0);
        d3.select('.tooltip'+latest_clicked).style('opacity',0);
        latest_clicked = n;
        d3.select('.rect'+n).attr('stroke','#333').attr('stroke-width',2);
        d3.select('.marker'+n).style('opacity',1);
        d3.select('.tooltip'+latest_clicked).style('opacity',1);
    }
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