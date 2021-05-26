const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const d3scale = require('d3-scale-chromatic');
var turf = require('@turf/rewind');
const frame_margin = {top:30, right:30, bottom:30, left:30};
const full_width = 600;
const full_height = 600;
const width = full_width - frame_margin.left - frame_margin.right;
const height = full_height -frame_margin.top - frame_margin.bottom;
const map_zoom = 120;
const padding = 20;
const wm = [-77.0353,38.8895];

class D3DCMap extends D3Component {
  initialize(node, props) {

    const waterways = props.water

    const streets = props.streets
    
    const DCProjection = d3.geoMercator().fitExtent([[0, 0], [width, height]], streets)

    const DCPathGenerator = d3.geoPath().projection(DCProjection)

    const waterPathGenerator = d3.geoPath().projection(DCProjection)

    const svg = (this.svg = d3.select(node).append('svg'))
        .attr('width',full_width+padding)
        .attr('height',full_height)
  
    const my_map = svg.append('rect')
        .attr('class','frame')
        .attr('x',frame_margin.left)
        .attr('y',frame_margin.top)
        .attr('width',width)
        .attr('height',height)
        .attr('fill','#333333')
    
    const fixed_water = waterways.features.map(function(feature) {
        return turf(feature,{reverse:true});
    })
    // construct the path elements using the D3 data join
    svg.selectAll('path')
        // data() expects an Array, so make sure to pass the features entry of our FeatureCollection
        .data(fixed_water)
        // select all data items that are not represented on the map yet, and add them
        .enter()
        .append('path')
        // assign attributes to those new elements
        .attr('transform','translate('+frame_margin.left+',0)')
        .attr('d', waterPathGenerator)
        .attr('fill','#555555')
        .attr('stroke','#555555')
        .attr('stroke-width','0.5');
    
    svg.append('g')
        .selectAll('path')
        .data(streets.features)
        .enter()
        .append('path')
        .attr('transform','translate('+frame_margin.left+',0)')
        .attr('d',DCPathGenerator)
        .attr('fill', 'none')
        .attr('stroke', '#696969')
        .attr('stroke-width', '1.5');

    const frame_coloring = svg.append('path')
        .attr('d','M 0,0 h '+ full_height +' v '+ full_width+' h '+ -full_height+' z M '+frame_margin.left+','+frame_margin.top+' v  '+ height+' h  '+width+' v  '+ -height+' z')
        .attr('stroke','#333333')
        .attr('fill','white')

    const wm_x= (DCProjection(wm)[0])+ frame_margin.left,
        wm_y=DCProjection(wm)[1];

    svg.append('path')
        .attr('d','M0 0h7v-2h-3L3,-32L0,-35L-3,-32L-4,-2h-3v2h7z')
        .attr('fill','#DFD8C9')
        .attr('stroke-width','1')
        .attr('stroke','black')
        .attr("transform", "translate(" + wm_x + "," + wm_y + ")")

    svg.append('g')
        .selectAll('path')
        .data(props.coords)
        .enter()
        .append('path')
        .attr("class", function(d,i){return "marker marker"+i})
        .attr('d', "M0,0l-8.8-17.7C-12.1-24.3-7.4-32,0-32h0c7.4,0,12.1,7.7,8.8,14.3L0,0z")
        .attr("transform", d => "translate(" + ((DCProjection([d.Longitude,d.Latitude])[0]) + frame_margin.left) +',' + DCProjection([d.Longitude,d.Latitude])[1]+")")
        .attr('fill','#fab95b')
        .attr('stroke','black')
        .attr('stroke-width','1')
        .style('opacity',0)

    svg.append('g')
        .selectAll('text')
        .data(props.coords)
        .enter()
        .append('text')
            .attr('class', function(d,i){return 'tooltip tooltip'+i})
            .attr('x',d => ((DCProjection([d.Longitude,d.Latitude])[0]) + frame_margin.left))
            .attr('y',d => DCProjection([d.Longitude,d.Latitude])[1]-35)
            .attr('width',40)
            .attr('height',40)
            .attr('fill','white')
            .text(d => d.destination_name)
            .style('opacity',0)
  
}

  update(props, oldProps) {
    // Use this function to update the visualization.
    // The initial SVG element can be accessed with: this.svg


  }
}

module.exports = D3DCMap;
