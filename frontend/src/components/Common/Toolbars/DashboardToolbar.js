import React,{PropTypes} from 'react';
import toastr from 'toastr';
import Dialog from 'material-ui/Dialog';
import DeleteForm from '../DeleteForm';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dashboardActions from '../../../actions/dashboardActions';

class DashboardToolbar extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			open:false
		};

		this.redirect = this.redirect.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.handleButtonTap = this.handleButtonTap.bind(this);
		this.deleteHandler = this.deleteHandler.bind(this);
	}

	handleRequestClose(){
		this.setState({
			open:false
		});
	}

	handleButtonTap(){
		this.setState({
			open:true
		});
	}

	deleteHandler(){
		this.deleteDashboard(this.props.id);
	}

	redirect(event){
		event.preventDefault();
		this.context.router.push('/editDashboard/'+this.props.id);
	}

	deleteDashboard(id){
		this.context.router.push('/');
		toastr.success("Dashboard deleted");
		this.props.actions.removeDashboard(id);
	}

	render(){
		return(
			<div className="toolbar">
				<button id="logout">Logout</button>
				<div id="toolbarButtonGroup">
					<button className="toolbarButton" onClick={this.redirect}>Add widget</button>
					<button className="toolbarButton" onClick={this.handleButtonTap}>Delete dashboard</button>
				</div>
				<Dialog open={this.state.open} title="Delete a dashboard" onRequestClose = {this.handleRequestClose}>
					<DeleteForm
						close = {this.handleRequestClose}
						confirm = {this.deleteHandler}
					/>
				</Dialog>
			</div>
		);
	}
}

DashboardToolbar.contextTypes = {
	router: PropTypes.object
};

DashboardToolbar.propTypes = {
	id: PropTypes.string
};

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(dashboardActions,dispatch)
	};
}

export default connect(null,mapDispatchToProps)(DashboardToolbar);