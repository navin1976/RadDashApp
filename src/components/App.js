/*This component will wrap every page,
 use it display common elements such as 
 navigation, header , footer, etc...*/

import React, {PropTypes} from 'react';
import Header from './common/Header';

class App extends React.Component{
	render(){
		return(
			<div className="container-fluid">
				<Header />
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired
};

export default App;