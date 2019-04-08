import React, { Component } from "react";
import Axios from "axios";
import { Switch, Route } from "react-router-dom";
import { Link, withRouter } from "react-router-dom";
import NewAnnouncement from "../NewAnnouncement/NewAnnouncement";
import "./Announcement.css";
class Announcements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   Announcements: []
      cid: this.props.match.params.id
    };
  }
  componentWillMount() {
    console.log(this.props.match.params.id);
    Axios.get(
      `http://localhost:3001/users/courses/${
        this.props.match.params.id
      }/Announcements`
    ).then(res => {
      this.setState({ Announcements: res.data });
      console.log(res.data);
    });
  }
  render() {
    let Announcements = [];
    Object.assign(Announcements, this.state.Announcements);

    const isFaculty = true;
    return (
      <div>
        <div className="col-md-8 auto announcementWraper">
          <div className="col-md-4 abutton">
            {isFaculty ? (
              <Link to={`/courses/${this.state.cid}/newAnnouncement`}>
                <button className="btn btn-primary">New Announcement</button>{" "}
              </Link>
            ) : null}
          </div>
          <div>
            <NewAnnouncement cid={this.state.cid} />
          </div>
          <h2>Announcements</h2>
          {Announcements.map((Announcement, index) => {
            return (
              <div key={index} className="row announcementList">
                <div className="col-md-12">
                  <h2>{Announcement.announcementTitle}</h2>
                </div>
                <div className="col-md-8">
                  {Announcement.announcementDetails}
                </div>
                <div className="col-md-4">
                  <label>created Date</label>
                  {Announcement.announcementDate}
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Announcements);
