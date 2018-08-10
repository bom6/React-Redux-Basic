import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';
// import Cookies from 'js-cookie';

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	};
}
export function logout(data) {
	return dispatch => {
		localStorage.removeItem('jwtToken');
		// res.clearCookie('jwt');
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	}
}

//make request to server
export function login(data) {
	return dispatch => {
		return axios.post('/api/auth', data).then (res => {
			const token = res.data.token;
			localStorage.setItem('jwtToken', token);
			// res.data.cookie('jwtToken', token);
			Cookies.set('jwtToken', 'value');
			setAuthorizationToken(token);
			dispatch(setCurrentUser(jwtDecode(token)));
		});
	}
}

