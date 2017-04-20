import React from 'react';
import {  } from 'react-bootstrap'; 

class MVCover extends React.Component {
	render() {
		return (
			<div className="MVCover">
				<div>MVCover</div>
				<div className="MVCover_Cover">
					<img src="1.jpg" alt="Img" />
				</div>
				<div className="MVCover_Title">
					<div>Trai tim khong ngu yen Trai tim</div>
				</div>
				<div className="MVCover_Artist">
					<div>Thuy Chi - Ta Quang Thang</div>
				</div>
			</div>
		);
	}
}

export default MVCover;