import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as dashboardActions from '../../actions/dashboardActions';

import ReactGridLayout from 'react-grid-layout';

import AddButton from '../Common/AddButton';
import Wrapper from '../Common/Wrapper';
import DashboardToolbar from '../Common/Toolbars/DashboardToolbar';

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
					width={widget.layout.w*35} 
					height={widget.layout.h*40}
				/>);
				break;
			}
			case 'LINE_CHART':{
				chartItem = (<BarChart 
					title={widget.title} 
					data={widget.data} 
					showLegend={false} 
					xScale={xScale} 
					chartSeries={chartSeries} 
					x={x} 
					y={y} 
					width={widget.layout.w*35} 
					height={widget.layout.h*40}
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
					<p style={paraStyles}> Missing title </p>
					<div className="cardOptions">
						<button style={editButton} onClick={()=>{this.editWidget(widget.layout.i,dashId);}}>E</button>
						<button style={deleteButton} onClick={()=>{this.deleteWidget(widget.layout.i,dashId);}}>X</button>
					</div>
				</div>
			</div>
		);
	}

	render(){
		if(this.props.dashboard){
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
		);}else{
			return <h1>Empty dashboard</h1>;
		}
	}
}

function mapStateToProps(state,ownProps){
	const dashboardId = (ownProps.params.id || "default");
	let dash;

	for(let i = 0; i< state.dashboards.length; i++){
		if(state.dashboards[i].id == dashboardId){
			dash = state.dashboards[i];
			break;
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



























/*
		switch(tile.type){
			case 'BAR_CHART':
				entry = <BarChart data={data} showLegend={false} xScale={xScale} chartSeries= {chartSeries} x= {x} y={y} width={300} height={300}/>;
				break;
			case 'LINE_CHART':
				entry = <BarChart data={data} showLegend={false} xScale={xScale} chartSeries= {chartSeries} x= {x} y={y} width={300} height={300}/>;
				break;
			case 'PIE_CHART':
				entry = <PieChart data={data2} chartSeries={chartSeries2} value={value} name={name} width={350} height={300}/>
				break;
			default:
				console.log("Chart type doesnt exist");
		}
render(){

	

		const layout = {
		lg :[
			{i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
			{i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
			{i: 'c', x: 4, y: 0, w: 1, h: 2}]
    	};
		return (
			<ResponsiveReactGridLayout className="layout" layout={layout} breakpoints={{lg: 1200, md: 996,sm: 768, xs: 480}} cols={{lg: 12, md: 10,sm: 6, xs: 4}}>
				<div key={'a'} className="testCard">a</div>
				<div key={'b'} className="testCard">b</div>
				<div key={'c'} className="testCard">c</div>
			</ResponsiveReactGridLayout>
		);
	}*/