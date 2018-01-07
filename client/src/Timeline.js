import React, { Component } from 'react';
import Client from './Client';
import { Menu, Label } from 'semantic-ui-react'

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step_statuses: [],
    }
  };

  getInfo = (resource) => {
    Client.search(resource, (step_statuses) => {
      this.setState({
        step_statuses: step_statuses
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.testRunId !== nextProps.testRunId) { 
     nextProps.testRunId && this.getInfo(`timeline/${nextProps.testRunId}`)
    }
  }

  componentDidMount() {
    console.log("Timeline Mounted")
  };

  handleItemClick = (e, { name }) => {
    const nextSelected = name
    this.props.handleStepSelect(nextSelected);
    console.log( "Selected Step Id " + nextSelected )
  };

  render() {
    const { step_statuses } = this.state
    const { selectedStepId } = this.props
    const TimelineItems = step_statuses.map((step_status) => (
      <Menu.Item
        key = {step_status.id}
        name = {step_status.step_id.toString()}
        active={selectedStepId === step_status.step_id.toString()}
        onClick={this.handleItemClick}
      >
      <Label floating>{step_status.step_id}</Label>
        {step_status.status}
      </Menu.Item>
    ));

    return(
      <div>
        <h3>Timeline</h3>
        <Menu>
          {TimelineItems}
        </Menu>
      </div>
    );
  }

};
export default Timeline;