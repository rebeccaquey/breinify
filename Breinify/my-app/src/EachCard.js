import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";



export default class EachCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      newName: '',
    }
    this.handleNameEdit = this.handleNameEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
  }

  handleNameEdit() {
    this.props.handleEditCard(this.props.cardDetails.id, this.state.newName)
  }

  handleEditChange(e) {
    this.setState({
      newName: e.target.value
    })
  }

  handleDelete() {
    this.props.handleDeleteCard(this.props.cardDetails.id)
  }
  
  render() {
    return (
      <Col className="container-fluid mt-4" sm={3}>
        <Card className="h-100" >
          <Card.Header>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" value={this.state.newName} onChange={this.handleEditChange} rows={1} placeholder="Edit Name" />
              </Form.Group>
            </Form>
            <Button variant="outline-success" onClick={this.handleNameEdit}>
              Save Name
            </Button>
            {' '}
            <Button variant="outline-danger" onClick={this.handleDelete}>
              Delete Card
            </Button>
            {' '}
          </Card.Header>
          <Card.Body>
            <Card.Title>{this.props.cardDetails.card_name}</Card.Title>
            <Card.Text>
              {this.props.cardDetails.card_description}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{this.props.cardDetails.creationtime}</small>
          </Card.Footer>
        </Card>
      </Col>
    )
  }
}