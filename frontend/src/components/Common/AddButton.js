import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Dialog from 'material-ui/Dialog';
import toastr from 'toastr';

import AddWidgetForm from './AddWidgetForm';

class AddButton extends React.Component{
	constructor(props,context){
		super(props,context);

		this.state ={
			open:false,
			settings: Object.assign({},this.props.settings),
			errors:{}
		};

		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.handleButtonTap = this.handleButtonTap.bind(this);
		this.updateSettings = this.updateSettings.bind(this);
		this.upload = this.upload.bind(this);
		this.handleValues = this.handleValues.bind(this);

	}

	handleRequestClose(){
		this.setState({
			open:false
		});
	}

	handleButtonTap(){
		this.setState({
			open:true
		});
	}

	handleValues(event){
		event.preventDefault();
		let tgt = event.target.name;
		let setting = this.state.settings;
		if(tgt == 'incrementHeight'){
			setting["height"] = setting["height"] + 1;
			this.setState({settings:setting});
		}else if(tgt == 'incrementWidth'){
			setting["width"] = setting["width"] + 1;
			this.setState({settings:setting});
		}else if(tgt == 'decrementHeight'){
			setting["height"] = setting["height"] - 1;
			this.setState({settings:setting});
		}else if(tgt == 'decrementWidth'){
			setting["width"] = setting["width"] - 1;
			this.setState({settings:setting});
		}
	}

	updateSettings(event){
		event.preventDefault();
		const field = event.target.name;
		let settings = this.state.settings;
		settings[field] = event.target.value;
		return this.setState({settings:settings});
	}

	upload(event){
		event.preventDefault();
	}

	render(){
		return(
			<div>
				<Dialog open={this.state.open} title="Add a dashboard" onRequestClose = {this.handleRequestClose}>
					<AddWidgetForm
						allSettings = {this.props.settings}
						onChange = {this.updateSettings}
						onSubmit = {this.upload}
						errors = {this.state.errors}
						closer = {this.handleRequestClose}
						handler = {this.handleValues}
					/>
				</Dialog>
				<button id="addWidgetButton" onClick={this.handleButtonTap}>+</button>
			</div>
		);
	}
}

AddButton.propTypes ={
	settings: PropTypes.object.isRequired
};

function mapStateToProps(state,ownProps){
	let widgetSettings = {id:'',title:'',width:2,height:2};
	return{
		settings: widgetSettings
	};
}

function mapDispatchToProps(dispatch){
	return{};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);