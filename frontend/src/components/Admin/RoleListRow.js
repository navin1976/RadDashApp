import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const greyStyle = {
	textDecoration:"none",
	color:"grey",
	display:"inline"
};

const RoleListRow = ({role,deleteHandler}) =>{
	return(
		<tr className="roleRow">
			<td>{role.description}</td>
			<td>
				<p style={greyStyle}>Manage dashboard</p>
				{'   |   '}
				<Link to = {'/permissions/'+role.id}>Manage permissions</Link>
			</td>
			<td>
				<button className="deleteRoleButton" onClick={()=>{deleteHandler(role.id)}}>X</button>
			</td>
		</tr>
	);
};

RoleListRow.propTypes = {
	role: PropTypes.object.isRequired
};

export default RoleListRow;