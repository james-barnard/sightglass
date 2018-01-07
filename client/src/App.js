import './App.css';
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import { Image } from 'semantic-ui-react'
import TestRunInfo from './test_run_info.js'
import ComponentList from './component_list.js'
import ProgramInfo from './Program_Info.js'
import TestRunDropdown from './TestRunDropdown.js'
import StepInfo from './StepInfo.js'
import GoogleChartTest from './googleChartTest.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testRunId: null,
      selectedStepId: null
    }
  };


  setStepId = (value) => {
    console.log(`Set Step Id: ${value}`)
    this.setState({ selectedStepId: value})
  };

  setTestRun = (value) => {
    console.log(`Set Test Run: ${value}`)
    this.setState({ testRunId: value })
  };

  render() {
    const { testRunId, selectedStepId } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="App-title">Welcome to Nitrobrew - Sightglass</h1>
        </header>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={3}>
              <TestRunDropdown
                handleTestRunSelect={this.setTestRun}
                />
              <TestRunInfo
                testRunId={testRunId}
              />
              <ProgramInfo 
                testRunId={testRunId}
              />
              <StepInfo
                selectedStepId={selectedStepId}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <ComponentList
                testRunId={testRunId}
                selectedStepId={selectedStepId}
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <Image 
                src='https://placekitten.com/500/640'
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={13}>
              <GoogleChartTest
                testRunId={testRunId}
                selectedStepId={selectedStepId}
                handleStepSelect={this.setStepId}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;