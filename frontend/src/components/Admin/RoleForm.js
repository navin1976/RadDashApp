import React,{PropTypes} from 'react';
import RoleTable from './RoleTable';

const RoleForm = ({allRoles}) => {
	return(
		<div>
			<RoleTable roles={allRoles}/>
			<button>Add</button>
		</div>
	);
}

RoleForm.propTypes = {
	allRoles:PropTypes.array,
};

export default RoleForm;