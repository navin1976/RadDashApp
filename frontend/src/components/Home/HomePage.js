import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
	return(
		<div>
			<div className = "jumbotron">
				<h1>Radiology Dashboard application</h1>
				<p>Application for responsive composable dashboards for health informatics</p>
				<Link to="/raddash/about" className="btn btn-primary btn-lg">Learn More </Link>
			</div>
		</div>
	);
} 
		
export default HomePage;
