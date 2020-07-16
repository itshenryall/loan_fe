import React, { Component } from "react";

import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import ModalForm from "../../components/Modals/Modal";
import DataTable from "../../components/Tables/DataTable";
import { CSVLink } from "react-csv";

class Offering extends Component {
  state = {
    data: [],
    page: 0,
    totalPage: 0,
    nextPage: 0,
    prevPage: 0,
    limit: 5,
  };

  getdata() {
    const user = JSON.parse(localStorage.getItem("user"));
    fetch(
      `https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/offeringpackage/page?pageLimit=${this.state.limit}&pageNumber=${this.state.page}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => response)
      .then((response) => {
        if (response.data) {
          this.setState({ data: response.data });
          this.setState({ totalPage: response.meta.totalPage });
        }

        this.setState({});
      });
  }

  addItemToState = (item) => {
    this.setState((prevState) => ({
      data: [...prevState.data, item],
    }));
  };

  updateState = (data) => {
    const itemIndex = this.state.data.findIndex(
      (data) => data.offerID === data.offerID
    );
    const newArray = [
      // destructure all data from beginning to the indexed item
      ...this.state.data.slice(0, itemIndex),
      // add the updated item to the array
      data,
      // add the rest of the data to the array from the index after the replaced item
      ...this.state.data.slice(itemIndex + 1),
    ];
    this.setState({ data: newArray });
  };

  deleteItemFromState = (offerID) => {
    const updateddata = this.state.data.filter(
      (data) => data.offerID !== offerID
    );
    this.setState({ data: updateddata });
  };

  componentDidMount() {
    this.getdata();
  }
  handlePageUp = () => {
    const nextPages = Math.min(this.state.page + 1, this.state.totalPage);

    this.setState({ page: nextPages }, () => {
      this.getdata();
    });
  };
  handlePageDown = () => {
    const prevPages = Math.max(this.state.page - 1, 0);

    this.setState({ page: prevPages }, () => {
      this.getdata();
    });
  };
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
              filename={"offering_package.csv"}
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
        <Pagination aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink previous onClick={this.handlePageDown} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next onClick={this.handlePageUp} />
          </PaginationItem>
        </Pagination>
      </Container>
    );
  }
}

export default Offering;
