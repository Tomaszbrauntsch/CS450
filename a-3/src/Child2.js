  import React, { Component } from 'react';
  import * as d3 from "d3";

  // Bar chart

  class Child2 extends Component{
    constructor(props){
      super(props);
      this.state = {};
    }

    componentDidUpdate() {
      var data=this.props.data;
      
      var margin = {top: 30, right: 10, bottom: 50, left: 30},
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

      var container = d3.select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
      //Obtain the days and their avgs
      // resultant, function that works on day and tip, initvalue
      const tipData = data.reduce((result, { day, tip }) => {
        if(!result[day])
          result[day] = [];
        result[day].push(tip);
        return result;
      }, {});

      const averages = Object.entries(tipData).map(([day,tips]) => {
        const totalCost = tips.reduce((sum, tip) => sum + tip, 0);

        const avg = Math.trunc((totalCost / tips.length) * 100) / 100;
        return { day, avg };
      });
      
      var padding = 30;
      // Add X axis
      var x_data=averages.map(item=>item.day)
      console.log(x_data)
      const x_scale = d3.scaleBand()
      .domain(x_data.values())
      .range([margin.left, w - padding]);

      container.selectAll(".x_axis_g").data([0]).join('g').attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

      // Obtain the avg tip for the day
      // Add Y axis
      var y_data=averages.map(item=>item.avg)
      console.log(y_data)
      console.log(y_data.length)
      const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h,padding]);

      container.selectAll(".y_axis_g").data([0]).join('g').attr("class", "x_axis_g")
      .attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));
    

container.selectAll("mybar")
      .data(averages)
      .enter()
      .append("rect")
      .attr("x", function(d) { return x_scale(d.day) + 15; })
      .attr("y", function(d) { return y_scale(d.avg); })
      .attr("width", 80)
      .attr("height", function(d) { return h - y_scale(d.avg); })
      .style("fill", "#69b3a2")

// Add Title Label
container.append('text')
// .attr('class', 'y-axis-label')
// .attr('text-anchor', 'middle')
// .attr('transform', 'rotate(-90)')
.attr('x', margin.top + 145) /* (-h / 2) - margin.top */
.attr('y', margin.left - 48)
.text('Average Tip by Day');

// Add X Axis Lable
container.append('text')
.attr('class', 'x-axis-label')
.attr('text-anchor', 'middle')
.attr('x', w / 2 + margin.left - 25)
.attr('y', h + margin.top) // + margin.top + 25
 .text('Day');

// Add Y Axis Label
container.append('text')
.attr('transform', 'rotate(-90)')
.attr('x', (-h / 2) - margin.top - 2.5)
.attr('y', margin.left - 40)
.text('Average Tip');
    }

    render() {
      return (
          <svg className="child2_svg">
            <g className="g_2"></g>
          </svg>
      )
    };
  }

  export default Child2;