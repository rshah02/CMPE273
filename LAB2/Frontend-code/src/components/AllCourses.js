import React, { Component } from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";
class AllCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   AllCourses: []
      cid: this.props.match.params.id
    };
    this.enroll = this.enroll.bind(this);
  }
  componentWillMount() {
    const Token = localStorage.getItem("jwtToken");
    console.log(this.props.match.params.id);
    Axios.get("http://localhost:3001/courses", {
      headers: { Authorization: Token }
    }).then(res => {
      this.setState({ AllCourses: res.data });
      console.log(res.data);
    });
  }
  enroll(id, e) {
    e.preventDefault();
    console.log(e.target.value);
    const Token = localStorage.getItem("jwtToken");
    let course = { courseId: id };
    console.log(course);
    Axios.post("http://localhost:3001/enrollment", course, {
      headers: { Authorization: Token }
    }).then(response => {
      console.log(response.data);
      this.props.history.push("/AllCourses");
    });
  }
  render() {
    let AllCourses = [];
    Object.assign(AllCourses, this.state.AllCourses);

    return (
      <div className="row">
        <div className="col-md-1">
          <Navbar />
        </div>
        <div className="col-md-11">
          <Header title={"All Courses"} />
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8 auto announcementWraper">
              <div className="row announcementList">
                <div className="col-md-4">
                  <h4>Course Name</h4>
                </div>
                <div className="col-md-3">
                  <h4>Department</h4>
                </div>
                <div className="col-md-3">
                  <h4>Term</h4>
                </div>
                <div className="col-md-2" />
                <hr />
              </div>
              {AllCourses.map((Announcement, index) => {
                return (
                  <div key={index} className="row announcementList">
                    <div className="col-md-4">{Announcement.courseName}</div>
                    <div className="col-md-3">{Announcement.courseDept}</div>
                    <div className="col-md-3">
                      <label>Term: </label>
                      {Announcement.courseTerm}
                    </div>
                    <div className="col-md-2">
                      <form
                        name="abc"
                        value={Announcement._id}
                        onSubmit={this.enroll.bind(this, Announcement._id)}
                      >
                        <button
                          className="btn btn-primary as-btn"
                          type="submit"
                          value="submit"
                        >
                          Enroll
                        </button>
                      </form>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

export default withRouter(AllCourses);
