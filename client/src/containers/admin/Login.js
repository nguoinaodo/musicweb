import { connect } from 'react-redux';
import Login from '../../components/admin/Login';
import { doLogin, setInfo, doClose } from '../../actions/admin';

export default connect(
	(state) => ({
		// Map state to props
		status: state.admin.status,
		show: state.admin.show,
		loginInfo: state.admin.loginInfo,
	}), {
		// Map dispatch to props
		doLogin: () => doLogin,
		setInfo,
		doClose: () => doClose
	}
)(Login);