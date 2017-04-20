import { connect } from 'react-redux';
import Admin from '../../components/admin/Admin';
import { doLogout } from '../../actions/admin';

export default connect(
	(state) => ({
		// Map state to props
	}), {
		// Map dispatch to props
		doLogout: () => doLogout
	}
)(Admin);