import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dashboardActions from '../../actions/dashboardActions';

import ReactGridLayout from 'react-grid-layout';

import AddButton from '../Common/AddButton';

import {BarChart,PieChart,BarStackChart} from 'react-d3-components';

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
	
	tileEntry(tile, index){
		let data = [{
			label: 'somethingA',
			values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
		}];

		const width = (tile.l.w)*(1500/12);
		const height = (tile.l.h)*(40);

		let value = function(d){
			return +d.population;
		};

		let name = function(d){
			return d.age;
		};
		const chartSeries = [
			{"field":"<5","name":"less than 5"},
			{"field":"5-13","name":"5 to 13"},
			{"field":"14-17","name":"14 to 17"}
		];

		const dataPie = [
			{age:"<5",population:"27000"},
			{age:"5-13",population:"13000"},
			{age:"14-17",population:"19000"}
		];

		let entry = null;

		switch(tile.type){
			case 'BAR_CHART':
				entry = <BarChart data={data} width={width} height={height} margin={{top: 10, bottom: 50, left: 50, right: 10}}/>;
				break;
			case 'PIE_CHART':
				entry = <BarChart data={data} width={width} height={height} margin={{top: 10, bottom: 50, left: 50, right: 10}}/>;
				break;
			default:
				console.log("Chart type doesnt exist");
		}

		return(
			<div key={tile.l.i} className="card">
				{entry}
			</div>
		);
	}

	update(newLayout){
		console.log(newLayout);
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
				<ReactGridLayout className="layout" layout={displayLayout} cols={12} rowHeight={40} width={1500} onLayoutChange={this.update}>
					{this.props.layout.map(this.tileEntry)}
				</ReactGridLayout>
				<AddButton />
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	const dashboardId = ownProps.params.id;
	let dashLayout = [
			{
				l:{i: '1', x: 0, y: 0, w: 4, h: 8},
				c:2,
				n:"Dashboard 1",
				type:"BAR_CHART"
			},
			{
				l:{i: '2', x: 4, y: 0, w: 4, h: 8},
				c:2,
				n:"Dashboard 2",
				type:"BAR_CHART"
			}
	];
	
	if(!dashboardId){
		dashLayout = state.layout;
	}
	
	console.log(dashLayout);
	return {
		layout: dashLayout
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



/*render(){
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