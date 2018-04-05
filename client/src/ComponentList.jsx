import React, { Component } from 'react';
import Client from './Client';
import { Table } from 'semantic-ui-react'
import './App.css';

class ComponentList extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      components: this.defaults,
      activeRow: null
    }
  };

defaults = [{"id":1,"test_cell_id":1,"name":"Brew Vacuum"},
                      {"id":2,"test_cell_id":1,"name":"Brew In"},
                      {"id":3,"test_cell_id":1,"name":"Brew Out"},
                      {"id":4,"test_cell_id":1,"name":"Filter purge Out"},
                      {"id":5,"test_cell_id":1,"name":"Bright In"},
                      {"id":6,"test_cell_id":1,"name":"Bright Out"},
                      {"id":7,"test_cell_id":1,"name":"Decant"},
                      {"id":8,"test_cell_id":1,"name":"Filter H2O"},
                      {"id":9,"test_cell_id":1,"name":"Filter Backflush"},
                      {"id":10,"test_cell_id":1,"name":"Brew H2O"},
                      {"id":11,"test_cell_id":1,"name":"Brew N2"},
                      {"id":12,"test_cell_id":1,"name":"Process H2O"},
                      {"id":13,"test_cell_id":1,"name":"Condition N2"},
                      {"id":14,"test_cell_id":1,"name":"Burp"}];

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
      this.setState({ components: this.defaults, activeRow: null })
      this.props.handleComponentInfo(this.defaults)
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
        <Table small selectable>
          <Table.Header compact >
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