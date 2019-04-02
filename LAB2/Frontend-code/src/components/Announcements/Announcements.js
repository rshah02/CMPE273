import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class Announcements extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      Assignments: []
    };
  }
  render() {
    return <div>hello</div>;
  }
}

export default withRouter(Announcements);
