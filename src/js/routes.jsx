import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import App 		from './pages/App';
import Chat 	from './pages/Chat';
import Login 	from './pages/Login';
import Register from './pages/Register';
import authRequire from './auth/auth_require';

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (
	<Router history={hashHistory}>
	    <Route component={App} path='/'  onEnter={authRequire}>
	    	<IndexRoute component={Chat}/>
		  	<Route component={Chat} path='chat'/>
		</Route>
		<Route component={Login} path='login'/>
		<Route component={Register} path='register'/>
    </Router>
);
