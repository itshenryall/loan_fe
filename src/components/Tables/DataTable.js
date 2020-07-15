import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/Modal";
class DataTable extends Component {
  deleteItem = (offerID) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      const user = JSON.parse(localStorage.getItem("user"));

      fetch(
        "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/offeringpackage/" +
          `${offerID}`,
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
        <tr key={item.offerID}>
          <th scope="row">{item.offerID}</th>
          <td>{item.packageType}</td>
          <td>{item.value}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm
                buttonLabel="Edit"
                item={item}
                updateState={this.props.updateState}
              />{" "}
              <Button
                color="danger"
                onClick={() => this.deleteItem(item.offerID)}
              >
                Del
              </Button>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr style={{ backgroundColor: "#c8ced3", color: "#5c6873" }}>
            <th>ID</th>
            <th>Package Type</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </Table>
    );
  }
}

export default DataTable;
