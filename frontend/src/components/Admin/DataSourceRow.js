import React, {PropTypes} from 'react';

const DataSourceRow = ({source}) =>{
	return(
		<tr className="roleRow">
			<td>{source.name}</td>
			<td>{source.description}</td>
			<td><input type="checkbox" checked={true}/></td>
		</tr>
	);
};

DataSourceRow.propTypes = {
	source: PropTypes.object.isRequired
};

export default DataSourceRow;