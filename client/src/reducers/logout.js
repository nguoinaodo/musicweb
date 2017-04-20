const DEFAULT_STATE = {
	status: ''
};

const logout = (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case 'SET_LOGOUT_STATUS':
			return {
				...state,
				status: action.status
			};
		default:
			return state;
	}
};

export default logout;