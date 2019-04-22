import React, { Component } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./NewAssignment.css";

class NewAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignmentName: "",
      assignmentDetail: " ",
      file: "",
      assignmentType: "",
      points: "",
      dueDate: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({ assignmentDetail: value });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onClick(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  fileHandler = e => {
    this.setState({
      file: e.target.files[0]
    });
  };
  onSubmit(e) {
    let Token = localStorage.jwtToken;
    e.preventDefault();
    let data = new FormData();

    data.append("assignmentName", this.state.assignmentName);
    data.append("file", this.state.file);
    data.append("assignmentDetail", this.state.assignmentDetail);
    data.append("assignmentType", this.state.assignmentType);
    data.append("points", this.state.points);
    data.append("dueDate", this.state.dueDate);
    /* const newAssignment = {
      assignmentName: this.state.assignmentName,
      assignmentDetail: this.state.assignmentDetail,
      file: this.state.file,
      assignmentType: this.state.assignmentType,
      points: this.state.points,
      dueDate: this.state.dueDate
    }; */
    console.log(this.props.cid);
    console.log(this.props.id);
    console.log(this.props.match.params.id);
    axios
      .post(
        `${window.base_url}/users/courses/${
          this.props.match.params.id
        }/assignments`,
        data,
        {
          headers: { Authorization: Token }
        }
      )
      .then(response => {
        this.props.history.push(
          `/courses/${this.props.match.params.id}/Assignments`
        );
      });
  }
  render() {
    return (
      <div className="newAssignment">
        <h2>Create New assignment</h2>
        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <div className="form-group">
            <Textselect
              name="assignmentType"
              value={this.state.assignmentType}
              onClick={this.onClick}
            />
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input
              className="form-control"
              type="text"
              name="assignmentName"
              value={this.state.assignmentName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Due Date:</label>
            <input
              className="form-control"
              type="date"
              name="dueDate"
              value={this.state.dueDate}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Points:</label>
            <input
              className="form-control"
              type="text"
              name="points"
              value={this.state.points}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>file:</label>
            <input
              className="form-control"
              type="file"
              onChange={this.fileHandler}
              required
            />
          </div>
          <div className="col-lg-12 form-group">
            <label labelfor="assignmentDetail">Enter Details </label>
            <ReactQuill
              value={this.state.assignmentDetail}
              onChange={this.handleChange}
              className="rounded"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Create
          </button>
          <button className="btn btn-danger" type="reset">
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export const Textselect = ({ name, value, onClick }) => (
  <select name={name} value={value} onChange={onClick}>
    <option value="assignment">Assignment</option>
    <option value="Quiz">Quiz</option>
  </select>
);
export default NewAssignment;
