import React from 'react';
import { Pagination } from 'react-bootstrap'; 
import SongItem from './SongItem';

class SongList extends React.Component {
	render() {
		return (
			<div className="SongList">
				<div>List nhac</div>
				<SongItem />
				<SongItem />
				<Pagination prev next first last ellipsis boundaryLinks items={20} maxButtons={5} activePage={1} 
						onSelect={this.handleSelect} />
			</div>
		);
	}
}

export default SongList;