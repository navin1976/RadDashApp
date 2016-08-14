/*This component will wrap every page,
 use it display common elements such as 
 navigation, header , footer, etc...*/

import React, {PropTypes} from 'react';
import Header from './Common/Header';
import {connect} from 'react-redux';

class App extends React.Component{
	render(){
		return(
			<div id="wrapper">
				<Header loading={this.props.loading}/>
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps){
	return {
		loading: state.ajaxCallsInProgress > 0
	};
}

App.contextTypes = { store: React.PropTypes.object };

export default connect(mapStateToProps)(App);