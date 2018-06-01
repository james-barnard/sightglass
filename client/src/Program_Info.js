import React, { Component } from 'react';
import Client from './Client';
import { Table } from 'semantic-ui-react'
class ProgramInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      program_info: "---",
      run_time: "---",
      program_time: "---",
      step_count: "---",
      current_step: "---",
      status: "---"
    }
  };

  getInfo = (resource) => {
    Client.search(resource, (program_info) => {
      this.setState({
        program_info: program_info
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    if ((this.props.testRunId !== nextProps.testRunId) || (this.props.tickCounter !== nextProps.tickCounter)) {
      nextProps.testRunId && this.getInfo(`program_info/${nextProps.testRunId}`)
    }
    if (nextProps.programId && nextProps.testRunId === null) {
      this.getInfo(`program_program_info/${nextProps.programId}`)
    }
    if ((nextProps.testRunId === null) && (nextProps.programId === null)) {
      this.setState({
        program_info: "---",
        run_time: "---",
        program_time: "---",
        step_count: "---",
        current_step: "---",
        status: "---"
      })
    }
  }

  render() {
    const info = this.state.program_info
    const ProgramInfo = (
      <Table compact>
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign='right'>Run Time:</Table.Cell>
            <Table.Cell>{info.run_time}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign='right'>Program Time:</Table.Cell>
            <Table.Cell>{info.program_time}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign='right'>Step Count:</Table.Cell>
            <Table.Cell>{info.step_count}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign='right'>Current Step:</Table.Cell>
            <Table.Cell>{info.current_step}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign='right'>Status:</Table.Cell>
            <Table.Cell>{info.status}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    return(
      <div>
        <h4>Program Info</h4>
          {ProgramInfo}
      </div>
    );
  }

};
export default ProgramInfo;