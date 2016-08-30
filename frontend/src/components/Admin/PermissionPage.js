import React from 'react';
import PermissionTable from './PermissionTable';
import DataSourceTable from './DataSourceTable';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as permissionActions from '../../actions/permissionActions';
import * as dataActions from '../../actions/dataActions';
import * as roleActions from '../../actions/roleActions';

import toastr from 'toastr';
import Wrapper from '../Common/Wrapper';
import AdminToolbar from '../Common/Toolbars/AdminToolbar';

const findId = function(roleObj,sId){
	for(let i = 0; i<roleObj.length;i++){
		if(roleObj[i].id == sId){
			return i;
		}
	}
};

class PermissionPage extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			currentPermissions:[],
			currentData:[]
		};
		this.handlePermissionToggle = this.handlePermissionToggle.bind(this);
		this.handleDataToggle = this.handleDataToggle.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	handlePermissionToggle(id,status){
		if(this.state.currentPermissions.indexOf(id)<0){
			this.setState({currentPermissions:this.state.currentPermissions.concat([id])});
		}else{
			const pos = this.state.currentPermissions.indexOf(id);
			const stateTemp = [...this.state.currentPermissions];
			stateTemp.splice(pos,1);
			this.setState({currentPermissions:stateTemp});
		}
	}

	handleDataToggle(id,status){
		if(this.state.currentData.indexOf(id)<0){
			this.setState({currentData:this.state.currentData.concat([id])});
		}else{
			const pos = this.state.currentData.indexOf(id);
			const stateTemp = [...this.state.currentData];
			stateTemp.splice(pos,1);
			this.setState({currentData:stateTemp});
		}
	}

	handleSave(event){
		event.preventDefault();
		console.log("saved");
		this.props.permissionActions.assignPermission(this.props.roleId,this.state.currentPermissions)
			.then(this.props.dataActions.assignDataSource(this.props.roleId,this.state.currentData))
			.then(this.props.roleActions.loadAllRoles())
			.then(toastr.success("Role updated!"))
			.catch(error => {
				toastr.error(error);
			});
	}

	componentDidMount(){
		const idToFind = findId(this.props.roles,this.props.roleId);
		const perm = this.props.roles[idToFind].permissionIds;
		const dat = this.props.roles[idToFind].datasourceIds;
		console.log(perm);
		console.log(dat);
		this.setState({currentPermissions:perm,currentData:dat});
	}

	render(){
		console.log(this.state);
		return(
			<div>
			<AdminToolbar saveHandler={this.handleSave} />
			<Wrapper>

				<PermissionTable 
					permissions = {this.props.permissions}
					current = {this.state.currentPermissions}
					handler = {this.handlePermissionToggle}
				/>

				<div id="searchBar">
					<div id="searchIcon" className="inline noSelect">S</div>
					<input id="searchField" className="inline" type="text" onChange={this.changeHandler}/>
				</div>
				
				<DataSourceTable
					sources={this.props.dataSources}
					current={this.state.currentData}
					handler={this.handleDataToggle}
				/>

			</Wrapper>
			</div>
		);
	}
}

PermissionPage.propTypes = {
	permissions:React.PropTypes.array,
	dataSources:React.PropTypes.array
};

function mapStateToProps(state, ownProps){
	const roleId = ownProps.params.id;

	return {
		roleId: roleId,
		permissions : state.permissions,
		dataSources : state.dataSources,
		roles: state.roles
	};
}

function mapDispatchToProps(dispatch){
	return {
		permissionActions: bindActionCreators(permissionActions,dispatch),
		dataActions: bindActionCreators(dataActions,dispatch),
		roleActions: bindActionCreators(roleActions,dispatch)
	};
}


export default connect(mapStateToProps,mapDispatchToProps)(PermissionPage);