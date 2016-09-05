import React from 'react';

const HomeOption = ({title,trigger}) => {
	return(
		<div className="col-md-3  noSelect jumbotron homeButton" onClick={trigger}>
			<p>{title}</p>
		</div>
	);
}

export default HomeOption;