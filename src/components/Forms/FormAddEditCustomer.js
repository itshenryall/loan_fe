import React from "react";
import { Button, Form, FormGroup, Label, Input, e } from "reactstrap";

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";


class AddEditFormCustomer extends React.Component {ß
  constructor (props) {
    super(props)
    this.state = {
    customerID: "",
    msisdn: "",
    sourceChannel: "",
    zoneArea: "",
    balance: "",
    arpu: "",
    los: "",
    creditScore: "",
    maxSeq: "",
    expired: new Date(),
    
  };
  
  this.handleChange = this.handleChange.bind(this);
  this.onFormSubmit = this.onFormSubmit.bind(this);
  
  }
  
  handleChange(date) {  
    this.setState({
      expired: date 
    })
    let today = date
    let datex = today.getDate() + "-"+ parseInt(today.getMonth() + 1).toString().padStart(2, "0") +"-"+today.getFullYear();
    alert(datex)
    }
  
  onFormSubmit(e) {
  e.preventDefault();
  console.log(this.state.expired)
  }
  
  
onChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
};


  submitFormAdd = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    
    let today = new Date(this.state.expired)
    let datex = today.getDate() + "-"+ parseInt(today.getMonth() + 1).toString().padStart(2, "0") +"-"+today.getFullYear();
    fetch(
      "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/customer",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },

        body: JSON.stringify({
          customerID: this.state.customerID,
          msisdn: this.state.msisdn,
          sourceChannel: this.state.sourceChannel,
          zoneArea: this.state.zoneArea,
          balance: this.state.balance,
          arpu: this.state.arpu,
          los: this.state.los,
          expired: datex,
          creditScore: this.state.creditScore,
          maxSeq: this.state.maxSeq,
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
        } else {
          alert(response.message);
        }
      })

      .catch((err) => alert(err.message));
  };

  submitFormEdit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    
    let today = new Date(this.state.expired)
    let datex = today.getDate() + "-"+ parseInt(today.getMonth() + 1).toString().padStart(2, "0") +"-"+today.getFullYear();
    fetch(
      "https://cors-anywhere.herokuapp.com/http://178.128.222.35:9100/loan-engine-web-services/api/customer",
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
        body: JSON.stringify({
          customerID: this.state.customerID,
          msisdn: this.state.msisdn,
          sourceChannel: this.state.sourceChannel,
          zoneArea: this.state.zoneArea,
          balance: this.state.balance,
          arpu: this.state.arpu,
          los: this.state.los,
          expired: datex,
          creditScore: this.state.creditScore,
          maxSeq: this.state.maxSeq,
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

      const { customerID, msisdn, sourceChannel, zoneArea, balance, arpu, los, datex, creditScore, maxSeq } = this.props.item;
      this.setState({ customerID, msisdn, sourceChannel, zoneArea, balance, arpu, los, datex, creditScore, maxSeq });
    }
  }
    
    
  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="customerID">Customer ID</Label>
          <Input
            type="text"
            name="customerID"
            id="customerID"
            onChange={this.onChange}
            value={this.state.customerID === null ? "" : this.state.customerID}
          />
        </FormGroup>
        <FormGroup>
          <Label for="msisdn">MSISDN</Label>
          <Input
            type="text"
            name="msisdn"
            id="msisdn"
            placeholder="ex: 08124882121"
            onChange={this.onChange}
            value={
              this.state.msisdn === null ? "" : this.state.msisdn
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="sourceChannel">Source Channel</Label>
          <Input
            type="text"
            name="sourceChannel"
            id="sourceChannel"
            onChange={this.onChange}
            value={this.state.sourceChannel === null ? "" : this.state.sourceChannel}
          />
        </FormGroup>
        <FormGroup>
          <Label for="zoneArea">Zone Area</Label>
          <Input
            type="text"
            name="zoneArea"
            id="zoneArea"
            onChange={this.onChange}
            value={this.state.zoneArea === null ? "" : this.state.zoneArea}
          />
        </FormGroup>
        <FormGroup>
          <Label for="balance">Balance</Label>
          <Input
            type="text"
            name="balance"
            id="balance"
            onChange={this.onChange}
            value={this.state.balance === null ? "" : this.state.balance}
          />
        </FormGroup>
        <FormGroup>
          <Label for="arpu">Arpu</Label>
          <Input
            type="text"
            name="arpu"
            id="arpu"
            onChange={this.onChange}
            value={this.state.arpu === null ? "" : this.state.arpu}
          />
        </FormGroup>
        <FormGroup>
          <Label for="los">LOS</Label>
          <Input
            type="text"
            name="los"
            id="los"
            onChange={this.onChange}
            value={this.state.los === null ? "" : this.state.los}
          />
        </FormGroup>
        <FormGroup>
          <Label for="datex">Expired</Label><br/> 
          <DatePicker
          selected={ this.state.expired }
          value={this.state.expired === null ? "" : this.state.expired}
          onChange={ this.handleChange }
          dateFormat="dd-MM-yyyy"
          className="form-control"
          />
        </FormGroup>
        <FormGroup>
          <Label for="creditScore">Credit Score</Label>
          <Input
            type="text"
            name="creditScore"
            id="creditScore"
            onChange={this.onChange}
            value={this.state.creditScore === null ? "" : this.state.creditScore}
          />
        </FormGroup>
        <FormGroup>
          <Label for="maxSeq">Max Sequence</Label>
          <Input
            type="text"
            name="maxSeq"
            id="maxSeq"
            onChange={this.onChange}
            value={this.state.maxSeq === null ? "" : this.state.maxSeq}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditFormCustomer;
