import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import RoleForm from './RoleForm';
import Wrapper from '../Common/Wrapper';
import AdminToolbar from '../Common/Toolbars/AdminToolbar';
import * as roleActions from '../../actions/roleActions';

class AdminPage extends React.Component{
	constructor(props,context){
		super(props,context);

		this.state = {'filter':''};
		this.changeHandler = this.changeHandler.bind(this);
		this.deleteHandler = this.deleteHandler.bind(this);
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
			//console.log(this.state.filter);
		});
	}

	deleteHandler(roleId){
		this.props.actions.deleteRole(roleId)
			.then(toastr.success("Role deleted!"))
			.catch(error => {
				toastr.error(error);
			});
	}

	render(){
		return(
			<div>
				<AdminToolbar />
				<Wrapper>
					<div id="searchBar">
						<div id="searchIcon" className="inline noSelect">S</div>
						<input id="searchField" className="inline" type="text" onChange={this.changeHandler}/>
					</div>
					<RoleForm
						allRoles={this.props.roles}
						delhandler={this.deleteHandler}
					/>
				</Wrapper>
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

function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(roleActions,dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminPage);
