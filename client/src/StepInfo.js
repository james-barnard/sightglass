import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class StepInfo extends Component {

  render() {
    const { stepInfo, selectedStepId } = this.props
    return(
      <div>
        <h4>Step Info</h4>
        <p>The Selected Step Id is: {selectedStepId}</p>
        <Table compact>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign='right'>Step Name</Table.Cell>
              <Table.Cell>{stepInfo.description}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>Step Status:</Table.Cell>
              <Table.Cell>{stepInfo.status}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>Programmed Duration:</Table.Cell>
              <Table.Cell>{stepInfo.duration} seconds</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>Run Time:</Table.Cell>
              <Table.Cell>{stepInfo.run_time} seconds</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>Pending Time:</Table.Cell>
              <Table.Cell>{stepInfo.pending_time} seconds</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>Soaking Time:</Table.Cell>
              <Table.Cell>{stepInfo.soaking_time} seconds</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default StepInfo