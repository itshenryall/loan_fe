import React, { Component } from "react";

import { Container, Row, Col, Input, Button, Card, CardHeader, CardBody } from "reactstrap";
import ModalForm from "../../components/Modals/ModalTransaction";
import { CSVLink } from "react-csv";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

/* 
for documentation react-table purpose
https://github.com/tannerlinsley/react-table
*/
class Transaction extends Component {
  state = {
    data: [],
    filteredData: [],
    page: 0,
    totalPage: 0,
    nextPage: 0,
    prevPage: 0,
    limit: 5,
    searchInput: "",
  };

  getdata() {
    const user = JSON.parse(localStorage.getItem("user"));
    fetch(
      "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/loantransaction",
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
    const itemIndex = this.state.data.findIndex((data) => data.loanTrxID === data.loanTrxID);
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

  deleteItemFromState = (loanTrxID) => {
    const updateddata = this.state.data.filter((data) => data.loanTrxID !== loanTrxID);
    this.setState({ data: updateddata });
  };

  componentDidMount() {
    this.getdata();
  }
  handleChange = (event) => {
    this.setState({ searchInput: event.target.value }, () => {
      this.globalSearch();
    });
  };
  globalSearch = () => {
    let { searchInput, data } = this.state;
    let filteredData = data.filter((value) => {
      return (
        value.loanTrxID.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.customerID.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.msisdn.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.creditScore.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        value.loanRemarks.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        value.recommendationLimit.toString().toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    this.setState({ filteredData: filteredData });
  };
  deleteItem = (loanTrxID) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      const user = JSON.parse(localStorage.getItem("user"));

      fetch(
        "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/loantransaction/" +
          `${loanTrxID}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.accessToken,
          },
        }
      )
        .then((response) => response.json())
        .then((response) => response.code)
        .then((code) => {
          if (code >= 200) {
            window.location.reload();
          }
        });
    }
  };
  columns = [
    {
      Header: "ID",
      accessor: "loanTrxID",
    },
    {
      Header: "Customer ID",
      accessor: "customerID",
    },
    {
      Header: "MSISDN",
      accessor: "msisdn",
    },
    {
      Header: "Credit Score",
      accessor: "creditScore",
    },
    {
      Header: "Loan Remarks",
      accessor: "loanRemarks",
    },
    {
      Header: "Recomendation Limit",
      accessor: "recommendationLimit",
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <>
          <ModalForm
            buttonLabel="Edit"
            item={row}
            updateState={this.updateState}
          />
          <Button color="danger" onClick={() => this.deleteItem(row.loanTrxID)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  render() {
    let { data, columns, searchInput } = this.state;
    return (
      <Card>
      <CardHeader>
        Table Loan Transaction
      </CardHeader>
      <CardBody>
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}></h1>
          </Col>
        </Row>

        <Row>
          <Col>
          <span className="float-left">
            <CSVLink
              filename={"loan_transaction.csv"}
              color="primary"
              style={{ float: "left", marginRight: "10px" }}
              className="btn btn-primary"
              data={this.state.data}
            >
              Download CSV
            </CSVLink>
            </span>
            <span class="float-left">
            <ModalForm
              buttonLabel="Add Item"
              addItemToState={this.addItemToState}
            />
            </span>
            <span class="float-right">
          <Input
              size="large"
              name="searchInput"
              value={this.state.searchInput || ""}
              onChange={this.handleChange}
              label="Search"
              placeholder="Search"
            />
          </span>
          </Col>
        </Row>

        <Row>
          <Col>
          <br />
            <ReactTable
              data={
                this.state.filteredData && this.state.filteredData.length
                  ? this.state.filteredData
                  : this.state.data
              }
              columns={this.columns}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </Col>
        </Row>
      </Container>
      </CardBody>
      <br />
      </Card>
    
    );
  }
}

export default Transaction;