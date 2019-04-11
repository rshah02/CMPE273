import React, { Component } from "react";

import axios from "axios";
import "./courseInfo.css";

export class CourseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cid: this.props.match.params.id,
      details: "",
      action: "",
      status: ""
    };
    this.enrollHandler = this.enrollHandler.bind(this);
    this.waitlistHandler = this.waitlistHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.enroll = this.enroll.bind(this);
  }

  enrollHandler() {
    this.setState({
      action: "enroll"
    });
  }
  waitlistHandler() {
    this.setState({
      action: "waitlist"
    });
  }
  dropHandler() {
    this.setState({
      action: "drop"
    });
  }

  submitHandler = e => {
    e.preventDefault();
    const data = { action: this.state.action };
    axios
      .post(`http://localhost:3001/course/${this.state.cid}/home`, data)
      .then(response => {
        if (response.data.message === "success") {
          alert("Action completed.");
          this.props.history.index = 0;
          this.props.history.push("/course");
        }
      });
  };
  enroll = e => {
    const data = { courseId: this.state.cid };
    e.preventDefault();
    axios
      .post(`http://localhost:3001/enrollment`, data)
      .then(res => {
        console.log(res);
        alert("successfully enrolled");
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    axios
      .get(`http://localhost:3001/course/${this.state.cid}/home`)
      .then(response => {
        if (response.data.message === "error") {
          alert("Something went wrong!");
          this.prop.history.push("/course");
        } else if (response.data.message === "success") {
          this.setState({
            details: response.data.data,
            status: response.data.status
          });
        }
      });
  }

  render() {
    //const isStudent = Cookies.get("role") === "student";
    // console.log(this.props);
    const isStudent = true;
    return (
      <div>
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn">
              {isStudent ? (
                this.state.status === "enroll" ? (
                  //<Menu cid={this.state.cid} />
                  <span />
                ) : (
                  <span />
                )
              ) : (
                // <Menu cid={this.state.cid} />
                <span />
              )}
            </div>
            <div className="col-9 coursecolumn">
              <h3>{this.state.details.cname}</h3>
              <br />
              <table className="courseinfo">
                <tbody>
                  <tr>
                    <td>Department</td>
                    <td>: {this.state.details.cdept}</td>
                  </tr>
                  <tr>
                    <td className="coursedesc">Description</td>
                    <td>: {this.state.details.cdesc}</td>
                  </tr>
                  <tr>
                    <td>Classroom</td>
                    <td>: {this.state.details.croom}</td>
                  </tr>
                  <tr>
                    <td>Capacity</td>
                    <td>: {this.state.details.ccap}</td>
                  </tr>
                  <tr>
                    <td>Waitlist</td>
                    <td>: {this.state.details.cwait}</td>
                  </tr>
                  <tr>
                    <td>Term</td>
                    <td>: {this.state.details.cterm}</td>
                  </tr>
                  {isStudent ? (
                    this.state.status === "waitlist" ? (
                      <tr>
                        <td>Status</td>
                        <td>: Waitlisted</td>
                      </tr>
                    ) : (
                      <tr />
                    )
                  ) : (
                    <tr />
                  )}
                </tbody>
              </table>
              <br />

              {isStudent ? (
                this.state.status === "none" ? (
                  <span>
                    <form onSubmit={this.submitHandler}>
                      <input
                        type="submit"
                        name="enroll"
                        value="Enroll"
                        className="btn btn-primary"
                        onClick={this.enrollHandler}
                      />
                      &nbsp;
                      <input
                        type="submit"
                        name="waitlist"
                        value="Waitlist"
                        className="btn btn-primary"
                        onClick={this.waitlistHandler}
                      />
                      &nbsp;
                    </form>
                  </span>
                ) : (
                  <span>
                    <form onSubmit={this.submitHandler}>
                      <input
                        type="submit"
                        name="drop"
                        value="Drop"
                        className="btn btn-primary"
                        onClick={this.dropHandler}
                      />
                    </form>
                  </span>
                )
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>

        <form onSubmit={this.enroll}>
          <button className="btn btn-primary" name="submit" value="submit">
            enroll
          </button>{" "}
        </form>
      </div>
    );
  }
}

export default CourseInfo;
