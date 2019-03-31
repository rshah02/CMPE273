import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./CourseSidebar.css";
class CourseSideBar extends Component {
  render() {
    return (
      <div className="courseSideBar">
        <div className="coursesidebarInner">
          <ul>
            <li className="rounded">
              <Link to="/Home">Home</Link>
            </li>
            <li className="rounded">
              <Link to="/Home">Announcements</Link>
            </li>
            <li className="rounded">
              <Link to="/Home">Assignments</Link>
            </li>
            <li className="rounded">
              <Link to="/Home">Discussions</Link>
            </li>
            <li className="rounded">
              <Link to="/Home">Grades</Link>
            </li>
            <li className="rounded">
              <Link to="/courses/people">People</Link>
            </li>
            <li className="rounded">
              <Link to="/Home">Files</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(CourseSideBar);
