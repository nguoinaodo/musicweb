import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import App from './App';

import Home from './containers/Home';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Dash from './components/Dash';

import Admin from './containers/admin/Admin';
import AdminDash from './components/admin/Dash';
import AdminLogin from './containers/admin/Login';

import store from './store/config';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const history = syncHistoryWithStore(hashHistory, store);

function checkAdminLogin(nextState, replace, callback) {
	try {
		const admin = JSON.parse(localStorage.getItem('admin'));
		if (!admin) {
			replace('/admin/login');
		}
		callback();
	} catch(err) {
		console.log(err);
		localStorage.clear();
		replace('/admin/login');
		callback();
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRedirect to="home"/>
				<Route path="signup" component={Signup} />
				<Route path="login" component={Login} />
				<Route path="home" component={Home} />
				<Route path="user" component={Dash} />
			</Route>
			<Route path="/admin" component={Admin} onEnter={checkAdminLogin}>
				{/* <IndexRoute component={AdminDash} /> 
				<IndexRedirect to="dash" />
				<Route path="dash" component={AdminDash} />*/}
			</Route>
			<Route path="/admin/login" component={AdminLogin} />
		</Router>
	</Provider>,
  document.getElementById('root')
);
