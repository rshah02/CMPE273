import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class People extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      People: []
    };
  }
  render() {
    let details = this.state.People.map(person => {
      return (
        <tr>
          <td>{person.name}</td>
          <td>{""}</td>
          <td>{person.type}</td>
        </tr>
      );
    });
    return (
      <div className="col-lg-12">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Course Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {/*Display the Tbale row based on data recieved*/}
            {details}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(People);
