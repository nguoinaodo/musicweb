import postJSON from '../ajax/postJSON';
import getJSON from '../ajax/getJSON';
import { hashHistory } from 'react-router';

export const setStatus = (status) => {
	return {
		type: 'SET_LOGIN_STATUS',
		status
	}
} 

export const setInfo = (info) => {
	return {
		type: 'SET_LOGIN_INFO',
		info
	}
}

export const clearInfo = () => {
	return {
		type: 'CLEAR_LOGIN_INFO'
	}
}

export const doLogin = (dispatch, getState) => {
	const state = getState().login;
	console.log(state);
	dispatch(setStatus('Logging in'));
	postJSON('/api/user/login', state.info, (err, status, response) => {
		if (err) {
			console.log(err);
			return dispatch(setStatus('Error'));
		}
		if (response.errCode === 0) {
			dispatch(setStatus('Logged in as ' + response.data.user.username));
			dispatch(clearInfo());
			localStorage.setItem('user', JSON.stringify(response.data.user));
			hashHistory.push('/');
		} else {
			dispatch(setStatus('Login failed'));
		}
	});
}

export const doClose = (dispatch, getState) => {
	dispatch(clearInfo());
	hashHistory.push('/');
}