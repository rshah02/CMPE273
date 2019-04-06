import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import AssignmentList from "../AssignmentList/AssignmentList";
class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      //Assignments: [],
      cid: this.props.match.params.id
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3001/users/courses/${this.state.cid}/assignments`)
      .then(response => {
        console.log("assignmentresponse:" + response.data);
        if (response) {
          this.setState({
            //Assignments: [...this.state.Assignments, ...response.data]
            Assignments: response.data
          });
        } else {
          this.props.history.push("/");
        }
      });
  }
  render() {
    let Assignments = [];
    Object.assign(Assignments, this.state.Assignments);
    console.log("assignmentObj" + Assignments);
    console.log("Assignmentid" + this.props.match.params.id);

    return (
      <div className="row assignmetnntop">
        {Assignments.map((Assignment, index) => {
          console.log(Assignment.assignmentId);
          return (
            <AssignmentList
              key={index}
              assignmentId={Assignment.assignmentId}
              assignmentName={Assignment.assignmentName}
              assignmentType={Assignment.assignmentType}
              points={Assignment.points}
              dueDate={Assignment.dueDate}
            />
          );
        })}
      </div>
    );
  }
}

export default withRouter(Assignments);
