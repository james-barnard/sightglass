import React, { Component } from 'react'
import Client from './Client';
import { Dropdown } from 'semantic-ui-react'

class TestRunDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw_test_runs: []
    };
    this.getInfo("test_runs");
  };

  getInfo = (resource) => {
    console.log("TestRunDropdown getInfo")
    Client.search(resource, (result) => {
      this.setState({
        raw_test_runs: result
      });
    });
  };

  testRunClicked = (e, { value }) => {
    (value) && this.props.handleTestRunSelect(value)
  }

  componentWillReceiveProps(nextProps) {
      console.log(`this.props.programId for test run dropwdown: ${this.props.programId}`)    
      console.log(`nextProps.programId for test run dropwdown: ${nextProps.programId}`)
    if (nextProps.programId !== this.props.programId)
      nextProps.programId && this.getInfo(`program_test_runs/${nextProps.programId}`);
      
  }

  render() {
    const { raw_test_runs } = this.state
    const DropdownSearchSelection = (
      <Dropdown placeholder='Select Test Run' fluid search selection options={raw_test_runs} onChange={this.testRunClicked} />
    )

    return(
      <div>
        <h4>Completed Test Runs</h4>
        {DropdownSearchSelection}
      </div>
    )
  }
}
export default TestRunDropdown