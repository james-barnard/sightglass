import './App.css';
import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react'
import TestRunInfo from './TestRunInfo.jsx'
import ComponentList from './ComponentList.jsx'
import ProgramInfo from './Program_Info.js'
import TestRunDropdown from './TestRunDropdown.js'
import StepInfo from './StepInfo.js'
import Timeline from './Timeline.jsx'
import GraphicWindow from './GraphicWindow.jsx'
import LiveModeTimer from './LiveModeTimer.jsx'
import ProgramDropdown from './ProgramDropdown.js'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testRunId: null,
      programId: null,
      selectedStepId: null,
      selectedComponent: null,
      stepInfo: this.stepInfoDefault,
      component_list_info: [],
      tickCounter: 0
    }
  };

  stepInfoDefault = {
        pending_time: 0,
        soaking_time: 0,
        run_time: 0,
        duration: 0,
        description: 0,
        status: ""
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

  setProgram = (value) => {
    console.log(`Set Program: ${value}`)
    this.setState({ 
      programId: value,
      testRunId: null,
      selectedComponent: null,
      selectedStepId: null
    })
  };

  setSelectedComponent = (rowIndex) => {
    console.log(`setSelectedComponent: ${rowIndex}`)
    this.setState({ selectedComponent: rowIndex })
  }

  UpdateTick = (counter) => {
    this.setState({ tickCounter: counter })
  }

  render() {
    const { programId, testRunId, selectedStepId, component_list_info, selectedComponent } = this.state;
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
                  <Timeline
                    testRunId={testRunId}
                    selectedStepId={selectedStepId}
                    handleStepSelect={this.setStepInfo}
                    tickCounter={this.state.tickCounter}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}>
                  <Segment>
                    <ProgramDropdown handleProgramSelect={this.setProgram} />
                    <TestRunDropdown 
                      handleTestRunSelect={this.setTestRun}
                      programId={programId}
                    />
                  </Segment>
                  <Segment>
                    <LiveModeTimer
                      handleUpdateTick={this.UpdateTick}
                    />
                  </Segment>
                  <Segment>
                    <TestRunInfo
                      testRunId={testRunId}
                      tickCounter={this.state.tickCounter}
                    />
                  </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                <Segment>
                  <ProgramInfo
                    testRunId={testRunId}
                    tickCounter={this.state.tickCounter}
                  />
                </Segment>
                <Segment>
                  <StepInfo
                    selectedStepId={selectedStepId}
                    stepInfo={this.state.stepInfo}
                    tickCounter={this.state.tickCounter}
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
                    testRunId={testRunId}
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