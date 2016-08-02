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
	
	tileEntry(tile, index){
		let chartSeries = [
    		{
     			 field: 'frequency',
     			 name: 'Frequency',
      			style: {
        			'fillOpacity': .5
      			}
   			 }
  		];

  		let data=[
  			{letter:"A",frequency:"0.08167"},
  			{letter:"B",frequency:"0.06167"},
  			{letter:"C",frequency:"0.03167"},
  			{letter:"D",frequency:"0.04267"},
  			{letter:"E",frequency:"0.01267"},
  			{letter:"F",frequency:"0.01967"},
  			{letter:"G",frequency:"0.05567"},
  		];

  		let x = function(d) {
   		 return d.letter;
  		};

  		let xScale = "ordinal";

  		let y = function(d){
  			return +d;
  		};

  		let data2 = [
  			{age:"<5",population:"27000"},
  			{age:"5-13",population:"16000"},
  			{age:"14-17",population:"19000"},
  			{age:"18-24",population:"22000"},
  			{age:"25-44",population:"9000"}
  		];

  		let chartSeries2 = [
  			{
  				"field":"<5",
  				"name": "less than 5",
  				"color":"red"
  			},{
  				"field":"5-13",
  				"name": "5 to 13",
  				"color":"green"
  			},{
  				"field":"14-17",
  				"name": "14 to 17",
  				"color":"yellow"
  			},{
  				"field":"18-24",
  				"name": "18 to 24",
  				"color":"blue"
  			},{
  				"field":"25-44",
  				"name": "25 to 44",
  				"color":"orange"
  			}
  		];

  		let value = function(d){
  			return +d.population;
  		};

  		let name = function(d){
  			return d.age;
  		};

		let entry = null;

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