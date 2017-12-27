import React, { Component } from 'react';
import Client from './Client';
import { List } from 'semantic-ui-react'


class TestRunInfo extends Component {
  state = {
    test_run: "test data"
  };
  
  getInfo = (id) => {
    Client.search(id, (test_run) => {
      this.setState({
        test_run: test_run
      });
    });
  };
  
  componentDidMount() {
    console.log("Test Run Mounted" )
    this.getInfo('test_run/26')
  };

  render() {
    const testRunInfo = (test_run) => {
      if (test_run !== undefined) {
        return(
          <List celled>
            <List.Item>
              <List.Content>Id: {test_run.id}</List.Content>
            </List.Item>
            <List.Item>
              <List.Content>Name: {test_run.name}</List.Content>
            </List.Item>
            <List.Item>
              <List.Content>Program Id: {test_run.program_id}</List.Content>
            </List.Item>
            <List.Item>
              <List.Content>Started At: {test_run.started_at}</List.Content>
            </List.Item>
            <List.Item>
              <List.Content>Completed At: {test_run.completed_at}</List.Content>
            </List.Item>
            <List.Item>
              <List.Content>Final Status: {test_run.status_final}</List.Content>
            </List.Item>
          </List>

        );
      } else {
          return(
          <p>No Test Run Data</p>
        );
      }
    };

    return(
      <div>
        <h3>Test Run Info</h3>
          {testRunInfo(this.state.test_run)}
      </div>
    );
  }
}
export default TestRunInfo;