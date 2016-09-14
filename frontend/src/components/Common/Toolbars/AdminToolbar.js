import React from 'react';
import Dialog from 'material-ui/Dialog';
import toastr from 'toastr';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AddRoleForm from './AddRoleForm';
import * as roleActions from '../../../actions/roleActions';

class AdminToolbar extends React.Component{
	constructor(props,context){
		super(props,context);

		this.state ={
			open:false,
			role:{
				"title":"",
			},
			errors: {},
			saving:false
		};

		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.handleButtonTap = this.handleButtonTap.bind(this);
		this.handleSave = this.handleSave.bind(this);

		this.updateState = this.updateState.bind(this);
	}

	handleRequestClose(){
		if(!this.state.saving){
			this.setState({
				open:false
			});
		}
	}

	handleButtonTap(){
		this.setState({
			open:true
		});
	}

	updateState(event){
		const field = event.target.name;
		let role = this.state.role;
		role[field] = event.target.value;
		return this.setState({role:role});
	}

	handleSave(event){
		event.preventDefault();
		this.setState({saving:false});

		this.props.actions.saveNewRole(this.state.role.title)
			.then(toastr.success("New role added!"))
			.catch(error => {
				toastr.error(error);
				this.setState({saving:false});
			});
	}

	render(){
		let res;
		if(this.props.saveHandler){
			res = <button className="toolbarButton" onClick={this.props.saveHandler}>Save</button>;
		}
		return(
			<div className="toolbar">
				<button id="logout">Logout</button>
				<div id="toolbarButtonGroup">
					<button className="toolbarButton" onClick={this.handleButtonTap}>Add role</button>
					{res}
				</div>
				<Dialog open={this.state.open} title="Add a role" onRequestClose = {this.handleRequestClose}>
					<AddRoleForm
						close = {this.handleRequestClose}
						save = {this.handleSave}

						onChange={this.updateState}
						role={this.state.role}
						errors={this.state.errors}
						saving={this.state.saving}
					/>
				</Dialog>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(roleActions,dispatch)
	};
}

export default connect(null, mapDispatchToProps)(AdminToolbar);