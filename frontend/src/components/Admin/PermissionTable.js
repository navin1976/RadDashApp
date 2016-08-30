import React,{PropTypes} from 'react';
import PermissionRow from './PermissionRow';


class PermissionTable extends React.Component{
	constructor(props,context){
		super(props,context);

		this.state = {};
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
								if(this.props.current.indexOf(permission.id)<0){
									return <PermissionRow key={permission.id} permission={permission} status={false} handle={this.props.handler}/>;
								}else{
									return <PermissionRow key={permission.id} permission={permission} status={true} handle={this.props.handler}/>;
								}			
							}
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

PermissionTable.propTypes = {
	permissions:PropTypes.array.isRequired,
	current:PropTypes.array,
	handler:PropTypes.func.isRequired
};

export default PermissionTable;