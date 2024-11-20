import React, { Component } from "react";
import "./child1.css"
import * as d3 from "d3";
import { filter } from "@gitbook-ng/gitbook/lib/constants/defaultPlugins";

// TODO
// Fix the placement of the lines making sure the data is correct

class Child1 extends Component {
  state = { 
    company: "Apple", // Default Company
    selectedMonth: 'November' //Default Month
  };

  componentDidMount() {
    console.log(this.props.csv_data) // Use this data as default. When the user will upload data this props will provide you the updated data
    this.renderChart();
  }

  componentDidUpdate() {
    console.log(this.props.csv_data)
    this.renderChart();
  }

  renderChart = () => {
    var data = this.props.csv_data;
    // Parse the date string into JavaScript Date objects
    const tooltip = d3.select("#tooltip");
    const formatMonth = d3.timeFormat('%B');
    const filteredData = data.filter(d => formatMonth(d.Date) == this.state.selectedMonth && d.Company == this.state.company);
    console.log(filteredData);

    // Set the dimensions of the chart
    const margin = { top: 20, right: 30, bottom: 40, left: 100 },
      width = 650,
      height = 300,
      innerWidth = 650 - margin.left - margin.right,
      innerHeight = 300 - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3.select('#child1_svg').attr('width', width).attr('height', height).select('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set the scales for the axes
    const x_Scale = d3.scaleTime().domain(d3.extent(filteredData, d => d.Date)).range([0, innerWidth-50]);

    const y_Scale = d3.scaleLinear().domain([Math.min(d3.min(filteredData, d => d.Open),d3.min(filteredData, d => d.Close)), Math.max(d3.max(filteredData, d => d.Open), d3.max(filteredData, d => d.Close))]).range([innerHeight, 0]);

    // Create the line Generator
    const lineGen = d3.line()
    .x(d => x_Scale(d.Date))
    .y(d => y_Scale(d.Open))
    .curve(d3.curveMonotoneX);

    const lineGenClose = d3.line()
    .x(d => x_Scale(d.Date))
    .y(d => y_Scale(d.Close))
    .curve(d3.curveMonotoneX);

    svg.selectAll(".point1")
    .data(filteredData)
    .join("circle")
    .attr("class", "point1")
    .attr("cx", (d) => x_Scale(d.Date))
    .attr("cy", (d) => y_Scale(d.Open))
    .attr("r", 4) // Radius of the circle
    .attr("fill", "#b2df8a")
    .on("mouseover", (event,d) => {
      tooltip.style("visibility", "visible")
      .html(`
        <div>Date: ${d3.timeFormat("%m/%d/%Y")(d.Date)}</div>
        <div>Open: ${d.Open}</div>
        <div>Close: ${d.Close}</div>
        <div>Difference: ${(d.Close - d.Open).toFixed(2)}</div>
      `);
    })
    .on("mousemove", event => {
      // Position the tooltip based on mouse position
      tooltip.style("top", `${event.pageY + 10}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      // Hide the tooltip
      tooltip.style("visibility", "hidden");
    });

    svg.selectAll(".point2")
    .data(filteredData)
    .join("circle")
    .attr("class", "point2")
    .attr("cx", (d) => x_Scale(d.Date))
    .attr("cy", (d) => y_Scale(d.Close))
    .attr("r", 4) // Radius of the circle
    .attr("fill", "#e41a1c")
    .on("mouseover", (event,d) => {
      tooltip.style("visibility", "visible")
      .html(`
        <div>Date: ${d3.timeFormat("%m/%d/%Y")(d.Date)}</div>
        <div>Open: ${d.Open}</div>
        <div>Close: ${d.Close}</div>
        <div>Difference: ${(d.Close - d.Open).toFixed(2)}</div>
      `);
    })
    .on("mousemove", event => {
      // Position the tooltip based on mouse position
      tooltip.style("top", `${event.pageY + 10}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      // Hide the tooltip
      tooltip.style("visibility", "hidden");
    });

    // Get the pathData
    const pathData = lineGen(filteredData);
    const pathDataClose = lineGenClose(filteredData);
    
    // Use join to handle the enter, update, and exit of the line path
    svg.selectAll('path')
    .data([filteredData])  // Bind the data to the path element
    .join(
      enter => enter.append('path')  // When new data comes in, create new path elements
        .attr('fill', 'none')
        .attr('stroke', '#b2df8a')
        .attr('stroke-width', 2)
        .attr('d', lineGen)  // Generate the path with the data
        .transition().duration(1000)  // Optional: add a transition for a smoother appearance
  
      ,
      update => update  // If the path already exists, update it with new data
        .attr('d', lineGen)  // Recalculate the line path with updated data
  
      ,
      exit => exit.remove()  // If there is no corresponding data, remove the element
    );

    svg.selectAll('pathClose')
    .data([filteredData])  // Bind the data to the path element
    .join(
      enter => enter.append('path')  // When new data comes in, create new path elements
        .attr('fill', 'none')
        .attr('stroke', '#e41a1c')
        .attr('stroke-width', 2)
        .attr('d', lineGenClose)  // Generate the path with the data
        .transition().duration(1000)  // Optional: add a transition for a smoother appearance
  
      ,
      update => update  // If the path already exists, update it with new data
        .attr('d', lineGenClose)  // Recalculate the line path with updated data
  
      ,
      exit => exit.remove()  // If there is no corresponding data, remove the element
    );


    // Add the X axis using join
    svg.selectAll('.x.axis').data([null]).join('g').attr('class', 'x axis').attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x_Scale));
    svg.selectAll('.x.axis text')
      .style('text-anchor', 'middle') // Horizontally centers the text
      .attr('transform', function(d,i) { 
        return 'rotate(45)' + 'translate(17.5,0)'
      });

    // Add the Y axis using join
    svg.selectAll('.y.axis').data([null]).join('g').attr('class', 'y axis').call(d3.axisLeft(y_Scale));

    const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${innerWidth-25}, -10)`); // Adjust position
  
  // Data for the legend
  const legendData = [
    { color: "#b2df8a", label: "Open" },  // Green for Open
    { color: "red", label: "Close" }     // Red for Close
  ];
  legend.selectAll(".legend-item")
  .data(legendData)
  .join("g")
  .attr("class", "legend-item")
  .attr("transform", (d, i) => `translate(0, ${i * 30})`) // Space items vertically
  .each(function (d) {
    const legendItem = d3.select(this);

    // Add color indicator (circle)
    legendItem.append("rect")
      .attr("width", 24) // Width of the rectangle
      .attr("height", 24) // Height of the rectangle
      .attr("fill", d.color)
      .attr("x", -10) // Position of the rectangle
      .attr("y", -10);

    // Add label text
    legendItem.append("text")
      .text(d.label)
      .attr("x", 15)  // Position text to the right of the rectangle
      .attr("y", 5)   // Align text vertically with the rectangle
      .attr("font-size", "12px")
      .attr("font-weight", "none")
      .attr("fill", "#000");
  })};
  
  handleOptionChange = (event) => {
    this.state.company = event.target.value;
    this.renderChart();
  };

  handleMonthChange = (event) => {
    this.state.selectedMonth = event.target.value;
    this.renderChart();
  };
  render() {
    const options = ['Apple', 'Microsoft', 'Amazon', 'Google', 'Meta']; // Use this data to create radio button
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // Use this data to create dropdown

    return (
      <div className="child1">
        <div id="tooltip"></div>
        <form id="stocks" onChange={this.handleOptionChange}>
          <label for="stockoptions">Company:</label>
          {/* <input type="radio" value={stockname} id={stockname+"id"} />{stockname} */}
            <div id="stockoptions">
               
              {options.map((stockname) => ( <div><input type="radio" name="companyname" value={stockname} id={stockname+"id"} defaultChecked={stockname===this.state.company}/>{stockname} {stockname === this.state.company} </div>))}
            </div>
        </form>
        <p></p>
        <form id="monthsmenu" onChange={this.handleMonthChange}>
          <label for="months">Month: </label>
          <select name="months" id="months">
            {months.map((month) => (<option selected={month===this.state.selectedMonth} value={month}>{month}</option>))}
          </select>
        </form>
        <div className="parent">
        <svg id="child1_svg">
          <g></g>
        </svg>
        </div>
      </div>
    );
  }
}

export default Child1;
