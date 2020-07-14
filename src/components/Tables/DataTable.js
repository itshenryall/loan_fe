import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'
import paginationFactory from 'react-bootstrap-table2-paginator';
class DataTable extends Component {

  deleteItem = offerID => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('https://api.jsonbin.io/b/5f0d2013c58dc34bf5d2f0cf', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        offerID
      })
    })
      .then(response => response.json())
      console.log("babadba"+ (response => response.json()))
      .then(item => {
        this.props.deleteItemFromState(offerID)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const data = this.props.data.map(item => {
      return (
        <tr key={item.offerID}>
          <th scope="row">{item.offerID}</th>
          <td>{item.packageType}</td>
          <td>{item.value}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.offerID)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr style={{backgroundColor:"#c8ced3", color:"#5c6873"}}> 
            <th>ID</th>
            <th>Package Type</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody> 
          {data}
        </tbody>
      </Table>
    )
  }
}

export default DataTable