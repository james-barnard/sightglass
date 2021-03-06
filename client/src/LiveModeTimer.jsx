import React, { Component } from 'react';
import './App.css';

class LiveModeTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsLeft: 1,
      liveMode: false,
      tickCounter: 0
    }
  };

  handleClick = () => {
    if (this.state.liveMode){
      clearInterval(this.refreshTimer);
      this.setState({liveMode: false, secondsLeft: 1});
    } else {
      this.setState({liveMode: true})
      this.refreshTimer = setInterval(
        () => this.tick(),
        1000
      )
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset && this.state.liveMode) {
      this.handleClick();
    }
  }

  tick() {
    if (this.state.secondsLeft > 0) {
      this.setState((prevState) => ({
        secondsLeft: prevState.secondsLeft -1
      }))
    } else if (this.state.secondsLeft <= 0) {
      this.setState({secondsLeft: 1})
      this.increment()
    }
  }

  increment() {
    this.setState((prevState) => ({tickCounter: prevState.tickCounter +1}))
    console.log(`increment ${this.state.tickCounter}`)
    this.props.handleUpdateTick(this.state.tickCounter);
  }

  render() {
    let isActive = ''
    let LiveModeText = 'Click for Live Mode'
    if (this.state.liveMode === true){
      isActive = 'active'
      LiveModeText = 'Now In Live Mode'
    }

    return(
      <div onClick={this.handleClick} className={isActive}>
        <h4>{LiveModeText}</h4>
      </div>
    )
  }
}
export default LiveModeTimer;