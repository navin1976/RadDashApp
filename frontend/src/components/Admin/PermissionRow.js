import React, {PropTypes} from 'react';

const PermissionRow = ({permission,status,handle}) =>{
	return(
		<tr className="roleRow">
			<td>{permission.id}</td>
			<td>{permission.description}</td>
			<td><input type="checkbox" checked={status} onClick={()=>{handle(permission.id,status)}}/></td>
		</tr>
	);
};

PermissionRow.propTypes = {
	permission: PropTypes.object.isRequired,
	status: PropTypes.bool.isRequired,
	handle:PropTypes.func.isRequired
};

export default PermissionRow;