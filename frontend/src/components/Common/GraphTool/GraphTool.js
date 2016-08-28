import React from 'react';
import Wrapper from '../Wrapper';
import OptionPanel from './OptionPanel';
import {connect} from 'react-redux';

class GraphTool extends React.Component{
	constructor(props,context){
		super(props,context);

	}

	render(){
		return(
			<div>
				<OptionPanel dashId={this.props.dashboardId} />
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	const dashboardId = (ownProps.params.id || "default");
	return {
		dashboardId:dashboardId
	};
}

export default connect(mapStateToProps)(GraphTool);