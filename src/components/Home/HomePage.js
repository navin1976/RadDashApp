import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as dashboardActions from '../../actions/dashboardActions';

class HomePage extends React.Component{

	constructor(props,context){
		super(props,context);
		this.state = {
			dsh:{title:"",width:0,height:0,counter:0}
		};

		this.addDashboard = this.addDashboard.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onWidthChange = this.onWidthChange.bind(this);
		this.onHeightChange = this.onHeightChange.bind(this);

	}

	addDashboard(){
		this.props.dispatch(dashboardActions.createTile(this.state.dsh));
	}

	onTitleChange(event){
		const t = this.state.dsh;
		t.title = event.target.value;
		this.setState({dsh:t});
	}

	onWidthChange(event){
		const w = this.state.dsh;
		w.width = parseInt(event.target.value);
		this.setState({dsh:w});
	}

	onHeightChange(event){
		const h = this.state.dsh;
		h.height = parseInt(event.target.value);
		this.setState({dsh:h});
	}

	render(){
		return(
			<div>
				<div className = "jumbotron">
					<h1>Radiology Dashboard application</h1>
					<p>Application for responsive composable dashboards for health informatics</p>
					<Link to="about" className="btn btn-primary btn-lg">Learn More </Link>
				</div>
				<div>
					<input type="text" onChange={this.onTitleChange} value={this.state.dsh.title}/>
					<input type="number" onChange={this.onWidthChange} value={this.state.dsh.width}/>
					<input type="number" onChange={this.onHeightChange} value={this.state.dsh.height}/>
					<input type="submit" onClick={this.addDashboard} value="Add" />
				</div>
			</div>
		);
	}
}


function mapStateToProps(state,ownProps){
	return{};
}

HomePage.PropTypes = {
	dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(HomePage);
