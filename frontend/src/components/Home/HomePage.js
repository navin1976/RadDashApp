import React from 'react';
import {Link} from 'react-router';
import Wrapper from '../Common/Wrapper';

const HomePage = () => {
	return(
		<Wrapper>
			<div className = "jumbotron">
				<h1>Radiology Dashboard application</h1>
				<p>Application for responsive composable dashboards for health informatics</p>
				<Link to="about" className="btn btn-primary btn-lg">Learn More </Link>
			</div>
		</Wrapper>
	);
};
		
export default HomePage;
