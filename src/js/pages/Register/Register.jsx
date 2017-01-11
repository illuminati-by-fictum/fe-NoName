import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {Form, FormGroup, Col, ButtonToolbar, ControlLabel,
		 Checkbox, Button, FormControl, PageHeader} from 'react-bootstrap';
import RegisterSuccess from './RegisterSuccess';

export class Register extends Component {
	constructor(context, props){
		super(context, props);
	}

	render(){

		let LoginTitle = (
 			<h2 className="form-group text-center">NoName... <small>Register and chat.</small></h2>
		);

		return (<Form horizontal>
					{LoginTitle}
				    <FormGroup controlId="formHorizontalEmail">
				      <Col componentClass={ControlLabel} sm={2}>
				        Email
				      </Col>
				      <Col sm={8}>
				        <FormControl type="email" placeholder="Email" />
				      </Col>
				    </FormGroup>
  					<FormGroup controlId="formHorizontalEmail">
				      <Col componentClass={ControlLabel} sm={2}>
				        Username
				      </Col>
				      <Col sm={8}>
				        <FormControl type="text" placeholder="Username" />
				      </Col>
				    </FormGroup>

				    <FormGroup controlId="formHorizontalPassword">
				     	<Col componentClass={ControlLabel} sm={2}>
				        	Password
					    </Col>
					    <Col sm={8}>
					    	<FormControl type="password" placeholder="Password" />
					    </Col>
				    </FormGroup>

				    <FormGroup controlId="formHorizontalPassword">
				     	<Col componentClass={ControlLabel} sm={2}>
				        	Confirm
					    </Col>
					    <Col sm={8}>
					    	<FormControl type="password" placeholder="Сonfirm password" />
					    </Col>
				    </FormGroup>

				    <FormGroup>
				    	<Col smOffset={2} sm={8}>
					       	<Button onClick={()=>this.setState({showSuccessModal: true})}>
					          	Register
					        </Button>
				       </Col>
				    </FormGroup> й

				    <RegisterSuccess 
				    		show={this.state&&this.state.showSuccessModal?this.state.showSuccessModal:false}
				    		onClose={()=>{this.setState({showSuccessModal: false})}}
				    		/>

				</Form>
		);
	}
}