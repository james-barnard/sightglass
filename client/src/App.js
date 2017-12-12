import React, { Component } from 'react';
import './App.css';
import TestRunInfo from './test_run_info.js'
import ComponentList from './component_list.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to Nitrobrew - Sightglass</h1>
        </header>
        <TestRunInfo />
        <ComponentList />
      </div>
    );
  }
}

export default App;
