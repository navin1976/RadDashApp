import React, {PropTypes} from 'react';

const PermissionRow = ({permission}) =>{
	return(
		<tr className="roleRow">
			<td>{permission.id}</td>
			<td>{permission.description}</td>
			<td><input type="checkbox" checked={false}/></td>
		</tr>
	);
};

PermissionRow.propTypes = {
	permission: PropTypes.object.isRequired
};

export default PermissionRow;