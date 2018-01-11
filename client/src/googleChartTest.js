import React, { Component } from 'react';
import Client from './Client';
import { Chart } from 'react-google-charts';

class GoogleChartTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      step_statuses: [["Test Run ID", "Select a test run", 0, 3000, "pretend this is a step_id" ]]
    };
  };

  componentDidMount() {
    this.setState({
      render: true
    })
  }

  getInfo = (resource) => {
    Client.search(resource, (step_statuses) => {
      this.setState({step_statuses: step_statuses})
    });
  };

  passStepId = (step_id) => {
    this.props.handleStepSelect(step_id);
    this.removeTooltip();
  };

  removeTooltip() {
    const tooltip = document.getElementsByClassName("google-visualization-tooltip").item(0);
    tooltip.parentNode.removeChild(tooltip);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.testRunId !== nextProps.testRunId) {
      console.log(`Old Props: ${this.props.testRunId}. Received New Props: TestRunId= ${nextProps.testRunId}`)
     nextProps.testRunId && this.getInfo(`timeline/${nextProps.testRunId}`)
    };
  };

  render() {
    if (!this.state.render)
      return null;
    const that = this;
    return (
      <div className={'my-pretty-chart-container'}>
        <h3> Google Chart </h3>
          <Chart
            chartType='Timeline'
            columns={[
              {type: 'string'},
              {type: 'string'},
              {type: 'number'},
              {type: 'number'},
              {role: 'tooltip', type: 'string'}
            ]}
            rows={this.state.step_statuses}
            allowEmptyRows={true}
            width="100%"
            chartPackages={['timeline']}
            chartEvents={[
              { eventName: 'select',
                callback(Chart) {
                    // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
                  const selected = Chart.chart.getSelection();
                  const cValue = Chart.dataTable.getValue(selected[0].row, 4)
                  that.passStepId(cValue);
                  console.log(`Selected: ${cValue}`);
                },
              }
            ]}
          />
      </div>
    );
  }
}
export default GoogleChartTest;