import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import AssignmentList from "../AssignmentList/AssignmentList";
import "./assignment.css";
class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      //Assignments: [],
      cid: this.props.match.params.id
    };
  }
  componentWillMount() {
    const Token = localStorage.getItem("jwtToken");
    axios
      .get(`${window.base_url}/users/courses/${this.state.cid}/assignments`, {
        headers: { Authorization: Token }
      })
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
    const isFaculty = true;
    return (
      <div className="row assignmentWraper">
        <div className="col-md-4 abutton">
          {isFaculty ? (
            <Link to={`/courses/${this.state.cid}/NewAssignment`}>
              <button className="btn btn-primary as-btn">
                Create Assignment
              </button>{" "}
            </Link>
          ) : null}
        </div>
        {Assignments.map((Assignment, index) => {
          console.log("assignment:" + Assignment._id);
          return (
            <AssignmentList
              key={index}
              cid={this.state.cid}
              assignmentId={Assignment._id}
              assignmentName={Assignment.assignmentName}
              assignmentType={Assignment.assignmentType}
              points={Assignment.points}
              dueDate={Assignment.dueDate}
              className="assignmentList"
            />
          );
        })}
      </div>
    );
  }
}

export default withRouter(Assignments);
