import React from 'react';
import Collapsible from 'react-collapsible';
import Wrapper from '../Common/Wrapper';

class AboutPage extends React.Component{
	render(){
		return(
			<Wrapper>
				<div className="info-context">
					<h1>About</h1>
					<p>This application uses React, Redux, React Router and a variety of other helpful libraries</p>
					<Collapsible trigger="How to edit an existing widget">
						<p>Love love me do</p>
					</Collapsible>
					<Collapsible trigger="How to add a widget to a dashboard">
						<p>Love love me do</p>
					</Collapsible>
					<Collapsible trigger="How to delete a widget from a dashboard">
						<p>Love love me do</p>
					</Collapsible>
					<Collapsible trigger="How to alter the default dashboard for a given role">
						<p>Love love me do</p>
					</Collapsible>
					<Collapsible trigger="How to create a new role">
						<p>Love love me do</p>
					</Collapsible>
					<Collapsible trigger="How to alter the permissions for a given role">
						<p>Love love me do</p>
					</Collapsible>
					<Collapsible trigger="How to alter access to a data source for a given role">
						<p>Love love me do</p>
					</Collapsible>
				</div>
			</Wrapper>
		);
	}
}

export default AboutPage;