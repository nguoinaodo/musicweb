import postJSON from '../ajax/postJSON';
import getJSON from '../ajax/getJSON';
import { hashHistory } from 'react-router';

export const setStatus = (status) => {
	return {
		type: 'SET_ADMIN_STATUS',
		status
	}
} 

export const setInfo = (info) => {
	return {
		type: 'SET_ADMIN_LOGIN_INFO',
		info
	}
}

export const clearInfo = () => {
	return {
		type: 'CLEAR_ADMIN_INFO'
	}
}

export const doLogin = (dispatch, getState) => {
	const state = getState().admin;
	console.log(state);
	dispatch(setStatus('Logging in'));
	postJSON('/api/admin/login', state.loginInfo, (err, status, response) => {
		if (err) {
			console.log(err);
			return dispatch(setStatus('Error'));
		}
		if (response.errCode === 0) {
			dispatch(setStatus('Logged in as admin ' + response.data.admin.username));
			dispatch(clearInfo());
			localStorage.setItem('admin', JSON.stringify(response.data.admin));
			hashHistory.push('/admin');
		} else {
			dispatch(setStatus('Login failed'));
		}
	});
}

export const doLogout = (dispatch, getState) => {
	getJSON('/api/admin/logout', (err, status, response) => {
		localStorage.removeItem('admin');
		dispatch(setStatus('Logout admin success'));
		hashHistory.push('/admin/login');
	});
}

export const doClose = (dispatch, getState) => {
	dispatch(clearInfo());
	hashHistory.push('/admin');
}