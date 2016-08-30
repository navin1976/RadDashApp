/*eslint-disable react/prop-types*/

import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import OptionForm from './OptionForm';
import GraphPreview from './GraphPreview';
import {bindActionCreators} from 'redux';
import * as manageDashboardAction from '../../../actions/manageDashboardAction';

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

const graphStyle = {
	float:"left",
	width:"calc(100%-400px)",
	backgroundColor:"red"
};

class OptionPanel extends React.Component{
	constructor(props,context){
		super(props,context);

		this.state = {
			details:{
				title:"",
				description:"",
				chartType:"",
				width:"",
				height:"",
				datasource:"",
				filter:"",
				granularity:"",
				metric:"",
				startTime:"",
				endTime:""
			},
			error:{},
			display:false,
			activeSource:"",
			activeFilter:[],
			activeGranularities:[],
			activeMetrics:[],
			allSources:[],
			allChartTypes:[
				{id:1,value:'BAR_CHART',text:"Bar chart"},
				{id:2,value:'LINE_CHART',text:"Line chart"}
			]
		};
		
		this.updateGraphState = this.updateGraphState.bind(this);
		this.saveGraph = this.saveGraph.bind(this);
		this.previewGraph = this.previewGraph.bind(this);
		this.updateSourceState = this.updateSourceState.bind(this);
		this.setFilterAndGranularity = this.setFilterAndGranularity.bind(this);
	}

	componentWillMount(){
		let ds = [];
		for(let i = 0; i<this.props.datastore.length; i++){
			ds.push(Object.assign({},{id:this.props.datastore[i].id},{value:this.props.datastore[i].id},{text:this.props.datastore[i].name}));
		}
		this.setState({allSources:ds});
	}

	saveGraph(event){
		event.preventDefault();
		if(this.state.display){
			const ref = this.state.details;
			let res = {};
			Object.assign(res,
				{sourceId:parseInt(ref.datasource)},
				{endTime:ref.endTime},
				{startTime:ref.startTime},
				{granularityId:parseInt(ref.granularity)},
				{metricId: parseInt(ref.metric)},
				{splitBy:0},
				{filters:[]}
			);
			console.log("TIGGERED");
			console.log(res);
			this.props.actions.temp(res);
		}
	}

	updateGraphState(event){
		const field = event.target.name;
		let details = this.state.details;
		details[field] = event.target.value;
		return this.setState({details:details,display:false});
	}

	updateSourceState(event){
		event.preventDefault();
		const field = event.target.name;
		let details = this.state.details;
		details[field] = event.target.value;
		this.setState({details:details,display:false,activeSource:event.target.value});
		setTimeout(this.setFilterAndGranularity,75);
		
	}

	setFilterAndGranularity(){
		let numArray;
		let filter = [];
		let granularity = [];
		let metric = [];

		for(let i = 0; i<this.props.datastore.length;i++){
			if(this.props.datastore[i].id == this.state.activeSource){
				numArray = i;
				break;
			}
		}

		for(let i = 0; i<this.props.datastore[numArray].filters.length; i++){
			filter.push(Object.assign({},
				{id:this.props.datastore[numArray].filters[i].id},
				{value:this.props.datastore[numArray].filters[i].name},
				{text:this.props.datastore[numArray].filters[i].title}
			));
		}

		for(let i = 0; i<this.props.datastore[numArray].granularities.length; i++){
			granularity.push(Object.assign({},
				{id:this.props.datastore[numArray].granularities[i].id},
				{value:this.props.datastore[numArray].granularities[i].id},
				{text:this.props.datastore[numArray].granularities[i].name}
			));
		}

		for(let i = 0; i<this.props.datastore[numArray].metrics.length; i++){
			metric.push(Object.assign({},
				{id:this.props.datastore[numArray].metrics[i].id},
				{value:this.props.datastore[numArray].metrics[i].id},
				{text:this.props.datastore[numArray].metrics[i].name}
			));
		}

		this.setState({activeFilter:filter,activeGranularities:granularity,activeMetrics:metric});
	}

	previewGraph(event){
		event.preventDefault();
		return this.setState({display:true});
	}

	render(){

		return(
			<div>
				<div style = {graphStyle}>
					<GraphPreview
						info={this.state.details}
						enable={this.state.display}
					/>
				</div>
				<div className="optionPane">
					<OptionForm 
						graphOption={this.state.details} 
						onChange={this.updateGraphState}
						onDatasourceChange={this.updateSourceState} 
						errors = {this.state.error} 
						allAllowedSources = {this.state.allSources}
						allAlowedFilters = {this.state.activeFilter}
						allAlowedGranularities = {this.state.activeGranularities}
						allAlowedMetrics = {this.state.activeMetrics}
						allAlowedChartTypes = {this.state.allChartTypes}
						onSave = {this.saveGraph}
						onPreview = {this.previewGraph}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	return {
		datastore:state.dataSources,
		tempData:state.manageDashboard
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(manageDashboardAction,dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(OptionPanel);

/*
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
*/