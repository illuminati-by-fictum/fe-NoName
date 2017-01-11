import React, { Component, PropTypes } from 'react';


export class Chat extends Component {
	constructor(context, props){
		super(context, props);
	}

	createF = () =>{
		console.log("createF");
	}
	render(){
		this.createF();
		return (<div>HELLO</div>);
	}
}