import React from 'react';

class SongItem extends React.Component {
	render() {
		return (
			<div className="SongItem">
				{/*
					<span className="Name"><a>Song name</a></span>
					&nbsp;
					<span className="Artist">- <a>Artist</a></span>
					&nbsp;
					<span className="IsOfficial">Official</span>
					&nbsp;
					<span className="Quality">HQ</span>
					&nbsp;
					<span className="Listened"><i className="fa fa-headphones"></i> 1234344</span>
					&nbsp;
					<span className="Play glyphicon glyphicon-play"></span>
					&nbsp;
					<span className="AddToFavourite glyphicon glyphicon-heart"></span>
					&nbsp;
					<span className="NewWindow fa fa-clone"></span>
					&nbsp;
				*/}

				<ul>
					<li className="Name"><span><a>Trai tim khong ngu yen</a></span></li>
					<li className="Artist"><span>Thuy Chi, Ta Quang Thang</span></li>
					<li className="IsOfficial"><span>Official</span></li>
					<li className="Quality"><span>HQ</span></li>
					<li className="NewWindow"><span className="fa fa-clone"></span></li>
					<li className="AddToFavourite"><span className="glyphicon glyphicon-heart"></span></li>
					<li className="Play"><span className="glyphicon glyphicon-play"></span></li>
					<li className="Listened"><span><i className="fa fa-headphones"></i> 1234344</span></li>
				</ul>
			</div>
		);
	}
}

export default SongItem;