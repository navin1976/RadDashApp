import React,{PropTypes} from 'react';
import RoleTable from './RoleTable';

const RoleForm = ({allRoles}) => {
	return(
		<div>
			<RoleTable roles={allRoles}/>
		</div>
	);
};

RoleForm.propTypes = {
	allRoles:PropTypes.array
};

export default RoleForm;