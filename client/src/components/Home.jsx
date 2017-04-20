import React, { Component } from 'react';
import Header from './Header';
import SongList from './SongList';
import MVList from './MVList';
import SongPlayer from './SongPlayer';
import VideoPlayer from './VideoPlayer';
import MVCover from './MVCover';
import Footer from './Footer';

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<Header doLogout={this.props.doLogout}/>
				<MVList />
				<SongList />
				<Footer />
			</div>
		);
	}
}

export default Home;