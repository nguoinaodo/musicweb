import { hashHistory } from 'react-router';
import postJSON from '../ajax/postJSON';

export const setStatus = (status) => {
	return {
		type: 'SET_SIGNUP_STATUS',
		status
	}
}

export const setInfo = (info) => {
	return {
		type: 'SET_SIGNUP_INFO',
		info
	}
}

export const clearInfo = () => {
	return {
		type: 'CLEAR_SIGNUP_INFO'
	}
}

export const doSignup = (dispatch, getState) => {
	const state = getState().signup;
	console.log(state);
	dispatch(setStatus('Signing up'));
	postJSON('/api/user/signup', state.info, (err, status, response) => {
		if (err) {
			console.log(err);
			dispatch(setStatus('Error'));
		}
		if (response.errCode === 0) {
			dispatch(setStatus('Signup success'));
			dispatch(clearInfo());
			localStorage.setItem('user', JSON.stringify(response.data.user));
			hashHistory.push('/');
		} else {
			dispatch(setStatus('Signup failed'));
		}
	});
}

export const doClose = (dispatch, getState) => {
	dispatch(clearInfo());
	hashHistory.push('/');
}