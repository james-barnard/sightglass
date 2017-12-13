import React, { Component } from 'react';
import Client from './Client';

class ProgramInfo extends Component {
  state = {
    program_info: "Program Information"
  };

  getInfo = (resource) => {
    Client.search(resource, (program_info) => {
      this.setState({
        program_info: program_info
      });
    });
  };

  componentDidMount() {
    console.log("Program Info Mounted")
    this.getInfo("program_info/26")
  };

  render() {
    const info = this.state.program_info
    const ProgramInfo = (
      <ul>
        <li>Run Time: {info.run_time}</li>
        <li>Program Time: {info.program_time}</li>
        <li>Step Count: {info.step_count}</li>
        <li>Current Step: {info.current_step}</li>
        <li>Status: {info.status}</li>
      </ul>
    );

    return(
      <div>
        <h1>This is the Program Info</h1>
          {ProgramInfo}
      </div>
    );
  }

};
export default ProgramInfo;