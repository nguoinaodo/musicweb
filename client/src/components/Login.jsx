import React from 'react';
import { Modal, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
		this.close = this.close.bind(this);
	}
	
	close() {
		this.setState({
			show: false
		});
		console.log(this.usernameInput);
		console.log(this.passwordInput);
	}

	render() {
		return (
			<div className="Login">
				<div>Login</div>
				<Modal show={this.state.show}>
					<Modal.Header>Login header</Modal.Header>
					<Modal.Body>
						<form onSubmit={this.submit} id="login-form">
							<FormGroup>
								<ControlLabel>Ten dang nhap</ControlLabel>
								<FormControl type="text" placeholder="" ref={(input) => { this.usernameInput = input; }} />
								<br/>
								<ControlLabel>Mat khau</ControlLabel>
								<FormControl type="password" placeholder="" ref={(input) => { this.passwordInput = input; }} />
								<br/>
								<Button>Login</Button>
							</FormGroup>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close}>Close</Button>
					</Modal.Footer>
				</Modal>				
			</div>
		);
	}
}

export default Login;