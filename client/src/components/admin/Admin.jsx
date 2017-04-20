import React from 'react';
import { Modal, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';

class Admin extends React.Component {

	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout() {
		this.props.doLogout();
	}

	render() {
		return (
			<div className="Admin">		
				<div className="Logout">
					<Button onClick={this.logout}>Logout</Button>
				</div>	
			</div>
		);
	}
}

export default Admin;