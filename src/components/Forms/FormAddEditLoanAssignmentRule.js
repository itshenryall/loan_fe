import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddEditFormLoanAssignmentRule extends React.Component {
  state = {
    larID: "",
    larCreditScore: "",
    larLoanRemarks: "",
    larRecommendedLimit: "",
    larMaxSeq: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormAdd = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(
      "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/loanassignmentrule",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },

        body: JSON.stringify({
          larID: this.state.larID,
          larCreditScore: this.state.larCreditScore,
          larLoanRemarks: this.state.larLoanRemarks,
          larRecommendedLimit: this.state.larRecommendedLimit,
          larMaxSeq: this.state.larMaxSeq,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => response)
      .then((response) => {
        if (response.code >= 200) {
          this.props.addItemToState(response.data);
          this.props.toggle();
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
      "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/loanassignmentrule",
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
        body: JSON.stringify({
            larID: this.state.larID,
            larCreditScore: this.state.larCreditScore,
            larLoanRemarks: this.state.larLoanRemarks,
            larRecommendedLimit: this.state.larRecommendedLimit,
            larMaxSeq: this.state.larMaxSeq,
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
      const { larID, larCreditScore, larLoanRemarks, larRecommendedLimit, larMaxSeq } = this.props.item;
      this.setState({ larID, larCreditScore, larLoanRemarks, larRecommendedLimit, larMaxSeq });
    }
  }
  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="larID">Lar ID</Label>
          <Input
            type="text"
            name="larID"
            id="larID"
            onChange={this.onChange}
            value={this.state.larID === null ? "" : this.state.larID}
            required/>
        </FormGroup>
        <FormGroup>
          <Label for="larCreditScore">Credit Score</Label>
          <Input
            type="text"
            name="larCreditScore"
            id="larCreditScore"
            placeholder="ex: 01-15"
            onChange={this.onChange}
            value={
              this.state.larCreditScore === null ? "" : this.state.larCreditScore
            }
            required/>
        </FormGroup>
        <FormGroup>
          <Label for="larLoanRemarks">Loan Remarks</Label>
          <Input
            type="text"
            name="larLoanRemarks"
            id="larLoanRemarks"
            onChange={this.onChange}
            value={this.state.larLoanRemarks === null ? "" : this.state.larLoanRemarks}
            required/>
        </FormGroup>
        <FormGroup>
          <Label for="larRecommendedLimit">Recommended Limit</Label>
          <Input
            type="text"
            name="larRecommendedLimit"
            id="larRecommendedLimit"
            onChange={this.onChange}
            value={this.state.larRecommendedLimit === null ? "" : this.state.larRecommendedLimit}
            required/>
        </FormGroup>
        <FormGroup>
          <Label for="larMaxSeq">Loan Max Sequence</Label>
          <Input
            type="text"
            name="larMaxSeq"
            id="larMaxSeq"
            onChange={this.onChange}
            value={this.state.larMaxSeq === null ? "" : this.state.larMaxSeq}
            required/>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditFormLoanAssignmentRule;
