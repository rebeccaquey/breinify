import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";


export default class EachCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    return (
      <Col className="container-fluid mt-4" sm={3}>
        <Card className="h-100" >
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
