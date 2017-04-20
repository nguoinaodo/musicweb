import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { doSignup, setInfo, doClose } from '../actions/signup';

export default connect(
	(state) => ({
		// Map state to props
		status: state.signup.status,
		info: state.signup.info,
		show: state.signup.show
	}), {
		// Map dispatch to props
		doSignup: () => doSignup,
		setInfo,
		doClose: () => doClose
	}
)(Signup);