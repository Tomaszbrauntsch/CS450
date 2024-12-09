import React, { Component } from "react";
import "./App.css";
import FileUpload from "./FileUpload";
import Sensitive from "./sensitivity-charting.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      state_chart_type: "Sentiment"
    };
  }

  set_data = (json_data) => {
    const slicedData = json_data.slice(0, 300);
    this.setState({ data: slicedData });
  };

  set_chart_type = (chart_type) => {
    this.setState({ state_chart_type: chart_type });
  };

  render() {
    const { data, state_chart_type } = this.state;
    return (
      <div>
        <FileUpload set_data={this.set_data} />
        <label htmlFor="chart_menu" style={{marginLeft: "10px"}}>Color By: </label>
        <select
          name="chart_menu"
          id="chart_menu"
          onChange={(e) => this.set_chart_type(e.target.value)}
        >
          <option value="Sentiment">Sentiment</option>
          <option value="Subjectivity">Subjectivity</option>
        </select>
        <div className="parent">
          {data.length > 0 && (
            <Sensitive json_data={data} chart_type={state_chart_type} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
