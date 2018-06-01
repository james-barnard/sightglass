import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class StepButton extends Component {

  handleClick = (e) => {
    this.props.handleClick();
  }

  render() {
    return(
      <Button
        onClick={this.handleClick}
        floated={this.props.floated}
        content={this.props.content}
      />
    )
  }
}
export default StepButton;