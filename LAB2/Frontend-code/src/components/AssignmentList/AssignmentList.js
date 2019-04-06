import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./AssignmentList.css";
export class AssignmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dept: "",
      name: "",
      term: "",
      num: ""
    };
  }

  render() {
    return (
      <div className="col-lg-12">
        <div id="list">
          <Link to={`/courses/Announcements`} className="cardlink">
            <h2>{this.props.assignmentName}</h2>
          </Link>

          <ul>
            <li>
              {" "}
              <label>Points:</label>
              {this.props.points}
              {" | "}{" "}
            </li>
            <li>
              <label>DueDate:</label>
              {this.props.dueDate}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AssignmentList;
