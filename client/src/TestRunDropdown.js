import React, { Component } from "react";
import Client from "./Client";
import { Dropdown } from "semantic-ui-react";

class TestRunDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw_test_runs: []
    };
    this.getInfo("test_runs");
  }

  getInfo = resource => {
    Client.search(resource, result => {
      this.setState({
        raw_test_runs: result
      });
    });
  };

  testRunClicked = (e, { value }) => {
    var program_id = this.getProgramId(value);
    this.setState({ value: value, filter: false });
    value && this.props.handleTestRunSelect(value, ~~program_id);
  };

  getProgramId = value => {
    var test_run = this.state.raw_test_runs.find(element => {
      return element.value === value;
    });
    return test_run.program_id;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset === true) {
      this.setState({ value: null }, this.getInfo("test_runs"));
    }
    if (nextProps.filter === false) {
      return undefined;
    }
    if (
      nextProps.filter === true &&
      nextProps.programId !== this.props.programId
    )
      nextProps.programId &&
        this.getInfo(`program_test_runs/${nextProps.programId}`);
  }

  render() {
    const { raw_test_runs, value } = this.state;
    const DropdownSearchSelection = (
      <Dropdown
        placeholder="Select Test Run"
        fluid
        search
        selection
        options={raw_test_runs}
        onChange={this.testRunClicked}
        value={value}
      />
    );

    return <div>{DropdownSearchSelection}</div>;
  }
}
export default TestRunDropdown;
