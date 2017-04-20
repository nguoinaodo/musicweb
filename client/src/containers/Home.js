import { connect } from 'react-redux';
import Home from '../components/Home';
import { doLogout } from '../actions/logout';

export default connect(
	(state) => ({
	}), {
		doLogout: () => doLogout
	}
)(Home);