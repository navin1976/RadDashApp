import React,{PropTypes} from 'react';
import RoleListRow from './RoleListRow';

const RoleTable = ({roles}) => {
	return(
		<div>
			<table className="table">
				<thead className="tableHead">
					<tr>
						<th className="noBold">Role type</th>
						<th className="noBold">Role options</th>
					</tr>
				</thead>
				<tbody className="tableBody">
					{roles.map(role =>
						{
							if(role.description !== 'admin'){
								return <RoleListRow key={role.id} role={role}/>;
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