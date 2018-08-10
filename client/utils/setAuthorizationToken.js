import axios from 'axios';

export default function setAuthorizationToken(token) {
	if(token) {
		// console.log(token);
		// console.log(axios.defaults.headers);
		// console.log(axios.defaults.headers.common);
		axios.defaults.headers['Authorization'] =`Bearer ${token}`;
	} else {
		delete axios.defaults.headers['Authorization'];
	}
}