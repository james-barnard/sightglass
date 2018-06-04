import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import StepButton from './StepButton.jsx'

class StepInfo extends Component {
  stepInfoDefault = {
        pending_time: "",
        soaking_time: "",
        run_time: "",
        duration: "",
        description: "",
        status: ""
      };

  render() {
    const stepInfo = this.props.stepInfo ? this.props.stepInfo : this.stepInfoDefault
    const { sequenceNumber } = this.props
    return(
      <div>
        <h4>Step Info</h4>
        <StepButton
          handleClick={this.props.previousStepHandler}
          content={"Previous"}
        />
        <StepButton
          handleClick={this.props.nextStepHandler}
          content={"Next"}
        />
        <Table compact>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign='right'>Selected Step:</Table.Cell>
              <Table.Cell>{sequenceNumber}</Table.Cell>
            </Table.Row>
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
              <Table.Cell>{stepInfo.duration}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>Run Time:</Table.Cell>
              <Table.Cell>{stepInfo.run_time}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>Pending Time:</Table.Cell>
              <Table.Cell>{stepInfo.pending_time}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>Soaking Time:</Table.Cell>
              <Table.Cell>{stepInfo.soaking_time}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default StepInfo