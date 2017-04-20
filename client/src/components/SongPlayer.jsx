import React from 'react';
import {  } from 'react-bootstrap'; 
import SongItem from './SongItem';
import SongPlayerControl from './SongPlayerControl';

class SongPlayer extends React.Component {
	render() {
		return (
			<div className="SongPlayer">
				<div>SongPlayer</div>
				<div className="SongPlayer_MainScreen">
					<div className="SongPlayer_MainScreen_Cover">
						<img src="1.jpg" alt="img" />
					</div>
					<div className="SongPlayer_MainScreen_Lyric">
						<div>Lyric</div>
						<div>Con gio nhe nhang om mai dau </div>
					</div>
				</div>
				<SongPlayerControl />
				<div className="SongPlayer_Playing">
					<div className="SongName"><h3>Xe dap</h3></div>
					<div className="Artist">Thuy chi - M4U</div>
				</div>
				<div className="SongPlayer_Playlist">
					<SongItem />
					<SongItem />
					<SongItem />
				</div>
				<audio controls>
				  <source src="1.mp3" type="audio/mpeg" />
				Your browser does not support the audio element.
				</audio>
			</div>
		);

	}
}

export default SongPlayer;