import React from 'react';
import PermissionTable from './PermissionTable';
import DataSourceTable from './DataSourceTable';
import {connect} from 'react-redux';
import Wrapper from '../Common/Wrapper';
import AdminToolbar from '../Common/Toolbars/AdminToolbar';

const findId = function(roleObj,sId){
	for(let i = 0; i<roleObj.length;i++){
		if(roleObj[i].id == sId){
			return roleObj[i].permissions;
		}
	}
};


class PermissionPage extends React.Component{
	constructor(props,context){
		super(props,context);
	}

	render(){
		const perm = findId(this.props.roles,this.props.roleId);
		return(
			<div>
			<AdminToolbar />
			<Wrapper>

				<PermissionTable 
					permissions = {this.props.permissions}
					current = {perm}
				/>

				<div id="searchBar">
					<div id="searchIcon" className="inline noSelect">S</div>
					<input id="searchField" className="inline" type="text" onChange={this.changeHandler}/>
				</div>
				
				<DataSourceTable
					sources={this.props.dataSources}
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


export default connect(mapStateToProps)(PermissionPage);