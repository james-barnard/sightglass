import React, { Component } from 'react';
import Client from './Client';
import { List } from 'semantic-ui-react'
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
    this.getInfo("program_info/17")
  };

  render() {
    const info = this.state.program_info
    const ProgramInfo = (
      <List celled>
        <List.Item>
          <List.Content>Run Time: {info.run_time} </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>Program Time: {info.program_time}</List.Content>
        </List.Item>
        <List.Item>
          <List.Content>Step Count: {info.step_count}</List.Content>
        </List.Item>
        <List.Item>
          <List.Content>Current Step: {info.current_step}</List.Content>
        </List.Item>
        <List.Item>
          <List.Content>Status: {info.status}</List.Content>
        </List.Item>
      </List>
    );

    return(
      <div>
        <h3>Program Info</h3>
          {ProgramInfo}
      </div>
    );
  }

};
export default ProgramInfo;