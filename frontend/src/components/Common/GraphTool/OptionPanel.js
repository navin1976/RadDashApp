import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import OptionForm from './OptionForm';


const prevStyle = {
	border:"none",
	color:"white",
	float:"left",
	backgroundColor:"#4c4cff",
	width:"50%",
	height:"40px",
	textDecoration:"none"
};

const saveStyle = {
	border:"none",
	color:"white",
	float:"right",
	backgroundColor:"grey",
	width:"50%",
	height:"40px",
	textDecoration:"none"
};

class OptionPanel extends React.Component{
	constructor(props,context){
		super(props,context);

		this.state = {
			details:{
				title:"",
				description:"",
				width:"",
				height:"",
				datasource:"",
				filter:"",
				granularity:""
			},
			error:{},
		};
		
		this.handleChartChange = this.handleChartChange.bind(this);
		this.handleDataChange = this.handleDataChange.bind(this);
		this.updateGraphState = this.updateGraphState.bind(this);
		this.saveGraph = this.saveGraph.bind(this);
	}

	handleChartChange(event,index,valueue){
		this.setState({chartvalueue:valueue});
	}

	handleDataChange(event,index,valueue){
		this.setState({datavalueue:valueue});
	}

	saveGraph(event){
		event.preventDefault();
		console.log(this.state);
	}

	updateGraphState(event){
		const field = event.target.name;
		let details = this.state.details;
		details[field] = event.target.value;
		return this.setState({details:details});
	}

	render(){
		return(
			<div className="optionPane">
				<OptionForm 
					graphOption={this.state.details} 
					onChange={this.updateGraphState} 
					errors = {this.state.error} 
					allAllowedSources = {this.props.d}
					allAlowedFilters = {this.props.f}
					allAlowedGranularities = {this.props.g}
					onSave = {this.saveGraph}
				/>
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	const datasources = [{id:1,value:"item1",text:"Item 1"},{id:2,value:"item2",text:"Item 2"},{id:3,value:"item3",text:"Item 3"}];
	const granularity = [{id:1,value:"daily",text:"Daily"},{id:2,value:"weekly",text:"Weekly"},{id:3,value:"monthly",text:"Monthly"}];
	const filter = [{id:1,value:"filter1",text:"Filter 1"},{id:2,value:"filter2",text:"Filter 2"}];

	return {
		d:datasources,
		g:granularity,
		f:filter
	};
}

export default connect(mapStateToProps)(OptionPanel);