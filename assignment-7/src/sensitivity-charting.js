import React, { Component } from "react";
import * as d3 from "d3";

class Sensitive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPoints: []
    };
  }

  componentDidMount() {
    this.renderChart();
  }

  updateColors = () => {
    const { chart_type } = this.props;

    // Clear the previous content
    const legendDiv = d3.select(".legend-container");
    legendDiv.selectAll("svg").remove(); 

    if (chart_type === "Sentiment") {
      const sentimentColorScaling = d3.scaleLinear()
        .domain([-1, 0, 1])
        .range(["red", "#ECECEC", "green"]);

      d3.selectAll("circle").attr("fill", (d) => sentimentColorScaling(d.sentiment));

      const legendWidth = 20;
      const legendHeight = 200;

      const legendSvg = legendDiv
        .append("svg")
        .attr("width", legendWidth + 450)
        .attr("height", legendHeight + 500);

      const legendGroup = legendSvg
        .append("g")
        .attr("transform", `translate(0, 100)`);

      const gradientId = "legendGradient";
      const defs = legendGroup.append("defs");
      const linearGradient = defs
        .append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      linearGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "green");
      linearGradient
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#ECECEC");
      linearGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "red");

      legendGroup
        .append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", `url(#${gradientId})`);

      const legendScale = d3.scaleLinear().domain([1, -1]).range([0, legendHeight]);
      const legendAxis = d3.axisRight(legendScale)
        .tickValues([1, -1])
        .tickFormat((d) => (d === 1 ? "Positive" : "Negative"));

      legendGroup
        .append("g")
        .attr("transform", `translate(${legendWidth}, 0)`)
        .call(legendAxis);

    } else if (chart_type === "Subjectivity") {
      const subjectivityColorScaling = d3.scaleLinear()
        .domain([0, 1])
        .range(["#ECECEC", "#4467C4"]);

      d3.selectAll("circle").attr("fill", (d) => subjectivityColorScaling(d.subjectivity));

      const legendWidth = 20;
      const legendHeight = 200;

      const legendSvg = legendDiv
        .append("svg")
        .attr("width", legendWidth + 450)
        .attr("height", legendHeight + 500);

      const legendGroup = legendSvg
        .append("g")
        .attr("transform", `translate(0, 100)`);

      const gradientId = "subjectivityLegendGradient";
      const defs = legendGroup.append("defs");
      const linearGradient = defs
        .append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      linearGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#4467C4");
      linearGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#ECECEC");

      legendGroup
        .append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", `url(#${gradientId})`);

      const legendScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, legendHeight]);

      const legendAxis = d3.axisRight(legendScale)
        .tickValues([0, 1])
        .tickFormat((d) => (d === 1 ? "Objective" : "Subjective"));

      legendGroup
        .append("g")
        .attr("transform", `translate(${legendWidth}, 0)`)
        .call(legendAxis);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.chart_type !== this.props.chart_type) {
      this.updateColors(); 
    }
  }

  handlePointClick = (pointData, event) => {
    const { selectedPoints } = this.state;
    const isSelected = selectedPoints.find((p) => p.id === pointData.id);
  
    if (isSelected) {
      this.setState({
        selectedPoints: selectedPoints.filter((p) => p.id !== pointData.id),
      });
    } else {
      this.setState({
        selectedPoints: [...selectedPoints, pointData],
      });
    }
  
    const circle = d3.select(event.target);
    const strokeColor = isSelected ? "none" : "black"; 
    circle.attr("stroke", strokeColor);
  };

  renderChart = () => {
    const { json_data } = this.props;
    const { selectedPoints } = this.state;
    const data = json_data;

    if (data.length === 0) return;

    const margin = { top: 20, right: 80, bottom: 50, left: 100 },
      width = 450 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;

    // Clear any existing chart contents
    d3.select(".container").html("");

    const container = d3.select(".container").style("display", "flex");
    const chartsDiv = container
      .append("div")
      .style("flex", "1")
      .style("display", "flex")
      .style("flex-direction", "column");

    const legendDiv = container
      .append("div")
      .classed("legend-container", true)
      .style("width", "300px")
      .style("margin-left", "10px");

    const groupedData = new Map();
    data.forEach((entry) => {
      const month = entry["Month"];
      if (!groupedData.has(month)) {
        groupedData.set(month, []);
      }
      groupedData.get(month).push(entry);
    });

    groupedData.forEach((monthData, month) => {
      const currsvg = chartsDiv
        .append("div")
        .style("margin-bottom", "20px")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      const g = currsvg
        .append("g")
        .attr("transform", `translate(${margin.left + 20},${margin.top + 20})`);

      const xExtent = d3.extent(monthData, (d) => d["Dimension 1"]);
      const yExtent = d3.extent(monthData, (d) => d["Dimension 2"]);

      const xScale = d3.scaleLinear().domain(xExtent).range([0, width]);
      const yScale = d3.scaleLinear().domain(yExtent).range([height, 0]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);


      const nodes = monthData.map((d, i) => ({
        id: i,
        x: d["Dimension 1"],
        y: d["Dimension 2"],
        sentiment: d["Sentiment"],
        subjectivity: d["Subjectivity"],
        rawtweet: d["RawTweet"],
        radius: 5,
      }));

      const simulation = d3
        .forceSimulation(nodes)
        .force("collision", d3.forceCollide().radius(5))
        .force("x", d3.forceX((d, i) => (i % Math.floor(width / 10)) * 10 * 0.5))
        .force("y", d3.forceY((d, i) => Math.floor(i / Math.floor(width / 10)) * 10))
        .on("tick", () => {
          node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        });

      const node = g
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("fill", (d) =>
          this.props.chart_type === "Sentiment"
            ? d3.scaleLinear().domain([-1, 0, 1]).range(["red", "#ECECEC", "green"])(d.sentiment)
            : d3.scaleLinear().domain([0, 1]).range(["#ECECEC", "#4467C4"])(d.subjectivity)
        )
        .attr("stroke", (d) =>
          selectedPoints.find((p) => p.id === d.id) ? "black" : "none"
        )
        .attr("stroke-width", 2) 
        .on("click", (event, d) => this.handlePointClick(d, event));

      currsvg
        .append("text")
        .attr("x", margin.left - 60)
        .attr("y", (height + 10) / 2)
        .text(month);
    });

    this.updateColors();
  };

  render() {
    const { selectedPoints } = this.state;
    return (
      <>
        <div className="container" style={{ display: "flex", gap: "10px", width: "400px" }}>
          <div className="charts-container" style={{ flex: 1 }} />
          <div className="legend-container" style={{ width: "300px" }} />
        </div>

        {/* Display selected tweets */}
        {selectedPoints.length > 0 && (
          <div className="selected-tweets">
            <ul style={{ listStyleType: "none"}}>
              {selectedPoints.map((point, index) => (
                <li key={index}>{point.rawtweet}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
}

export default Sensitive;
