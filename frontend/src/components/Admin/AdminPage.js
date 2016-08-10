import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import RoleForm from './RoleForm';


class AdminPage extends React.Component{
	constructor(props,context){
		super(props,context);

		this.state = {'filter':''};
		this.changeHandler = this.changeHandler.bind(this);
	}

	redirectToManageDashboards(){
		this.context.router.push('/courses');
	}

	redirectToManagePermissions(){
		this.context.router.push('/courses');
	}

	redirectToAddRole(){
		this.context.router.push('/courses');
	}

	changeHandler(event){
		this.setState({'filter':event.target.value},()=>{
			console.log(this.state.filter);
		});
	}

	render(){
		return(
			<div>
				<div id="searchBar">
					<div id="searchIcon" className="inline noSelect">S</div>
					<input id="searchField" className="inline" type="text" onChange={this.changeHandler}/>
				</div>
				<RoleForm
					allRoles={this.props.roles}
				/>
			</div>
		);
	}
	
}

AdminPage.contextTypes = {
	router: PropTypes.object
};

AdminPage.propTypes = {
	roles: PropTypes.array
};

function mapStateToProps(state,ownProps){
	return{
		roles: state.roles
	};
}


export default connect(mapStateToProps)(AdminPage);

/*
<div>
				<div className="info-context" onClick={this.redirectToManageDashboards}>
					<h1>Manage dashboards</h1>
					<p>Click here to manage the default dashboards for the different roles</p>
				</div>
				<div className="info-context noSelect" onClick={this.redirectToManagePermissions}>
					<h1>Manage permissions</h1>
					<p>Click here to manage the access to data based on the user's role</p>
				</div>
				<div className="info-context noSelect" onClick={this.redirectToAddRole}>
					<h1>Add new role</h1>
					<p>This will alow you to add new roles</p>
				</div>
			</div>*/