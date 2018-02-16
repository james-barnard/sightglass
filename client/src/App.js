import './App.css';
import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react'
import TestRunInfo from './test_run_info.js'
import ComponentList from './component_list.js'
import ProgramInfo from './Program_Info.js'
import TestRunDropdown from './TestRunDropdown.js'
import StepInfo from './StepInfo.js'
import GoogleChartTest from './googleChartTest.js'
import GraphicWindow from './graphic-window.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testRunId: null,
      selectedStepId: null,
      selectedComponent: null,
      stepInfo: {
        pending_time: 0,
        soaking_time: 0,
        run_time: 0,
        duration: 0,
        description: 0,
        status: 0
      },
      component_list_info: []
    }
  };


  setStepInfo = (step_id, step_info) => {
    console.log(`Set Step Id: ${step_id}, Step Info: ${step_info.description}`)
    this.setState({ selectedStepId: step_id, stepInfo: step_info })
  };

  setComponentInfo = (component_info) => {
    this.setState({ component_list_info: component_info})
  };

  setTestRun = (value) => {
    console.log(`Set Test Run: ${value}`)
    this.setState({ testRunId: value })
  };

  setSelectedComponent = (rowIndex) => {
    console.log(`setSelectedComponent: ${rowIndex}`)
    this.setState({ selectedComponent: rowIndex })
  }

  render() {
    const { testRunId, selectedStepId, component_list_info, selectedComponent } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="App-title">Welcome to Nitrobrew - Sightglass</h1>
        </header>
        <Segment>
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <Segment>
              <GoogleChartTest
                testRunId={testRunId}
                selectedStepId={selectedStepId}
                handleStepSelect={this.setStepInfo}
              />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
                <Segment>
                  <TestRunDropdown handleTestRunSelect={this.setTestRun} />
                </Segment>
                <Segment>
                  <TestRunInfo testRunId={testRunId} />
                </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
                <Segment>  
                  <ProgramInfo testRunId={testRunId} />
                </Segment>
                <Segment>  
                  <StepInfo
                      selectedStepId={selectedStepId}
                      stepInfo={this.state.stepInfo}
                    />
                </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>
              <ComponentList
                testRunId={testRunId}
                selectedStepId={selectedStepId}
                handleComponentInfo={this.setComponentInfo}
                handleComponentSelect={this.setSelectedComponent}
              />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <GraphicWindow 
                components={component_list_info}
                selectedComponent={selectedComponent}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Segment>
      </div>
    );
  }
}

export default App;