import React, { Component } from 'react';
import Client from './Client';

class ComponentList extends Component {
  state = {
    components: []
  };

  getInfo = (resource) => {
    Client.search(resource, (components) => {
      this.setState({
        components: components
      });
    });
  };

  componentDidMount() {
    console.log("ComponentsList Mounted")
    this.getInfo("components")
  };

  render() {
    const componentList = this.state.components.map((component) => (
      <ul key={component.id}>
        <li>Id: {component.id}</li>
        <li>Name: {component.name}</li>
        <li>Desired State: (open or closed)</li>
      </ul>
    ));

    return(
      <div>
        <h1>This is the Component List</h1>
          {componentList}
      </div>
    );
  }

};
export default ComponentList;