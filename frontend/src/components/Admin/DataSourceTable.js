import React,{PropTypes} from 'react';
import DataSourceRow from './DataSourceRow';

const DataSourceTable = ({sources}) => {
	return(
		<div>
			<table className="table">
				<thead className="tableHead">
					<tr>
						<th className="noBold">Name</th>
						<th className="noBold">Description</th>
						<th className="noBold">Authorized</th>
					</tr>
				</thead>
				<tbody className="tableBody">
					{sources.map(source =>
						{
							return <DataSourceRow key={source.id} source={source}/>;
						}
					)}
				</tbody>
			</table>
		</div>
	);
};

DataSourceTable.propTypes = {
	sources:PropTypes.array.isRequired
};

export default DataSourceTable;