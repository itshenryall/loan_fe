import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";
import ModalForm from "../../components/Modals/Modal";
import DataTable from "../../components/Tables/DataTable";
import { CSVLink } from "react-csv";

class Offering extends Component {
  state = {
    data: [],
  };

  getdata() {
    const user = JSON.parse(localStorage.getItem("user"));
    // /page?pageLimit=4&pageNumber=1 weird endpoint ?
    fetch(
      "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/offeringpackage",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => response.data)
      .then((data) => {
        if (data) {
          this.setState({ data });
        }

        this.setState({});
      });
  }

  addItemToState = (item) => {
    this.setState((prevState) => ({
      data: [...prevState.data, item],
    }));
  };

  updateState = (item) => {
    const itemIndex = this.state.data.findIndex((data) => data.id === item.id);
    const newArray = [
      // destructure all data from beginning to the indexed item
      ...this.state.data.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the data to the array from the index after the replaced item
      ...this.state.data.slice(itemIndex + 1),
    ];
    this.setState({ data: newArray });
  };

  deleteItemFromState = (id) => {
    const updateddata = this.state.data.filter((item) => item.id !== id);
    this.setState({ data: updateddata });
  };

  componentDidMount() {
    this.getdata();
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}></h1>
          </Col>
        </Row>

        <Row>
          <br />
          <br />
          <br />
          <br />
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{ float: "left", marginRight: "10px" }}
              className="btn btn-primary"
              data={this.state.data}
            >
              Download CSV
            </CSVLink>
            <ModalForm
              buttonLabel="Add Item"
              addItemToState={this.addItemToState}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <DataTable
              data={this.state.data}
              updateState={this.updateState}
              deleteItemFromState={this.deleteItemFromState}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Offering;
