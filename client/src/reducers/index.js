import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import signup from './signup';
import login from './login';
import logout from './logout';
import admin from './admin';

export default combineReducers({
	routing: routerReducer,
	signup: signup,
	logout: logout,
	login: login,
	admin: admin
});