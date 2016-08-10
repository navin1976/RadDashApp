import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dashboardActions from '../../actions/dashboardActions';

import ReactGridLayout from 'react-grid-layout';

import AddButton from '../Common/AddButton';

import {BarChart,PieChart,BarStackChart,LineChart} from 'react-d3-basic';

/*
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
*/

class Dashboard extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state = {};

		this.update = this.update.bind(this);
	}
	
	widgetMap(widget, index){

		return(
			<div key={tile.l.i} className="card">
				{entry}
			</div>
		);
	}

	update(newLayout){
		//console.log(newLayout);
		//this.props.actions.updateLayout(newLayout);
	}
	
	render(){
		//retrieve layouts from the layout object
		let displayLayout = [];
		for(let i = 0; i<this.props.layout.length;i++){
			displayLayout.push(this.props.layout[i].l);
		}

		return (
			<div>	
				<ReactGridLayout className="layout" layout={displayLayout} cols={20} rowHeight={40} width={1500} onLayoutChange={this.update}>
					{this.props.layout.map(this.tileEntry)}
				</ReactGridLayout>
				<AddButton />
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	const dashboardId = ownProps.params.id;
	let dasboard;

	
	if(!dashboardId){
		dashLayout = state.layout;
	}
	return {
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(dashboardActions,dispatch)
	};
}

Dashboard.propTypes = {
	layout: React.PropTypes.array.isRequired
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