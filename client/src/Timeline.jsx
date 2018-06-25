import React, { Component } from "react";
import Client from "./Client";
import { Chart } from "react-google-charts";
import "./App.css";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      stepInfo: [],
      steps: this.defaults
    };
  }

  //defaults = [["Test Run ID", "Select a test run", 0, 3000, null ]];

  getInfo = resource => {
    Client.search(resource, result => {
      this.processArray(result);
    });
  };

  passSelectedStep = stepIndex => {
    if (stepIndex !== null) {
      this.props.handleStepSelect(stepIndex);
    }
  };

  //This is to prevent unnecessary re-renders in case we want to keep the border around selected steps.
  /*shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.steps == this.props.steps) {
      return false
    } else {
      return true
    }
  }*/

  render() {
    const that = this;
    if (this.props.steps === null) {
      return null;
    } else {
      return (
        <Chart
          chartType="Timeline"
          columns={[
            { type: "string", id: "testRunId" },
            { type: "string", id: "label" },
            { type: "number", id: "startTime" },
            { type: "number", id: "endTime" },
            { role: "tooltip", type: "string" },
            { role: "extra", type: "string" },
            { role: "sequenceNumber", type: "number" }
          ]}
          rows={this.props.steps}
          allowEmptyRows={true}
          options={{
            timeline: { showRowLabels: false },
            tooltip: { trigger: false }
          }}
          width="100%"
          height="7em"
          chartPackages={["timeline"]}
          chartEvents={[
            {
              eventName: "select",
              callback(Chart) {
                // Returns Chart so you can access props and the ChartWrapper object from chart.wrapper
                const selected = Chart.chart.getSelection();
                that.passSelectedStep(selected[0].row);
              }
            }
          ]}
        />
      );
    }
  }
}
export default Timeline;
