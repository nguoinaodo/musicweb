import React from 'react';
import TopNavbar from './TopNavbar';
import SecondNavbar from './SecondNavbar';

class Header extends React.Component {
	render() {
		return (
			<div className="Header">
				<TopNavbar doLogout={this.props.doLogout}/>
				<SecondNavbar />
			</div>
		);
	}
}

export default Header;