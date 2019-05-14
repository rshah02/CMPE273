import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import "./Coursecard.css";

export class Coursecard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dept: "",
      name: "",
      term: "",
      num: ""
    };
  }
  render() {
    let colorTemp = [
      "https://ih1.redbubble.net/image.530527489.1466/flat,550x550,075,f.jpg",
      "https://www.solidbackgrounds.com/images/2560x1440/2560x1440-sea-blue-solid-color-background.jpg",
      "https://cdn.shopify.com/s/files/1/1011/0376/products/PastelBlue.jpg?v=1512940787"
    ];
    console.log("card courseId:" + this.props.id);
    return (
      <div draggable={true}>
        <Link to={`/courses/${this.props.id}`} className="cardlink">
          <Card className="cards searchcards" draggable={false}>
            <img
              src={colorTemp[Number(this.props.num) % 3]}
              alt="cardcolor"
              className="cardtemp"
              draggable={false}
            />
            <h4>
              <span className="cardlink">{this.props.dept}</span>
            </h4>
            <h4>
              <span className="cardlink">{this.props.name}</span>
            </h4>
            <h5>
              <span className="cardlink term">{this.props.term}</span>
            </h5>
          </Card>
        </Link>
      </div>
    );
  }
}

export default Coursecard;
