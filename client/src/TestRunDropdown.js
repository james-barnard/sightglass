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
    Client.search(resource, (result) => {
      this.setState({
        raw_test_runs: result
      });
    });
  };

  componentDidMount() {
    console.log("TestRunDropdown Mounted")
  };

  testRunClicked = (e, { value }) => {
    (value) && this.props.handleTestRunSelect(value)
  }

  render() {
    const that = this;
    const { raw_test_runs } = this.state
    const DropdownSearchSelection = (
      <Dropdown placeholder='Select Test Run' fluid selection options={raw_test_runs} onChange={that.testRunClicked} />
    )

    return(
      <div>
        <h3>DropDown for Test Runs </h3>
        {DropdownSearchSelection}
      </div>
    )
  }
}
export default TestRunDropdown