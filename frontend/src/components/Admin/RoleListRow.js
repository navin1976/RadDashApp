import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const RoleListRow = ({role}) =>{
	return(
		<tr className="roleRow">
			<td>{role.description}</td>
			<td>
				<Link to = {'/'}>Manage dashboard</Link>
				{'   |   '}
				<Link to = {'/permissions/'+role.id}>Manage permissions</Link>
			</td>
		</tr>
	);
};

RoleListRow.propTypes = {
	role: PropTypes.object.isRequired
};

export default RoleListRow;