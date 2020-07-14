import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';


import { Container, Row, Col } from 'reactstrap'
import ModalForm from '../../components/Modals/Modal'
import DataTable from '../../components/Tables/DataTable'
import { CSVLink } from "react-csv"

class Transaction extends Component {
  state = {
    data: [],
  }

  getdata(){
    fetch('https://api.jsonbin.io/b/5f0d2013c58dc34bf5d2f0cf')
      .then(response => response.json())
      .then(data => this.setState({data}))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      data: [...prevState.data, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.data.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all data from beginning to the indexed item
      ...this.state.data.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the data to the array from the index after the replaced item
      ...this.state.data.slice(itemIndex + 1)
    ]
    this.setState({ data: newArray })
  }

  deleteItemFromState = (id) => {
    const updateddata = this.state.data.filter(item => item.id !== id)
    this.setState({ data: updateddata })
  }

  componentDidMount(){
    this.getdata()
  }

  render() {
    return (
      <Container className="App">


        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}></h1>
 
          </Col>
        </Row>

        <Row>
        <br/>
            <br/>
            <br/>
            <br/>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={this.state.data}>
              Download CSV
            </CSVLink>
            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
        
 
        <Row>
          <Col>
            <DataTable data={this.state.data} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>

        
      </Container>
    )
  }
}

export default Transaction