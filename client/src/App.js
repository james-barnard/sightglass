import './App.css';
import React, { Component } from 'react';
import { Button, Grid, Segment, Menu } from 'semantic-ui-react'
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

  setStepInfo = (step_id, step_info) => {
    this.setState({ selectedStepId: step_id, stepInfo: step_info })
  };

  setComponentInfo = (component_info) => {
    this.setState({ component_list_info: component_info})
  };

  setTestRun = (value, program_id) => {
    console.log(`App is setting test run to value:${value} program_id:${program_id}`);
    if (program_id === 0) {
       this.setState({testRunId: value, filter: false})
    } else {
      this.setState({testRunId: value, programId: program_id, filter: false})
    }
  };

  setProgram = (value) => {
    console.log(`App is setting program to ${value}`)
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
          reset={this.state.reset}
        />
      </Menu.Item>
    );
    } else {
      return (
      <Menu.Item as={Button} disabled>
        <LiveModeTimer
          handleUpdateTick={this.UpdateTick}
          reset={this.state.reset}
        />
      </Menu.Item>
    );
    }
  }

  renderTestRunInfo() {
    return (
      <Segment raised >
        <TestRunInfo
          testRunId={this.state.testRunId}
          tickCounter={this.state.tickCounter}
          passFinalStatus={this.handleFinalStatus}
        />
      </Segment>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    const sameProgram = nextState.programId !== this.state.programId
    const sameTestRun = nextState.testRunId !== this.state.testRunId
    return sameProgram || sameTestRun;
  }


  render() {
    console.log('App render');
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
                <Segment raised id='timelineSegment'>
                  <Timeline
                    programId={programId}
                    testRunId={testRunId}
                    handleStepSelect={this.setStepInfo}
                    tickCounter={this.state.tickCounter}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={1} id="branding">
                <p>N<br/>I<br/>T<br/>R<br/>O<br/>B<br/>R<br/>E<br/>W<br/> <br/>
                S<br/>I<br/>G<br/>H<br/>T<br/>G<br/>L<br/>A<br/>S<br/>S<br/></p>
              </Grid.Column>              
              <Grid.Column width={3}>
                <Segment raised>
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
                <Segment raised>
                  <ProgramInfo
                    programId={programId}
                    testRunId={testRunId}
                    tickCounter={this.state.tickCounter}
                  />
                </Segment>
                <Segment raised>
                  <StepInfo
                    selectedStepId={selectedStepId}
                    stepInfo={this.state.stepInfo}
                    tickCounter={this.state.tickCounter}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment raised>
                  <ComponentList
                    testRunId={testRunId}
                    selectedStepId={selectedStepId}
                    handleComponentInfo={this.setComponentInfo}
                    handleComponentSelect={this.setSelectedComponent}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={3}>
                <Segment raised id='machineSegment'>
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