import React, { Component } from "react";
class Listx extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.tnr}</h4>
        <p>{this.props.tpo}</p>
        <hr/>
      </div>
    );
  }
}
export default Listx;
