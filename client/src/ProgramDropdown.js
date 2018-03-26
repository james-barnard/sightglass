import React, { Component } from 'react'
import Client from './Client';
import { Dropdown } from 'semantic-ui-react'

class ProgramDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: []
    };
    this.getInfo("programs");
  };

  getInfo = (resource) => {
    Client.search(resource, (result) => {
      this.setState({
        programs: result
      });
    });
  };

  programClicked = (e, { value }) => {
    (value) && this.props.handleProgramSelect(value)
  }

  render() {
    const { programs } = this.state
    const DropdownSearchSelection = (
      <Dropdown placeholder='Select Program' fluid search selection options={programs} onChange={this.programClicked} />
    )

    return(
      <div>
        <h4>Programs</h4>
        {DropdownSearchSelection}
      </div>
    )
  }
}
export default ProgramDropdown