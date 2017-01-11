

import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {Modal, Button} from 'react-bootstrap';

export class Message extends Component {
	constructor(context, props){
		super(context, props);
	}

	render(){
		let position=this.props.message.me ? "right" : "left";
		let timePos = this.props.message.me?"":"right";
		let {text, time, user} = this.props.message;
		return (        
				<li className={position+" clearfix"}>
					<span className={"chat-img pull-"+position}>
	                	<img src={user.avatar} alt="User Avatar" className="img-circle" />
	                </span>
	                <div className="chat-body clearfix">
	                    <div className="header">
	                    	<strong className={"pull-"+position+" primary-font"}>
								{user.username}
	                    	</strong>
	                        <small className={timePos.length?"pull-"+timePos:""+" text-muted"}> 	
	                         	<span className="glyphicon glyphicon-time"></span>
	                         	{time}
	                        </small>
	                      
	                    </div>
	                    <p>  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                    dolor, quis ullamcorper ligula sodales.</p>
	                </div>
	            </li>
		);
	}
}
			