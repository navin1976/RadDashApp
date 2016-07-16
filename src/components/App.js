/*This component will wrap every page,
 use it display common elements such as 
 navigation, header , footer, etc...*/

import React, {PropTypes} from 'react';
import Header from './Common/Header';

class App extends React.Component{
	render(){
		return(
			<div id="wrapper">
				<Header />
					<div id="page-content-wrapper">
						<div className="container-fluid">
							{this.props.children}
						</div>
					</div>
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired
};

App.contextTypes = { store: React.PropTypes.object };

export default App;