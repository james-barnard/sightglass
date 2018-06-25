import "./App.css";
import React, { Component } from "react";
import { Image, Container } from "semantic-ui-react";
import all_grey from "./images/Skinny_Grey_with_pumps.png";
import nc_closed from "./images/NC_Closed2.png";
import nc_open from "./images/NC_Open.png";
import green_pump from "./images/green_pump.png";
import green_vacuum from "./images/green_vacuum.png";

class GraphicWindow extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.component_info !== nextProps.component_info) {
      console.log("component_info changing");
    }
    if (this.props.selectedComponent !== nextProps.selectedComponent)
      nextProps.selectedComponent &&
        console.log(
          `this.props.selectedcomponent is ${nextProps.selectedComponent}`
        );
  }

  whichPic = component => {
    let className = "component";
    if (this.props.selectedComponent === component.id) {
      className += " component-active";
    }
    if (component.state === "closed") {
      return (
        <Image
          src={nc_closed}
          key={component.id}
          id={"valve" + component.id}
          className={className}
        />
      );
    } else if (component.state === "open") {
      return (
        <Image
          src={nc_open}
          key={component.id}
          id={"valve" + component.id}
          className={className}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    const { components } = this.props;
    return (
      <div id="machine_box">
        <Container>
          <Image src={all_grey} id="machine" centered />
          {components.map(component => this.whichPic(component))}
        </Container>
      </div>
    );
  }
}
export default GraphicWindow;
