import React from 'react';
import { Modal, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
import MVList from './MVList';
import UpdateInfo from './UpdateInfo';

class Dash extends React.Component {

	constructor(props) {
		super(props);
	}

	submit(e) {
		e.preventDefault();
		console.log('')
	}

	render() {
		return (
			<div className="UserDash">
				<Button>Create playlist</Button>
				<Button>Update info</Button>
				<UpdateInfo />
				<div className="Playlist">
					<MVList />
				</div>
			</div>
		);
	}
}

export default Dash;