import React,{PropTypes} from 'react';
import RoleListRow from './RoleListRow';

const RoleTable = ({roles,deleteHandler}) => {
	return(
		<div>
			<table className="table">
				<thead className="tableHead">
					<tr>
						<th className="noBold">Role type</th>
						<th className="noBold">Role options</th>
						<th className="noBold">Delete</th>
					</tr>
				</thead>
				<tbody className="tableBody">
					{roles.map(role =>
						{
							if(role.description !== 'admin'){
								return <RoleListRow key={role.id} role={role} deleteHandler={deleteHandler}/>;
							}
						}
					)}
				</tbody>
			</table>
		</div>
	);
};

RoleTable.propTypes = {
	roles:PropTypes.array.isRequired
};

export default RoleTable;