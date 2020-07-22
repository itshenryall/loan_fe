import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/ModalLoanAssignmentRule";
class DataTablesLoanAssignmentRule extends Component {
  deleteItem = (larID) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      const user = JSON.parse(localStorage.getItem("user"));

      fetch(
        "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/loanassignmentrule/"+
        `${larID}`,
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
        <tr key={item.larID}>
          <th scope="row">{item.larID}</th>
          <td>{item.larCreditScore}</td>
          <td>{item.larLoanRemarks}</td>
          <td>{item.larRecommendedLimit}</td>
          <td>{item.larMaxSeq}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm
                buttonLabel="Edit"
                item={item}
                updateState={this.props.updateState}
              />{" "}
              <Button
                color="danger"
                onClick={() => this.deleteItem(item.larID)}
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
            <th>Credit Score</th>
            <th>Loan Remarks</th>
            <th>Loan Recommended Limit</th>
            <th>Loan Max Sequence</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </Table>
    );
  }
}

export default DataTablesLoanAssignmentRule;
