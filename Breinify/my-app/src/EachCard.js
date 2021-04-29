import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";
import { BiPencil } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";

function EachCard(props) {
  const handleClick = () => {
    props.handleModalClick();
    props.handleEditClick(props.cardDetails);
  }

  const handleDelete = () => {
    props.handleDeleteCard(props.cardDetails.id);
  }

  return (
    <Col className="container-fluid mt-4" sm={3}>
      <Card className="h-100" >
        <Card.Header>
          <Card.Title>
            {props.cardDetails.card_name}
            <BiPencil className="icon" onClick={handleClick} />
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {props.cardDetails.card_description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            {props.cardDetails.creationtime}
          </small>
          <span className="icon">
            <BiTrash onClick={handleDelete} />
          </span>
        </Card.Footer>
      </Card>
    </Col>
  )
}

export default EachCard;