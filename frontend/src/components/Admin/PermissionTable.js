import React,{PropTypes} from 'react';
import PermissionRow from './PermissionRow';

class PermissionTable extends React.Component{
	constructor(props,context){
		super(props,context);

		this.state = {
			posIds:[]
		};
	}

	render(){
		return(
			<div>
				<table className="table">
					<thead className="tableHead">
						<tr>
							<th className="noBold">Permission id</th>
							<th className="noBold">Permission description</th>
							<th className="noBold">Enabled</th>
						</tr>
					</thead>
					<tbody className="tableBody">
						{this.props.permissions.map(permission =>
							{
								return <PermissionRow key={permission.id} permission={permission}/>;
							}
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

PermissionTable.propTypes = {
	permissions:PropTypes.array.isRequired
};

export default PermissionTable;