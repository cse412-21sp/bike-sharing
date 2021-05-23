const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const d3scale = require('d3-scale-chromatic');
var turf = require('@turf/rewind');
const margin = { top: 10, right: 100, bottom: 10, left: 100 };
const width = 300;
const height = 300;
const w = width - (margin.left + margin.right);
const h = height - (margin.top + margin.bottom);

class D3DCMap extends D3Component {
  initialize(node, props) {

    const waterways = props.water

    const streets = props.streets
    
    const DCProjection = d3.geoMercator().fitExtent([[0, 0], [width, height]], streets)

    const DCPathGenerator = d3.geoPath().projection(DCProjection)

    const waterPathGenerator = d3.geoPath().projection(DCProjection)

    const svg = (this.svg = d3.select(node).append('svg'))
        .attr('width',width)
        .attr('height',height)
  
    svg.append('rect')
        .attr('width',width)
        .attr('height',height)
        .attr('fill','#333333')

    const fixed_water = waterways.features.map(function(feature) {
        return turf(feature,{reverse:true});
    })
    console.log(fixed_water)
    // construct the path elements using the D3 data join
    svg.selectAll('path')
        // data() expects an Array, so make sure to pass the features entry of our FeatureCollection
        .data(fixed_water)
        // select all data items that are not represented on the map yet, and add them
        .enter()
        .append('path')
        // assign attributes to those new elements
        .attr('d', waterPathGenerator)
        .attr('fill','#6a759e')
        .attr('stroke','#6a759e')
        .attr('stroke-width','0.5');
    
    svg.append('g')
        .selectAll('path')
        .data(streets.features)
        .enter()
        .append('path')
        .attr('d',DCPathGenerator)
        .attr('fill', 'none')
        .attr('stroke', '#696969')
        .attr('stroke-width', '1.5');
    
    const location = [-77.0049,38.89696]
    
    const x= DCProjection(location)[0],
            y=DCProjection(location)[1];
    
    svg.append('g')
        .selectAll('path')
        .data(props.coords)
        .enter()
        .append('path')
        .attr("class", function(d,i){return "marker marker"+i})
        .attr('d', "M0,0l-8.8-17.7C-12.1-24.3-7.4-32,0-32h0c7.4,0,12.1,7.7,8.8,14.3L0,0z")
        .attr("transform", d => "translate(" + DCProjection([d.Longitude,d.Latitude]) + ")")
        .attr('fill','#fab95b')
        .attr('stroke','black')
        .attr('stroke-width','1')
        .style('opacity',0)
  
}

  update(props, oldProps) {
    // Use this function to update the visualization.
    // The initial SVG element can be accessed with: this.svg


  }
}

module.exports = D3DCMap;
