import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isOpen, onCancel, onSubmit } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={onCancel}>
        <ModalHeader toggle={onCancel}>Delete</ModalHeader>
        <ModalBody>Are you sure ?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeleteModal;
