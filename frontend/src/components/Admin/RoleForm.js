import React,{PropTypes} from 'react';
import RoleTable from './RoleTable';

const RoleForm = ({allRoles,delhandler}) => {
	return(
		<div>
			<RoleTable roles={allRoles} deleteHandler={delhandler}/>
		</div>
	);
};

RoleForm.propTypes = {
	allRoles:PropTypes.array
};

export default RoleForm;