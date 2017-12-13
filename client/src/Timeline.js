import React, { Component } from 'react';
import Client from './Client';

class Timeline extends Component {
  state = {
    step_statuses: []
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
    this.getInfo("step_statuses/26")
  };

  render() {
    const Timeline = this.state.step_statuses.map((step_status) => (
      <ul key={step_status.id}>
        <li>Step Id: {step_status.step_id}</li>
        <li>Name: Step Status Name</li>
        <li>Status: {step_status.status}</li>
      </ul>
    ));

    return(
      <div>
        <h1>This is the Timeline</h1>
          {Timeline}
      </div>
    );
  }

};
export default Timeline;