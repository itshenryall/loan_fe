import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/ModalCustomer";

class DataTablesCustomer extends Component {
  deleteItem = (customerID) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      const user = JSON.parse(localStorage.getItem("user"));

      fetch(
        "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/customer/"+
        `${customerID}`,
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

  render() {
    const data = this.props.data.map((item) => {
      return (
        <tr key={item.customerID}>
          <th scope="row">{item.customerID}</th>
          <td>{item.msisdn}</td>
          <td>{item.sourceChannel}</td>
          <td>{item.zoneArea}</td>
          <td>{item.balance}</td>
          <td>{item.arpu}</td>
          <td>{item.los}</td>
          <td>{item.expired}</td>
          <td>{item.creditScore}</td>
          <td>{item.maxSeq}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm
                buttonLabel="Edit"
                item={item}
                updateState={this.props.updateState}
              />{" "}
              <Button
                color="danger"
                onClick={() => this.deleteItem(item.customerID)}
              >
                Del
              </Button>
            </div>
          </td>
        </tr>
      );
    });

   
    return (
      <Table Table hover responsive className="table-outline mb-0 d-none d-sm-table">
        <thead>
          <tr style={{ backgroundColor: "#c8ced3", color: "#5c6873" }}>
            <th>ID</th>
            <th>MSISDN</th>
            <th>Source Channel</th>
            <th>Zone Area</th>
            <th>Balance</th>
            <th>Arpu</th>
            <th>LOS</th>
            <th>Expired</th>
            <th>Credit Score</th>
            <th>Max Sequence</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </Table>
    );
  }
}


export default DataTablesCustomer;
