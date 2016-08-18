import React from 'react';
import PermissionTable from './PermissionTable';
import DataSourceTable from './DataSourceTable';
import {connect} from 'react-redux';
import Wrapper from '../Common/Wrapper';
import AdminToolbar from '../Common/Toolbars/AdminToolbar';

class PermissionPage extends React.Component{
	constructor(props,context){
		super(props,context);
	}

	render(){
		return(
			<div>
			<AdminToolbar />
			<Wrapper>
				<PermissionTable 
					permissions = {this.props.permissions}
				/>
				<div id="searchBar">
					<div id="searchIcon" className="inline noSelect">S</div>
					<input id="searchField" className="inline" type="text" onChange={this.changeHandler}/>
				</div>
				<DataSourceTable
					sources={[{id:1,name:"EXAMPQR",description:""},{id:2,name:"PATX2",description:""}]}
				/>

			</Wrapper>
			</div>
		);
	}
}

PermissionPage.propTypes = {
	permissions:React.PropTypes.array
};

function mapStateToProps(state, ownProps){
	const roleId = ownProps.params.id;

	return {
		roleId: roleId,
		permissions : state.roles[0].permissions
	};
}


export default connect(mapStateToProps)(PermissionPage);