import React from 'react';
import {  } from 'react-bootstrap'; 

class SongPlayerControl extends React.Component {
	render() {
		return (
			<div className="SongPlayer_Control">
				<div className="SongPlayer_Control_Progress">
					<div className="SongPlayer_Control_ProgressFull"></div>
					<div className="SongPlayer_Control_ProgressPass"></div>
					<div className="SongPlayer_Control_ProgressHolder"></div>
				</div>
				<div className="SongPlayer_Control_Prev"><span className="fa fa-step-backward"></span></div>
				<div className="SongPlayer_Control_Play"><span className="fa fa-play"></span></div>
				<div className="SongPlayer_Control_Next"><span className="fa fa-step-forward"></span></div>
				<div className="SongPlayer_Control_Time">01:02/03:32</div>
				<div className="SongPlayer_Control_Volume">
					<span className="fa fa-volume-up SongPlayer_Control_VolumeIcon"></span>
					<span className="SongPlayer_Control_VolumeSlide"></span>
				</div>
				<div className="SongPlayer_Control_Random"><span className="fa fa-random"></span></div>
				<div className="SongPlayer_Control_Download"><span className="fa fa-download"></span></div>
			</div>
		);

	}
}

export default SongPlayerControl;