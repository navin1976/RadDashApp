import React from 'react';

const Wrapper = (props) => {
	return(
		<div id="content-area">
			<div id="page-content-wrapper">
				<div className="container-fluid layout">
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Wrapper;