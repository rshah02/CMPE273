import React, { Component } from "react";
import "./newCourse.css";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
class newCourse extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      courseName: "",
      courseDept: "",
      courseDescription: "",
      courseCapacity: "",
      courseRoom: "",
      courseTerm: "",
      waitlistCapacity: "",
      lectureTime: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({ courseDescription: value });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onClick(e) {
    e.preventDefault();
    this.props.history.push("/Dashboard");
  }
  onSubmit(e) {
    e.preventDefault();
    const course = {
      courseName: this.state.courseName,
      courseDept: this.state.courseDept,
      courseCapacity: this.state.courseCapacity,
      courseDescription: this.state.courseDescription,
      courseRoom: this.state.courseRoom,
      courseTerm: this.state.courseTerm,
      waitlistCapacity: this.state.waitlistCapacity,
      lectureTime: this.state.lectureTime
    };
    axios.post("http://localhost:3001/users/courses", course).then(response => {
      console.log(response.data);
      this.props.history.push("/Dashboard");
    });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit} className="col-lg-12">
        <div className="col-lg-6 form-group ">
          <div className="col-lg-3">
            <label labelfor="courseName">Course Name</label>
          </div>
          <div className="col-lg-9">
            <input
              type="text"
              className="form-control"
              name="courseName"
              value={this.state.courseName}
              onChange={this.onChange}
              placeholder="ex. CMPE-273 Distributed Systems"
            />
          </div>
        </div>
        <div className="col-lg-6 form-group">
          <div className="col-lg-3">
            <lable lablefor="courseDept">Course Department</lable>
          </div>
          <div className="col-lg-9">
            <input
              type="text"
              name="courseDept"
              className="form-control"
              value={this.state.courseDept}
              onChange={this.onChange}
              placeholder="ex. Software engineering"
            />
          </div>
        </div>
        <div className="col-lg-6 form-group">
          <div className="col-lg-3">
            <lable lablefor="courseDept">Course Term</lable>
          </div>
          <div className="col-lg-9">
            <input
              type="text"
              name="courseTerm"
              className="form-control"
              value={this.state.courseTerm}
              onChange={this.onChange}
              placeholder="Ex. Spring 2019"
            />
          </div>
        </div>
        <div className="col-lg-6 form-group">
          <div className="col-lg-3">
            <lable lablefor="courseRoom">Room Number</lable>
          </div>
          <div className="col-lg-9">
            <input
              type="text"
              name="courseRoom"
              className="form-control"
              value={this.state.courseRoom}
              onChange={this.onChange}
              placeholder="Ex. Eng-277"
            />
          </div>
        </div>

        <div className="col-lg-6 form-group">
          <div className="col-lg-3">
            <lable lablefor="courseCapacity">Batch Size</lable>
          </div>
          <div className="col-lg-9">
            <input
              type="text"
              className="form-control"
              name="courseCapacity"
              value={this.state.courseCapacity}
              onChange={this.onChange}
              placeholder="ex. 70"
            />
          </div>
        </div>
        <div className="col-lg-6 form-group">
          <div className="col-lg-2">
            <label labelfor="waitlistCapacity">waitlist Capacity</label>
          </div>
          <div className="col-lg-10">
            <input
              type="text"
              name="waitlistCapacity"
              className="form-control"
              value={this.state.waitlistCapacity}
              onChange={this.onChange}
              placeholder="ex. 15"
            />
          </div>
        </div>
        <div className="col-lg-6 form-group">
          <div className="col-lg-2">
            <label labelfor="lectureTime">Lecture Timings</label>
          </div>
          <div className="col-lg-10">
            <input
              type="text"
              name="lectureTime"
              className="form-control"
              value={this.state.lectureTime}
              onChange={this.onChange}
              placeholder="ex. 15"
            />
          </div>
        </div>

        <div className="col-lg-12 form-group blue-border">
          <label labelfor="courseDescription">Enter Course Description </label>
          <ReactQuill
            value={this.state.courseDescription}
            onChange={this.handleChange}
          />
        </div>
        <button className="btn btn-primary" type="submit" value="submit">
          Create
        </button>
        <button
          className="btn btn-danger"
          type="reset"
          value="reset"
          onClick={this.onClick}
        >
          Cancel
        </button>
      </form>
    );
  }
}
export default newCourse;
