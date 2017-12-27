import React, { Component } from 'react';
import Client from './Client';
import { Table } from 'semantic-ui-react'

class ComponentList extends Component {
  state = {
    components: []
  };

  getComponentInfo = (resource) => {
    Client.search(resource, (components) => {
      this.setState({
        components: components
      });
    });
  };

  componentDidMount() {
    console.log("ComponentsList Mounted")
    this.getComponentInfo("step/2/component_states")
  };

  render() {
    const componentList = this.state.components.map((component) => (
      <Table.Row key={component.id}>
        <Table.Cell>{component.id}</Table.Cell>
        <Table.Cell>{component.name}</Table.Cell>
        <Table.Cell>{component.state}</Table.Cell>
      </Table.Row>
    ));

    return(
      <div>
        <h3>Component List</h3>
        <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Desired State</Table.HeaderCell>
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