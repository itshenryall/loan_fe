import React from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { CSVLink } from "react-csv";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

class FormListOffering extends React.Component {
  state = {
    customerID: "",
    msisdn: "",
    offerID: "",
    packageType: "",
    value: "",
  };

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { customerID, msisdn } = this.props.item;
      this.setState({ customerID, msisdn });
    }
  }

  getdata() {
    const user = JSON.parse(localStorage.getItem("user"));
    fetch(
      "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/loantransaction/request-offering",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },

        body: JSON.stringify({
          customerID: this.props.item.customerID,
          msisdn: this.props.item.msisdn,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => response)
      .then((response) => {
        if (response.code == 200) {
          console.log(response.message);
          console.log(response.status);
          console.log(response.code);
          this.setState({ data: response.data });
        } else {
          alert(response.message);
        }
      });
  }

  componentDidMount() {
    this.getdata();
  }

  columns = [
    {
      Header: "ID",
      accessor: "offerID",
    },
    {
      Header: "Package Type",
      accessor: "packageType",
    },
    {
      Header: "Value",
      accessor: "value",
    },
  ];

  render() {
    return (
      <Card>
        <CardHeader>Table Offering Package</CardHeader>
        <CardBody>
          <Container className="App">
            <Row>
              <Col>
                <h1 style={{ margin: "20px 0" }}></h1>
              </Col>
            </Row>

            <Row>
              <Col>
                <br />
                <ReactTable
                  data={this.state.data}
                  columns={this.columns}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              </Col>
            </Row>
          </Container>
          <br />
        </CardBody>
      </Card>
    );
  }
}

export default FormListOffering;
