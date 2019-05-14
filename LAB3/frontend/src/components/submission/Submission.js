import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./submission.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export class Submission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cid: this.props.match.params.id,
      filen: "",
      comment: "",
      grade: ""
    };
    this.fileHandler = this.fileHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const Token = localStorage.getItem("jwtToken");
    axios
      .get(
        `${window.base_url}/users/courses/${this.state.cid}/assignments/${
          this.props.match.params.asid
        }`,
        { headers: { Authorization: Token } }
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          filen: response.data
        });
      });
  }
  enroll(_id, userId, assignmentId, e) {
    e.preventDefault();
    console.log(e.target.value);
    const Token = localStorage.getItem("jwtToken");
    let course = {
      submissionId: _id,
      assignmentId: assignmentId,
      userId: userId,
      grade: this.state.grade
    };
    console.log(course);
    axios
      .post(
        `${window.base_url}/users/courses/${this.state.cid}/assi/grades`,
        course,
        {
          headers: { Authorization: Token }
        }
      )
      .then(response => {
        console.log(response.data);
        this.props.history.push("/AllCourses");
      });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  fileHandler = e => {
    this.setState({
      filen: e.target.files[0]
    });
  };

  submitHandler = e => {
    e.preventDefault();
    let Token = localStorage.getItem("jwtToken");
    let data = new FormData();
    data.append("file", this.state.filen);
    data.append("comment", this.state.comment);
    axios
      .post(
        `${window.base_url}/users/courses/${this.state.cid}/assignments/${
          this.props.match.params.asid
        }`,
        data,
        { headers: { Authorization: Token } }
      )
      .then(response => {
        if (response.data === "success") {
          alert("File Uploaded.");
        } else if (response.data === "error") {
          alert("Something went wrong.");
        }
      });
  };

  render() {
    let files = [];
    Object.assign(files, this.state.filen);
    console.log("file array " + files);
    let p = files.map(file => {
      return (
        <form
          name="abc"
          value={file._id}
          onSubmit={this.enroll.bind(
            this,
            file._id,
            file.userId,
            file.assignmentId
          )}
        >
          <input
            type="text"
            name="grade"
            value={this.state.grade}
            onChange={this.onChange}
          />
          <button
            className="btn btn-primary as-btn"
            type="submit"
            value="submit"
          >
            grade
          </button>
        </form>
      );
    });
    let r = files.map(file => file.submitfile);
    console.log(r);
    //const isStudent = Cookies.get("role") === "student";
    console.log(this.props.auth.user.type);
    const isStudent = this.props.auth.user.type === "Student";
    return (
      <div>
        <div className="pageContent">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-9 coursecolumn">
              <br />
              {p}
              {isStudent ? (
                <form onSubmit={this.submitHandler}>
                  <div className="row">
                    <div className="col-md-12 form-group">
                      <input
                        type="file"
                        className="form-control"
                        onChange={this.fileHandler}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 form-group">
                      <div className="row">
                        <label
                          className="col-md-2"
                          labelfor="courseDescription"
                        >
                          Description
                        </label>
                        <ReactQuill
                          value={this.state.comment}
                          onChange={this.onChange}
                          className="col-md-10"
                          name="comment"
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Upload
                  </button>
                </form>
              ) : (
                r.map((r, index) => {
                  return (
                    <div
                      key={index}
                      className="filelist"
                      width="20"
                      height="100px"
                    >
                      {/* <a
                        href={`${window.base_url}/files/submission/${r}`}
                        download
                        target="_blank"
                        rel="noreferrer"
                      >
                        <embed
                          src={`${
                            window.base_url
                          }/files/submission/${r}#toolbar=1&navpanes=1&scrollbar=1`}
                          width="100%"
                          height="500px"
                          className="embedd"
                        />

                        {r}
                        </a> */}
                      {
                        <iframe
                          src={`${window.base_url}/files/submission/${r}`}
                          width="700"
                          height="500"
                          id="frame"
                        />
                      }
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="col-md-3" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {}
)(withRouter(Submission));
