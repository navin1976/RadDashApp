import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr';

class DashboardToolbar extends React.Component{
	constructor(props,context){
		super(props,context);

		this.redirect = this.redirect.bind(this);
	}

	redirect(event){
		event.preventDefault();
		this.context.router.push('/');
	}

	render(){
		return(
			<div className="toolbar">
				<button id="logout">Logout</button>
				<div id="toolbarButtonGroup">
					<button className="toolbarButton" onClick={this.redirect}>Add widget</button>
				</div>
			</div>
		);
	}
}

DashboardToolbar.contextTypes = {
	router: PropTypes.object
};

DashboardToolbar.propTypes = {
	id: PropTypes.string
};

export default DashboardToolbar;