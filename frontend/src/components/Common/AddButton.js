import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';

class AddButton extends React.Component{
	constructor(props,context){
		super(props,context);

		this.state ={
			open:false,
		};

		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.handleButtonTap = this.handleButtonTap.bind(this);
	}

	handleRequestClose(){
		this.setState({
			open:false,
		});
	}

	handleButtonTap(){
		this.setState({
			open:true,
		});
	}

	render(){
		return(
			<div>
				<Dialog open={this.state.open} title="Add a dashboard" onRequestClose = {this.handleRequestClose}>
					<p>1-2-3-4-5</p>
					<button onClick={this.handleRequestClose}>Close</button>
				</Dialog>
				<button id="addWidgetButton" onClick={this.handleButtonTap}>+</button>
			</div>
		);
	}
}

export default AddButton;