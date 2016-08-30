import React,{PropTypes} from 'react';
import DataSourceRow from './DataSourceRow';

class DataSourceTable extends React.Component{
	
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
							<th className="noBold">Name</th>
							<th className="noBold">Description</th>
							<th className="noBold">Authorized</th>
						</tr>
					</thead>
					<tbody className="tableBody">
						{this.props.sources.map(source =>
							{
								if(this.props.current.indexOf(source.id)<0){
									return <DataSourceRow key={source.id} source={source} status={false} handle={this.props.handler}/>;
								}else{
									return <DataSourceRow key={source.id} source={source} status={true} handle={this.props.handler}/>;
								}
							}
						)}
					</tbody>
				</table>
			</div>
		);
	}	
}

DataSourceTable.propTypes = {
	sources:PropTypes.array.isRequired,
	current:PropTypes.array,
	handler:PropTypes.func.isRequired
};

export default DataSourceTable;