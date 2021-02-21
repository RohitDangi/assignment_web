import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import AppConstants from "../../config/AppConstants";
import moment from "moment";

class ConformationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isOpen, onCancel, onSubmit } = this.props;
    let text =`Are you sure  all trades for ${moment().format(AppConstants.LOCAL_DATE_FORMAT)} are imported ?`
    return (
      <Modal isOpen={isOpen} toggle={onCancel}>
        <ModalHeader toggle={onCancel}>Confirm</ModalHeader>
        <ModalBody>{text}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={onCancel}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ConformationModal;
