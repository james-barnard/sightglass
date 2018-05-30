import React, { Component } from 'react';
import Client from './Client';
import { Chart } from 'react-google-charts';
import './App.css';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      stepInfo: [],
      steps: this.defaults
    };
  };

  defaults = [["Test Run ID", "Select a test run", 0, 3000, null ]];

  getInfo = (resource) => {
    Client.search(resource, (result) => {
      this.processArray(result);
    });
  }

  processArray = (steps) => {
    console.log('process array');
    console.log(steps);
    const step_info = steps.map(a => a.splice(5, 1)[0]);
    this.setState( {steps: steps, stepInfo: step_info} );
  }

  passStepInfo = (step_id, step_info) => {
    if (step_id) {
      this.props.handleStepSelect(step_id, step_info);
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log(this.props)
    console.log(nextProps)
    if (this.props.testRunId !== nextProps.testRunId) {
      nextProps.testRunId && this.getInfo(`timeline/${nextProps.testRunId}`);
      this.setState({steps: this.defaults, stepInfo: []},
        this.props.handleStepSelect(null, this.state.stepInfo)
      )
    }
    if (this.props.tickCounter !== nextProps.tickCounter) {
      nextProps.testRunId && this.getInfo(`timeline/${nextProps.testRunId}`);
    }

    if ((this.props.programId !== nextProps.programId) && (nextProps.testRunId === null)) {
      this.props.programId && this.getInfo(`program/timeline/${nextProps.programId}`)
    }
    if (nextProps.programId === null) {
      this.setState({steps: this.defaults})
    }
  }

  render() {
    const that = this;
    console.log('timeline render');
    return (
      <Chart
        chartType='Timeline'
        columns={[
          {type: 'string', id: 'testRunId'},
          {type: 'string', id: 'label'},
          {type: 'number', id: 'startTime'},
          {type: 'number', id: 'endTime'},
          {role: 'tooltip', type: 'string'}
        ]}
        rows={this.state.steps}
        allowEmptyRows={true}
        options={{
          timeline: {showRowLabels: false},
          tooltip: {trigger: false}
        }}
        width="100%"
        height="7em"
        chartPackages={['timeline']}
        chartEvents={[
          { eventName: 'select',
            callback(Chart) {
                // Returns Chart so you can access props and the ChartWrapper object from chart.wrapper
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
export default Timeline;