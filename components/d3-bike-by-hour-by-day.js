const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const d3scale = require('d3-scale-chromatic');

const margin = { top: 25, right: 25, bottom: 35, left: 50 };
const width = 580;
const height = 400;
const w = width - (margin.left + margin.right);
const h = height - (margin.top + margin.bottom);
//const legendSpace = 130;

class D3BikeByHourByDay extends D3Component {
  initialize(node, props) {
  	// get hour shit rolled up
  	var map_byhrday = d3.rollup(props.data, v => d3.mean(v, d => d.cnt), d => d.weekday, d => d.hr);
	  var max_y = 600;
    //var max_y = Math.round(Math.max(...hrs_map.values()));
  	
  	//max_y = Math.round(max_y);
  	//max_y = max_y + (10 - max_y % 10);

  	// CRUCIAL
  	// change the type of data from a MAP to an ARRAY of objects
  	/*var nestedData = [];
    var nest2 = [];
    map_byhrday.forEach((values,keys)=>{
      //alert(keys);
      nest2 = [];
      values.forEach((values2, keys2)=>{
        //alert(values2);
        nest2.push(key:keys2, value:values2);
      })
      //alert(typeof values);
      nestedData.push({key:keys, value:values2});
    })*/

    //alert(map_byhrday.get("0").get("16"));
    /*map0.forEach((values,keys)=>{
      alert(keys);
      nestedData.push({key:keys, value:values});
    })*/



    // Create the x scale and axis
    const x = d3.scaleLinear()
      .domain(d3.extent(props.data, d => d.hr))
      .range([0, w]);
    const xAxis = d3.axisBottom(x)
    				.ticks(4)
    				.tickValues([0, 8, 16, 23]);

    // Create the y scale and axis
    const y = d3.scaleLinear()
      .domain([0, max_y])
      .range([h, 0]);
    const yAxis = d3.axisLeft(y);

    // Create our SVG element
    const svg = (this.svg = d3.select(node).append('svg'));
    const line_svg = svg.attr('id', 'line-chart')
      .attr('width', width)
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

    var path = line_svg.append('g')
      .attr('id', 'paths-group');

    var valueline = d3.line()
	    .x(function(d) { return x(d.key); })
	    .y(function(d) { return y(d.value); });

    const color = d3.scaleOrdinal()
      .domain([0,6])

    var i = 0;
    map_byhrday.forEach((values,keys)=>{
      var nestedData = [];
      values.forEach((values2,keys2)=>{
        nestedData.push({key:keys2, value:values2});
      })
      // sort the nested data by their keys
      nestedData = nestedData.sort(function(a, b) {
        var keyA = parseFloat(a);
        var keyB = parseFloat(b);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      if (keys == "0") {
        alert("we made it buds");
        path.append("path")
       		.datum(nestedData)
          .attr("class", "line")
          .attr("d", valueline)
          .style("stroke", "#000")
      	  .style("stroke-width", 1)
      	  .style("fill", "none");
      }
    })
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

module.exports = D3BikeByHourByDay;