const DEFAULT_STATE = {
	status: '',
	info: null,
	show: true
};

const signup = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case 'SET_SIGNUP_STATUS':
			return {
				...state,
				status: action.status
			};
		case 'SET_SIGNUP_INFO': 
			return {
				...state,
				info: action.info
			}
		case 'CLEAR_SIGNUP_INFO':
			return {
				...state,
				info: null,
				show: true,
				status: ''
			};
		default: 
			return state;
	}
}

export default signup;