import React, { Component } from 'react';
import Client from './Client';
import { Table } from 'semantic-ui-react'
import './App.css';

class ComponentList extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      components: [],
      activeRow: null
    }
  };

  componentDidMount() {
    this.getComponentInfo('components/')
  }

  getComponentInfo = (resource, stepId) => {
    if (stepId !== null)
    Client.search(resource, (components) => {
      this.setState({
        components: components
      });
      this.props.handleComponentInfo(components);
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedStepId !== nextProps.selectedStepId) {
      this.getComponentInfo(`step/${nextProps.selectedStepId}/component_states`, nextProps.selectedStepId)
    }
    if (this.props.testRunId !== nextProps.testRunId) {
      this.getComponentInfo('components/')
    }
  }
  
  handleClick = (e) => {
    e.currentTarget.rowIndex && this.props.handleComponentSelect(e.currentTarget.rowIndex);
    this.setState({ activeRow: e.currentTarget.rowIndex })
  }

  componentRows = (component) => {
    let isActive = ''
    if (this.state.activeRow === component.id)
      isActive = 'active'
    return(
      <Table.Row key={component.id} onClick={this.handleClick} className={isActive} >
        <Table.Cell>{component.id}</Table.Cell>
        <Table.Cell>{component.name}</Table.Cell>
        <Table.Cell>{component.state}</Table.Cell>
        <Table.Cell>{component.step_id}</Table.Cell>
      </Table.Row>
    )
  };

  render() {
    return(
      <div>
        <h4>Component List</h4>
        <Table compact selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Desired State</Table.HeaderCell>
              <Table.HeaderCell>Step Id</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.state.components.map(component => this.componentRows(component)) }
          </Table.Body>
        </Table>
      </div>
    );
  }

};
export default ComponentList;