import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as dashboardActions from '../../actions/dashboardActions';

import ReactGridLayout from 'react-grid-layout';

import AddButton from '../Common/AddButton';
import Wrapper from '../Common/Wrapper';
import DashboardToolbar from '../Common/Toolbars/DashboardToolbar';
import GeneralToolbar from '../Common/Toolbars/GeneralToolbar';

import {BarChart,PieChart,BarStackChart,LineChart} from 'react-d3-basic';


/*
//For responsive design, integrate these classes
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
*/

const paraStyles = {
	float:"left",
	overflowX:"hidden"
};

const editButton ={
	backgroundColor:"#659D32",
	color:"white",
	border:"none"
};

const deleteButton ={
	backgroundColor:"#CD3333",
	color:"white",
	border:"none"
};

class Dashboard extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state = {};

		this.widgetMap = this.widgetMap.bind(this);

		this.editWidget = this.editWidget.bind(this);
		this.deleteWidget = this.deleteWidget.bind(this);
	}
	
	editWidget(id,dashId,event){
		console.log("editing");
		console.log(id);
		console.log(dashId);
	}

	deleteWidget(id,dashId,event){
		this.props.actions.removeWidget(dashId,id);
	}

	widgetMap(widget, index){

		let x = function(d){
			return d.date;
		};

		let y = function(d){
			return +d;
		};

		let chartSeries = [
			{
				field:'metric',
				name:'Metric'
			}
		];

		let xScale = 'ordinal';
		const dashId = (this.props.dashboardId || "default");
		let chartItem;

		switch(widget.type){
			case 'BAR_CHART':{
				chartItem = (<BarChart 
					title={widget.title} 
					data={widget.data} 
					showLegend={false} 
					xScale={xScale} 
					chartSeries={chartSeries} 
					x={x} 
					y={y} 
					width={widget.layout.w*70} 
					height={widget.layout.h*47}
				/>);
				break;
			}
			case 'LINE_CHART':{
				chartItem = (<LineChart 
					title={widget.title} 
					data={widget.data} 
					showLegend={false} 
					xScale={xScale} 
					chartSeries={chartSeries} 
					x={x} 
					y={y} 
					width={widget.layout.w*70} 
					height={widget.layout.h*47}
				/>);
				break;
			}
			default:{
				chartItem = <p>Graph could not be loaded</p>;
				break;
			}
		}

		return(
			<div key={widget.layout.i} className="card">
				{chartItem}
				<div className="overlayCard">
					<p style={paraStyles}> {widget.name} </p>
					<div className="cardOptions">
						<button style={deleteButton} disabled={dashId == "default"} onClick={()=>{this.deleteWidget(widget.layout.i,dashId);}}>X</button>
					</div>
				</div>
			</div>
		);
	}

	render(){
		if(Object.keys(this.props.dashboard).length !== 0){
			const id = (this.props.dashboardId || "default");
			let displayLayout = [];
			
			for(let i = 0; i<this.props.dashboard.widgets.length; i++){
				displayLayout.push(this.props.dashboard.widgets[i].layout);
			}

		return (
			<div>
				<DashboardToolbar id={id} />
				<Wrapper>
					<ReactGridLayout className="layout" layout={displayLayout} cols={20} rowHeight={40} width={1500} onLayoutChange={this.update}>
						{this.props.dashboard.widgets.map(this.widgetMap)}
					</ReactGridLayout>
				</Wrapper>

			</div>
			);
		}else{
			return(
				<div>
					<GeneralToolbar />
					<Wrapper>
						<h1 className="noSelect">Empty dashboard</h1>
					</Wrapper>
				</div>
			); 
		}
	}
}

function mapStateToProps(state,ownProps){
	const dashboardId = (ownProps.params.id || "default");
	let dash;
	
	if(dashboardId == "default"){
		dash = state.defaultDashboard;
	}else{
		for(let i = 0; i< state.dashboards.length; i++){
			if(state.dashboards[i].id == dashboardId){
				dash = state.dashboards[i];
				break;
			}
		}
	}
	
	return {
		dashboard:dash,
		dashboardId: dashboardId
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(dashboardActions,dispatch)
	};
}

Dashboard.propTypes = {
	dashboard: React.PropTypes.object.isRequired,
	dashboardId: React.PropTypes.string
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);