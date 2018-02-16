import React, { Component } from 'react';
import Client from './Client';
import { Chart } from 'react-google-charts';
import './App.css';

class GoogleChartTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      stepInfo: [],
      stepStatuses: [["Test Run ID", "Select a test run", 0, 3000, null ]]
    };
  };

  componentDidMount() {
    this.setState({
      render: true
    })
  }

  getInfo = (resource) => {
    Client.search(resource, (result) => {
      this.processArray(result);
    });
  }

  processArray = (steps) => {
    const step_info = steps.map(a => a.splice(5, 1)[0]);
    this.setState( {stepStatuses: steps, stepInfo: step_info});
  }

  passStepInfo = (step_id, step_info) => {
    if (step_id) {
      this.removeTooltip();
      this.props.handleStepSelect(step_id, step_info);
    };
  }

  removeTooltip() {
    const tooltip = document.getElementsByClassName("google-visualization-tooltip").item(0);
    tooltip.parentNode.removeChild(tooltip);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.testRunId !== nextProps.testRunId) {
      console.log(`Old Props: ${this.props.testRunId}. Received New Props: TestRunId= ${nextProps.testRunId}`);
      nextProps.testRunId && this.getInfo(`timeline/${nextProps.testRunId}`);
    };
  }

  render() {
    if (!this.state.render)
      return null;
    const that = this;
    return (
      <Chart
        chartType='Timeline'
        columns={[
          {type: 'string'},
          {type: 'string'},
          {type: 'number'},
          {type: 'number'},
          {role: 'tooltip', type: 'string'}
        ]}
        rows={this.state.stepStatuses}
        allowEmptyRows={true}
        width="100%"
        height="5 em"
        chartPackages={['timeline']}
        chartEvents={[
          { eventName: 'select',
            callback(Chart) {
                // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
              const selected = Chart.chart.getSelection();
              const cValue = Chart.dataTable.getValue(selected[0].row, 4)
              const stepInfo = that.state.stepInfo[selected[0].row]
              that.passStepInfo(cValue, stepInfo);
              console.log(`Selected: ${cValue}`);
            },
          }
        ]}
      />
    );
  }
}
export default GoogleChartTest;