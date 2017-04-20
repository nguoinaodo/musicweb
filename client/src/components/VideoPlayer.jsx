import React from 'react';
import {  } from 'react-bootstrap'; 

class VideoPlayer extends React.Component {
	render() {
		return (
			<div className="VideoPlayer">
				<div>VideoPlayer</div>
				<video controls>
					<source src="1.mp4" type="video/mp4" />
					<source src="mov_bbb.ogg" type="video/ogg" />
					Your browser ddfdfdoes not su pport HTML5 v ideo.
				</video>
			</div>
		);
	}
}

export default VideoPlayer;