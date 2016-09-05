import React from 'react';
import {Link} from 'react-router';

import Dialog from 'material-ui/Dialog';
import Wrapper from '../Common/Wrapper';
import HomeOption from './HomeOptions';
import CreateDashboard from './CreateDashboard';
import GeneralToolbar from '../Common/Toolbars/GeneralToolbar'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as dashboardActions from '../../actions/dashboardActions';

class HomePage extends React.Component{
	
	constructor(props,context){
		super(props,context);

		this.state={
			open_option1:false,
			open_option2:false,
			createState:{
				title:"",
				description:""
			}
		};

		this.createDashboard = this.createDashboard.bind(this);
		this.deleteDashboard = this.deleteDashboard.bind(this);
		this.viewDefaultDashboard = this.viewDefaultDashboard.bind(this);

		this.handleOptionOneOpen = this.handleOptionOneOpen.bind(this);
		this.handleOptionTwoOpen = this.handleOptionTwoOpen.bind(this);
		this.handleOptionOneClose = this.handleOptionOneClose.bind(this);
		this.handleOptionTwoClose = this.handleOptionTwoClose.bind(this);

		this.updateCreateState = this.updateCreateState.bind(this);
		this.saveNewDashboard = this.saveNewDashboard.bind(this);
	}

	handleOptionOneOpen(){this.setState({open_option1:true});}
	handleOptionTwoOpen(){this.setState({open_option2:true});}
	handleOptionOneClose(){this.setState({open_option1:false});}
	handleOptionTwoClose(){this.setState({open_option2:false});}
	
	updateCreateState(event){
		const field = event.target.name;
		let cs = this.state.createState;
		cs[field] = event.target.value;
		return this.setState({createState:cs});
	}

	saveNewDashboard(event){
		event.preventDefault();
		const numId = this.props.lastId;
		const newId = parseInt(numId) + 1;
		const strId = String(newId);

		const stateRef = this.state.createState;
		let resObj = Object.assign(
			{},
			{id:strId},
			{name:stateRef.title},
			{description:stateRef.description},
			{author:"Admin"},
			{widgets:[]}
		);
		this.props.actions.addDashboard(resObj);
		this.handleOptionTwoClose();
	}

	createDashboard(event){
		event.preventDefault();
		this.handleOptionTwoOpen();
	}

	deleteDashboard(event){
		event.preventDefault();
		this.handleOptionOneOpen();
	}

	viewDefaultDashboard(event){
		event.preventDefault();
		this.context.router.push('/about');
	}

	render(){
		return(
			<div>
				<GeneralToolbar />
				<Wrapper>
					<div className = "jumbotron">
						<h1>Radiology Dashboard application</h1>
						<p>Application for responsive composable dashboards for health informatics</p>
						<Link to="about" className="btn btn-primary btn-lg">Learn More </Link>
					</div>
					<div className = "row">
						<HomeOption title={"Create new custom dashboard"} trigger={this.createDashboard}/>
						<HomeOption title={"Delete a dashboard"} trigger={this.deleteDashboard}/>
						<HomeOption title={"View default dashboard"} trigger={this.viewDefaultDashboard}/>
					</div>
					<Dialog open={this.state.open_option1} title="Delete a custom dashboard" onRequestClose = {this.handleOptionOneClose}>

					</Dialog>
					<Dialog open={this.state.open_option2} title="Add a custom dashboard" onRequestClose = {this.handleOptionTwoClose}>
						<CreateDashboard
							onChange={this.updateCreateState}
							val={this.state.createState}
							save={this.saveNewDashboard}
							close={this.handleOptionTwoClose}
						/>
					</Dialog>
				</Wrapper>
			</div>
		);	
	}
}

HomePage.contextTypes = {
	router: React.PropTypes.object
};

function mapStateToProps(state,ownProps){
	const len = state.dashboards.length;
	const item = len == 0?0:state.dashboards[len-1].id
	return {
		lastId:item
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(dashboardActions,dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
