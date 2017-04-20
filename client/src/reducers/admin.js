const DEFAULT_STATE = {
	loginInfo: null,
	status: '',
	show: true
};

const admin = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case 'SET_ADMIN_LOGIN_INFO':
			return {
				...state, 
				loginInfo: action.info
			};
		case 'SET_ADMIN_STATUS':
			return {
				...state,
				status: action.status
			};
		case 'CLEAR_ADMIN_INFO':
			return {
				...state,
				loginInfo: null,
				status: ''
			};
		default: 
			return state;
	}
};

export default admin;