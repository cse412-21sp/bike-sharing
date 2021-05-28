const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const d3scale = require('d3-scale-chromatic');
const d3_annotation = require('d3-svg-annotation');

const margin = { top: 25, right: 25, bottom: 35, left: 60 };
const width = 700;
const height = 500;
const w = width - (margin.left + margin.right);
const h = height - (margin.top + margin.bottom);
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
        .attr('viewBox',`0 0 ${width} ${height}`)
        .style('width','100%')
        .style('height','auto')
        .style('padding','20px');
    
    // Loading Screen
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
      if (props.data.length !== 0){


        this.chart_data = this.data_clean(props.data);

        // Create the y scale and axis
        const linear_yscale = d3.scaleLinear()
          .domain(this.bikers)
          .range([height - margin.bottom, margin.top]);

        const linear_yaxis = d3.axisLeft()
          .scale(linear_yscale)
          .ticks(10);
        
        // Create the log scale & axis
        const log_yscale = d3.scaleLog()
          .domain(this.bikers)
          .range([height - margin.bottom, margin.top]);

        const log_yaxis = d3.axisLeft()
          .scale(log_yscale)
          .ticks(10, ',.1s');
        
        // Curve helper function
        const linear_curveFunc = d3.area()
          .curve(d3.curveBasis)
          .x(d => this.xscale(d.key) )      // Position of both line breaks on the X axis
          .y1(height - margin.bottom)     // Y position of top line breaks
          .y0(d => linear_yscale(d.value) );

        // Log curve helper function
        const log_curveFunc = d3.area()
          .curve(d3.curveBasis)
          .x(d => this.xscale(d.key) )      // Position of both line breaks on the X axis
          .y1(height - margin.bottom)     // Y position of top line breaks
          .y0(d => log_yscale(d.value) );

        const annotations = [
          {
            note: { 
              label: "Most bikers return their rentals by the 24-hour mark",
              title: "24-Hour Pass",
              align: "middle"},
            data: {hour: 24},
            y: height - margin.bottom,
            dy: -height+margin.top+margin.bottom+100,
            connector: { lineType: "vertical" }
          }
        ];
        
        const makeAnnotations = d3_annotation
          .annotation()
          .type(d3_annotation.annotationCallout)
          .accessors({
            x: d => this.xscale(d.hour)
          })
          .annotations(annotations);


        if (oldProps.data.length === 0) {

          this.xscale = d3.scaleLinear()
            .domain(this.ride_lengths)
            .range([margin.left, width - margin.right]);
    
          this.xaxis = d3.axisBottom()
            .scale(this.xscale)
            .tickValues(d3.range(0, 50, 6));

          this.svg.select('rect').remove()
          this.svg.select('text').remove()

          // Add x-axis
          this.svg.append('g')
            .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
            .call(this.xaxis)
            .append('text')
              .attr('text-anchor','end')
              .attr('fill','black')
              .attr('font-size','14px')
              .attr('font-weight','bold')
              .attr('x',width-margin.right)
              .attr('y',30)
              .text('Rental Duration (hours)');

          // Add y-axis
          this.svg.append("g")
            .attr("transform", 'translate(' + margin.left + ',0)')
            .call(linear_yaxis)
            .attr("class","y-axis")
            .append('text')
              .attr('transform','translate(-30, 5)')
              .attr('text-anchor','start')
              .attr('fill','black')
              .attr('font-size','14px')
              .attr('font-weight','bold')
              .attr('x',0)
              .attr('y',margin.top - 15)
              .text('Number of Bike Trips');

          // Add the path using this helper function
          this.svg.append('path')
            .datum(this.chart_data)
            .attr('d', linear_curveFunc)
            .attr("class","my_chart")
            .attr('stroke', 'black')
            .attr('fill', '#ec2239');

          
          this.svg.append('g')
            .attr("class","my_annotation")
            .style('font-size','12px')
            .style('fill','#445464')
            .call(makeAnnotations);
        }

        if (props.inView) {

          this.svg.select(".y-axis")
            .transition()
            .duration(2000)
            .call(log_yaxis);

          // Add the path using this helper function
          this.svg.select(".my_chart")
            .transition()
            .duration(2000)
            .attr('d', log_curveFunc);
        
        } else {

          this.svg.select(".y-axis")
            .transition()
            .call(linear_yaxis);

          // Add the path using this helper function
          this.svg.select(".my_chart")
            .transition()
            .attr('d', linear_curveFunc);

        }

      }

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