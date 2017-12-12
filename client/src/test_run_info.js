import React, { Component } from 'react';
import Client from './Client';

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
    console.log("Test Run Mounted")
    this.getInfo('test_runs/1')
  };

  render() {
    const testRunInfo = (test_run) => {
      if (test_run !== undefined) {
        return(
          <ul>
            <li>Id: {test_run.id}</li>
            <li>Name: {test_run.name}</li>
            <li>Program Id: {test_run.program_id}</li>
            <li>Started At: {test_run.started_at}</li>
            <li>Completed At: {test_run.completed_at}</li>
            <li>Final Status: {test_run.status_final}</li>
          </ul>

        );
      } else {
          return(
          <p>No Test Run Data</p>
        );
      }
    };

    return(
      <div>
        <h1>This is the Test Run Info</h1>
          {testRunInfo(this.state.test_run)}
      </div>
    );
  }
}
export default TestRunInfo;