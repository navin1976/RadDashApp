import React,{PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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

class OptionPanel extends React.Component{
	constructor(props,context){
		super(props,context);

		this.state = {
			chartValue: 1,
			dataValue: 1
		};
		
		this.handleChartChange = this.handleChartChange.bind(this);
		this.handleDataChange = this.handleDataChange.bind(this);
	}

	handleChartChange(event,index,value){
		this.setState({chartValue:value});
	}

	handleDataChange(event,index,value){
		this.setState({dataValue:value});
	}

	render(){
		return(
			<div className="optionPane">
				<TextField hintText="Widget title" floatingLabelText="Title"/>
				<br />
				<TextField hintText="Widget description" />
				<br />
				<TextField hintText="Widget width" />
				<br />
				<TextField hintText="Widget height"/>
				<br />
				<DropDownMenu
					value = {this.state.chartValue}
					onChange = {this.handleChartChange}
					autoWidth
				>
					<MenuItem value={1} primaryText="Chart type"/>
					<MenuItem value={2} primaryText="Bar chart"/>
					<MenuItem value={3} primaryText="Line chart"/>
					<MenuItem value={4} primaryText="Pie chart"/>
				</DropDownMenu>

				<DropDownMenu
					value = {this.state.dataValue}
					onChange = {this.handleDataChange}
					autoWidth
				>
					<MenuItem value={1} primaryText="DataSource1"/>
					<MenuItem value={2} primaryText="DataSource2"/>
					<MenuItem value={3} primaryText="DataSource3"/>
					<MenuItem value={4} primaryText="DataSource4"/>
				</DropDownMenu>

				<DropDownMenu
					value = {this.state.dataValue}
					onChange = {this.handleDataChange}
					autoWidth
				>
					<MenuItem value={1} primaryText="Filter1"/>
				</DropDownMenu>

				<DropDownMenu
					value = {this.state.dataValue}
					onChange = {this.handleDataChange}
					autoWidth
				>
					<MenuItem value={1} primaryText="Granularity1"/>
				</DropDownMenu>
				<div>
					<button style={prevStyle}>Preview</button>
					<button style={saveStyle}>Save</button>
				</div>
			</div>
		);
	}
}

export default OptionPanel;