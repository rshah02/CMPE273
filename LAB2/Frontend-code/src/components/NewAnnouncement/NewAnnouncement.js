import React, { Component } from "react";
import axios from "axios";

import "./newAnnouncement.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
class NewAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcementDetails: "",
      announcementTitle: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({ announcementDetails: value });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    let Token = localStorage.jwtToken;
    e.preventDefault();
    const newAnnouncement = {
      announcementDetails: this.state.announcementDetails,
      announcementTitle: this.state.announcementTitle
    };
    axios
      .post(
        `${window.base_url}/users/courses/${this.props.cid}/Announcements`,
        newAnnouncement,
        {
          headers: { Authorization: Token }
        }
      )
      .then(response => {
        console.log(response.data);
      });
  }
  render() {
    return (
      <div className="newAnnouncement">
        <h2>Create New Announcement</h2>
        <form onSubmit={this.onSubmit}>
          <div className="col-md-12 form-group">
            <label>Title:</label>
            <input
              className="form-control"
              type="text"
              name="announcementTitle"
              value={this.state.announcementTitle}
              onChange={this.onChange}
            />
          </div>

          <div className="col-md-12 form-group">
            <label lablefor="announcementDetails">Enter Details </label>
            <ReactQuill
              value={this.state.announcementDetails}
              onChange={this.handleChange}
              className="col-md-12"
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

export default NewAnnouncement;
