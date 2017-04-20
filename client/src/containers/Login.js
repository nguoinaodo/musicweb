import { connect } from 'react-redux';
import Login from '../components/Login';
import { doLogin, setInfo, doClose } from '../actions/login';

export default connect(
	(state) => ({
		// Map state to props
		status: state.login.status,
		show: state.login.show,
		info: state.login.info,
	}), {
		// Map dispatch to props
		doLogin: () => doLogin,
		setInfo,
		doClose: () => doClose
	}
)(Login);