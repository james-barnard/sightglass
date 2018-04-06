import React, { Component } from 'react'
import Client from './Client';
import { Dropdown } from 'semantic-ui-react'

class TestRunDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw_test_runs: [],
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

  testRunClicked = (e, { value }) => {
    var program_id = this.getProgramId(value);
    this.setState({value: value, filter: false});
    console.log(`test run clicked: value:${value} program_id: ${program_id}`);
    (value) && this.props.handleTestRunSelect(value, ~~program_id);
  }

  getProgramId = (value) => {
    var test_run = this.state.raw_test_runs.find((element) => {
      return element.value === value
    })
    return test_run.program_id
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset === true) {
      this.setState({value: null}, this.getInfo("test_runs"))
      console.log(`TDD will receive props, not filtered`)
    }
    if (nextProps.filter === false) {
      console.log('TDD component will receive props, but filter is false')
      return undefined
    }
    if (nextProps.filter === true && nextProps.programId !== this.props.programId)
      nextProps.programId && this.getInfo(`program_test_runs/${nextProps.programId}`)
      console.log(`TDD will receive props, filtered on programid: ${nextProps.programId}, filter: ${nextProps.filter}`)
  }

  render() {
    const { raw_test_runs, value } = this.state
    const DropdownSearchSelection = (
      <Dropdown
        placeholder='Select Test Run'
        fluid
        search
        selection
        options={raw_test_runs}
        onChange={this.testRunClicked}
        value={value}
      />
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