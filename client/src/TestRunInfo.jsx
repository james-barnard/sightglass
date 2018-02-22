import React, { Component } from 'react';
import Client from './Client';
import { Table } from 'semantic-ui-react'
import './App.css';

class TestRunInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test_run: "test data"
    }
  };
  
  getInfo = (id) => {
    Client.search(id, (test_run) => {
      this.setState({
        test_run: test_run
      });
    });
  };
  
  componentWillReceiveProps(nextProps) {
    if (this.props.testRunId !== nextProps.testRunId || this.props.tickCounter !== nextProps.tickCounter) {
      nextProps.testRunId && this.getInfo(`test_run/${nextProps.testRunId}`)
    }
  }

  render() {
    const testRunInfo = (test_run) => {
      if (test_run !== undefined) {
        return(
          <Table compact>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign='right'>Id:</Table.Cell>
                <Table.Cell>{test_run.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign='right'>Name:</Table.Cell>
                <Table.Cell>{test_run.name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign='right'>Program Id:</Table.Cell>
                <Table.Cell>{test_run.program_id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign='right'>Started At:</Table.Cell>
                <Table.Cell>{test_run.started_at}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign='right'>Completed At:</Table.Cell>
                <Table.Cell>{test_run.completed_at}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign='right'>Final Status:</Table.Cell>
                <Table.Cell>{test_run.status_final}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

        );
      } else {
          return(
          <p>No Test Run Data</p>
        );
      }
    };

    return(
      <div>
        <h4>Test Run Info</h4>
          {testRunInfo(this.state.test_run)}
      </div>
    );
  }
}
export default TestRunInfo;