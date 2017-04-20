import React from 'react';
import { Modal, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';

class UpdateInfo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			displayName: '',
			gender: 0,
			birthday: '1950-01-01',
			livingIn: ''
		};
		this.submit = this.submit.bind(this);
	}

	submit(e) {
		e.preventDefault();
	}

	render() {
		return (
			<div className="UpdateInfo">
				<form onSubmit={this.submit} id="signup-form">
					<FormGroup>
						<ControlLabel>Username</ControlLabel>
						<FormControl type="text" required placeholder="Enter username.." 
								onChange={(e)=> this.setState({
										username: e.target.value
								})} value={this.state.username} />
						<br/>
						<ControlLabel>Email</ControlLabel>
						<FormControl type="text" required placeholder="Enter email.." 
								onChange={(e)=> this.setState({
										email: e.target.value
								})} value={this.state.email} />
						<br/>
						<ControlLabel>Fullname</ControlLabel>
						<FormControl type="text" placeholder="Enter fullname.." required 
								onChange={(e)=> this.setState({
										displayName: e.target.value
								})} value={this.state.displayName} />
						<br/>
						<ControlLabel>Password</ControlLabel>
						<FormControl type="password" placeholder="Enter password.." required 
								onChange={(e)=> this.setState({
										password: e.target.value
								})} value={this.state.password} />
						<br/>
						<ControlLabel>Gender</ControlLabel>
						<select onChange={(e) => this.setState({
							gender: e.target.value
						})} value={this.state.gender}>
							<option value="0">Male</option>
			                <option value="1">Female</option>
			                <option value="2">Other</option>
						</select>
						<br/>
						<ControlLabel>Birthday</ControlLabel>
						<FormControl type="date" required 
								onChange={(e)=> this.setState({
										birthday: e.target.value
								})} value={this.state.birthday} />
						<br/>
						<ControlLabel>Address</ControlLabel>
						<FormControl type="text" placeholder="Enter address.."  required 
								onChange={(e)=> this.setState({
										livingIn: e.target.value
								})} value={this.state.livingIn} />
						<br/>
						<Button type="submit">Submit</Button>
					</FormGroup>
				</form>
			</div>
		);
	}
}

export default UpdateInfo;