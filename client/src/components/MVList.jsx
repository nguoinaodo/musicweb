import React from 'react';
import { Pagination } from 'react-bootstrap'; 
import MVCover from './MVCover';

class MVList extends React.Component {
	render() {
		return (
			<div className="MVList">
				<div>List MV</div>
				<MVCover />
				<MVCover />
			</div>
		);
	}
}

export default MVList;