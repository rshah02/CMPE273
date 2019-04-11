import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Coursecard from "../Coursecard/Coursecard";
import "../../App.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import createAbsoluteGrid from "react-absolute-grid";

import newCourse from "../newCourse/newCourse";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    // if (!Cookies.get('id')) {
    //  alert("Please login first.");
    // this.props.history.push("/");
    //}
    this.state = {
      //id: Cookies.get('id'),
      //role: Cookies.get('role'),
      courses: ""
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3001/users/courses").then(response => {
      console.log(response.data);
      if (response) {
        this.setState({
          courses: response.data
        });
      } else {
        this.props.history.push("/");
      }
    });
  }

  render() {
    let courses = [];
    Object.assign(courses, this.state.courses);

    const AbsoluteGrid = createAbsoluteGrid(<Coursecard />);

    console.log(
      courses.map((course, index) => ({
        id: course._id,
        dept: course.courseDept,
        name: course.courseName,
        term: course.courseTerm
      }))
    );

    const isStudent = false;
    return (
      <div>
        <Navbar />
        <Header title="Dashboard" />
        <div className="pageContent">
          <div className="row">
            {isStudent ? (
              <Link to="/course/search">
                <button className="btn btn-primary">Search Course</button>{" "}
              </Link>
            ) : (
              <Link to="/Dashboard/newCourse">
                <button className="btn btn-primary">Add Course</button>
              </Link>
            )}
          </div>
          <hr />
          <div className="row mycourses">
            <AbsoluteGrid
              items={courses.map((course, index) => ({
                id: course._id,
                dept: course.courseDept,
                name: course.courseName,
                term: course.courseTerm
              }))}
              dragEnabled={true}
            />
            {courses.map((course, index) => {
              return (
                <Coursecard
                  key={index}
                  num={index}
                  id={course._id}
                  dept={course.courseDept}
                  name={course.courseName}
                  term={course.courseTerm}
                />
              );
            })}
          </div>

          <hr />
          <div className="row">
            <Switch>
              <Route path="/Dashboard/newCourse" component={newCourse} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
