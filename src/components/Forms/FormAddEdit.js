import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddEditForm extends React.Component {
  state = {
    offerID: "",
    packageType: "",
    value: 0,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormAdd = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(
      "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/offeringpackage",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },

        body: JSON.stringify({
          offerID: this.state.offerID.toUpperCase(),
          packageType: this.state.packageType.toUpperCase(),
          value: this.state.value,
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
      "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/offeringpackage",
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
        body: JSON.stringify({
          offerID: this.state.offerID.toUpperCase(),
          packageType: this.state.packageType.toUpperCase(),
          value: this.state.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => response.code)
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

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { offerID, packageType, value } = this.props.item;
      this.setState({ offerID, packageType, value });
    }
  }
  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="offerID">Offer ID</Label>
          <Input
            type="text"
            name="offerID"
            id="offerID"
            onChange={this.onChange}
            value={this.state.offerID === null ? "" : this.state.offerID}
          />
        </FormGroup>
        <FormGroup>
          <Label for="packageType">Package Type</Label>
          <Input
            type="text"
            name="packageType"
            id="packageType"
            placeholder="ex: SMS, VOICE, DATA"
            onChange={this.onChange}
            value={
              this.state.packageType === null ? "" : this.state.packageType
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="value">Value</Label>
          <Input
            type="text"
            name="value"
            id="value"
            onChange={this.onChange}
            value={this.state.value === null ? "" : this.state.value}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm;
