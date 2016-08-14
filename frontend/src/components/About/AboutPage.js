import React from 'react';
import Wrapper from '../Common/Wrapper';

class AboutPage extends React.Component{
	render(){
		return(
			<Wrapper>
				<div className="info-context">
					<h1>About</h1>
					<p>This application uses React, Redux, React Router and a variety of other helpful libraries</p>
				</div>
			</Wrapper>
		);
	}
}

export default AboutPage;