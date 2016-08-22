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

		this.update = this.update.bind(this);
		this.widgetMap = this.widgetMap.bind(this);
	}
	
	widgetMap(widget, index){
		let data = [
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
			},
			{
			"metric": 418133,
			"date": "2013-01-01T00:00:00.000Z/2014-01-01T00:00:00.000Z"
			},
			{
			"metric": 437033,
			"date": "2014-01-01T00:00:00.000Z/2015-01-01T00:00:00.000Z"
			},
			{
			"metric": 311548,
			"date": "2015-01-01T00:00:00.000Z/2016-01-01T00:00:00.000Z"
			}
		];
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

		return(
			<div key={widget.layout.i} className="card">
				<BarChart title={"Exam data per month"} data={data} showLegend={false} xScale={xScale} chartSeries= {chartSeries} x= {x} y={y} width={500} height={470}/>
				<div className="overlayCard">
					<p style={paraStyles}> Exam count per year (2010-2015) </p>
					<div className="cardOptions">
						<button style={editButton}>E</button>
						<button style={deleteButton}>X</button>
					</div>
				</div>
			</div>
		);
	}

	update(newLayout){
		//console.log(newLayout);
		//this.props.actions.updateLayout(newLayout);
	}
	
	render(){
		//retrieve layouts from the layout object
		let displayLayout = []
		displayLayout.push(this.props.dashboard.widgets[0].layout);
		const id = (this.props.dashboardId || "default");
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
	}
}

function mapStateToProps(state,ownProps){
	const dashboardId = ownProps.params.id;
	return {
		data:[
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
			},
			{
			"metric": 418133,
			"date": "2013-01-01T00:00:00.000Z/2014-01-01T00:00:00.000Z"
			},
			{
			"metric": 437033,
			"date": "2014-01-01T00:00:00.000Z/2015-01-01T00:00:00.000Z"
			},
			{
			"metric": 311548,
			"date": "2015-01-01T00:00:00.000Z/2016-01-01T00:00:00.000Z"
			}
		],
		dashboard:state.dashboards[0],
		dashboardId: dashboardId
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(dashboardActions,dispatch)
	};
}

Dashboard.propTypes = {
	data: React.PropTypes.array.isRequired,
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