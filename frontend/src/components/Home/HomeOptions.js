import React from 'react';

const HomeOption = ({title,trigger}) => {
	return(
		<div className="col-md-6  noSelect " onClick={trigger}>
			<div className="jumbotron homeButton">
			<p>{title}</p>
			</div>
		</div>
	);
}

export default HomeOption;