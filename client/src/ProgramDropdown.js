import React, { Component } from 'react'
import Client from './Client';
import { Dropdown } from 'semantic-ui-react'

class ProgramDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [],
      value: null
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
    (value) && this.setState( {value: value},
      () => this.props.handleProgramSelect(value),
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.programId !== this.state.value) {
      this.setState({value: nextProps.programId})
    }
    if (nextProps.reset === true) {
      this.setState({value: null})
    }
  }

  render() {
    const { programs, value } = this.state
    const DropdownSearchSelection = (
      <Dropdown 
        placeholder='Select Program'
        fluid
        search
        selection
        options={programs}
        onChange={this.programClicked}
        value={value}
      />
    )

    return(
      <div>
        <h4>Program Select</h4>
        {DropdownSearchSelection}
      </div>
    )
  }
}
export default ProgramDropdown