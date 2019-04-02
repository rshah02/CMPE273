import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import Assignments from "../Assignments/Assignments";

class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      Files: []
    };
  }
  render() {
    return <div>hello</div>;
  }
}

export default withRouter(Files);
