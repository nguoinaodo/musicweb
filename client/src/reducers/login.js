const DEFAULT_STATE = {
	info: null,
	status: '',
	show: true
};

const login = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case 'SET_LOGIN_INFO':
			return {
				...state, 
				info: action.info
			};
		case 'SET_LOGIN_STATUS':
			return {
				...state,
				status: action.status
			};
		case 'CLEAR_LOGIN_INFO':
			return {
				...state,
				info: null,
				status: ''
			};
		default: 
			return state;
	}
};

export default login;