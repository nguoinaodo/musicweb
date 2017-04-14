import React from 'react';
import { Modal, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';

class Signup extends React.Component {

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
	}

	render() {
		return (
			<div className="Signup">
				<div>Signup</div>
				<Modal show={this.state.show}>
					<Modal.Header>Signup header</Modal.Header>
					<Modal.Body>
						<form onSubmit={this.submit} id="signup-form">
							<FormGroup>
								<ControlLabel>Username</ControlLabel>
								<FormControl type="text" placeholder="Enter username.." />
								<br/>
								<ControlLabel>Email</ControlLabel>
								<FormControl type="text" placeholder="Enter email.."/>
								<br/>
								<ControlLabel>Fullname</ControlLabel>
								<FormControl type="text" placeholder="Enter fullname.."/>
								<br/>
								<ControlLabel>Gender</ControlLabel>
								<select>
									<option value="0">Male</option>
	                <option value="1">Female</option>
	                <option value="2">Other</option>
								</select>
								<br/>
								<ControlLabel>Birthday</ControlLabel>
								<FormControl type="date" />
								<br/>
								<ControlLabel>Address</ControlLabel>
								<FormControl type="text" placeholder="Enter address.." value={this.state.address}/>
								<br/>
								<Button>Submit</Button>
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

export default Signup;