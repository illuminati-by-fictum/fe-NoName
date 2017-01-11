import React, { Component, PropTypes } from 'react';
import Message from '../../components/message';



export class Chat extends Component {
	constructor(context, props){
		super(context, props);
	}

	render(){

		let messages=[
			{text: 'blablabal1', user: {username:'mr Me', 	avatar:'http://placehold.it/50/FA6F57/fff&text=ME'}, 	time: Date.now(), me:true},
			{text: 'blablabal2', user: {username:'UUU UUU', avatar:'http://placehold.it/50/55C1E7/fff&text=U'}, 	time: Date.now(), me:false},
			{text: 'blablabal3', user: {username:'mr Me', 	avatar:'http://placehold.it/50/FA6F57/fff&text=ME'}, 	time: Date.now(), me:true},
			{text: 'blablabal4', user: {username:'mr Me', 	avatar:'http://placehold.it/50/FA6F57/fff&text=ME'}, 	time: Date.now(), me:true},
		];

		let msgsToRender=messages.map((i, key)=>{return <Message key={key} message={i}/>});

		return (<div className="panel panel-primary">
	                <div className="panel-heading">
	                    <span className="glyphicon glyphicon-comment"></span> Chat
	                    <div className="btn-group pull-right">
	                        <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
	                            <span className="glyphicon glyphicon-chevron-down"></span>
	                        </button>
	                        <ul className="dropdown-menu slidedown">
	                            <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-refresh">
	                            </span>Refresh</a></li>
	                            <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-ok-sign">
	                            </span>Available</a></li>
	                            <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-remove">
	                            </span>Busy</a></li>
	                            <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-time"></span>
	                                Away</a></li>
	                            <li className="divider"></li>
	                            <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-off"></span>
	                                Sign Out</a></li>
	                        </ul>
	                    </div>
	                </div>
	                <div className="panel-body">
	                    <ul className="chat">
	        				{msgsToRender}

	        				
	                    </ul>
	                </div>
	                <div className="panel-footer">
	                    <div className="input-group">
	                        <input id="btn-input" type="text" className="form-control input-sm" placeholder="Type your message here..." />
	                        <span className="input-group-btn">
	                            <button className="btn btn-warning btn-sm" id="btn-chat">
	                                Send</button>
	                        </span>
	                    </div>
	                </div>
            </div>);
	}
}