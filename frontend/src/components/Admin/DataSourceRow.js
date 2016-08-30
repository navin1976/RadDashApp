import React, {PropTypes} from 'react';

const DataSourceRow = ({source,status,handle}) =>{
	return(
		<tr className="roleRow">
			<td>{source.name}</td>
			<td>{source.description}</td>
			<td><input type="checkbox" checked={status} onClick={()=>{handle(source.id,status)}}/></td>
		</tr>
	);
};

DataSourceRow.propTypes = {
	source: PropTypes.object.isRequired
};

export default DataSourceRow;