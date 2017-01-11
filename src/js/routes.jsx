import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import App from './components/App';
// import CounterPage from './components/CounterPage';
import Chat from './components/Chat';
// import TimePage from './components/TimePage';
export default (
	<Router history={hashHistory}>
	    <Route component={App} path='/'>
	    	<IndexRoute component={Chat}/>

	    </Route>
	    <Route component={Chat} path='chat'/>
    </Router>
);
