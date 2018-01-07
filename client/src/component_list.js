import React, { Component } from 'react';
import Client from './Client';
import { Table } from 'semantic-ui-react'

class ComponentList extends Component {
  state = {
    components: []
  };

  getComponentInfo = (resource, stepId) => {
    if (stepId !== null)
    Client.search(resource, (components) => {
      this.setState({
        components: components
      });
    });
  };

  componentDidMount(props) {
    console.log("ComponentsList Mounted")
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedStepId !== nextProps.selectedStepId) {
      this.getComponentInfo(`step/${nextProps.selectedStepId}/component_states`, nextProps.selectedStepId)
    }
    if (this.props.testRunId !== nextProps.testRunId) {
      this.setState({
        components: []
      })
    }
  }

  render() {

    const { selectedStepId } = this.props
    const componentList = this.state.components.map((component) => (
      <Table.Row key={component.id}>
        <Table.Cell>{component.id}</Table.Cell>
        <Table.Cell>{component.name}</Table.Cell>
        <Table.Cell>{component.state}</Table.Cell>
        <Table.Cell>{component.step_id}</Table.Cell>
      </Table.Row>
    ));

    return(
      <div>
        <h3>Component List</h3>
        <h4>The Selected Step Id is: {selectedStepId}</h4>
        <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Desired State</Table.HeaderCell>
              <Table.HeaderCell>Step Id</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {componentList}
          </Table.Body>
        </Table>
      </div>
    );
  }

};
export default ComponentList;