import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import App 		from './pages/App';
import Chat 	from './pages/Chat';
import Login 	from './pages/Login';


export default (
	<Router history={hashHistory}>
	    <Route component={App} path='/'>
	    	<IndexRoute component={Chat}/>
	    </Route>
		<Route component={Login} path='login'/>
	  	<Route component={Chat} path='chat'/>
    </Router>
);
