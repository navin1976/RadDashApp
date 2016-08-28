import React,{PropTypes} from 'react';
import toastr from 'toastr';
import GeneralOption from './GeneralOption';

class DashboardToolbar extends React.Component{
	constructor(props,context){
		super(props,context);

		this.redirect = this.redirect.bind(this);
	}

	redirect(event){
		event.preventDefault();
		this.context.router.push('/editDashboard/'+this.props.id);
	}

	render(){
		return(
			<div className="toolbar">
				<GeneralOption />
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