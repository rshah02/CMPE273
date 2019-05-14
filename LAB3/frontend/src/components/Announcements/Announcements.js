import React, { Component } from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import NewAnnouncement from "../NewAnnouncement/NewAnnouncement";
import "./Announcement.css";
class Announcements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Announcements: [],
      displayAnnouncements: [],
      cid: this.props.match.params.id,
      offset: 0,
      size: 5
    };
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  componentDidMount() {
    console.log(this.props.match.params.id);
    Axios.get(
      `${window.base_url}/users/courses/${
        this.props.match.params.id
      }/Announcements`
    ).then(res => {
      console.log(res.data);
      this.setState({
        Announcements: res.data,
        displayAnnouncements: res.data.slice(0, this.state.size),
        offset: 0
      });
      console.log("response:" + res.data.announcements);
      console.log("state announcement:" + this.state.Announcements);
    });
  }
  handlePrev() {
    let newOffset = this.state.offset - this.state.size;
    newOffset = newOffset < 0 ? 0 : newOffset;
    this.setState({
      offset: newOffset,
      displayAnnouncements: this.state.Announcements.slice(
        newOffset,
        newOffset + this.state.size
      )
    });
  }
  handleNext() {
    let newOffset = this.state.offset + this.state.size;
    newOffset =
      newOffset > this.state.Announcements.length
        ? this.state.offset
        : newOffset;
    this.setState({
      offset: newOffset,
      displayAnnouncements: this.state.Announcements.slice(
        newOffset,
        this.state.Announcements.length
      )
    });
  }

  render() {
    let { displayAnnouncements } = this.state;
    const isFaculty = true;
    return (
      <div>
        <div className="row announcementWraper">
          <div className="col-md-12">
            {isFaculty ? <NewAnnouncement cid={this.state.cid} /> : null}
          </div>
        </div>
        <div className="row">
          <h2>Announcements</h2>
          <div className="col-md-12">
            <button
              className="btn btn-primary as-btn"
              onClick={this.handleNext}
            >
              next
            </button>
            <button
              className="btn btn-primary as-btn"
              onClick={this.handlePrev}
            >
              previous
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {displayAnnouncements.map((Announcement, index) => {
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
      </div>
    );
  }
}

export default withRouter(Announcements);
