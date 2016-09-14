/*eslint-disable*/

import React from 'react';
import {BarChart,PieChart,LineChart} from 'react-d3-basic';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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

const preview = {
	margin:"auto",
	fontSize:"24px"
};

class GraphPreview extends React.Component{
	constructor(props, context){
		super(props,context);
	}

	render(){
		let retVar;
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


		if(this.props.enable && this.props.data !== []){
			if(this.props.info.chartType == 'BAR_CHART'){
				retVar = (			
				<div className="cardPlus">
					<BarChart 
						title={this.props.info.title} 
						data={this.props.data} 
						showLegend={false} 
						xScale={xScale} 
						chartSeries= {chartSeries} 
						x= {x} 
						y= {y} 
						width={parseInt(this.props.info.width)} 
						height={parseInt(this.props.info.height)}
					/>
				</div>);
			}else{
				retVar = (			
				<div className="cardPlus">
					<LineChart 
						title={this.props.info.title} 
						data={this.props.data} 
						showLegend={false} 
						xScale={xScale} 
						chartSeries= {chartSeries} 
						x= {x} 
						y= {y} 
						width={parseInt(this.props.info.width)} 
						height={parseInt(this.props.info.height)}
					/>
				</div>);
			}
				
		}else{
			retVar = <div style = {preview}>Preview not available</div>;
		}

		return(
			<div>
				{retVar}
			</div>
		);
	}
}

function mapStateToProps(state,ownProps){
	const data = state.manageDashboard;
	return {
		data:data
	};
}

export default connect(mapStateToProps,null)(GraphPreview);