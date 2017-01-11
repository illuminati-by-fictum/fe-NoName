import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {Form, FormGroup, Col, ButtonToolbar, ControlLabel,
		 Checkbox, Button, FormControl, PageHeader} from 'react-bootstrap';

export class Login extends Component {
	constructor(context, props){
		super(context, props);
	}

	render(){

		let LoginTitle = (
 			<h2 className="form-group text-center">NoName... <small>Login and chat.</small></h2>
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

				    <FormGroup controlId="formHorizontalPassword">
				     	<Col componentClass={ControlLabel} sm={2}>
				        	Password
					    </Col>
					    <Col sm={8}>
					    	<FormControl type="password" placeholder="Password" />
					    </Col>
				    </FormGroup>

				    <FormGroup>
				      	<Col smOffset={2} sm={10}>
				        	<Checkbox>Remember me</Checkbox>
				      	</Col>
				    </FormGroup>

				    <FormGroup>
				    	<Col smOffset={2} sm={8}>
				   		<ButtonToolbar>
					        	<Button type="submit">
					          		Sign in
					        	</Button>
					        	<Link className="btn btn-info" to="register" >
					          		Register
					        	</Link>
				       </ButtonToolbar>
				       </Col>
				    </FormGroup>
				</Form>
		);
	}
}