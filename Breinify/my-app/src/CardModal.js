import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CardModal(props) {
  const [editedName, setEditedName] = useState('');
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleNameEdit = () => {
    props.handleEditCard(props.cardDetails.id, editedName);
    props.onHide();
    setEditedName('');
  }

  const handleAdd = () => {
    props.handleAddCard(newName, newDesc);
    props.onHide();
    setNewName('');
    setNewDesc('');
  }

  const handleChanges = (e) => {
    let currentPlaceholder = e.target.placeholder
    let currentVal = e.target.value
    if (currentPlaceholder === 'Edit Name') {
      setEditedName(currentVal)
    } else if (currentPlaceholder ==='Name') {
      setNewName(currentVal);
    } else if (currentPlaceholder === 'Description') {
      setNewDesc(currentVal);
    }
  }
  let body = '';
  let footer = '';
  if (props.modalAction === 'edit') {
    body = (
    <Form>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" value={editedName} onChange={handleChanges} rows={1} placeholder="Edit Name" />
      </Form.Group>
    </Form>
    )
    footer = (
      <Button variant="outline-success" onClick={handleNameEdit}>
      Save
    </Button>
    )
  } else {
    body = (
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" value={newName} onChange={handleChanges} rows={1} placeholder="Name" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" value={newDesc} onChange={handleChanges} rows={1} placeholder="Description" />
        </Form.Group>
      </Form>
      )
      footer = (
        <Button variant="outline-success" onClick={handleAdd}>
        Add Card
      </Button>
      )
  }

  return (
    <Modal
      {...props}
      size="med"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        {footer}
        {' '}
        <Button variant="outline-primary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

}

export default CardModal;