import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Coursecard from "../Coursecard/Coursecard";
import "../../App.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

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
    const isStudent = true;
    return (
      <div>
        <Navbar />
        <Header title="Dashboard" />
        <div className="pageContent">
          <div className="row mycourses">
            {courses.map((course, index) => {
              return (
                <Coursecard
                  key={index}
                  num={index}
                  id={course.courseId}
                  name={course.courseName}
                  term={course.courseTerm}
                />
              );
            })}
          </div>

          <hr />
          {isStudent ? (
            <Link to="/course/search">
              <button className="btn btn-primary">Search Course</button>{" "}
            </Link>
          ) : (
            <Link to="/course/new">
              <button className="btn btn-primary">Add Course</button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
