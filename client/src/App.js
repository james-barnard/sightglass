import './App.css';
import React, { Component } from 'react';
import { Button, Grid, Segment, Menu, Container } from 'semantic-ui-react'
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
      tickCounter: 0,
      reset: false,
      filter: false,
      finalStatus: null
    }
  };

  stepInfoDefault = {
        pending_time: "",
        soaking_time: "",
        run_time: "",
        duration: "",
        description: "",
        status: ""
      };

  testValueChange = () => {
    this.setState({programId: 100})
  };

  setStepInfo = (step_id, step_info) => {
    this.setState({ selectedStepId: step_id, stepInfo: step_info })
  };

  setComponentInfo = (component_info) => {
    this.setState({ component_list_info: component_info})
  };

  setTestRun = (value, program_id) => {
    if (program_id === 0) {
       this.setState({testRunId: value, filter: false})
    } else {
      this.setState({testRunId: value, programId: program_id, filter: false})
    }
  };

  setProgram = (value) => {
    this.setState({ 
      programId: value,
      testRunId: null,
      selectedComponent: null,
      selectedStepId: null,
      filter: true
    })
  };

  setSelectedComponent = (rowIndex) => {
    this.setState({ selectedComponent: rowIndex })
  }

  handleFinalStatus = (finalStatus) => {
    this.setState({finalStatus: finalStatus})
  }

  UpdateTick = (counter) => {
    this.setState({ tickCounter: counter })
  }

  resetButton = () => {
    this.setState({
      testRunId: null,
      programId: null,
      selectedStepId: null,
      selectedComponent: null,
      stepInfo: this.stepInfoDefault,
      component_list_info: [],
      tickCounter: 0,
      reset: true,
      filter: false,
      finalStatus: null
    }, () => this.setState({reset: false})
    )
  }

  renderLiveModeTimer() {
    if (this.state.testRunId && (this.state.finalStatus !== "done")) {
    return (
      <Menu.Item as={Button}>
        <LiveModeTimer
          handleUpdateTick={this.UpdateTick}
        />
      </Menu.Item>
    );
    } else {
      return (
      <Menu.Item as={Button} disabled>
        <LiveModeTimer
          handleUpdateTick={this.UpdateTick}
        />
      </Menu.Item>
    );
    }
  }

  renderTestRunInfo() {
    return (
      <Segment>
        <TestRunInfo
          testRunId={this.state.testRunId}
          tickCounter={this.state.tickCounter}
          passFinalStatus={this.handleFinalStatus}
        />
      </Segment>
    );
  }


  render() {
    const { programId,
            testRunId,
            selectedStepId,
            component_list_info,
            selectedComponent,
            reset,
            filter
          } = this.state;
    return (
      <div className="App">
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Timeline
                  programId={programId}
                  testRunId={testRunId}
                  selectedStepId={selectedStepId}
                  handleStepSelect={this.setStepInfo}
                  tickCounter={this.state.tickCounter}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered stretched>
              <Grid.Column width={3}>
                <Segment>
                    <ProgramDropdown 
                      handleProgramSelect={this.setProgram}
                      testRunId={testRunId}
                      programId={programId}
                      reset={reset}
                    />
                    <TestRunDropdown 
                      handleTestRunSelect={this.setTestRun}
                      programId={programId}
                      reset={reset}
                      filter={filter}
                    />
                    <Button
                      content='Reset'
                      onClick={this.resetButton}
                    />
                  </Segment>
                  {this.renderLiveModeTimer()}
                  {this.renderTestRunInfo()}
              </Grid.Column>
              <Grid.Column width={3}>
                <Segment>
                  <ProgramInfo
                    programId={programId}
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
              <Grid.Column width={6}>
                <Segment>
                  <ComponentList
                    testRunId={testRunId}
                    selectedStepId={selectedStepId}
                    handleComponentInfo={this.setComponentInfo}
                    handleComponentSelect={this.setSelectedComponent}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={3}>
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
      </div>
    );
  }
}

export default App;