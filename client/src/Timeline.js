import React, { Component } from 'react';
import Client from './Client';
import { Menu, Label } from 'semantic-ui-react'

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step_statuses: [],
      activeItem: ""
    }
  };

  getInfo = (resource) => {
    Client.search(resource, (step_statuses) => {
      this.setState({
        step_statuses: step_statuses
      });
    });
  };

  componentDidMount() {
    console.log("Timeline Mounted")
    this.getInfo("timeline/26")
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    console.log( "activeItem is  " + this.state.activeItem )
  };

  render() {
    const { step_statuses, activeItem } = this.state
    const TimelineItems = step_statuses.map((step_status) => (
      <Menu.Item
        key = {step_status.id}
        name = {step_status.id.toString()}
        active={activeItem === step_status.id.toString()}
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