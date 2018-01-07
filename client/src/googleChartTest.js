import React, { Component } from 'react';
import Client from './Client';
import { Chart } from 'react-google-charts';

class GoogleChartTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step_statuses: []
    };
  };

  getInfo = (resource) => {
    Client.search(resource, (step_statuses) => {
      step_statuses.forEach(function(step_status) {
      step_status[2] = new Date(step_status[2]*1000)
      step_status[3] = new Date(step_status[3]*1000)
      })
      this.setState({step_statuses: step_statuses})
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.testRunId !== nextProps.testRunId) {
      console.log(`Old Props: ${this.props.testRunId}. Received New Props: TestRunId= ${nextProps.testRunId}`)
     nextProps.testRunId && this.getInfo(`timeline/${nextProps.testRunId}`)
    };
  };

  render() {
    const { step_statuses } = this.state
    return (
      <div className={'my-pretty-chart-container'}>
        <h3> Google Chart </h3>
          <Chart
            chartType='Timeline'
            columns={[
              {id: 'Test Run Id', type: 'string'},
              {id: 'Description', type: 'string'},
              {id: 'Start', type: 'date'},
              {id: 'End', type: 'date'},
              {id: 'Tooltip', role: 'tooltip', type: 'string'}
            ]}
            rows={step_statuses}
            allowEmptyRows={true}
            width="100%"
            chartPackages={['timeline']}
            options={this.state.options}
          />
      </div>
    );
  }
}
export default GoogleChartTest;