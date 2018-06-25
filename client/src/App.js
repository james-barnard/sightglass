import "./App.css";
import React, { Component } from "react";
import { Button, Grid, Segment, Menu } from "semantic-ui-react";
import Client from "./Client";
import TestRunInfo from "./TestRunInfo.jsx";
import ComponentList from "./ComponentList.jsx";
import ProgramInfo from "./Program_Info.js";
import TestRunDropdown from "./TestRunDropdown.js";
import StepInfo from "./StepInfo.js";
import Timeline from "./Timeline.jsx";
import GraphicWindow from "./GraphicWindow.jsx";
import LiveModeTimer from "./LiveModeTimer.jsx";
import ProgramDropdown from "./ProgramDropdown.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testRunId: null,
      programId: null,
      steps: null,
      selectedStepIndex: null,
      selectedComponent: null,
      component_list_info: [],
      tickCounter: 0,
      reset: false,
      filter: false,
      finalStatus: null
    };
  }

  getTimeline = resource => {
    Client.search(resource, result => {
      this.setState({ steps: result });
    });
  };

  setSelectedStep = stepsIndex => {
    this.setState({ selectedStepIndex: stepsIndex });
  };

  incrementStep = () => {
    this.setState(prevState => {
      var maxIndex = prevState.steps.length - 1;
      var checkIndex = prevState.selectedStepIndex + 1;
      var newIndex = checkIndex <= maxIndex ? checkIndex : maxIndex;
      return { selectedStepIndex: newIndex };
    });
  };

  decrementStep = () => {
    this.setState(prevState => {
      var checkIndex = prevState.selectedStepIndex - 1;
      var newIndex = checkIndex >= 0 ? checkIndex : 0;
      return { selectedStepIndex: newIndex };
    });
  };

  getStepInfo = () => {
    if (this.state.steps && this.state.selectedStepIndex !== null) {
      return this.state.steps[this.state.selectedStepIndex][5];
    } else {
      return null;
    }
  };

  getStepId = () => {
    if (this.state.steps && this.state.selectedStepIndex !== null) {
      return this.state.steps[this.state.selectedStepIndex][4];
    } else {
      return null;
    }
  };

  getSequenceNumber = () => {
    if (this.state.steps && this.state.selectedStepIndex !== null) {
      return this.state.steps[this.state.selectedStepIndex][6];
    } else {
      return null;
    }
  };

  setComponentInfo = component_info => {
    this.setState({ component_list_info: component_info });
  };

  setTestRun = (value, program_id) => {
    this.getTimeline(`timeline/${value}`);
    if (program_id === 0) {
      this.setState({ testRunId: value, filter: false });
    } else {
      this.setState({ testRunId: value, programId: program_id, filter: false });
    }
  };

  setProgram = value => {
    this.getTimeline(`program/timeline/${value}`);
    this.setState({
      programId: value,
      testRunId: null,
      selectedComponent: null,
      selectedStepIndex: null,
      filter: true
    });
  };

  setSelectedComponent = rowIndex => {
    this.setState({ selectedComponent: rowIndex });
  };

  handleFinalStatus = finalStatus => {
    this.setState({ finalStatus: finalStatus });
  };

  UpdateTick = counter => {
    this.getTimeline(`timeline/${this.state.testRunId}`);
    this.setState({ tickCounter: counter });
  };

  resetButton = () => {
    this.setState(
      {
        testRunId: null,
        programId: null,
        selectedStepIndex: null,
        selectedComponent: null,
        stepInfo: this.stepInfoDefault,
        component_list_info: [],
        tickCounter: 0,
        reset: true,
        filter: false,
        finalStatus: null,
        steps: null
      },
      () => this.setState({ reset: false })
    );
  };

  renderLiveModeTimer() {
    if (this.state.testRunId && this.state.finalStatus !== "done") {
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
      <Segment raised>
        <TestRunInfo
          testRunId={this.state.testRunId}
          tickCounter={this.state.tickCounter}
          passFinalStatus={this.handleFinalStatus}
        />
      </Segment>
    );
  }

  render() {
    const {
      programId,
      testRunId,
      steps,
      selectedStepIndex,
      component_list_info,
      selectedComponent,
      reset,
      filter
    } = this.state;
    var selectedStepId = this.getStepId();
    var sequenceNumber = this.getSequenceNumber();
    var stepInfo = this.getStepInfo();
    return (
      <div className="App">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment raised id="timelineSegment">
                <Timeline
                  steps={this.state.steps}
                  handleStepSelect={this.setSelectedStep}
                  selectedStepId={selectedStepId}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} id="branding">
              <p>
                N<br />I<br />T<br />R<br />O<br />B<br />R<br />E<br />W<br />{" "}
                <br />
                S<br />I<br />G<br />H<br />T<br />G<br />L<br />A<br />S<br />S<br />
              </p>
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
                <Button content="Reset" onClick={this.resetButton} />
              </Segment>
              {this.renderLiveModeTimer()}
              {this.renderTestRunInfo()}
            </Grid.Column>
            <Grid.Column width={3}>
              <Segment raised>
                <StepInfo
                  previousStepHandler={this.decrementStep}
                  nextStepHandler={this.incrementStep}
                  sequenceNumber={sequenceNumber}
                  stepInfo={stepInfo}
                  tickCounter={this.state.tickCounter}
                />
              </Segment>
              <Segment raised>
                <ProgramInfo
                  programId={programId}
                  testRunId={testRunId}
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
              <Segment raised id="machineSegment">
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
