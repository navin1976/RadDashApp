import React from 'react';
import {BarChart,PieChart,LineChart} from 'react-d3-basic';

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

class GraphPreview extends React.Component{
	constructor(props, context){
		super(props,context);
	}

	render(){
		let retVar;
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
			"metric": 500000,
			"date": "2014-01-01T00:00:00.000Z/2015-01-01T00:00:00.000Z"
			},
			{
			"metric": 120000,
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

		if(this.props.enable){
			retVar = (			
			<div className="card">
				<BarChart 
					title={this.props.info.title} 
					data={data} 
					showLegend={false} 
					xScale={xScale} 
					chartSeries= {chartSeries} 
					x= {x} 
					y= {y} 
					width={parseInt(this.props.info.width)} 
					height={parseInt(this.props.info.height)}
				/>
				<div className="overlayCard">
					<p style={paraStyles}> </p>
					<div className="cardOptions">
						<button style={editButton}>E</button>
						<button style={deleteButton}>X</button>
					</div>
				</div>
			</div>);
		}else{
			retVar = <div>preview not available</div>;
		}

		return(
			<div>
				{retVar}
			</div>
		);
	}
}

export default GraphPreview;