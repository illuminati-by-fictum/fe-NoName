import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {Modal, Button} from 'react-bootstrap';

export class RegisterSuccess extends Component {
	constructor(context, props){
		super(context, props);
	}

	render(){
		return (        
			<div>
				<Modal show={this.props.show} onHide={this.props.onClose}>
			          <Modal.Header closeButton>
			            <Modal.Title>Successful registration.</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            <h4>Congratulations!</h4>
			            <p>You are successfully registered and you are able to use Noname chat without any interruptions.</p>
			          </Modal.Body>
			          <Modal.Footer>
			            <Button onClick={this.props.onClose}>Close</Button>
			          </Modal.Footer>
	        	</Modal>
	        </div>
		);
	}
}