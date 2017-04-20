import { connect } from 'react-redux';
import TopNavbar from '../components/TopNavbar';
import { doLogout } from '../actions/logout';

export default connect(
	(state) => ({
		// Map state to props
	}), {
		// Map dispatch to props
		// doLogout: () => doLogout
	}
)(TopNavbar);