import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CardModal(props) {
  const [newName, setNewName] = useState('');

  const handleNameEdit = () => {
    props.handleEditCard(props.cardDetails.id, newName);
    props.onHide();
    setNewName('');
  }

  const handleEditChange = (e) => {
    setNewName(e.target.value);
  }

  return (
    <Modal
      {...props}
      size="med"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" value={newName} onChange={handleEditChange} rows={1} placeholder="Edit Name" />
            </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={handleNameEdit}>
          Save Name
        </Button>
        {' '}
        <Button variant="outline-primary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardModal;