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
      stepStatuses: this.defaults
    };
  };

  defaults = [["Test Run ID", "Select a test run", 0, 3000, null ]];

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
    var toolTips = document.getElementsByClassName("google-visualization-tooltip")
    for(var i=0; i<=toolTips.length; i++) {
      console.log(`there were ${toolTips.length} tooltips`);
      toolTips[i].remove()
      console.log(`there are now ${document.getElementsByClassName('google-visualization-tooltip').length} tooltips.`);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.removeTooltip
    if (this.props.testRunId !== nextProps.testRunId || this.props.tickCounter !== nextProps.tickCounter) {
      nextProps.testRunId && this.getInfo(`timeline/${nextProps.testRunId}`);
      this.setState({stepStatuses: this.defaults, stepInfo: []},
        this.props.handleStepSelect(null, this.state.stepInfo)
      )
    }
  }

  componentWillUnmount() {
    console.log('google chart unmounting')
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