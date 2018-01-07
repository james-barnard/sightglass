import React, { Component } from 'react'
import Client from './Client';
import { Table } from 'semantic-ui-react';

class StepInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepInfo: [],
      stepStatusInfo: []
    }
  }

  getStepInfo = (resource) => {
    Client.search(resource, (result) => {
      this.setState({
        stepInfo: result
      });
    });
  };

  getStepStatusInfo = resource => {
    Client.search(resource, (result) => {
      this.setState({
        stepStatusInfo: result
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.testRunId !== nextProps.testRunId) { 
      nextProps.selectedStepId && this.getStepInfo(`step/${nextProps.selectedStepId}`)
    };
  };

  render() {
    const { selectedStepId } = this.props
    const { stepInfo } = this.state
    return(
      <div>
        <h3>Step Info</h3>
        <h4>The Selected Step Id is: {selectedStepId}</h4>
        <Table compact>
          {/*   commented out until there are pending components <Table.Row>
            <Table.Cell textAlign='right'>Pending Time:</Table.Cell>
            <Table.Cell>(pending time)</Table.Cell>
          </Table.Row>*/}
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign='right'>Soaking Time:</Table.Cell>
              <Table.Cell>(soaking time)</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>Programmed Duration:</Table.Cell>
              <Table.Cell>{stepInfo.duration}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>Run Time:</Table.Cell>
              <Table.Cell>(run time)</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>Step Name</Table.Cell>
              <Table.Cell>(step name)</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign='right'>Step Status:</Table.Cell>
              <Table.Cell>(step status)</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }


}

export default StepInfo