import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import OptionForm from './OptionForm';
import GraphPreview from './GraphPreview';
import {bindActionCreators} from 'redux';
import * as dashboardActions from '../../../actions/dashboardActions';

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
	width:"calc(100%-300px)",
	backgroundColor:"red"
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
			display:false,
			activeFilter:[],
			activeGranularities:[]
		};
		
		this.handleChartChange = this.handleChartChange.bind(this);
		this.handleDataChange = this.handleDataChange.bind(this);
		this.updateGraphState = this.updateGraphState.bind(this);
		this.saveGraph = this.saveGraph.bind(this);
		this.previewGraph = this.previewGraph.bind(this);
	}

	handleChartChange(event,index,valueue){
		this.setState({chartvalueue:valueue});
	}

	handleDataChange(event,index,valueue){
		this.setState({datavalueue:valueue});
	}

	saveGraph(event){
		event.preventDefault();
		if(this.state.display){
			this.props.actions.addWidgetToDashboard(this.props.dashId,
				Object.assign({},
					{name:this.state.details.title},
					{description:this.state.details.description},
					{type:"BAR_CHART"},
					{request:true},
					{layout:{i:'4',x:0,y:0,w:7,h:7}},
					{data:[
						{
						"metric": 108750,
						"date": "2010-01-01T00:00:00.000Z/2011-01-01T00:00:00.000Z"
						},
						{
						"metric": 380650,
						"date": "2011-01-01T00:00:00.000Z/2012-01-01T00:00:00.000Z"
						},
						{
						"metric": 393695,
						"date": "2012-01-01T00:00:00.000Z/2013-01-01T00:00:00.000Z"
						}]
					}			
				)
			);
		}
	}

	updateGraphState(event){
		const field = event.target.name;
		let details = this.state.details;
		details[field] = event.target.value;
		return this.setState({details:details,display:false});
	}

	previewGraph(event){
		event.preventDefault();
		return this.setState({display:true});
	}

	render(){
		/*
		let ds = [];
		console.log(this.props.datastore);
		for(let i= 0 ; i< this.props.datastore; i++){
			ds.push(Object.assign({},{value:this.props.datastore[i].id}));
		}
		console.log(ds);
		*/
		let ds = [];

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
						errors = {this.state.error} 
						allAllowedSources = {ds}
						allAlowedFilters = {this.state.activeFilter}
						allAlowedGranularities = {this.state.activeGranularities}
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
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(dashboardActions,dispatch)
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