import React from 'react';
import Collapsible from 'react-collapsible';
import {Accordion,Panel} from 'react-bootstrap';
import Wrapper from '../Common/Wrapper';
import GeneralToolbar from '../Common/Toolbars/GeneralToolbar';

class AboutPage extends React.Component{
	render(){
		return(
			<div>
			<GeneralToolbar/>
			<Wrapper>
				<div>
					<Accordion>
						<Panel header="How to add custom dashboards" eventKey="1">
						To add a custom dashboard, simply place yourself in the home page view and click one of the two main buttons. A popup will appear which will allow you to fill in some details for the dashboard. Click save or close to terminate action.
						</Panel>
						<Panel header="How to add a custom widget" eventKey="2">
To add a custom widget, simply place yourself in one of the custom dashboard and prompt the add widget button in the toolbar. You will be taken to the graph editor to select the appropriate data for your widget
						</Panel>
						<Panel header="How to visualise a custom dashboard" eventKey="3">
To visualize a custom dashboard, look into the navigation options and find the gray tone routes which are your currently loaded custom dashboards						</Panel>
						<Panel header="How to view the current roles" eventKey="4">
To view all the roles available to you, click on the admin tab and you will be redirected to the admin view.
						</Panel>
						<Panel header="How to modify permissions" eventKey="5">
To alter permissions, navigate to the admin tab and select the role you wish to modify by clicking ‘manage permissions’. Check the permissions and the data sources you wish the user to have access to.
						</Panel>
						<Panel header="How to view the help page" eventKey="6">
						You're on it
						</Panel>
						<Panel header="How to fill out graphing tool" eventKey="7">
To create a new widget, fill out the option panel at the right of the screen and click preview; remember to fill out all of the fields or it will not work. Finally choose a width and a height for your widget (preferably no more than 600 pixels and no less than 200px in either orientation)						
						</Panel>

					</Accordion>
				</div>
			</Wrapper>
			</div>
		);
	}
}

export default AboutPage;