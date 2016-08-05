import React,{PropTypes} from 'react';

class AdminPage extends React.Component{
	constructor(props,context){
		super(props,context);
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

	render(){
		return(
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
			</div>
		);
	}
	
}

AdminPage.contextTypes = {
	router: PropTypes.object
};


export default AdminPage;