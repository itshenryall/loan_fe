import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";


class AddEditTransaction extends React.Component {
  state = {
    customerID: "",
    loanTrxID: "",
    msisdn: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  

  submitFormAdd = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(
      "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/loantransaction/",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },

        body: JSON.stringify({
          customerID: this.state.customerID,
          loanTrxID: this.state.loanTrxID,
          msisdn: this.state.msisdn,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => response)
      .then((response) => {
        if (response.code >= 200) {
          this.props.addItemToState(response.data);
          this.props.toggle();
          window.location.reload();
          alert(response.message+ ": Customer ID or MSISDN are not synchronous");
        } else {
          alert(response.message);
        }
      })

      .catch((err) => alert(err.message));
  };

  submitFormEdit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(
      "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/loantransaction",
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
        body: JSON.stringify({
          customerID: this.state.customerID,
          loanTrxID: this.state.loanTrxID,
          msisdn: this.state.msisdn,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => response)
      .then((response) => {
        if (response.code >= 200) {
          this.props.updateState(response.data);
          this.props.toggle();
          window.location.reload();
        } else {
          alert(response.message);
        }
      })

      .catch((err) => alert(err.message));
  };

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { customerID, loanTrxID, msisdn } = this.props.item;
      this.setState({ customerID, loanTrxID, msisdn});
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
       
        <FormGroup>
          <Label for="loanTrxID">Loan Trx ID</Label>
          <Input
            type="text"
            name="loanTrxID"
            id="loanTrxID"
            onChange={this.onChange}
            value={this.state.loanTrxID === null ? "" : this.state.loanTrxID}
            required/>
        </FormGroup>
        <FormGroup>
          <Label for="customerID">Customer ID</Label>
          <Input
            type="text"
            name="customerID"
            id="customerID"
            placeholder="Based on Customer ID, customer table"
            onChange={this.onChange}
            value={this.state.customerID === null ? "" : this.state.customerID}
            required />
        </FormGroup>
        <FormGroup>
          <Label for="msisdn">MSISDN</Label>
          <Input
            type="text"
            name="msisdn"
            id="msisdn"
            placeholder="Based on MSISDN customer table"
            onChange={this.onChange}
            value={
              this.state.msisdn === null ? "" : this.state.msisdn
            }
            required/>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditTransaction;
