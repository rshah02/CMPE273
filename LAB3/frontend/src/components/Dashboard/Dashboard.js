import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Coursecard from "../Coursecard/Coursecard";
import "../../App.css";
import "./Dashboard.css";
import axios from "axios";
import { graphql } from "react-apollo";

import { withApollo } from "react-apollo";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import createAbsoluteGrid from "react-absolute-grid";
import { myCourses } from "../../queries/queries";

import newCourse from "../newCourse/newCourse";

function Card({ item }) {
  console.log(item.key);
  return (
    // put your course card data here

    <Coursecard
      key={item.key}
      num={item.key}
      id={item._id}
      dept={item.courseDept}
      name={item.courseName}
      term={item.courseTerm}
      draggable={true}
    />
  );
}
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: "",
      enrolled: ""
    };
  }
  //Dummy componenet did mount
  componentDidMount() {
    // const Token = localStorage.getItem("jwtToken");
    // console.log(Token);
    // axios
    //   .get(window.base_url + "/users/courses", {
    //     headers: { Authorization: Token }
    //   })
    //   .then(response => {
    const id = localStorage.getItem("_id");

    this.props.client
      .query({
        query: myCourses,
        variables: {
          _id: id
        }
      })
      .then(result => {
        console.log(result.data);
        //this.setState({ AllCourses: result.data.myCourses });
        let courses = result.data.myCourses;
        console.log(result.data.myCourses);
        if (result.data.myCourses.length == 0) {
          console.log("no records");
        }
        courses = courses.map((course, i) => {
          return {
            ...course,
            key: i,
            sort: i
          };
        });
        this.setState({ courses });
      });
    // this.props.client
    //   .query({
    //     query: myCourses,
    //     variables: {
    //       _id: id
    //     }
    //   })
    //   .then(result => {
    //     console.log(result.data.myCourses);
    //     this.setState({
    //       courseArray: result.data.myCourses
    //     });
    //   });

    // let courses = this.state.courseArray;

    // console.log(this.props.data.myCourseDetails);
    // if (this.props.data.myCourseDetails == 0) {
    //   console.log("no records");
    // }
    // courses = courses.map((course, i) => {
    //   return {
    //     ...course,
    //     key: i,
    //     sort: i
    //   };
    // });
    // this.setState({ courses });
  }
  onMove = (from, to) => {
    let courses = this.state.courses;
    let temp = courses[from].sort;
    courses[from].sort = courses[to].sort;
    courses[to].sort = temp;
    // console.log(from, to)
    this.setState({ courses });
  };
  //dummy finish

  render() {
    //let AllmyCourses = this.state.AllCourses;

    let courses = [];
    console.log(this.state.AllCourses);
    Object.assign(courses, this.state.courses);

    const AbsoluteGrid = createAbsoluteGrid(Card, {}, true);

    const isStudent = localStorage.getItem("type") === "Student";
    // console.log(this.props.loginStateStore.user.type);
    console.log(isStudent);
    return (
      <div>
        <Navbar />
        <Header />

        <div className="pageContent">
          {isStudent ? (
            <Link to="/AllCourses">
              <button className="btn btn-primary as-btn">Search Course</button>{" "}
            </Link>
          ) : (
            <Link to="/Dashboard/newCourse">
              <button className="btn btn-primary as-btn"> + Add Course</button>
            </Link>
          )}
        </div>
        <hr />

        <div>
          <Switch>
            <Route path="/Dashboard/newCourse" component={newCourse} />
          </Switch>
        </div>
        {courses.length === 0 ? (
          <h2>You have not enrolled for any classes yet</h2>
        ) : (
          <AbsoluteGrid
            items={courses}
            dragEnabled
            onMove={this.onMove}
            responsive
            itemHeight={330}
            itemWidth={360}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginStateStore: state.auth
});

// export default connect(
//   mapStateToProps,
//   {}
// )(withRouter(Dashboard));
// export default graphql(myCourseDetails, {
//   options: props => ({
//     variables: { email: localStorage.getItem("email") }
//   })
// })(Dashboard);

export default withApollo(Dashboard);
