import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddListForm from "../Forms/FormListOffering";

class ModalTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );

    const label = this.props.buttonLabel;

    let button = "";
    let title = "";

    if (label === "Request Offering") {
      button = (
        <Button
          color="success"
          onClick={this.toggle}
          style={{ float: "left", marginRight: "10px" }}
        >
          {label}
        </Button>
      );
      title = "List Possible Offering";
    } else {
      alert("Not Found Data");
    }

    return (
      <div>
        {button}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            {title}
          </ModalHeader>
          <ModalBody>
            <AddListForm
              listState={this.props.listState}
              toggle={this.toggle}
              item={this.props.item}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalTransaction;
