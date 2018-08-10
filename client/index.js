import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer  from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';
import Cookies from 'js-cookie';
import routes from './routes';

const store = createStore(
	rootReducer,
	compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

var jwt = Cookies.get('jwt');

// if(localStorage.jwtToken) {
// 	setAuthorizationToken(localStorage.jwtToken);
// 	store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
// }

if(jwt) {
	setAuthorizationToken(jwt);
	store.dispatch(setCurrentUser(jwtDecode(jwt)));
}

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>, document.getElementById('app'));