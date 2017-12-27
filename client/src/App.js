import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import './App.css';
import TestRunInfo from './test_run_info.js'
import ComponentList from './component_list.js'
import ProgramInfo from './Program_Info.js'
import Timeline from './Timeline.js'
import { Image } from 'semantic-ui-react'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testRunId: 26,
      selectedStepId: 64
    }
  }


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
              <TestRunInfo testRunId={testRunId} />
              <ProgramInfo testRunId={testRunId} />
            </Grid.Column>
            <Grid.Column width={4}>
              <ComponentList
                testRunId={testRunId}
                selectedStepId={selectedStepId}
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <Image src='https://placekitten.com/250/400' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={13}>
              <Timeline
                testRunId={testRunId}
                selectedStepId={selectedStepId}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;